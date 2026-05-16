import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  User, 
  Clock, 
  Database, 
  Cpu, 
  Wifi 
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Header: React.FC<{ activePage: string }> = ({ activePage }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pageTitles: Record<string, string> = {
    live: 'LIVE MONITORING',
    dashboard: 'SAFETY DASHBOARD',
    config: 'SYSTEM CONFIG',
    health: 'SYSTEM HEALTH',
    logs: 'SYSTEM LOGS'
  };

  return (
    <header className="h-header border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-black tracking-[2px] uppercase text-white">
          {pageTitles[activePage] || 'SYSTEM'}
        </h2>
        <div className="h-4 w-[1px] bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse neon-glow-green" />
          <span className="text-[10px] font-mono font-bold text-accent-green uppercase tracking-widest">
            System Online
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 text-muted-foreground font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5" />
          <span>{time.toLocaleDateString()}</span>
          <span className="text-white font-bold">{time.toLocaleTimeString()}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-white/5 rounded transition-colors group">
            <Bell className="w-4 h-4 text-muted-foreground group-hover:text-white" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent-red rounded-full border border-background" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right">
              <p className="text-[10px] font-bold text-white leading-none">A. VANCE</p>
              <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">Supervisor</p>
            </div>
            <div className="w-8 h-8 rounded bg-white/10 border border-border flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const StatusStrip: React.FC = () => {
  return (
    <footer className="h-footer border-t border-border bg-background flex items-center justify-between px-8 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Database className="w-3 h-3" />
          <span>DB_LINK: <span className="text-accent-green">ACTIVE</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className="w-3 h-3" />
          <span>AI_CORE: <span className="text-accent-green">98.4% LOAD</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-3 h-3" />
          <span>LATENCY: <span className="text-accent-green">12ms</span></span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span>SENTINEL_V4.2.0-STABLE</span>
        <div className="h-3 w-[1px] bg-border" />
        <span>© 2026 INDUSTRIAL AI SYSTEMS</span>
      </div>
    </footer>
  );
};
