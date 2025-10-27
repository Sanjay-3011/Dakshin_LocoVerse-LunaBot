import React, { useState, useEffect } from 'react';
import { MapPin, Navigation as NavIcon, Target, AlertTriangle } from 'lucide-react';

const NavigationPanel = () => {
  const [roverPosition, setRoverPosition] = useState({ x: 45, y: 30 });
  const [targetPosition] = useState({ x: 75, y: 65 });
  const [obstacles] = useState([
    { x: 60, y: 40, type: 'crater' },
    { x: 50, y: 55, type: 'rock' },
    { x: 70, y: 25, type: 'slope' }
  ]);

  // Simulate rover movement
  useEffect(() => {
    const interval = setInterval(() => {
      setRoverPosition(prev => {
        const dx = targetPosition.x - prev.x;
        const dy = targetPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 2) {
          return {
            x: prev.x + (dx / distance) * 0.5,
            y: prev.y + (dy / distance) * 0.5
          };
        }
        return prev;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [targetPosition]);

  return (
    <div className="h-full bg-card-bg rounded-lg border border-border-light shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <NavIcon className="w-6 h-6 text-isro-blue mr-2" />
          Navigation & Mapping
        </h2>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center text-gray-600">
            <div className="w-3 h-3 bg-isro-blue rounded-full mr-2"></div>
            Current Path
          </span>
          <span className="flex items-center text-gray-600">
            <div className="w-3 h-3 bg-isro-orange rounded-full mr-2"></div>
            Hazards
          </span>
        </div>
      </div>

      {/* 3D Map Simulation */}
      <div className="relative h-80 bg-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden mb-4">
        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#CBD5E0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Coordinate labels */}
        <div className="absolute top-2 left-2 text-xs text-gray-500 font-mono">
          Grid: A1-H8
        </div>
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">
          Scale: 1:500m
        </div>

        {/* Obstacles */}
        {obstacles.map((obstacle, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
          >
            <div className="w-4 h-4 bg-isro-orange rounded-full border-2 border-white opacity-80">
              <AlertTriangle className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
            </div>
          </div>
        ))}

        {/* Path line */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d={`M ${roverPosition.x}% ${roverPosition.y}% L ${targetPosition.x}% ${targetPosition.y}%`}
            stroke="#004C97"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            opacity="0.7"
          />
        </svg>

        {/* Target marker */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}
        >
          <div className="w-6 h-6 bg-success rounded-full border-2 border-white animate-pulse">
            <Target className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
          </div>
        </div>

        {/* Rover marker */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
          style={{ left: `${roverPosition.x}%`, top: `${roverPosition.y}%` }}
        >
          <div className="w-6 h-6 bg-isro-blue rounded-full border-2 border-white shadow-glow-blue">
            <MapPin className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
          </div>
          {/* Direction arrow */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-b-3 border-b-isro-blue"></div>
          </div>
        </div>
      </div>

      {/* Coordinates and Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Current Position</h3>
          <p className="text-lg font-mono text-text-primary">
            {roverPosition.x.toFixed(1)}, {roverPosition.y.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500">Lat: -23.4°, Lon: 45.2°</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Target Distance</h3>
          <p className="text-lg font-mono text-text-primary">
            {Math.sqrt(
              Math.pow(targetPosition.x - roverPosition.x, 2) + 
              Math.pow(targetPosition.y - roverPosition.y, 2)
            ).toFixed(1)}m
          </p>
          <p className="text-xs text-gray-500">ETA: 12:34</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Heading</h3>
          <p className="text-lg font-mono text-text-primary">142.3°</p>
          <p className="text-xs text-gray-500">Southeast</p>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
