import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Settings, 
  ShieldAlert, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: 'live', label: 'LIVE MONITORING', icon: Activity },
    { id: 'dashboard', label: 'SAFETY DASHBOARD', icon: LayoutDashboard },
    { id: 'config', label: 'SYSTEM CONFIG', icon: Settings },
    { id: 'health', label: 'SYSTEM HEALTH', icon: ShieldAlert },
    { id: 'logs', label: 'LOGS', icon: FileText },
  ];

  return (
    <aside className="w-sidebar h-screen bg-background border-r border-border flex flex-col fixed left-0 top-0 z-50">
      {/* Brand Section */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-black tracking-tighter text-white">SENTINEL PPE</h1>
        <p className="text-[10px] font-mono text-accent-yellow tracking-[3px] mt-1 uppercase opacity-80">
          Sector 04 // AI-OS
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-6 py-3.5 transition-all duration-200 group relative",
              activePage === item.id 
                ? "bg-white/5 text-accent-green" 
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            )}
          >
            {activePage === item.id && (
              <div className="absolute left-0 top-0 w-[3px] h-full bg-accent-green neon-glow-green" />
            )}
            <item.icon className={cn(
              "w-4 h-4 transition-colors",
              activePage === item.id ? "text-accent-green" : "group-hover:text-white"
            )} />
            <span className="text-[11px] font-bold tracking-[1px] uppercase">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Bottom Action */}
      <div className="p-4 border-t border-border">
        <button className="w-full py-3 bg-accent-red hover:bg-accent-red/90 text-white font-black text-[11px] tracking-[2px] uppercase transition-all active:scale-[0.98] neon-glow-red flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          EMERGENCY OVERRIDE
        </button>
      </div>
    </aside>
  );
};
