# Sentinel Multi-Cam: Geo-Spatial Monitor (Blast Zone Safety System)

The Sentinel Multi-Cam (also known as the "Blast Zone" system) is a real-time, AI-driven surveillance application built to monitor multiple concurrent video feeds, detect and track personnel in real-time, and spatially map these feeds onto a geographic interface. It is designed to ensure safety in hazardous environments by alerting when personnel enter an active "danger zone".

## 🌟 Key Features

* **Real-time AI Person Tracking:** Leverages the YOLOv8 machine learning model to track people across multiple camera angles.
* **Concurrent Multi-Camera Support:** Processes multiple, separate camera streams (e.g., local webcams and IP cameras) simultaneously utilizing a threaded backend without bottlenecking the main event loop.
* **Geo-Spatial GPS Monitoring:** Uses a dynamic Leaflet map UI to spatially distribute camera feeds. Connects to the user's geolocation for accurate real-world array alignment.
* **Interactive Threat Zones:** Users can click to define "Blast Zones" on the map, dynamically set their safe/danger radius, and specify countdown timers for secure area operations.
* **Dynamic Picture-in-Picture (PiP) UI:** Displays lightweight, live MJPEG feeds of every camera, overlaid with AI bounding boxes and confidence scores directly in the browser.
* **Simulated FLIR Thermal Vision:** Offers a toggleable "Thermal View" tab that artificially maps RGB camera feeds into simulated high-contrast thermal signatures for low-visibility operations.
* **Real-Time Data Streams via WebSockets:** Rapidly transmits telemetry, bounding box dimensions, and threat levels from the backend to the frontend UI seamlessly.
* **Audio-Visual Threat Alerts:** Pulses warning colors, triggers audible buzzers, and alerts operators instantly if individuals are detected inside active blast/danger zones.

## 🛠️ Tech Stack

### Backend
* **Python 3.x**
* **FastAPI:** High-performance async server for routing and endpoints.
* **OpenCV (`cv2`):** Frame reading, processing, and raw camera handling.
* **Ultralytics (YOLOv8):** Advanced computer vision model for object detection and tracking.
* **WebSockets / Asyncio:** For low-latency real-time JSON data streaming to the frontend.

### Frontend
* **HTML5 / JavaScript (Vanilla)**
* **TailwindCSS:** For rapid, sleek, and responsive dark-mode styling.
* **Leaflet.js:** Interactive maps, spatial rendering, and layer management.
* **Web Audio API:** For synthesizing localized alert buzzer tones in the browser.

## ⚙️ Installation & Setup

1. **Clone or download the repository.**

2. **Create a Python Virtual Environment (recommended)**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Linux/macOS
   # venv\Scripts\activate   # On Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
   *(Ensure you have `fastapi`, `uvicorn`, `ultralytics`, and `opencv-python` installed)*

4. **Ensure you have the YOLO weights**:
   Make sure you have `yolov8n.pt` downloaded in your root directory. The Ultralytics library will usually download this automatically on first run if missing.

5. **Start the Application Server**:
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 8000
   ```
   *Note: Remove `--reload` in a production setting to optimize performance by averting redundant thread lifecycles.*

6. **Access the Dashboard**:
   Open a web browser and navigate to: `http://localhost:8000`

## 🎛️ Configuration

### Adding and Configuring Cameras
You can configure the video sources in `app.py` under the `CAMERAS_CONFIG` array. 

By default, the server expects:
```python
CAMERAS_CONFIG = [
    {"id": "cam_1", "name": "Laptop Webcam", "source": 0},
    {"id": "cam_2", "name": "Phone IP Cam", "source": "http://192.0.0.4:8080/video"}
]
```
*   **`source: 0`** defaults to your computer's built-in webcam.
*   **`source: "http://..."`** can be linked to an IP Camera feed. For testing, an app like "IP Webcam" on a smartphone can be utilized.

## 🗺️ How to Use

1. **Allow Location (Optional):** When opening the web dashboard, allow location access if you want the system to pin cameras relative to your actual GPS location.
2. **Setup Blast Zone:** Click anywhere on the map to define the center of your operation zone.
3. **Configure the Zone:** Use the sliders at the bottom to adjust the radius (in meters) and the duration (in seconds) of the operation.
4. **Initiate Zone:** Click **Start Zone**. If any camera mapped within that radius detects a person via YOLO tracking, the system will trigger a visual and audible alarm.
5. **View Feeds:** Observe regular RGB feeds overlaid with bounding boxes at the bottom, or switch to the **Thermal View** tab on the left sidebar to scrutinize isolated simulated thermal layers.
