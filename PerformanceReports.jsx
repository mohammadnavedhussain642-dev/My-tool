import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceReports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');

  const reports = [
    {
      id: 'overview',
      title: 'Performance Overview',
      description: 'Complete system performance analysis',
      icon: 'BarChart3',
      lastGenerated: '2 hours ago',
      size: '2.3 MB'
    },
    {
      id: 'bottlenecks',
      title: 'Bottleneck Analysis',
      description: 'Identify performance bottlenecks and solutions',
      icon: 'AlertTriangle',
      lastGenerated: '1 day ago',
      size: '1.8 MB'
    },
    {
      id: 'trends',
      title: 'Trend Analysis',
      description: '30-day performance trends and predictions',
      icon: 'TrendingUp',
      lastGenerated: '3 hours ago',
      size: '3.1 MB'
    },
    {
      id: 'comparison',
      title: 'Historical Comparison',
      description: 'Compare performance across different periods',
      icon: 'GitCompare',
      lastGenerated: '6 hours ago',
      size: '2.7 MB'
    }
  ];

  const exportFormats = [
    { format: 'PDF', icon: 'FileText', color: 'text-destructive' },
    { format: 'Excel', icon: 'Sheet', color: 'text-success' },
    { format: 'CSV', icon: 'Database', color: 'text-primary' },
    { format: 'JSON', icon: 'Code', color: 'text-warning' }
  ];

  const handleExportReport = (reportId, format) => {
    console.log(`Exporting ${reportId} as ${format}`);
    // Implementation for report export
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Performance Reports</h3>
        <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm">
          <Icon name="Plus" size={16} />
          <span>Generate Report</span>
        </button>
      </div>
      <div className="space-y-4">
        {reports?.map((report, index) => (
          <div 
            key={report?.id} 
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedReport === report?.id 
                ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
            }`}
            onClick={() => setSelectedReport(report?.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg ${selectedReport === report?.id ? 'bg-primary/10' : 'bg-muted'} flex items-center justify-center`}>
                  <Icon 
                    name={report?.icon} 
                    size={18} 
                    className={selectedReport === report?.id ? 'text-primary' : 'text-muted-foreground'} 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{report?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{report?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Last generated: {report?.lastGenerated}</span>
                    <span>•</span>
                    <span>Size: {report?.size}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={(e) => {
                    e?.stopPropagation();
                    console.log('View report:', report?.id);
                  }}
                  className="text-xs px-3 py-1 border border-border rounded-md hover:bg-muted transition-colors"
                >
                  View
                </button>
                <div className="relative group">
                  <button className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Export
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-32 bg-popover border border-border rounded-md shadow-moderate opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    {exportFormats?.map((format, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleExportReport(report?.id, format?.format);
                        }}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-xs hover:bg-muted transition-colors first:rounded-t-md last:rounded-b-md"
                      >
                        <Icon name={format?.icon} size={14} className={format?.color} />
                        <span>{format?.format}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Schedule Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Scheduled Reports</h4>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Configure Schedule
          </button>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={16} className="text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Weekly Performance Summary</p>
              <p className="text-xs text-muted-foreground">Every Monday at 9:00 AM</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-success">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;