import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'blog-generator',
      title: 'Generate Blog Post',
      description: 'Create blog from video/audio',
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'social-posts',
      title: 'Social Media Posts',
      description: 'Multi-platform content',
      icon: 'Share2',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'twitter-thread',
      title: 'Twitter Thread',
      description: 'Engaging thread creator',
      icon: 'MessageSquare',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'linkedin-post',
      title: 'LinkedIn Post',
      description: 'Professional content',
      icon: 'Briefcase',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="ghost"
            onClick={() => onActionClick(action?.id)}
            className="h-auto p-4 justify-start hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.bgColor}`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-medium text-foreground">
                  {action?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;