import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContentLibraryPanel = ({ onDragStart, onScheduleContent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock content library data
  const contentLibrary = [
    {
      id: 'content-1',
      title: 'AI Revolution in Content Creation',
      type: 'blog',
      content: `The landscape of content creation is rapidly evolving with artificial intelligence at the forefront. From automated writing assistants to AI-powered video editing, creators now have unprecedented tools at their disposal.\n\nThis transformation isn't just about efficiency—it's about unlocking new creative possibilities that were previously unimaginable.`,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      createdAt: '2025-01-02T10:30:00Z',
      tags: ['AI', 'Technology', 'Content Creation'],
      wordCount: 1250,
      readTime: '5 min',
      status: 'published'
    },
    {
      id: 'content-2',
      title: 'Social Media Trends 2025',
      type: 'video',
      content: `Discover the top social media trends that will dominate 2025. From short-form video content to AI-generated posts, learn how to stay ahead of the curve.\n\nThis comprehensive guide covers platform-specific strategies and emerging technologies.`,
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
      createdAt: '2025-01-01T14:20:00Z',
      tags: ['Social Media', 'Trends', 'Marketing'],
      duration: '12:45',
      views: 15420,
      status: 'draft'
    },
    {
      id: 'content-3',
      title: 'Building Your Personal Brand',
      type: 'podcast',
      content: `In this episode, we explore the fundamentals of building a strong personal brand in the digital age. Learn from industry experts about authenticity, consistency, and strategic positioning.\n\nKey takeaways include actionable steps for brand development and common pitfalls to avoid.`,
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
      createdAt: '2024-12-30T09:15:00Z',
      tags: ['Personal Branding', 'Career', 'Professional Development'],
      duration: '45:30',
      downloads: 8750,
      status: 'published'
    },
    {
      id: 'content-4',
      title: 'Instagram Growth Strategies',
      type: 'infographic',
      content: `A comprehensive visual guide to growing your Instagram presence organically. Covers hashtag strategies, posting schedules, engagement tactics, and content planning.\n\nIncludes data-driven insights and proven techniques used by successful influencers.`,
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      createdAt: '2024-12-28T16:45:00Z',
      tags: ['Instagram', 'Growth', 'Social Media Marketing'],
      shares: 2340,
      saves: 5670,
      status: 'published'
    },
    {
      id: 'content-5',
      title: 'Content Calendar Template',
      type: 'template',
      content: `A ready-to-use content calendar template that helps you plan, organize, and schedule your content across multiple platforms. Includes best practices and optimization tips.\n\nPerfect for content creators, marketers, and social media managers looking to streamline their workflow.`,
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      createdAt: '2024-12-25T11:30:00Z',
      tags: ['Template', 'Planning', 'Organization'],
      downloads: 12500,
      rating: 4.8,
      status: 'published'
    },
    {
      id: 'content-6',
      title: 'LinkedIn Networking Masterclass',
      type: 'course',
      content: `Master the art of professional networking on LinkedIn with this comprehensive course. Learn advanced strategies for connection building, content sharing, and relationship management.\n\nIncludes practical exercises and real-world case studies from successful professionals.`,
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      createdAt: '2024-12-20T13:20:00Z',
      tags: ['LinkedIn', 'Networking', 'Professional Development'],
      students: 3450,
      rating: 4.9,
      status: 'published'
    }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'blog', label: 'Blog Posts' },
    { value: 'video', label: 'Videos' },
    { value: 'podcast', label: 'Podcasts' },
    { value: 'infographic', label: 'Infographics' },
    { value: 'template', label: 'Templates' },
    { value: 'course', label: 'Courses' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'type', label: 'Content Type' }
  ];

  const getTypeIcon = (type) => {
    const typeIcons = {
      blog: 'FileText',
      video: 'Video',
      podcast: 'Mic',
      infographic: 'Image',
      template: 'Layout',
      course: 'GraduationCap'
    };
    return typeIcons?.[type] || 'File';
  };

  const getTypeColor = (type) => {
    const typeColors = {
      blog: 'bg-blue-500',
      video: 'bg-red-500',
      podcast: 'bg-purple-500',
      infographic: 'bg-green-500',
      template: 'bg-orange-500',
      course: 'bg-indigo-500'
    };
    return typeColors?.[type] || 'bg-gray-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-success/10 text-success border-success/20';
      case 'draft':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredContent = contentLibrary?.filter(item => {
      const matchesSearch = item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           item?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           item?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
      const matchesType = filterType === 'all' || item?.type === filterType;
      return matchesSearch && matchesType;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'type':
          return a?.type?.localeCompare(b?.type);
        default:
          return 0;
      }
    });

  const handleDragStart = (e, content) => {
    e.dataTransfer.effectAllowed = 'copy';
    e?.dataTransfer?.setData('text/plain', JSON.stringify(content));
    onDragStart(content);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getContentStats = (content) => {
    switch (content?.type) {
      case 'blog':
        return `${content?.wordCount} words • ${content?.readTime}`;
      case 'video':
        return `${content?.duration} • ${content?.views?.toLocaleString()} views`;
      case 'podcast':
        return `${content?.duration} • ${content?.downloads?.toLocaleString()} downloads`;
      case 'infographic':
        return `${content?.shares?.toLocaleString()} shares • ${content?.saves?.toLocaleString()} saves`;
      case 'template':
        return `${content?.downloads?.toLocaleString()} downloads • ${content?.rating}★`;
      case 'course':
        return `${content?.students?.toLocaleString()} students • ${content?.rating}★`;
      default:
        return '';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2 mb-4">
          <Icon name="FolderOpen" size={20} />
          <span>Content Library</span>
        </h3>

        {/* Search and Filters */}
        <div className="space-y-3">
          <Input
            type="search"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />

          <div className="grid grid-cols-2 gap-2">
            <Select
              options={typeOptions}
              value={filterType}
              onChange={setFilterType}
              placeholder="Filter by type"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
            />
          </div>
        </div>
      </div>
      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredContent?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No content found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredContent?.map(content => (
              <div
                key={content?.id}
                className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-grab active:cursor-grabbing transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, content)}
              >
                <div className="flex items-start space-x-3">
                  {/* Thumbnail */}
                  <div className="w-16 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={content?.thumbnail}
                      alt={content?.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>

                  {/* Content Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {content?.title}
                      </h4>
                      <div className="flex items-center space-x-1 ml-2">
                        <div className={`w-2 h-2 rounded-full ${getTypeColor(content?.type)}`}></div>
                        <Icon name={getTypeIcon(content?.type)} size={12} className="text-muted-foreground" />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {content?.content}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatDate(content?.createdAt)}</span>
                      <div className={`px-2 py-1 rounded border ${getStatusColor(content?.status)}`}>
                        {content?.status}
                      </div>
                    </div>

                    {getContentStats(content) && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {getContentStats(content)}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {content?.tags?.slice(0, 2)?.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {content?.tags?.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                          +{content?.tags?.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onScheduleContent(content)}
                        className="h-6 px-2 text-xs"
                      >
                        <Icon name="Calendar" size={12} className="mr-1" />
                        Schedule
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                      >
                        <Icon name="Eye" size={12} className="mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredContent?.length} items</span>
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={14} className="mr-2" />
            Add Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentLibraryPanel;