import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentCard = ({ content, onEdit, onDuplicate, onSchedule, onDelete, isSelected, onSelect }) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000)?.toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000)?.toFixed(1)}K`;
    return views?.toString() || '0';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Instagram': 'Instagram',
      'LinkedIn': 'Linkedin',
      'Twitter': 'Twitter',
      'Facebook': 'Facebook',
      'YouTube': 'Youtube',
      'Blog': 'FileText',
      'Thread': 'MessageSquare'
    };
    return icons?.[platform] || 'Globe';
  };

  const getContentTypeIcon = (type) => {
    const icons = {
      'video': 'Video',
      'audio': 'Headphones',
      'text': 'FileText',
      'image': 'Image'
    };
    return icons?.[type] || 'File';
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-moderate cursor-pointer ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-muted overflow-hidden">
        <Image
          src={content?.thumbnail}
          alt={content?.title}
          className="w-full h-full object-cover"
        />
        
        {/* Selection Checkbox */}
        <div className="absolute top-2 left-2">
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onSelect(content?.id);
            }}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              isSelected 
                ? 'bg-primary border-primary' :'bg-white border-gray-300 hover:border-primary'
            }`}
          >
            {isSelected && <Icon name="Check" size={12} color="white" />}
          </button>
        </div>

        {/* Content Type Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
          <Icon name={getContentTypeIcon(content?.sourceType)} size={12} />
          <span className="capitalize">{content?.sourceType}</span>
        </div>

        {/* Quick Actions Overlay */}
        {showActions && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2 transition-opacity duration-200">
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                onEdit(content);
              }}
              iconName="Edit3"
              className="bg-white text-gray-800 hover:bg-gray-100"
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                onSchedule(content);
              }}
              iconName="Calendar"
              className="bg-white text-gray-800 hover:bg-gray-100"
            >
              Schedule
            </Button>
          </div>
        )}
      </div>
      {/* Content Info */}
      <div className="p-4">
        <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-2 leading-tight">
          {content?.title}
        </h3>

        {/* Platform Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {content?.platforms?.map((platform, index) => (
            <span
              key={index}
              className="inline-flex items-center space-x-1 px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
            >
              <Icon name={getPlatformIcon(platform)} size={10} />
              <span>{platform}</span>
            </span>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{formatDate(content?.createdAt)}</span>
          <span>{content?.duration || '2 min read'}</span>
        </div>

        {/* Performance Metrics */}
        {content?.metrics && (
          <div className="flex items-center justify-between text-xs mb-3">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Eye" size={12} />
                <span>{formatViews(content?.metrics?.views)}</span>
              </span>
              <span className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Heart" size={12} />
                <span>{formatViews(content?.metrics?.likes)}</span>
              </span>
              <span className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="MessageCircle" size={12} />
                <span>{formatViews(content?.metrics?.comments)}</span>
              </span>
            </div>
            <div className={`px-2 py-1 rounded text-xs ${
              content?.status === 'published' ?'bg-success/10 text-success' 
                : content?.status === 'scheduled' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
            }`}>
              {content?.status}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                onDuplicate(content);
              }}
              iconName="Copy"
              className="h-8 px-2"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                onDelete(content);
              }}
              iconName="Trash2"
              className="h-8 px-2 text-destructive hover:text-destructive"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onEdit(content);
            }}
            className="h-8"
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;