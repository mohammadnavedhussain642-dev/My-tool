import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingPosts = ({ posts, onPostClick, onEditPost, onDeletePost, onDuplicatePost }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getPlatformIcon = (platform) => {
    const platformIcons = {
      instagram: 'Instagram',
      linkedin: 'Linkedin',
      twitter: 'Twitter',
      facebook: 'Facebook',
      youtube: 'Youtube',
      tiktok: 'Video',
      reddit: 'MessageCircle'
    };
    return platformIcons?.[platform] || 'Share2';
  };

  const getPlatformColor = (platform) => {
    const platformColors = {
      instagram: 'bg-pink-500',
      linkedin: 'bg-blue-600',
      twitter: 'bg-sky-500',
      facebook: 'bg-blue-700',
      youtube: 'bg-red-600',
      tiktok: 'bg-black',
      reddit: 'bg-orange-600'
    };
    return platformColors?.[platform] || 'bg-gray-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'draft':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      case 'draft':
        return 'FileText';
      default:
        return 'Circle';
    }
  };

  const sortedPosts = [...posts]?.sort((a, b) => 
    new Date(a.scheduledDate) - new Date(b.scheduledDate)
  );

  const upcomingPosts = sortedPosts?.filter(post => 
    new Date(post.scheduledDate) > new Date() || post?.status === 'pending'
  );

  const recentPosts = sortedPosts?.filter(post => 
    new Date(post.scheduledDate) <= new Date() && post?.status !== 'pending'
  )?.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Upcoming Posts */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span>Upcoming Posts</span>
            </h3>
            <div className="text-sm text-muted-foreground">
              {upcomingPosts?.length} scheduled
            </div>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {upcomingPosts?.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No upcoming posts scheduled</p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag content from your library or create new posts to get started
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {upcomingPosts?.map(post => (
                <div
                  key={post?.id}
                  className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onPostClick(post)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${getPlatformColor(post?.platform)}`}></div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name={getPlatformIcon(post?.platform)} size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground truncate">
                          {post?.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{formatDate(post?.scheduledDate)}</span>
                        <div className={`px-2 py-1 rounded border ${getStatusColor(post?.status)}`}>
                          <Icon name={getStatusIcon(post?.status)} size={12} className="inline mr-1" />
                          {post?.status}
                        </div>
                      </div>
                      
                      {post?.content && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {post?.content}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onEditPost(post);
                        }}
                      >
                        <Icon name="Edit2" size={14} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onDuplicatePost(post);
                        }}
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onDeletePost(post);
                        }}
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Recent Posts */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="History" size={20} />
            <span>Recent Posts</span>
          </h3>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {recentPosts?.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No recent posts</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {recentPosts?.map(post => (
                <div
                  key={post?.id}
                  className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onPostClick(post)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${getPlatformColor(post?.platform)}`}></div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name={getPlatformIcon(post?.platform)} size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground truncate">
                          {post?.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{formatDate(post?.scheduledDate)}</span>
                        <div className={`px-2 py-1 rounded border ${getStatusColor(post?.status)}`}>
                          <Icon name={getStatusIcon(post?.status)} size={12} className="inline mr-1" />
                          {post?.status}
                        </div>
                      </div>
                      
                      {post?.engagement && (
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center space-x-1">
                            <Icon name="Heart" size={12} />
                            <span>{post?.engagement?.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="MessageCircle" size={12} />
                            <span>{post?.engagement?.comments}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Share2" size={12} />
                            <span>{post?.engagement?.shares}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onDuplicatePost(post);
                        }}
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingPosts;