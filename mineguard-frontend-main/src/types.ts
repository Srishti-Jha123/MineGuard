export type PPEStatus = 'Compliant' | 'Violation';

export interface Worker {
  id: string;
  name: string;
  image?: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  worker: Worker;
  status: PPEStatus;
  violations: string[];
  entryPoint: string;
}

export interface SystemMetric {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'safe' | 'warning' | 'danger';
}

export type PageType = 'live' | 'dashboard' | 'config' | 'health' | 'logs' | 'sector04';
