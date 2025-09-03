import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentPreview = ({ content, selectedTypes, onNavigateToEditor }) => {
  const [activePreview, setActivePreview] = useState(selectedTypes?.[0] || 'blog');
  const [activeFormat, setActiveFormat] = useState('twitter'); // For social media previews

  if (!content) return null;

  const renderBlogPreview = () => {
    const blogContent = content?.blog;
    if (!blogContent) return null;

    return (
      <div className="space-y-4">
        {/* Blog Header */}
        <div className="border-b border-border pb-4">
          <h3 className="text-xl font-bold text-foreground mb-2">{blogContent?.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{blogContent?.wordCount?.toLocaleString()} words</span>
            <span>•</span>
            <span>{blogContent?.estimatedReadingTime}</span>
            <span>•</span>
            <span>SEO Score: {blogContent?.seoScore}/100</span>
          </div>
        </div>

        {/* Meta Description */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Search" size={14} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Meta Description</span>
          </div>
          <p className="text-sm text-foreground">{blogContent?.metaDescription}</p>
        </div>

        {/* Content Preview */}
        <div className="prose max-w-none">
          <div className="bg-background p-4 rounded-lg border border-border max-h-60 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
              {blogContent?.content?.substring(0, 800)}...
            </pre>
          </div>
        </div>
      </div>
    );
  };

  const renderSocialPreview = () => {
    const socialContent = content?.social;
    if (!socialContent) return null;

    const formats = ['twitter', 'linkedin', 'instagram'];
    
    return (
      <div className="space-y-4">
        {/* Format Selector */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {formats?.map((format) => (
            <button
              key={format}
              onClick={() => setActiveFormat(format)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                activeFormat === format
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {format}
            </button>
          ))}
        </div>

        {/* Social Post Preview */}
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Your Brand</p>
              <p className="text-xs text-muted-foreground">Just now</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">
              {socialContent?.[activeFormat]}
            </p>
          </div>
          
          {/* Engagement Metrics Preview */}
          <div className="flex items-center space-x-6 pt-3 border-t border-border">
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <Icon name="Heart" size={14} />
              <span className="text-xs">Like</span>
            </button>
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <Icon name="MessageCircle" size={14} />
              <span className="text-xs">Comment</span>
            </button>
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
              <Icon name="Share" size={14} />
              <span className="text-xs">Share</span>
            </button>
          </div>
        </div>

        {/* Character Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Character count: {socialContent?.[activeFormat]?.length}
          </span>
          <span className={`font-medium ${
            socialContent?.[activeFormat]?.length > 280 
              ? 'text-destructive' :'text-success'
          }`}>
            {activeFormat === 'twitter' && socialContent?.[activeFormat]?.length <= 280 && '✓ Fits Twitter limit'}
            {activeFormat === 'linkedin' && '✓ Optimized for LinkedIn'}
            {activeFormat === 'instagram' && '✓ Instagram ready'}
          </span>
        </div>
      </div>
    );
  };

  const renderEmailPreview = () => {
    const emailContent = content?.email;
    if (!emailContent) return null;

    return (
      <div className="space-y-4">
        {/* Email Header */}
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Email Preview</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>Draft</span>
            </div>
          </div>
          
          <div className="space-y-3 border border-border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Subject:</span>
              <span className="text-xs text-muted-foreground">Preview text visible</span>
            </div>
            <p className="font-medium text-foreground">{emailContent?.subject}</p>
            <p className="text-sm text-muted-foreground border-t border-border pt-2">
              {emailContent?.preview}
            </p>
          </div>
        </div>

        {/* Email Content */}
        <div className="bg-background border border-border rounded-lg p-4 max-h-60 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
            {emailContent?.content}
          </pre>
        </div>
      </div>
    );
  };

  const getPreviewIcon = (type) => {
    switch (type) {
      case 'blog': return 'FileText';
      case 'social': return 'Share2';
      case 'email': return 'Mail';
      case 'video-script': return 'Video';
      default: return 'FileText';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Generated Content Preview</h2>
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Generation Complete</span>
          </div>
        </div>

        {/* Content Type Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6">
          {selectedTypes?.map((type) => (
            <button
              key={type}
              onClick={() => setActivePreview(type)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                activePreview === type
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={getPreviewIcon(type)} size={14} />
              <span>{type?.replace('-', ' ')}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content Preview */}
        <div className="mb-6">
          {activePreview === 'blog' && renderBlogPreview()}
          {activePreview === 'social' && renderSocialPreview()}
          {activePreview === 'email' && renderEmailPreview()}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={14} />
              <span>AI Generated</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} />
              <span>Generated {new Date()?.toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Regenerate
            </Button>

            <Button onClick={onNavigateToEditor}>
              <Icon name="Edit3" size={16} className="mr-2" />
              Edit in Editor
            </Button>
          </div>
        </div>
      </div>
      {/* Content Quality Indicators */}
      <div className="px-6 pb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Content Quality Metrics</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">SEO Score</p>
              <p className="text-lg font-semibold text-success">85/100</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Readability</p>
              <p className="text-lg font-semibold text-primary">Good</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Engagement</p>
              <p className="text-lg font-semibold text-warning">High</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Uniqueness</p>
              <p className="text-lg font-semibold text-success">95%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPreview;