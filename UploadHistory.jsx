import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const uploadHistory = [
    {
      id: 1,
      fileName: "Marketing Strategy Webinar.mp4",
      uploadDate: "2025-01-02T14:30:00Z",
      fileSize: "245.8 MB",
      duration: "45:32",
      status: "completed",
      contentGenerated: ["blog", "social", "threads"],
      platforms: ["instagram", "linkedin", "twitter"],
      language: "english",
      processingTime: "8 minutes"
    },
    {
      id: 2,
      fileName: "Product Demo Audio.mp3",
      uploadDate: "2025-01-02T10:15:00Z",
      fileSize: "89.2 MB",
      duration: "28:45",
      status: "processing",
      contentGenerated: ["blog", "summary"],
      platforms: ["linkedin"],
      language: "english",
      processingTime: "In progress",
      progress: 65
    },
    {
      id: 3,
      fileName: "Hindi Podcast Episode.mp3",
      uploadDate: "2025-01-01T16:20:00Z",
      fileSize: "156.4 MB",
      duration: "52:18",
      status: "completed",
      contentGenerated: ["blog", "social", "summary"],
      platforms: ["instagram", "facebook"],
      language: "hindi",
      processingTime: "12 minutes"
    },
    {
      id: 4,
      fileName: "Team Meeting Recording.mp4",
      uploadDate: "2025-01-01T09:45:00Z",
      fileSize: "412.1 MB",
      duration: "1:23:15",
      status: "failed",
      contentGenerated: [],
      platforms: [],
      language: "english",
      processingTime: "Failed",
      error: "File format not supported"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Files', count: uploadHistory?.length },
    { value: 'completed', label: 'Completed', count: uploadHistory?.filter(item => item?.status === 'completed')?.length },
    { value: 'processing', label: 'Processing', count: uploadHistory?.filter(item => item?.status === 'processing')?.length },
    { value: 'failed', label: 'Failed', count: uploadHistory?.filter(item => item?.status === 'failed')?.length }
  ];

  const filteredHistory = selectedFilter === 'all' 
    ? uploadHistory 
    : uploadHistory?.filter(item => item?.status === selectedFilter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Loader2';
      case 'failed': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    if (['mp4', 'mov', 'avi', 'mkv']?.includes(extension)) return 'Video';
    if (['mp3', 'wav', 'm4a', 'aac']?.includes(extension)) return 'Music';
    return 'File';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upload History</h3>
            <p className="text-sm text-muted-foreground">Recent file uploads and processing status</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setSelectedFilter(option?.value)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedFilter === option?.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {option?.label} ({option?.count})
          </button>
        ))}
      </div>
      {/* History List */}
      <div className="space-y-4">
        {filteredHistory?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No files found for this filter</p>
          </div>
        ) : (
          filteredHistory?.map((item) => (
            <div key={item?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start space-x-4">
                {/* File Icon */}
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getFileIcon(item?.fileName)} size={24} className="text-muted-foreground" />
                </div>

                {/* File Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {item?.fileName}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                        <span>{formatDate(item?.uploadDate)}</span>
                        <span>{item?.fileSize}</span>
                        <span>{item?.duration}</span>
                        <span className="capitalize">{item?.language}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {item?.status === 'completed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          onClick={() => console.log('View content:', item?.id)}
                        >
                        </Button>
                      )}
                      {item?.status === 'failed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="RotateCcw"
                          onClick={() => console.log('Retry processing:', item?.id)}
                        >
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                      >
                      </Button>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-2 mt-3">
                    <Icon 
                      name={getStatusIcon(item?.status)} 
                      size={16} 
                      className={`${getStatusColor(item?.status)} ${
                        item?.status === 'processing' ? 'animate-spin' : ''
                      }`}
                    />
                    <span className={`text-sm ${getStatusColor(item?.status)}`}>
                      {item?.status === 'completed' && `Completed in ${item?.processingTime}`}
                      {item?.status === 'processing' && `Processing... ${item?.progress}%`}
                      {item?.status === 'failed' && (item?.error || 'Processing failed')}
                    </span>
                  </div>

                  {/* Progress Bar for Processing */}
                  {item?.status === 'processing' && (
                    <div className="w-full bg-border rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-warning h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${item?.progress}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Generated Content Tags */}
                  {item?.contentGenerated?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item?.contentGenerated?.map((type) => (
                        <span key={type} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {type}
                        </span>
                      ))}
                      {item?.platforms?.map((platform) => (
                        <span key={platform} className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                          {platform}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Load More Button */}
      {filteredHistory?.length > 0 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="right"
          >
            Load More History
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadHistory;