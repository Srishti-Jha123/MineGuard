import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  MapPin,
  BarChart3,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

const data = [
  { name: '00:00', violations: 2, compliance: 98 },
  { name: '04:00', violations: 1, compliance: 99 },
  { name: '08:00', violations: 5, compliance: 94 },
  { name: '12:00', violations: 3, compliance: 97 },
  { name: '16:00', violations: 8, compliance: 91 },
  { name: '20:00', violations: 4, compliance: 96 },
  { name: '23:59', violations: 2, compliance: 98 },
];

const pieData = [
  { name: 'Compliant', value: 92 },
  { name: 'Minor Violation', value: 5 },
  { name: 'Critical Violation', value: 3 },
];

const COLORS = ['#00FF66', '#FFD600', '#FF3B3B'];

const logs = [
  { id: '1', time: '14:22:01', worker: 'W-98212', point: 'GATE_A', ppe: { helmet: false, vest: true, gloves: true }, status: 'Violation' },
  { id: '2', time: '14:21:45', worker: 'W-44209', point: 'GATE_A', ppe: { helmet: true, vest: true, gloves: true }, status: 'Compliant' },
  { id: '3', time: '14:20:30', worker: 'W-10255', point: 'GATE_B', ppe: { helmet: true, vest: true, gloves: true }, status: 'Compliant' },
  { id: '4', time: '14:19:12', worker: 'W-32188', point: 'GATE_A', ppe: { helmet: true, vest: true, gloves: true }, status: 'Compliant' },
  { id: '5', time: '14:18:05', worker: 'W-09211', point: 'GATE_C', ppe: { helmet: true, vest: false, gloves: true }, status: 'Violation' },
];

export const SafetyDashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Scans', value: '12,482', icon: TrendingUp, color: 'text-accent-green' },
    { label: 'Safe Entries %', value: '96.4%', icon: ShieldCheck, color: 'text-accent-green' },
    { label: 'Violations', value: '14', icon: ShieldAlert, color: 'text-accent-red' },
    { label: 'Active Workers', value: '342', icon: Users, color: 'text-accent-yellow' },
  ];

  return (
    <div className="p-4 space-y-4 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black tracking-[2px] uppercase text-white">SAFETY ANALYTICS</h2>
          <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest mt-0.5">Comprehensive safety performance overview // Sector 04</p>
        </div>
        <button className="bg-accent-yellow text-black px-4 py-1.5 font-black text-[11px] hover:bg-accent-yellow/90 transition-all uppercase tracking-[2px] flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          GENERATE_REPORT
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:border-muted-foreground/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-1.5 bg-white/5 border border-border", stat.color)}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Live_Data</span>
              </div>
              <div>
                <p className="text-2xl font-black tracking-tighter font-mono">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[1px] mt-0.5">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Main Activity Chart */}
        <Card className="col-span-12 lg:col-span-8">
          <CardHeader>
            <CardTitle>SAFETY ACTIVITY TREND</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViolations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3B3B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF3B3B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#8E9299" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  fontFamily="JetBrains Mono"
                />
                <YAxis 
                  stroke="#8E9299" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  fontFamily="JetBrains Mono"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', fontSize: '10px', fontFamily: 'JetBrains Mono' }}
                  itemStyle={{ color: '#FFFFFF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="violations" 
                  stroke="#FF3B3B" 
                  fillOpacity={1} 
                  fill="url(#colorViolations)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card className="col-span-12 lg:col-span-4">
          <CardHeader>
            <CardTitle>COMPLIANCE DISTRIBUTION</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-1.5 w-full">
              {pieData.map((item, idx) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5" style={{ backgroundColor: COLORS[idx] }} />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-black font-mono">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Log Activity Table */}
        <Card className="col-span-12">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>RECENT LOG ACTIVITY</CardTitle>
            <button className="text-[9px] text-accent-yellow hover:underline font-black uppercase tracking-[2px]">VIEW_FULL_LOGS</button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-white/[0.02]">
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">Timestamp</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">Worker ID</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">Entry Point</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">PPE Status</th>
                    <th className="px-4 py-3 text-[9px] font-black uppercase tracking-[2px] text-muted-foreground">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] font-mono">{log.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-[10px] font-black font-mono">{log.worker}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] font-mono">{log.point}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1.5">
                          <div className={cn("w-5 h-5 flex items-center justify-center border", log.ppe.helmet ? "bg-accent-green/10 border-accent-green text-accent-green" : "bg-accent-red/10 border-accent-red text-accent-red")}>
                            <ShieldCheck className="w-3 h-3" />
                          </div>
                          <div className={cn("w-5 h-5 flex items-center justify-center border", log.ppe.vest ? "bg-accent-green/10 border-accent-green text-accent-green" : "bg-accent-red/10 border-accent-red text-accent-red")}>
                            <ShieldCheck className="w-3 h-3" />
                          </div>
                          <div className={cn("w-5 h-5 flex items-center justify-center border", log.ppe.gloves ? "bg-accent-green/10 border-accent-green text-accent-green" : "bg-accent-red/10 border-accent-red text-accent-red")}>
                            <ShieldCheck className="w-3 h-3" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={cn(
                          "px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest border",
                          log.status === 'Compliant' ? "bg-accent-green/10 text-accent-green border-accent-green" : "bg-accent-red/10 text-accent-red border-accent-red neon-glow-red"
                        )}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Info Bar */}
      <div className="fixed bottom-footer left-sidebar right-0 h-10 bg-card border-t border-border flex items-center justify-between px-6 z-30">
        <div className="flex items-center gap-6 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-accent-green" />
            <span>Status: <span className="text-accent-green">Operational</span></span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3 h-3 text-accent-yellow" />
            <span>Detection Speed: <span className="text-accent-yellow">0.02s</span></span>
          </div>
          <div>Supervisor: <span className="text-white">A. Vance</span></div>
        </div>
        <button className="text-[9px] font-black text-accent-red hover:underline uppercase tracking-[2px]">
          EMERGENCY_ALERT_PROTOCOL
        </button>
      </div>
    </div>
  );
};
