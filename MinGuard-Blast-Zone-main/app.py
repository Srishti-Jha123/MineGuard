import asyncio
import cv2
import json
import time
import threading
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return FileResponse("static/index.html")

model = YOLO('yolov8n.pt') 

CAMERAS_CONFIG = [
    {"id": "cam_1", "name": "Laptop Webcam", "source": 0},
    {"id": "cam_2", "name": "Phone IP Cam", "source": "http://192.0.0.4:8080/video"}
]

class CameraThread(threading.Thread):
    def __init__(self, cam_id, name, source):
        super().__init__(daemon=True)
        self.cam_id = cam_id
        self.name = name
        self.source = source
        self.current_frame = None
        self.persons = []
        self.running = True

    def run(self):
        capture = cv2.VideoCapture(self.source)
        last_ai_time = 0
        
        while self.running:
            if not capture.isOpened():
                time.sleep(2)
                capture.open(self.source)
                continue
                
            success, frame = capture.read()
            if not success:
                time.sleep(0.5)
                capture.release()
                continue
                
            ret, buffer = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 60])
            if ret:
                self.current_frame = buffer.tobytes()
                
            current_time = time.time()
            if current_time - last_ai_time > 0.1:
                results = model.track(frame, classes=[0], verbose=False, imgsz=320, persist=True)
                h, w = frame.shape[:2]
                persons_list = []
                
                for r in results:
                    if r.boxes is None or r.boxes.id is None:
                        continue 
                        
                    for i, box in enumerate(r.boxes):
                        x1, y1, x2, y2 = box.xyxy[0].tolist()
                        conf = box.conf[0].item()
                        track_id = int(box.id[0].item()) if box.id is not None else (i + 1)
                        
                        persons_list.append({
                            "id": track_id,
                            "x": x1 / w,
                            "y": y1 / h,
                            "width": (x2 - x1) / w,
                            "height": (y2 - y1) / h,
                            "conf": conf
                        })
                
                self.persons = persons_list
                last_ai_time = current_time
                
            time.sleep(0.005)

camera_threads = {}
for cfg in CAMERAS_CONFIG:
    t = CameraThread(cfg["id"], cfg["name"], cfg["source"])
    camera_threads[cfg["id"]] = t
    t.start()
    
ws_clients = set()
app_state = {
    "center_x": 0.5,
    "center_y": 0.5,
    "radius": 0.2
}

def get_mjpeg_stream(cam_id):
    """Generator for MJPEG stream per camera."""
    while True:
        cam_thread = camera_threads.get(cam_id)
        if cam_thread and cam_thread.current_frame is not None:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + cam_thread.current_frame + b'\r\n')
        else:
            time.sleep(0.5)
        time.sleep(0.033) 

@app.get("/video_feed/{cam_id}")
async def video_feed(cam_id: str):
    if cam_id not in camera_threads:
        return "Camera not found", 404
    return StreamingResponse(get_mjpeg_stream(cam_id), media_type="multipart/x-mixed-replace; boundary=frame")

master_cycle_start = time.time()

async def broadcast_ws():
    global master_cycle_start
    while True:
        countdown = 45 - int(time.time() - master_cycle_start)
        if countdown <= 0:
            master_cycle_start = time.time()
            countdown = 45
            
        cameras_data = {}
        for c_id, thread in camera_threads.items():
            cameras_data[c_id] = {
                "name": thread.name,
                "persons": thread.persons
            }
            
        payload = {
            "cameras": cameras_data,
            "countdown": countdown,
            "blast_center": {"x": app_state["center_x"], "y": app_state["center_y"]},
            "blast_radius": app_state["radius"]
        }
        
        if ws_clients:
            disconnected = set()
            msg = json.dumps(payload)
            for client in ws_clients:
                try:
                    await client.send_text(msg)
                except Exception:
                    disconnected.add(client)
            ws_clients.difference_update(disconnected)
        await asyncio.sleep(0.05) 

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(broadcast_ws())

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    ws_clients.add(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            cmd = json.loads(data)
            if cmd.get("type") == "set_center":
                app_state["center_x"] = float(cmd.get("x", 0.5))
                app_state["center_y"] = float(cmd.get("y", 0.5))
            elif cmd.get("type") == "set_radius":
                # Ensure no divide-by-zero crashes
                try:
                    app_state["radius"] = max(0.05, float(cmd.get("radius", 50)) / 100.0)
                except ValueError:
                    app_state["radius"] = 0.5
    except WebSocketDisconnect:
        ws_clients.remove(websocket)
# uvicorn app:app --host 0.0.0.0 --port 8000 --reload
