import React from 'react';
import Icon from '../../../components/AppIcon';

const ContentExtractor = ({ content, isExtracting, progress }) => {
  if (isExtracting || !content) return null;

  const { title, description, metadata, keywords, headings, images } = content;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Extracted Content</h2>
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Extraction Complete</span>
          </div>
        </div>

        {/* Source URL */}
        <div className="flex items-center space-x-2 mb-6 p-3 bg-muted/50 rounded-lg">
          <Icon name="Globe" size={16} className="text-muted-foreground flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Source URL
            </p>
            <p className="text-sm text-foreground truncate">{content?.url}</p>
          </div>
          <button className="p-1 hover:bg-background rounded">
            <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
          </button>
        </div>

        {/* Main Content Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title & Description */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Type" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Title</span>
              </div>
              <p className="text-foreground bg-background p-3 rounded-lg border border-border">
                {title}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="FileText" size={16} className="text-secondary" />
                <span className="text-sm font-medium text-foreground">Description</span>
              </div>
              <p className="text-muted-foreground bg-background p-3 rounded-lg border border-border line-clamp-3">
                {description}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Info" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Content Metrics</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Word Count</p>
                  <p className="font-semibold text-foreground">{metadata?.wordCount?.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Reading Time</p>
                  <p className="font-semibold text-foreground">{metadata?.readingTime}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-3">
              {metadata?.publishDate && (
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Published</p>
                  <p className="text-sm text-foreground">{metadata?.publishDate}</p>
                </div>
              )}
              {metadata?.author && (
                <div className="p-3 bg-background rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Author</p>
                  <p className="text-sm text-foreground">{metadata?.author}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Structure */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Keywords */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Tag" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Keywords</span>
              <span className="text-xs text-muted-foreground">({keywords?.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords?.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-warning/10 text-warning rounded-md border border-warning/20"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Content Structure */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="List" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Content Structure</span>
              <span className="text-xs text-muted-foreground">({headings?.length} sections)</span>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {headings?.map((heading, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 text-sm p-2 bg-background rounded border border-border"
                >
                  <Icon name="ArrowRight" size={12} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground truncate">{heading}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Images Preview */}
      {images && images?.length > 0 && (
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Image" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Images Found</span>
            <span className="text-xs text-muted-foreground">({images?.length})</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images?.slice(0, 4)?.map((image, index) => (
              <div 
                key={index}
                className="aspect-video bg-muted rounded-lg border border-border flex items-center justify-center group hover:border-primary transition-colors"
              >
                <Icon 
                  name="Image" 
                  size={24} 
                  className="text-muted-foreground group-hover:text-primary transition-colors" 
                />
              </div>
            ))}
          </div>
          
          {images?.length > 4 && (
            <p className="text-xs text-muted-foreground mt-2">
              +{images?.length - 4} more images available
            </p>
          )}
        </div>
      )}

      {/* Content Preview */}
      <div className="p-6 bg-muted/20">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Eye" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Content Preview</span>
        </div>
        
        <div className="bg-background rounded-lg border border-border p-4 max-h-40 overflow-y-auto">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content?.content?.substring(0, 500)}...
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>✓ Content structure analyzed</span>
            <span>✓ Keywords extracted</span>
            <span>✓ SEO elements identified</span>
          </div>
          
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View Full Content →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentExtractor;