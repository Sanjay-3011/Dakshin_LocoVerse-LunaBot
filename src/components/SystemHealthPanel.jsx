import React, { useState, useEffect } from 'react';
import { 
  Battery, 
  Cpu, 
  Wifi, 
  Camera, 
  Radar,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

const SystemHealthPanel = ({ expanded = false }) => {
  const [systemData, setSystemData] = useState({
    batteryLevel: 94,
    cpuUsage: 45,
    signalStrength: 87,
    commStatus: 'online'
  });

  const [sensors, setSensors] = useState([
    { id: 'lidar', name: 'LiDAR', status: 'online', icon: Radar },
    { id: 'imu', name: 'IMU', status: 'online', icon: Activity },
    { id: 'camera', name: 'RGB-D Camera', status: 'online', icon: Camera },
    { id: 'arm', name: 'Robotic Arm', status: 'active', icon: Activity }
  ]);

  // Simulate real-time system updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData(prev => ({
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() - 0.5) * 2)),
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        signalStrength: Math.max(0, Math.min(100, prev.signalStrength + (Math.random() - 0.5) * 5)),
        commStatus: Math.random() > 0.9 ? 'warning' : 'online'
      }));

      // Randomly update sensor status
      if (Math.random() > 0.85) {
        setSensors(prev => prev.map(sensor => ({
          ...sensor,
          status: Math.random() > 0.8 ? 'warning' : 'online'
        })));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const CircularGauge = ({ value, label, color, size = 80 }) => {
    const circumference = 2 * Math.PI * (size / 2 - 8);
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 8}
              stroke="#E5E7EB"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 8}
              stroke={color}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-in-out gauge-fill"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-text-primary">{Math.round(value)}%</span>
          </div>
        </div>
        <span className="text-sm font-medium text-gray-600 mt-2">{label}</span>
      </div>
    );
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-danger" />;
      case 'active':
        return <Activity className="w-4 h-4 text-isro-blue animate-pulse" />;
      default:
        return <CheckCircle className="w-4 h-4 text-success" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'text-success';
      case 'warning': return 'text-warning';
      case 'offline': return 'text-danger';
      case 'active': return 'text-isro-blue';
      default: return 'text-success';
    }
  };

  const getBatteryColor = () => {
    if (systemData.batteryLevel > 60) return '#10B981';
    if (systemData.batteryLevel > 30) return '#F59E0B';
    return '#EF4444';
  };

  const getCpuColor = () => {
    if (systemData.cpuUsage < 50) return '#10B981';
    if (systemData.cpuUsage < 80) return '#F59E0B';
    return '#EF4444';
  };

  const getSignalColor = () => {
    if (systemData.signalStrength > 70) return '#10B981';
    if (systemData.signalStrength > 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className={`bg-card-bg rounded-lg border border-border-light shadow-card p-6 ${expanded ? 'h-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <Activity className="w-6 h-6 text-isro-blue mr-2" />
          System Health
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">All Systems Nominal</span>
        </div>
      </div>

      {/* System Gauges */}
      <div className={`grid ${expanded ? 'grid-cols-4 gap-6' : 'grid-cols-2 gap-4'} mb-6`}>
        <CircularGauge 
          value={systemData.batteryLevel} 
          label="Battery" 
          color={getBatteryColor()}
          size={expanded ? 100 : 80}
        />
        <CircularGauge 
          value={systemData.cpuUsage} 
          label="CPU Usage" 
          color={getCpuColor()}
          size={expanded ? 100 : 80}
        />
        <CircularGauge 
          value={systemData.signalStrength} 
          label="Signal" 
          color={getSignalColor()}
          size={expanded ? 100 : 80}
        />
        {expanded && (
          <CircularGauge 
            value={Math.random() * 100} 
            label="Memory" 
            color="#6366F1"
            size={100}
          />
        )}
      </div>

      {/* Sensor Status */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3">Sensor Status</h3>
        <div className={`grid ${expanded ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
          {sensors.map((sensor) => {
            const Icon = sensor.icon;
            return (
              <div key={sensor.id} className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-isro-blue" />
                  <span className="font-medium text-text-primary">{sensor.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(sensor.status)}
                  <span className={`text-sm font-medium ${getStatusColor(sensor.status)}`}>
                    {sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {expanded && (
        <div className="mt-6 grid grid-cols-2 gap-6">
          {/* System Performance */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-text-primary mb-3">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-mono">247d 14h 32m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Memory Usage</span>
                <span className="text-sm font-mono">2.4GB / 8GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-sm font-mono">45GB / 128GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Network</span>
                <span className="text-sm font-mono">2.4 Mbps</span>
              </div>
            </div>
          </div>

          {/* System Health History */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-text-primary mb-3">Health History</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-gray-600">System boot successful</span>
                <span className="text-gray-400 ml-auto">10:42:01</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-gray-600">High CPU temperature</span>
                <span className="text-gray-400 ml-auto">09:15:23</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-gray-600">All sensors calibrated</span>
                <span className="text-gray-400 ml-auto">08:30:45</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemHealthPanel;
