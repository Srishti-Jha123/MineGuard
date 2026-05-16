import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Header, StatusStrip } from './components/Layout';
import { LiveMonitoringPage } from './components/LiveMonitoringPage';
import { SafetyDashboardPage } from './components/SafetyDashboardPage';
import { SystemConfigPage } from './components/SystemConfigPage';
import { playBuzzer } from './lib/audio';

function App() {
  const [activePage, setActivePage] = useState('live');
  const [showAlert, setShowAlert] = useState(false);
  const [config, setConfig] = useState({
    helmet: true,
    vest: true,
    gloves: false,
    autoLock: true,
    sms: true,
    email: false,
    buzzer: true
  });

  useEffect(() => {
    // Mock alert trigger after 2 seconds
    const timer = setTimeout(() => {
      setShowAlert(true);
      if (config.buzzer) {
        playBuzzer(800);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [config.buzzer]);

  const renderPage = () => {
    switch (activePage) {
      case 'live':
        return <LiveMonitoringPage />;
      case 'dashboard':
        return <SafetyDashboardPage />;
      case 'config':
        return <SystemConfigPage config={config} setConfig={setConfig} />;
      case 'health':
        return (
          <div className="p-8 flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-black tracking-[4px] text-white uppercase">SYSTEM HEALTH</h2>
              <p className="text-muted-foreground font-mono uppercase tracking-widest">Module under maintenance // Access restricted</p>
            </div>
          </div>
        );
      case 'logs':
        return (
          <div className="p-8 flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-black tracking-[4px] text-white uppercase">SYSTEM LOGS</h2>
              <p className="text-muted-foreground font-mono uppercase tracking-widest">Historical data archive // Loading...</p>
            </div>
          </div>
        );
      default:
        return <LiveMonitoringPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden font-sans">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      
      <main className="flex-1 ml-sidebar flex flex-col h-screen overflow-hidden relative">
        <Header activePage={activePage} />
        
        <div className="flex-1 overflow-y-auto relative">
          {/* Industrial Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="h-full relative z-10"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        <StatusStrip />
      </main>

      {/* Global Alert Overlay (Mock) */}
      <div className="fixed top-20 right-8 z-[100] pointer-events-none">
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="bg-accent-red/10 border border-accent-red p-4 backdrop-blur-md neon-glow-red pointer-events-auto cursor-pointer"
              onClick={() => setShowAlert(false)}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-red animate-ping rounded-full" />
                <span className="text-[10px] font-black text-accent-red uppercase tracking-[2px]">Critical Alert</span>
              </div>
              <p className="text-[11px] font-bold text-white mt-1 uppercase">PPE Violation: Sector 04-A</p>
              <p className="text-[9px] text-muted-foreground mt-2 uppercase tracking-tighter">Click to dismiss</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
