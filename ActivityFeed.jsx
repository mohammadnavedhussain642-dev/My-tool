import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "upload",
      title: "Video uploaded successfully",
      description: "marketing-webinar-2024.mp4 processed",
      timestamp: "2 minutes ago",
      status: "completed",
      icon: "Upload"
    },
    {
      id: 2,
      type: "generation",
      title: "Blog post generated",
      description: "From \'Product Launch Strategy\' video",
      timestamp: "15 minutes ago",
      status: "completed",
      icon: "FileText"
    },
    {
      id: 3,
      type: "processing",
      title: "Audio transcription in progress",
      description: "podcast-episode-47.mp3",
      timestamp: "23 minutes ago",
      status: "processing",
      icon: "Loader2"
    },
    {
      id: 4,
      type: "social",
      title: "LinkedIn posts created",
      description: "5 posts generated from webinar content",
      timestamp: "1 hour ago",
      status: "completed",
      icon: "Share2"
    },
    {
      id: 5,
      type: "schedule",
      title: "Content scheduled",
      description: "Twitter thread scheduled for tomorrow",
      timestamp: "2 hours ago",
      status: "scheduled",
      icon: "Calendar"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'scheduled': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10';
      case 'processing': return 'bg-warning/10';
      case 'scheduled': return 'bg-primary/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusBg(activity?.status)}`}>
              <Icon 
                name={activity?.icon} 
                size={16} 
                className={`${getStatusColor(activity?.status)} ${
                  activity?.status === 'processing' ? 'animate-spin' : ''
                }`}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {activity?.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {activity?.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity?.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;