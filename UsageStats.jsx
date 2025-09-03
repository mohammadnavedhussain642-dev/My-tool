import React from 'react';
import Icon from '../../../components/AppIcon';

const UsageStats = () => {
  const stats = [
    {
      label: "Videos Processed",
      value: 47,
      limit: 100,
      icon: "Video",
      color: "text-primary"
    },
    {
      label: "Audio Files",
      value: 23,
      limit: 50,
      icon: "Headphones",
      color: "text-secondary"
    },
    {
      label: "Blog Posts",
      value: 156,
      limit: 200,
      icon: "FileText",
      color: "text-success"
    },
    {
      label: "Social Posts",
      value: 342,
      limit: 500,
      icon: "Share2",
      color: "text-accent"
    }
  ];

  const getProgressPercentage = (value, limit) => {
    return Math.min((value / limit) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-destructive';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Usage This Month</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-sm text-muted-foreground">Pro Plan</span>
        </div>
      </div>
      <div className="space-y-4">
        {stats?.map((stat, index) => {
          const percentage = getProgressPercentage(stat?.value, stat?.limit);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={stat?.icon} size={16} className={stat?.color} />
                  <span className="text-sm font-medium text-foreground">
                    {stat?.label}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {stat?.value}/{stat?.limit}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default UsageStats;