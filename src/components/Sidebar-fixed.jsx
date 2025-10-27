import React from 'react';
import { 
  Home, 
  Navigation, 
  Thermometer, 
  Settings, 
  FileText, 
  AlertTriangle 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'navigation', label: 'Navigation & Mapping', icon: Navigation },
    { id: 'environment', label: 'Environmental Parameters', icon: Thermometer },
    { id: 'system', label: 'System Health', icon: Settings },
    { id: 'patrol', label: 'Patrol Logs', icon: FileText },
    { id: 'alerts', label: 'Alerts & Events', icon: AlertTriangle },
  ];

  return (
    <aside className="w-72 bg-card-bg border-r border-border-light shadow-card flex flex-col">
      <div className="p-6 flex-1">
        <h2 className="text-lg font-semibold text-text-primary mb-6">
          Mission Control
        </h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-isro-blue text-white shadow-glow-blue' 
                    : 'text-text-primary hover:bg-gray-100 hover:shadow-card-hover'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-isro-blue'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Rover Status Card */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-border-light">
          <h3 className="font-semibold text-text-primary mb-3">Rover Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Location</span>
              <span className="text-sm font-mono">Sector A2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Mode</span>
              <span className="text-sm font-medium text-success">Active Patrol</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sol</span>
              <span className="text-sm font-mono">247</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-4 flex-shrink-0 border-t border-border-light">
        <p className="text-xs text-gray-400 text-center">
          Powered by ROS2 + Gazebo
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
