import React, { useState } from 'react';
import { 
  Save, 
  RotateCcw, 
  Shield, 
  Bell, 
  Users, 
  Activity,
  Check,
  X,
  Smartphone,
  Mail,
  Volume2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface SystemConfigPageProps {
  config: {
    helmet: boolean;
    vest: boolean;
    gloves: boolean;
    autoLock: boolean;
    sms: boolean;
    email: boolean;
    buzzer: boolean;
  };
  setConfig: React.Dispatch<React.SetStateAction<{
    helmet: boolean;
    vest: boolean;
    gloves: boolean;
    autoLock: boolean;
    sms: boolean;
    email: boolean;
    buzzer: boolean;
  }>>;
}

export const SystemConfigPage: React.FC<SystemConfigPageProps> = ({ config, setConfig }) => {
  const handleToggle = (key: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const staff = [
    { name: 'A. Vance', role: 'Supervisor', status: 'Active', email: 'vance.a@sentinel.ai' },
    { name: 'S. Chen', role: 'Admin', status: 'Active', email: 'chen.s@sentinel.ai' },
    { name: 'M. Thorne', role: 'Operator', status: 'Offline', email: 'thorne.m@sentinel.ai' },
  ];

  return (
    <div className="p-4 space-y-4 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black tracking-[2px] uppercase text-white">SYSTEM CONFIGURATION</h2>
          <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest mt-0.5">Manage detection parameters and security protocols</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 font-black text-[11px] border border-border transition-all uppercase tracking-[2px] flex items-center gap-2">
            <RotateCcw className="w-3.5 h-3.5" />
            RESET_DEFAULTS
          </button>
          <button className="bg-accent-green text-black px-3 py-1.5 font-black text-[11px] hover:bg-accent-green/90 transition-all uppercase tracking-[2px] flex items-center gap-2 neon-glow-green">
            <Save className="w-3.5 h-3.5" />
            APPLY_CHANGES
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Detection Parameters */}
        <Card className="col-span-12 lg:col-span-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-accent-yellow" />
              <CardTitle>DETECTION PARAMETERS</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: 'helmet', label: 'Helmet Detection', desc: 'Real-time head protection verification' },
              { id: 'vest', label: 'Safety Vest Detection', desc: 'High-visibility apparel monitoring' },
              { id: 'gloves', label: 'Gloves Detection', desc: 'Hand protection requirement check' },
              { id: 'autoLock', label: 'Auto-Lock Gate', desc: 'Automatically lock gate on PPE violation' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white/[0.02] border border-border">
                <div>
                  <h4 className="text-[11px] font-black text-white uppercase tracking-tight">{item.label}</h4>
                  <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-tighter">{item.desc}</p>
                </div>
                <button 
                  onClick={() => handleToggle(item.id as keyof typeof config)}
                  className={cn(
                    "w-10 h-5 transition-all duration-300 relative border border-border",
                    config[item.id as keyof typeof config] ? "bg-accent-green/20 border-accent-green" : "bg-white/5"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-2.5 h-2.5 bg-white transition-all duration-300",
                    config[item.id as keyof typeof config] ? "left-6 bg-accent-green neon-glow-green" : "left-1 bg-muted-foreground"
                  )} />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alert Protocols */}
        <Card className="col-span-12 lg:col-span-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-accent-red" />
              <CardTitle>ALERT PROTOCOLS</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={cn(
                "p-4 border transition-all cursor-pointer",
                config.sms ? "bg-accent-yellow/5 border-accent-yellow" : "bg-white/[0.02] border-border"
              )} onClick={() => handleToggle('sms')}>
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("p-1.5 border", config.sms ? "bg-accent-yellow/10 border-accent-yellow text-accent-yellow" : "bg-white/5 border-border text-muted-foreground")}>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  {config.sms ? <Check className="w-3.5 h-3.5 text-accent-yellow" /> : <X className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <h4 className={cn("font-black text-[11px] uppercase tracking-tight", config.sms ? "text-accent-yellow" : "text-white")}>SMS ALERTS</h4>
                <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-tighter mt-1">Instant SMS to supervisors on critical violations.</p>
              </div>

              <div className={cn(
                "p-4 border transition-all cursor-pointer",
                config.email ? "bg-accent-yellow/5 border-accent-yellow" : "bg-white/[0.02] border-border"
              )} onClick={() => handleToggle('email')}>
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("p-1.5 border", config.email ? "bg-accent-yellow/10 border-accent-yellow text-accent-yellow" : "bg-white/5 border-border text-muted-foreground")}>
                    <Mail className="w-4 h-4" />
                  </div>
                  {config.email ? <Check className="w-3.5 h-3.5 text-accent-yellow" /> : <X className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <h4 className={cn("font-black text-[11px] uppercase tracking-tight", config.email ? "text-accent-yellow" : "text-white")}>EMAIL ALERTS</h4>
                <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-tighter mt-1">Detailed violation reports sent via email.</p>
              </div>

              <div className={cn(
                "p-4 border transition-all cursor-pointer",
                config.buzzer ? "bg-accent-yellow/5 border-accent-yellow" : "bg-white/[0.02] border-border"
              )} onClick={() => handleToggle('buzzer')}>
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("p-1.5 border", config.buzzer ? "bg-accent-yellow/10 border-accent-yellow text-accent-yellow" : "bg-white/5 border-border text-muted-foreground")}>
                    <Volume2 className="w-4 h-4" />
                  </div>
                  {config.buzzer ? <Check className="w-3.5 h-3.5 text-accent-yellow" /> : <X className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <h4 className={cn("font-black text-[11px] uppercase tracking-tight", config.buzzer ? "text-accent-yellow" : "text-white")}>BUZZER ALERTS</h4>
                <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-tighter mt-1">Audible industrial buzzer on critical violations.</p>
              </div>
            </div>

            <div className="p-3 bg-white/[0.02] border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Alert Threshold</span>
                <span className="text-[10px] font-mono font-bold text-accent-yellow">3 VIOLATIONS / HOUR</span>
              </div>
              <input type="range" className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-accent-yellow" />
            </div>
          </CardContent>
        </Card>

        {/* Security Staff Panel */}
        <Card className="col-span-12 lg:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-accent-green" />
              <CardTitle>SECURITY STAFF PANEL</CardTitle>
            </div>
            <button className="text-[9px] bg-white/5 hover:bg-white/10 px-2 py-1 border border-border transition-all uppercase font-black tracking-widest">ADD_STAFF</button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-white/[0.02]">
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">Role</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {staff.map((person) => (
                    <tr key={person.name} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-2.5 text-[11px] font-black text-white uppercase tracking-tight">{person.name}</td>
                      <td className="px-4 py-2.5">
                        <span className="text-[9px] px-1.5 py-0.5 bg-white/5 border border-border uppercase font-mono">{person.role}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-1.5 h-1.5 rounded-full", person.status === 'Active' ? "bg-accent-green neon-glow-green" : "bg-muted-foreground")} />
                          <span className="text-[10px] font-mono uppercase">{person.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-[10px] text-muted-foreground font-mono">{person.email}</td>
                      <td className="px-4 py-2.5">
                        <button className="text-[9px] text-accent-yellow hover:underline font-black uppercase tracking-widest">EDIT</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* System Health Panel */}
        <Card className="col-span-12 lg:col-span-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-accent-green" />
              <CardTitle>SYSTEM HEALTH</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/[0.02] border border-border text-center">
                <p className="text-xl font-black text-accent-green font-mono tracking-tighter">99.9%</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">Uptime</p>
              </div>
              <div className="p-3 bg-white/[0.02] border border-border text-center">
                <p className="text-xl font-black text-accent-green font-mono tracking-tighter">24</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">Active Nodes</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono">
                  <span className="text-muted-foreground">CPU Usage</span>
                  <span className="text-accent-green">42%</span>
                </div>
                <div className="h-1 bg-white/5 overflow-hidden">
                  <div className="h-full bg-accent-green w-[42%]" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono">
                  <span className="text-muted-foreground">Memory Usage</span>
                  <span className="text-accent-yellow">68%</span>
                </div>
                <div className="h-1 bg-white/5 overflow-hidden">
                  <div className="h-full bg-accent-yellow w-[68%]" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] uppercase tracking-widest font-mono">
                  <span className="text-muted-foreground">Disk Space</span>
                  <span className="text-accent-green">18%</span>
                </div>
                <div className="h-1 bg-white/5 overflow-hidden">
                  <div className="h-full bg-accent-green w-[18%]" />
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2.5 border border-border transition-all text-[10px] font-black uppercase tracking-[2px]">
              <Activity className="w-3.5 h-3.5" />
              RUN_DIAGNOSTICS
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
