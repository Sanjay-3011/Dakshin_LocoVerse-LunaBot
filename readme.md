# LunaBot Mission Control Dashboard

A hyper-realistic ISRO-style mission control dashboard for LunaBot, a lunar rover simulation system. Built with React and Tailwind CSS to provide an authentic engineering interface for monitoring and controlling lunar rover operations.

## Team: Dakshin Locoverse

## Features

### 🚀 Authentic ISRO Design
- Professional light theme with ISRO-inspired color palette
- Clean, minimal interface resembling real mission control systems
- Proper typography using Poppins and Roboto fonts
- Realistic data visualizations and telemetry displays

### 🛰️ Real-time Monitoring
- **Navigation & Mapping**: 3D terrain visualization with live rover position tracking
- **Environmental Parameters**: Temperature, pressure, dust index, and O₂ level monitoring
- **System Health**: Battery, CPU, signal strength, and sensor status indicators
- **Live Logs**: Terminal-style system logs with real-time telemetry charts

### 📊 Interactive Dashboards
- **Patrol Logs**: Detailed mission history with route tracking and findings
- **Alerts & Events**: Priority-based alert system with acknowledgment features
- **Multi-panel Layout**: Responsive grid system for optimal data presentation

### 🔧 Technical Features
- Real-time data simulation with automatic updates
- Circular gauge components for system metrics
- Interactive navigation maps with hazard detection
- Terminal-style logging with data streaming
- Status indicators with pulse animations

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lunabot-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Mission control header with ISRO branding
│   ├── Sidebar.jsx             # Navigation sidebar with mission controls
│   ├── NavigationPanel.jsx     # 3D mapping and rover position tracking
│   ├── EnvironmentPanel.jsx    # Environmental parameter monitoring
│   ├── SystemHealthPanel.jsx   # System status and sensor health
│   ├── LogsPanel.jsx           # Real-time logging and telemetry
│   ├── PatrolLogs.jsx          # Mission history and detailed reports
│   └── AlertsPanel.jsx         # Alert management and event tracking
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── index.css                   # Global styles and custom animations
```

## Technology Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server

## Design Philosophy

The dashboard follows ISRO's design principles:
- **Functionality over aesthetics** - Every element serves a purpose
- **Clear information hierarchy** - Critical data is prominently displayed
- **Professional color scheme** - ISRO blue (#004C97) and orange (#F36C21)
- **Readable typography** - Consistent font usage for different data types
- **Subtle animations** - Enhance user experience without distraction

## Key Components

### Mission Control Header
- Live mission timer
- Communication link status
- ISRO branding and team identification

### Real-time Navigation
- 3D terrain mapping simulation
- Live rover position tracking
- Obstacle and hazard detection
- Route planning visualization

### Environmental Monitoring
- Multi-parameter tracking (temperature, pressure, dust, O₂)
- Trend indicators and historical data
- Status-based color coding
- Mini-charts for quick analysis

### System Health Dashboard
- Circular gauge components for key metrics
- Sensor status monitoring
- Performance metrics tracking
- Health history logging

### Live Logging System
- Terminal-style log display
- Real-time telemetry charts
- Data streaming indicators
- System status monitoring

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **ISRO** for inspiration and design references
- **Dakshin Locoverse** team for project development
- **ROS2 + Gazebo** for simulation framework integration

---

Built by Dakshin Locoverse for ISRO lunar rover missions.
