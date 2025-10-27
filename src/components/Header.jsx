import React from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';

const Header = ({ missionTime, connectionStatus }) => {
  const getStatusIcon = () => {
    switch(connectionStatus) {
      case 'online':
        return <Wifi className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-danger" />;
      default:
        return <Wifi className="w-5 h-5 text-success" />;
    }
  };

  const getStatusColor = () => {
    switch(connectionStatus) {
      case 'online':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'offline':
        return 'bg-danger';
      default:
        return 'bg-success';
    }
  };

  return (
    <header className="bg-card-bg border-b-2 border-isro-blue shadow-card h-20 flex items-center justify-between px-8">
      <div className="flex items-center space-x-6">
        {/* ISRO Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="/isrologo.png" 
              alt="ISRO Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              LunaBot Mission Control Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              ISRO Autonomous Systems Division • Dakshin Locoverse
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-8">
        {/* Mission Time */}
        <div className="text-right">
          <p className="text-sm text-gray-500">Mission Time</p>
          <p className="text-xl font-mono font-semibold text-text-primary">
            {missionTime}
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-sm font-medium text-text-primary">
              Comm Link
            </span>
          </div>
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} status-indicator ${connectionStatus}`}></div>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-danger rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-text-primary">LIVE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
