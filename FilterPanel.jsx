import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters, isCollapsed, onToggleCollapse }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const contentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'video', label: 'Video Content' },
    { value: 'audio', label: 'Audio Content' },
    { value: 'text', label: 'Text Content' },
    { value: 'image', label: 'Image Content' }
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'YouTube', label: 'YouTube' },
    { value: 'Blog', label: 'Blog Posts' },
    { value: 'Thread', label: 'Threads' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'archived', label: 'Archived' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'views', label: 'Most Views' },
    { value: 'likes', label: 'Most Likes' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      contentType: 'all',
      platform: 'all',
      status: 'all',
      dateRange: { start: '', end: '' },
      sortBy: 'newest',
      showFavorites: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  if (isCollapsed) {
    return (
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onToggleCollapse}>
        <div 
          className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border p-6 overflow-y-auto"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              iconName="X"
            />
          </div>
          <FilterContent 
            localFilters={localFilters}
            handleFilterChange={handleFilterChange}
            handleClearAll={handleClearAll}
            contentTypeOptions={contentTypeOptions}
            platformOptions={platformOptions}
            statusOptions={statusOptions}
            sortOptions={sortOptions}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-80 bg-card border-l border-border p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>
      <FilterContent 
        localFilters={localFilters}
        handleFilterChange={handleFilterChange}
        handleClearAll={handleClearAll}
        contentTypeOptions={contentTypeOptions}
        platformOptions={platformOptions}
        statusOptions={statusOptions}
        sortOptions={sortOptions}
      />
    </div>
  );
};

const FilterContent = ({ 
  localFilters, 
  handleFilterChange, 
  handleClearAll, 
  contentTypeOptions, 
  platformOptions, 
  statusOptions, 
  sortOptions 
}) => (
  <div className="space-y-6">
    {/* Search */}
    <div>
      <Input
        label="Search Content"
        type="search"
        placeholder="Search by title, description..."
        value={localFilters?.search}
        onChange={(e) => handleFilterChange('search', e?.target?.value)}
        className="mb-4"
      />
    </div>

    {/* Content Type */}
    <div>
      <Select
        label="Content Type"
        options={contentTypeOptions}
        value={localFilters?.contentType}
        onChange={(value) => handleFilterChange('contentType', value)}
        className="mb-4"
      />
    </div>

    {/* Platform */}
    <div>
      <Select
        label="Platform"
        options={platformOptions}
        value={localFilters?.platform}
        onChange={(value) => handleFilterChange('platform', value)}
        className="mb-4"
      />
    </div>

    {/* Status */}
    <div>
      <Select
        label="Status"
        options={statusOptions}
        value={localFilters?.status}
        onChange={(value) => handleFilterChange('status', value)}
        className="mb-4"
      />
    </div>

    {/* Date Range */}
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">Date Range</label>
      <div className="space-y-2">
        <Input
          type="date"
          placeholder="Start date"
          value={localFilters?.dateRange?.start || ''}
          onChange={(e) => handleFilterChange('dateRange', { 
            ...localFilters?.dateRange, 
            start: e?.target?.value 
          })}
        />
        <Input
          type="date"
          placeholder="End date"
          value={localFilters?.dateRange?.end || ''}
          onChange={(e) => handleFilterChange('dateRange', { 
            ...localFilters?.dateRange, 
            end: e?.target?.value 
          })}
        />
      </div>
    </div>

    {/* Sort By */}
    <div>
      <Select
        label="Sort By"
        options={sortOptions}
        value={localFilters?.sortBy}
        onChange={(value) => handleFilterChange('sortBy', value)}
        className="mb-4"
      />
    </div>

    {/* Show Favorites */}
    <div>
      <Checkbox
        label="Show Favorites Only"
        checked={localFilters?.showFavorites}
        onChange={(e) => handleFilterChange('showFavorites', e?.target?.checked)}
      />
    </div>

    {/* Quick Filters */}
    <div>
      <label className="block text-sm font-medium text-foreground mb-3">Quick Filters</label>
      <div className="space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFilterChange('dateRange', { 
            start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0],
            end: new Date()?.toISOString()?.split('T')?.[0]
          })}
          className="w-full justify-start"
        >
          Last 7 Days
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFilterChange('dateRange', { 
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0],
            end: new Date()?.toISOString()?.split('T')?.[0]
          })}
          className="w-full justify-start"
        >
          Last 30 Days
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            handleFilterChange('status', 'published');
            handleFilterChange('sortBy', 'views');
          }}
          className="w-full justify-start"
        >
          Top Performing
        </Button>
      </div>
    </div>
  </div>
);

export default FilterPanel;