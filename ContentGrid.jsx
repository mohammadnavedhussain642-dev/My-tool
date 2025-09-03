import React from 'react';
import ContentCard from './ContentCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentGrid = ({ 
  content, 
  loading, 
  selectedItems, 
  onSelectItem, 
  onEdit, 
  onDuplicate, 
  onSchedule, 
  onDelete,
  onLoadMore,
  hasMore
}) => {
  if (loading && content?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="text-muted-foreground animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your content...</p>
        </div>
      </div>
    );
  }

  if (content?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="FolderOpen" size={48} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No Content Found</h3>
          <p className="text-muted-foreground mb-6">
            You haven't created any content yet, or no content matches your current filters.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              onClick={() => window.location.href = '/content-upload'}
              iconName="Plus"
              iconPosition="left"
            >
              Create Content
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/dashboard'}
              iconName="LayoutDashboard"
              iconPosition="left"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {content?.map((item) => (
          <ContentCard
            key={item?.id}
            content={item}
            isSelected={selectedItems?.includes(item?.id)}
            onSelect={onSelectItem}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onSchedule={onSchedule}
            onDelete={onDelete}
          />
        ))}
      </div>
      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={loading}
            iconName="ChevronDown"
            iconPosition="left"
          >
            {loading ? 'Loading...' : 'Load More Content'}
          </Button>
        </div>
      )}
      {/* Loading Overlay for Additional Content */}
      {loading && content?.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
          <div className="bg-card rounded-lg p-6 shadow-prominent">
            <div className="flex items-center space-x-3">
              <Icon name="Loader2" size={24} className="text-primary animate-spin" />
              <span className="text-foreground">Loading more content...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;