import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealth = () => {
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    // Mock real-time health data
    const generateHealthData = () => {
      return [
        {
          service: 'API Gateway',
          status: 'healthy',
          uptime: '99.9%',
          responseTime: '45ms',
          icon: 'Server',
          lastCheck: new Date()?.toLocaleTimeString()
        },
        {
          service: 'Database',
          status: 'healthy',
          uptime: '99.8%',
          responseTime: '12ms',
          icon: 'Database',
          lastCheck: new Date()?.toLocaleTimeString()
        },
        {
          service: 'AI Processing',
          status: 'warning',
          uptime: '98.5%',
          responseTime: '2.3s',
          icon: 'Brain',
          lastCheck: new Date()?.toLocaleTimeString()
        },
        {
          service: 'CDN',
          status: 'healthy',
          uptime: '100%',
          responseTime: '23ms',
          icon: 'Globe',
          lastCheck: new Date()?.toLocaleTimeString()
        },
        {
          service: 'Storage',
          status: 'healthy',
          uptime: '99.9%',
          responseTime: '8ms',
          icon: 'HardDrive',
          lastCheck: new Date()?.toLocaleTimeString()
        }
      ];
    };

    setHealthData(generateHealthData());
    
    // Update every 30 seconds
    const interval = setInterval(() => {
      setHealthData(generateHealthData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'healthy': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'error': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Minus';
    }
  };

  const overallHealth = healthData?.filter(item => item?.status === 'healthy')?.length / healthData?.length * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">System Health</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${overallHealth >= 90 ? 'bg-success animate-pulse' : overallHealth >= 70 ? 'bg-warning animate-pulse' : 'bg-destructive animate-pulse'}`}></div>
          <span className="text-sm text-muted-foreground">
            {overallHealth?.toFixed(0)}% Healthy
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {healthData?.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon name={service?.icon} size={18} className="text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{service?.service}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">Response: {service?.responseTime}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">Uptime: {service?.uptime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service?.status)}`}>
                <Icon name={getStatusIcon(service?.status)} size={14} />
                <span className="capitalize">{service?.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Overview */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-success">{healthData?.filter(s => s?.status === 'healthy')?.length}</div>
            <div className="text-xs text-muted-foreground">Healthy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">{healthData?.filter(s => s?.status === 'warning')?.length}</div>
            <div className="text-xs text-muted-foreground">Warning</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-destructive">{healthData?.filter(s => s?.status === 'error')?.length}</div>
            <div className="text-xs text-muted-foreground">Error</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="text-xs text-primary hover:text-primary/80 transition-colors">
          View Detailed Logs
        </button>
      </div>
    </div>
  );
};

export default SystemHealth;