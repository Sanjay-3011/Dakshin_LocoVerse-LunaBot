import React, { useState } from 'react';
import { FileText, Calendar, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const PatrolLogs = () => {
  const [selectedLog, setSelectedLog] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const patrolLogs = [
    {
      id: 'PL-2024-001',
      date: '2024-10-16',
      time: '08:30:00',
      duration: '2h 45m',
      route: 'Sector A1 → A3 → B2',
      status: 'completed',
      findings: 'Normal terrain, no anomalies detected',
      samples: 3,
      hazards: 0,
      distance: '2.4 km',
      weather: 'Clear, dust index: 12%'
    },
    {
      id: 'PL-2024-002',
      date: '2024-10-16',
      time: '12:15:00',
      duration: '3h 12m',
      route: 'Sector B2 → C1 → C3',
      status: 'completed',
      findings: 'Rock formation identified, samples collected',
      samples: 5,
      hazards: 2,
      distance: '3.1 km',
      weather: 'Moderate dust storm, index: 45%'
    },
    {
      id: 'PL-2024-003',
      date: '2024-10-16',
      time: '16:45:00',
      duration: '1h 30m',
      route: 'Sector C3 → D1',
      status: 'interrupted',
      findings: 'Mission aborted due to equipment malfunction',
      samples: 1,
      hazards: 3,
      distance: '0.8 km',
      weather: 'High winds, dust index: 67%'
    },
    {
      id: 'PL-2024-004',
      date: '2024-10-15',
      time: '09:00:00',
      duration: '4h 20m',
      route: 'Sector D1 → E2 → F1 → F3',
      status: 'completed',
      findings: 'Extensive mineral deposits discovered',
      samples: 8,
      hazards: 1,
      distance: '4.7 km',
      weather: 'Excellent visibility, dust index: 8%'
    },
    {
      id: 'PL-2024-005',
      date: '2024-10-15',
      time: '14:30:00',
      duration: '2h 15m',
      route: 'Sector F3 → G1 → G2',
      status: 'completed',
      findings: 'Routine patrol, baseline data collected',
      samples: 2,
      hazards: 0,
      distance: '1.9 km',
      weather: 'Clear, dust index: 15%'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-success bg-green-100';
      case 'interrupted': return 'text-warning bg-yellow-100';
      case 'failed': return 'text-danger bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'interrupted': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredLogs = patrolLogs.filter(log => 
    filterStatus === 'all' || log.status === filterStatus
  );

  return (
    <div className="h-full bg-card-bg rounded-lg border border-border-light shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <FileText className="w-6 h-6 text-isro-blue mr-2" />
          Patrol Mission Logs
        </h2>
        
        <div className="flex items-center space-x-4">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-isro-blue"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="interrupted">Interrupted</option>
            <option value="failed">Failed</option>
          </select>
          
          <div className="text-sm text-gray-500">
            Total Missions: {filteredLogs.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Logs List */}
        <div className="col-span-7 overflow-y-auto">
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div 
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-card-hover ${
                  selectedLog?.id === log.id 
                    ? 'border-isro-blue bg-blue-50' 
                    : 'border-border-light bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-text-primary">{log.id}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(log.status)}`}>
                    {getStatusIcon(log.status)}
                    <span>{log.status.charAt(0).toUpperCase() + log.status.slice(1)}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{log.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{log.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{log.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>{log.samples} samples</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mt-2 truncate">{log.findings}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <div className="col-span-5">
          {selectedLog ? (
            <div className="bg-gray-50 rounded-lg p-6 h-full">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Mission Details: {selectedLog.id}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date & Time</label>
                    <p className="text-text-primary">{selectedLog.date} at {selectedLog.time}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Duration</label>
                    <p className="text-text-primary">{selectedLog.duration}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Route</label>
                  <p className="text-text-primary font-mono">{selectedLog.route}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Weather Conditions</label>
                  <p className="text-text-primary">{selectedLog.weather}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-lg font-bold text-isro-blue">{selectedLog.samples}</div>
                    <div className="text-xs text-gray-600">Samples</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-lg font-bold text-isro-orange">{selectedLog.hazards}</div>
                    <div className="text-xs text-gray-600">Hazards</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded border">
                    <div className="text-lg font-bold text-success">{selectedLog.distance}</div>
                    <div className="text-xs text-gray-600">Distance</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Mission Findings</label>
                  <p className="text-text-primary mt-1 p-3 bg-white rounded border">
                    {selectedLog.findings}
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <button className="w-full px-4 py-2 bg-isro-blue text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Generate Full Report
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select a mission log to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatrolLogs;
