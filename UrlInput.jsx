import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UrlInput = ({ 
  value, 
  onChange, 
  onExtract, 
  isExtracting, 
  progress, 
  error, 
  placeholder 
}) => {
  const [isValidUrl, setIsValidUrl] = useState(false);

  const validateUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern?.test(url);
  };

  const handleInputChange = (e) => {
    const inputValue = e?.target?.value;
    onChange(inputValue);
    setIsValidUrl(validateUrl(inputValue));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (isValidUrl && !isExtracting) {
      onExtract();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Extract Content from URL</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Globe" size={20} className="text-primary" />
          <span className="text-sm text-muted-foreground">Web Scraper</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Link" size={16} className="text-muted-foreground" />
            <label htmlFor="url-input" className="text-sm font-medium text-foreground">
              Website URL
            </label>
          </div>
          
          <div className="relative">
            <input
              id="url-input"
              type="text"
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              className={`w-full px-4 py-3 rounded-lg border text-foreground bg-background transition-colors ${
                error 
                  ? 'border-destructive focus:border-destructive' 
                  : isValidUrl && value
                  ? 'border-success focus:border-success' :'border-border focus:border-primary'
              } focus:outline-none focus:ring-2 focus:ring-primary/20`}
              disabled={isExtracting}
            />
            
            {value && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isValidUrl ? (
                  <Icon name="CheckCircle" size={20} className="text-success" />
                ) : (
                  <Icon name="AlertCircle" size={20} className="text-destructive" />
                )}
              </div>
            )}
          </div>
          
          {error && (
            <div className="flex items-center space-x-2 mt-2 text-sm text-destructive">
              <Icon name="AlertTriangle" size={14} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* URL Preview */}
        {isValidUrl && value && (
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Eye" size={14} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                URL Preview
              </span>
            </div>
            <p className="text-sm text-foreground break-all">{value}</p>
          </div>
        )}

        {/* Extraction Progress */}
        {isExtracting && (
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Download" size={16} className="text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Extracting Content...</span>
              </div>
              <span className="text-sm text-primary">{progress}%</span>
            </div>
            
            <div className="w-full bg-primary/20 rounded-full h-2 mb-3">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>• Fetching webpage content</span>
              <span>• Analyzing structure</span>
              <span>• Extracting key information</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={14} />
            <span>SSL secured extraction</span>
          </div>
          
          <div className="flex items-center space-x-3">
            {value && !isExtracting && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            )}
            
            <Button
              type="submit"
              disabled={!isValidUrl || isExtracting}
              className="px-6 py-2"
            >
              {isExtracting ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                  Extracting...
                </>
              ) : (
                <>
                  <Icon name="Download" size={16} className="mr-2" />
                  Extract Content
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
      {/* Supported Websites Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Info" size={14} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Supported Websites</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['Blog Posts', 'News Articles', 'Medium', 'Substack', 'WordPress', 'Ghost']?.map((site) => (
            <span 
              key={site}
              className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
            >
              {site}
            </span>
          ))}
          <span className="px-2 py-1 text-xs bg-primary/10 rounded-md text-primary">
            +Many More
          </span>
        </div>
      </div>
    </div>
  );
};

export default UrlInput;