import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, X, Clock, MapPin, Thermometer } from 'lucide-react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 'ALT-001',
      timestamp: new Date(Date.now() - 3600000),
      severity: 'high',
      category: 'Environmental',
      title: 'Temperature Spike Detected',
      description: 'Rover temperature exceeded safe operating limits in Sector C2',
      location: 'Sector C2',
      status: 'active',
      acknowledged: false
    },
    {
      id: 'ALT-002',
      timestamp: new Date(Date.now() - 7200000),
      severity: 'medium',
      category: 'Navigation',
      title: 'Obstacle Detection',
      description: 'Large boulder blocking planned route to waypoint Delta-7',
      location: 'Grid 45.2, 67.8',
      status: 'resolved',
      acknowledged: true
    },
    {
      id: 'ALT-003',
      timestamp: new Date(Date.now() - 14400000),
      severity: 'low',
      category: 'System',
      title: 'Battery Optimization',
      description: 'Power consumption 15% above normal during sample analysis',
      location: 'Sector A1',
      status: 'monitoring',
      acknowledged: true
    },
    {
      id: 'ALT-004',
      timestamp: new Date(Date.now() - 21600000),
      severity: 'high',
      category: 'Communication',
      title: 'Signal Interference',
      description: 'Communication link unstable due to solar storm activity',
      location: 'All Sectors',
      status: 'resolved',
      acknowledged: true
    },
    {
      id: 'ALT-005',
      timestamp: new Date(Date.now() - 28800000),
      severity: 'medium',
      category: 'Environmental',
      title: 'Dust Storm Warning',
      description: 'Approaching dust storm may affect visibility and sensors',
      location: 'Sector D3-F1',
      status: 'monitoring',
      acknowledged: false
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [showAcknowledged, setShowAcknowledged] = useState(true);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-red-500';
      case 'monitoring': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Environmental': return <Thermometer className="w-4 h-4" />;
      case 'Navigation': return <MapPin className="w-4 h-4" />;
      case 'System': return <AlertTriangle className="w-4 h-4" />;
      case 'Communication': return <Bell className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: true }
        : alert
    ));
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== 'all' && alert.severity !== filter) return false;
    if (!showAcknowledged && alert.acknowledged) return false;
    return true;
  });

  const activeAlertsCount = alerts.filter(alert => 
    alert.status === 'active' && !alert.acknowledged
  ).length;

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new alert
        const newAlert = {
          id: `ALT-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          timestamp: new Date(),
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          category: ['Environmental', 'Navigation', 'System', 'Communication'][Math.floor(Math.random() * 4)],
          title: 'System Alert Generated',
          description: 'Automated system monitoring detected an anomaly requiring attention',
          location: `Sector ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 3) + 1}`,
          status: 'active',
          acknowledged: false
        };
        
        setAlerts(prev => [newAlert, ...prev]);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-card-bg rounded-lg border border-border-light shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <AlertTriangle className="w-6 h-6 text-isro-orange mr-2" />
          Alerts & Events
          {activeAlertsCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {activeAlertsCount}
            </span>
          )}
        </h2>
        
        <div className="flex items-center space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-isro-blue"
          >
            <option value="all">All Severities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <label className="flex items-center space-x-2 text-sm">
            <input 
              type="checkbox"
              checked={showAcknowledged}
              onChange={(e) => setShowAcknowledged(e.target.checked)}
              className="rounded border-border-light focus:ring-isro-blue"
            />
            <span>Show Acknowledged</span>
          </label>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Critical</p>
              <p className="text-2xl font-bold text-red-700">
                {alerts.filter(a => a.severity === 'high' && a.status === 'active').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Warning</p>
              <p className="text-2xl font-bold text-yellow-700">
                {alerts.filter(a => a.severity === 'medium' && a.status !== 'resolved').length}
              </p>
            </div>
            <Bell className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Info</p>
              <p className="text-2xl font-bold text-blue-700">
                {alerts.filter(a => a.severity === 'low').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Resolved</p>
              <p className="text-2xl font-bold text-green-700">
                {alerts.filter(a => a.status === 'resolved').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="overflow-y-auto h-96">
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                alert.acknowledged ? 'opacity-75' : ''
              } ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(alert.category)}
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(alert.status)}`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{alert.title}</h3>
                      <span className="text-xs px-2 py-1 bg-white rounded border">
                        {alert.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {alert.id}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-2">{alert.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{alert.timestamp.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{alert.location}</span>
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(alert.status)} text-white`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-3 py-1 text-xs bg-isro-blue text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No alerts match the current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;
