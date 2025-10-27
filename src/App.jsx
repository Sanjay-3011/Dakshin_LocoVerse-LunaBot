import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NavigationPanel from './components/NavigationPanel';
import EnvironmentPanel from './components/EnvironmentPanel';
import SystemHealthPanel from './components/SystemHealthPanel';
import LogsPanel from './components/LogsPanel';
import PatrolLogs from './components/PatrolLogs';
import AlertsPanel from './components/AlertsPanel';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [missionTime, setMissionTime] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('online');
  
  // Mission time counter
  useEffect(() => {
    const interval = setInterval(() => {
      setMissionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ['online', 'warning', 'offline'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      if (Math.random() > 0.8) { // 20% chance to change status
        setConnectionStatus(randomStatus);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const renderMainContent = () => {
    switch(activeTab) {
      case 'navigation':
        return (
          <div className="grid grid-cols-12 gap-6 h-full">
            <div className="col-span-8">
              <NavigationPanel />
            </div>
            <div className="col-span-4 space-y-6">
              <EnvironmentPanel />
              <SystemHealthPanel />
            </div>
          </div>
        );
      case 'environment':
        return (
          <div className="grid grid-cols-12 gap-6 h-full">
            <div className="col-span-8">
              <EnvironmentPanel expanded />
            </div>
            <div className="col-span-4">
              <SystemHealthPanel />
            </div>
          </div>
        );
      case 'system':
        return (
          <div className="grid grid-cols-12 gap-6 h-full">
            <div className="col-span-8">
              <SystemHealthPanel expanded />
            </div>
            <div className="col-span-4">
              <EnvironmentPanel />
            </div>
          </div>
        );
      case 'patrol':
        return <PatrolLogs />;
      case 'alerts':
        return <AlertsPanel />;
      default:
        return (
          <div className="grid grid-cols-12 gap-6 h-full">
            <div className="col-span-4">
              <NavigationPanel />
            </div>
            <div className="col-span-4">
              <EnvironmentPanel />
            </div>
            <div className="col-span-4">
              <SystemHealthPanel />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary font-sans flex flex-col">
      <Header 
        missionTime={formatTime(missionTime)} 
        connectionStatus={connectionStatus}
      />
      
      <div className="flex flex-1 min-h-0">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6 overflow-hidden">
          {renderMainContent()}
        </main>
      </div>
      
      <div className="h-64 border-t border-border-light bg-card-bg flex-shrink-0">
        <LogsPanel />
      </div>
    </div>
  );
}

export default App;
