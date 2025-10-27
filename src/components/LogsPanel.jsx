import React, { useState, useEffect } from 'react';
import { Terminal, Activity, TrendingUp } from 'lucide-react';

const LogsPanel = () => {
  const [logs, setLogs] = useState([
    { id: 1, time: '10:42:01', message: 'Routine patrol complete.', type: 'info' },
    { id: 2, time: '10:45:12', message: 'Hazard detected at Sector B3.', type: 'warning' },
    { id: 3, time: '10:46:20', message: 'Environmental pressure drop alert.', type: 'warning' },
    { id: 4, time: '10:48:35', message: 'Navigation system recalibrated.', type: 'success' },
    { id: 5, time: '10:51:44', message: 'Sample collection initiated.', type: 'info' }
  ]);

  const [telemetryData, setTelemetryData] = useState({
    temperature: Array(30).fill(0).map(() => -45 + Math.random() * 10),
    o2: Array(30).fill(0).map(() => Math.random() * 0.1)
  });

  // Add new logs periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const logMessages = [
        'System health check completed.',
        'Battery level stable.',
        'Dust storm detected approaching.',
        'Communication link established.',
        'Autonomous navigation engaged.',
        'Sample analysis in progress.',
        'Solar panel efficiency optimal.',
        'Temperature sensors calibrated.'
      ];

      const types = ['info', 'success', 'warning'];
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        message: logMessages[Math.floor(Math.random() * logMessages.length)],
        type: types[Math.floor(Math.random() * types.length)]
      };

      setLogs(prev => [newLog, ...prev.slice(0, 9)]);

      // Update telemetry
      setTelemetryData(prev => ({
        temperature: [(-45 + Math.random() * 10), ...prev.temperature.slice(0, 29)],
        o2: [(Math.random() * 0.1), ...prev.o2.slice(0, 29)]
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getLogColor = (type) => {
    switch(type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-danger';
      default: return 'text-gray-300';
    }
  };

  const getLogPrefix = (type) => {
    switch(type) {
      case 'success': return '[INFO]';
      case 'warning': return '[WARN]';
      case 'error': return '[ERROR]';
      default: return '[SYS]';
    }
  };

  const TelemetryChart = ({ data, label, color, unit }) => (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-300">{label}</h4>
        <span className="text-xs text-gray-400">
          {data[0]?.toFixed(2)} {unit}
        </span>
      </div>
      <svg className="w-full h-16" viewBox="0 0 150 64">
        <path
          d={`M ${data.map((value, index) => 
            `${index * 5},${64 - ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * 64}`
          ).join(' L ')}`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          className="opacity-80"
        />
      </svg>
    </div>
  );

  return (
    <div className="h-full flex">
      {/* Logs Console */}
      <div className="flex-1 bg-gray-900 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Terminal className="w-5 h-5 text-isro-blue mr-2" />
            <h3 className="text-lg font-semibold text-white">Live System Logs</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-success animate-pulse" />
            <span className="text-sm text-gray-400">Streaming</span>
          </div>
        </div>
        
        <div className="font-mono text-sm space-y-1 flex-1 overflow-y-auto min-h-0">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 py-1">
              <span className="text-gray-500">[{log.time}]</span>
              <span className={`${getLogColor(log.type)} font-medium`}>
                {getLogPrefix(log.type)}
              </span>
              <span className="text-gray-300 flex-1">{log.message}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-3 flex items-center space-x-2 flex-shrink-0">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">
            Last update: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Telemetry Charts */}
      <div className="w-80 bg-gray-800 p-4 border-l border-gray-700 flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-isro-orange mr-2" />
            <h3 className="text-lg font-semibold text-white">Real-time Telemetry</h3>
          </div>
        </div>
        
        <div className="space-y-6 flex-1 overflow-y-auto min-h-0">
          <TelemetryChart 
            data={telemetryData.temperature}
            label="Temperature"
            color="#F36C21"
            unit="°C"
          />
          
          <TelemetryChart 
            data={telemetryData.o2}
            label="O₂ Levels"
            color="#10B981"
            unit="ppm"
          />
          
          {/* System Status Indicators */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-lg font-mono font-bold text-success">
                {Math.floor(Math.random() * 100 + 900)}
              </div>
              <div className="text-xs text-gray-400">Packets/min</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-mono font-bold text-isro-blue">
                {(Math.random() * 5 + 2).toFixed(1)}
              </div>
              <div className="text-xs text-gray-400">Latency (ms)</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center flex-shrink-0">
          Data refresh: 2s intervals
        </div>
      </div>
    </div>
  );
};

export default LogsPanel;
