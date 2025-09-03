import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const MetricsChart = ({ timeRange }) => {
  const [activeTab, setActiveTab] = useState('processing');
  
  // Mock data - in real implementation, this would come from your backend
  const generateMockData = (days) => {
    const data = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      data?.push({
        date: date?.toISOString()?.split('T')?.[0],
        processing: Math.random() * 5 + 1, // 1-6 seconds
        success: Math.random() * 10 + 90, // 90-100%
        apiResponse: Math.random() * 300 + 200, // 200-500ms
        concurrent: Math.random() * 50 + 10 // 10-60 concurrent processes
      });
    }
    return data;
  };

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const days = timeRange === '1d' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    setChartData(generateMockData(days));
  }, [timeRange]);

  const chartTabs = [
    { id: 'processing', label: 'Processing Time', color: '#3b82f6', key: 'processing', unit: 's' },
    { id: 'success', label: 'Success Rate', color: '#10b981', key: 'success', unit: '%' },
    { id: 'api', label: 'API Response', color: '#f59e0b', key: 'apiResponse', unit: 'ms' },
    { id: 'concurrent', label: 'Concurrent Jobs', color: '#8b5cf6', key: 'concurrent', unit: '' }
  ];

  const activeTabData = chartTabs?.find(tab => tab?.id === activeTab);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm text-muted-foreground">Live Data</span>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartTabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab?.label}
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeTabData?.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={activeTabData?.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}${activeTabData?.unit}`}
            />
            <Tooltip 
              formatter={(value) => [`${value}${activeTabData?.unit}`, activeTabData?.label]}
              labelFormatter={(value) => new Date(value)?.toLocaleDateString()}
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey={activeTabData?.key}
              stroke={activeTabData?.color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMetric)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: activeTabData?.color }}
              ></div>
              <span className="text-muted-foreground">{activeTabData?.label}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <span>Avg: {chartData?.length > 0 ? (chartData?.reduce((sum, item) => sum + item?.[activeTabData?.key], 0) / chartData?.length)?.toFixed(1) : 0}{activeTabData?.unit}</span>
            <span>•</span>
            <span>Last: {chartData?.[chartData?.length - 1]?.[activeTabData?.key]?.toFixed(1) || 0}{activeTabData?.unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsChart;