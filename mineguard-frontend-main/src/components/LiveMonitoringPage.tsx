import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Thermometer, 
  Flame,
  Lock, 
  Unlock,
  AlertTriangle,
  Maximize2,
  Scan,
  UserCheck,
  UserX
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export const LiveMonitoringPage: React.FC = () => {
  const [gateOpen, setGateOpen] = useState(false);
  const [timestamp, setTimestamp] = useState(new Date().toISOString());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const alerts = [
    { id: '1', name: 'David Vance', idCode: '982-12', status: 'Violation', ppe: 'Missing: Hard Hat', time: '14:22:01', image: 'https://picsum.photos/seed/p4/100/100' },
    { id: '2', name: 'Sarah Chen', idCode: '442-09', status: 'Compliant', ppe: 'All Gear Detected', time: '14:21:45', image: 'https://picsum.photos/seed/p12/100/100' },
    { id: '3', name: 'Marcus Thorne', idCode: '102-55', status: 'Compliant', ppe: 'All Gear Detected', time: '14:20:30', image: 'https://picsum.photos/seed/p9/100/100' },
    { id: '4', name: 'Elena Rossi', idCode: '321-88', status: 'Compliant', ppe: 'All Gear Detected', time: '14:19:12', image: 'https://picsum.photos/seed/p8/100/100' },
  ];

  return (
    <div className="p-4 grid grid-cols-12 grid-rows-[1fr_180px] gap-4 h-[calc(100vh-var(--spacing-header)-var(--spacing-footer))] overflow-hidden">
      {/* Main Video Feed */}
      <div className="col-span-12 lg:col-span-8 bg-black border border-border relative overflow-hidden group">
        {/* Feed UI Overlay */}
        <div className="absolute top-5 left-5 z-30 font-mono text-accent-green text-[11px] leading-relaxed drop-shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-accent-red animate-ping" />
            <span className="font-bold tracking-widest">REC // CAM_04_GATE_A</span>
          </div>
          {timestamp.replace('T', ' ').split('.')[0]}<br />
          FPS: 30.2 // AI THREAD: ACTIVE // LATENCY: 12ms
        </div>

        {/* Fake Video Feed */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/mine/1280/720')] bg-cover bg-center opacity-40 grayscale contrast-125" />
        
        {/* Scan Lines Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%]" />

        {/* AI Bounding Boxes */}
        <div className="absolute inset-0 z-20">
          {/* Person 1 - Compliant */}
          <div className="absolute top-[25%] left-[35%] w-[120px] h-[180px] border-2 border-accent-green p-1">
            <div className="absolute -top-5 -left-[2px] bg-accent-green text-black text-[9px] font-black px-1.5 py-0.5 whitespace-nowrap uppercase tracking-tighter">
              PERSON_004: COMPLIANT
            </div>
            <div className="absolute top-2 right-2">
              <ShieldCheck className="w-4 h-4 text-accent-green drop-shadow-glow" />
            </div>
          </div>

          {/* Person 2 - Violation */}
          <div className="absolute top-[35%] left-[65%] w-[110px] h-[170px] border-2 border-accent-red p-1 neon-glow-red animate-pulse">
            <div className="absolute -top-5 -left-[2px] bg-accent-red text-white text-[9px] font-black px-1.5 py-0.5 whitespace-nowrap uppercase tracking-tighter">
              PERSON_021: NO HELMET
            </div>
            <div className="absolute top-2 right-2">
              <ShieldAlert className="w-4 h-4 text-accent-red drop-shadow-glow" />
            </div>
          </div>
        </div>

        {/* Violation Alert Box */}
        <div className="absolute bottom-5 left-5 z-30 bg-black/80 backdrop-blur-md border border-accent-red p-3 neon-glow-red max-w-[240px]">
          <div className="text-[10px] text-accent-red font-black uppercase tracking-[2px] flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4" />
            PPE VIOLATION DETECTED
          </div>
          <div className="text-[12px] font-bold text-white mb-2">Gate Locked: Sector 4 Entrance</div>
          <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full bg-accent-red"
            />
          </div>
        </div>

        {/* Feed Controls */}
        <div className="absolute top-5 right-5 z-30 flex gap-2">
          <button className="p-2 bg-black/60 border border-white/20 hover:bg-white/10 transition-colors">
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 bg-black/60 border border-white/20 hover:bg-white/10 transition-colors">
            <Scan className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Right Panel - Live Alerts */}
      <Card className="col-span-12 lg:col-span-4 flex flex-col overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between py-2.5">
          <CardTitle>LIVE ALERTS</CardTitle>
          <div className="flex items-center gap-1.5 text-accent-green text-[10px] font-bold">
            <div className="w-2 h-2 rounded-full bg-accent-green neon-glow-green" />
            AUTO_MODE
          </div>
        </CardHeader>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={cn(
                "p-2 border-l-[3px] flex items-center justify-between transition-all hover:bg-white/[0.05] cursor-pointer",
                alert.status === 'Violation' 
                  ? "bg-accent-red/5 border-accent-red" 
                  : "bg-white/[0.02] border-accent-green"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={alert.image} 
                    alt={alert.name} 
                    className="w-10 h-10 object-cover grayscale border border-border"
                    referrerPolicy="no-referrer"
                  />
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center",
                    alert.status === 'Violation' ? "bg-accent-red" : "bg-accent-green"
                  )}>
                    {alert.status === 'Violation' ? <UserX className="w-2 h-2 text-white" /> : <UserCheck className="w-2 h-2 text-white" />}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-[11px] text-white uppercase tracking-tight">{alert.name}</span>
                  <span className="text-[9px] text-muted-foreground font-mono">ID: {alert.idCode} // {alert.time}</span>
                  <span className={cn(
                    "text-[9px] mt-0.5 font-bold uppercase tracking-tighter",
                    alert.status === 'Violation' ? "text-accent-red" : "text-accent-green"
                  )}>
                    {alert.status === 'Violation' ? `! ${alert.ppe}` : `✓ ${alert.ppe}`}
                  </span>
                </div>
              </div>
              <button className="text-[9px] font-black border border-border text-muted-foreground px-2 py-1 hover:text-white hover:border-white transition-all uppercase tracking-widest">
                INSPECT
              </button>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-border bg-white/[0.02]">
          <button 
            onClick={() => setGateOpen(!gateOpen)}
            className={cn(
              "w-full py-2.5 font-black rounded text-[11px] tracking-[2px] uppercase transition-all active:scale-[0.98] border shadow-lg",
              gateOpen 
                ? "bg-accent-green/10 border-accent-green text-accent-green hover:bg-accent-green/20" 
                : "bg-accent-yellow text-black border-accent-yellow hover:bg-accent-yellow/90"
            )}
          >
            {gateOpen ? 'GATE_SECURED' : 'FORCE_GATE_OPEN'}
          </button>
        </div>
      </Card>

      {/* Bottom Stats Grid */}
      <div className="col-span-12 grid grid-cols-3 gap-4">
        {[
          { label: 'Gate Status', value: gateOpen ? 'OPEN' : 'LOCKED', color: gateOpen ? 'text-accent-green' : 'text-accent-red', icon: gateOpen ? Unlock : Lock },
          { label: 'Methane Gas', value: '0.02% LEL', color: 'text-accent-yellow', icon: Flame },
          { label: 'Temperature', value: '32.4°C', color: 'text-accent-red', icon: Thermometer },
        ].map((stat) => (
          <Card key={stat.label} className="flex flex-col justify-center p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-black uppercase text-muted-foreground tracking-[2px]">{stat.label}</span>
              <stat.icon className={cn("w-3.5 h-3.5", stat.color)} />
            </div>
            <div className="flex items-baseline justify-between">
              <span className={cn("text-xl font-black font-mono tracking-tighter", stat.color)}>{stat.value}</span>
              <div className="text-[9px] font-mono text-muted-foreground">NORMAL_RANGE</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
