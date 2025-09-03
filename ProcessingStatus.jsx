import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStatus = () => {
  const processingTasks = [
    {
      id: 1,
      fileName: "marketing-webinar-2024.mp4",
      type: "Video Transcription",
      progress: 85,
      status: "processing",
      estimatedTime: "2 min remaining"
    },
    {
      id: 2,
      fileName: "podcast-episode-47.mp3",
      type: "Audio Analysis",
      progress: 45,
      status: "processing",
      estimatedTime: "5 min remaining"
    },
    {
      id: 3,
      fileName: "product-demo.mov",
      type: "Content Generation",
      progress: 100,
      status: "completed",
      estimatedTime: "Completed"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing': return 'Loader2';
      case 'completed': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'text-warning';
      case 'completed': return 'text-success';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-success';
    if (progress >= 70) return 'bg-primary';
    return 'bg-warning';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Processing Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
            {processingTasks?.filter(task => task?.status === 'processing')?.length} active
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {processingTasks?.map((task) => (
          <div key={task?.id} className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getStatusIcon(task?.status)} 
                    size={16} 
                    className={`${getStatusColor(task?.status)} ${
                      task?.status === 'processing' ? 'animate-spin' : ''
                    }`}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {task?.fileName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {task?.type}
                  </p>
                </div>
              </div>
              
              <div className="text-right flex-shrink-0 ml-4">
                <p className="text-xs text-muted-foreground">
                  {task?.estimatedTime}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium text-foreground">{task?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task?.progress)}`}
                  style={{ width: `${task?.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {processingTasks?.filter(task => task?.status === 'processing')?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">All tasks completed</p>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;