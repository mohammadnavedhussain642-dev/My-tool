import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const OptimizationPanel = ({ recommendations }) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getEffortColor = (effort) => {
    switch (effort?.toLowerCase()) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Optimization Recommendations</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} className="text-warning" />
          <span className="text-sm text-muted-foreground">{recommendations?.length} suggestions</span>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations?.map((rec, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-medium text-foreground">#{rec?.priority}</span>
                  <h4 className="font-medium text-foreground">{rec?.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Impact:</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(rec?.impact)}`}>
                    {rec?.impact}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Effort:</span>
                  <span className={`text-xs font-medium ${getEffortColor(rec?.effort)}`}>
                    {rec?.effort}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedRecommendation(rec)}
                  className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  View Details
                </button>
                <button className="text-xs px-3 py-1 border border-border rounded-md hover:bg-muted transition-colors">
                  Implement
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Implementing all recommendations could improve performance by up to 45%</span>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            <Icon name="Zap" size={16} />
            <span>Quick Setup</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimizationPanel;