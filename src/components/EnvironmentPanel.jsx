import React, { useState, useEffect } from 'react';
import { Thermometer, Wind, Droplets, Eye, TrendingUp, TrendingDown } from 'lucide-react';

const EnvironmentPanel = ({ expanded = false }) => {
  const [envData, setEnvData] = useState({
    temperature: -45.2,
    pressure: 0.12,
    dustIndex: 23.5,
    o2Level: 0.0
  });

  const [trends, setTrends] = useState({
    temperature: 'up',
    pressure: 'down',
    dustIndex: 'up',
    o2Level: 'stable'
  });

  const [history, setHistory] = useState({
    temperature: Array(20).fill(0).map((_, i) => -45 + Math.random() * 10),
    pressure: Array(20).fill(0).map((_, i) => 0.1 + Math.random() * 0.05)
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnvData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        pressure: Math.max(0.08, prev.pressure + (Math.random() - 0.5) * 0.02),
        dustIndex: Math.max(0, Math.min(100, prev.dustIndex + (Math.random() - 0.5) * 5)),
        o2Level: Math.max(0, Math.min(21, prev.o2Level + (Math.random() - 0.5) * 0.1))
      }));

      // Update trends randomly
      if (Math.random() > 0.8) {
        const trendOptions = ['up', 'down', 'stable'];
        setTrends(prev => ({
          ...prev,
          temperature: trendOptions[Math.floor(Math.random() * 3)],
          pressure: trendOptions[Math.floor(Math.random() * 3)]
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value, min, max) => {
    if (value < min || value > max) return 'text-danger';
    if (value < min * 1.2 || value > max * 0.8) return 'text-warning';
    return 'text-success';
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-danger" />;
      default: return <div className="w-4 h-4 flex items-center justify-center text-gray-400">−</div>;
    }
  };

  const MiniChart = ({ data, color = 'isro-blue' }) => (
    <svg className="w-16 h-8" viewBox="0 0 64 32">
      <path
        d={`M ${data.map((value, index) => 
          `${(index / (data.length - 1)) * 64},${32 - (value - Math.min(...data)) / (Math.max(...data) - Math.min(...data)) * 32}`
        ).join(' L ')}`}
        fill="none"
        stroke={`var(--${color})`}
        strokeWidth="1.5"
        className="opacity-70"
      />
    </svg>
  );

  const parameterCards = [
    {
      id: 'temperature',
      label: 'Temperature',
      value: envData.temperature.toFixed(1),
      unit: '°C',
      icon: Thermometer,
      color: 'text-isro-blue',
      bgColor: 'bg-blue-50',
      min: -60,
      max: -20,
      trend: trends.temperature
    },
    {
      id: 'pressure',
      label: 'Pressure',
      value: envData.pressure.toFixed(3),
      unit: 'kPa',
      icon: Wind,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      min: 0.1,
      max: 0.2,
      trend: trends.pressure
    },
    {
      id: 'dustIndex',
      label: 'Dust Index',
      value: envData.dustIndex.toFixed(1),
      unit: '%',
      icon: Eye,
      color: 'text-isro-orange',
      bgColor: 'bg-orange-50',
      min: 0,
      max: 50,
      trend: trends.dustIndex
    },
    {
      id: 'o2Level',
      label: 'O₂ Level',
      value: envData.o2Level.toFixed(2),
      unit: 'ppm',
      icon: Droplets,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      min: 0,
      max: 0.1,
      trend: trends.o2Level
    }
  ];

  return (
    <div className={`bg-card-bg rounded-lg border border-border-light shadow-card p-6 ${expanded ? 'h-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <Thermometer className="w-6 h-6 text-isro-blue mr-2" />
          Environmental Parameters
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live Data</span>
        </div>
      </div>

      <div className={`grid ${expanded ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
        {parameterCards.map((param) => {
          const Icon = param.icon;
          const statusColor = getStatusColor(parseFloat(param.value), param.min, param.max);
          
          return (
            <div key={param.id} className={`${param.bgColor} p-4 rounded-lg border border-gray-200`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 ${param.color}`} />
                  <span className="font-medium text-text-primary">{param.label}</span>
                </div>
                {getTrendIcon(param.trend)}
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <span className={`text-2xl font-mono font-bold ${statusColor}`}>
                    {param.value}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">{param.unit}</span>
                </div>
                {expanded && (
                  <MiniChart 
                    data={param.id === 'temperature' ? history.temperature : history.pressure} 
                    color={param.color.replace('text-', '')}
                  />
                )}
              </div>
              
              {!expanded && (
                <div className="mt-2">
                  <MiniChart 
                    data={param.id === 'temperature' ? history.temperature : history.pressure} 
                    color={param.color.replace('text-', '')}
                  />
                </div>
              )}
              
              <div className="mt-2 text-xs text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>

      {expanded && (
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-text-primary mb-3">Temperature Trend (24h)</h3>
            <svg className="w-full h-32" viewBox="0 0 240 128">
              <path
                d={`M ${history.temperature.map((value, index) => 
                  `${(index / (history.temperature.length - 1)) * 240},${128 - ((value + 60) / 40) * 128}`
                ).join(' L ')}`}
                fill="none"
                stroke="#004C97"
                strokeWidth="2"
                className="opacity-80"
              />
              {history.temperature.map((value, index) => (
                <circle
                  key={index}
                  cx={(index / (history.temperature.length - 1)) * 240}
                  cy={128 - ((value + 60) / 40) * 128}
                  r="2"
                  fill="#004C97"
                />
              ))}
            </svg>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-text-primary mb-3">Pressure Trend (24h)</h3>
            <svg className="w-full h-32" viewBox="0 0 240 128">
              <path
                d={`M ${history.pressure.map((value, index) => 
                  `${(index / (history.pressure.length - 1)) * 240},${128 - (value / 0.2) * 128}`
                ).join(' L ')}`}
                fill="none"
                stroke="#7C3AED"
                strokeWidth="2"
                className="opacity-80"
              />
              {history.pressure.map((value, index) => (
                <circle
                  key={index}
                  cx={(index / (history.pressure.length - 1)) * 240}
                  cy={128 - (value / 0.2) * 128}
                  r="2"
                  fill="#7C3AED"
                />
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentPanel;
