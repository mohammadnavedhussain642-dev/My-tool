import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GenerationOptions = ({
  selectedTypes,
  onTypesChange,
  selectedPlatforms,
  onPlatformsChange,
  seoEnabled,
  onSeoChange,
  tone,
  onToneChange,
  length,
  onLengthChange,
  onGenerate,
  isGenerating,
  progress,
  error
}) => {
  const contentTypes = [
    { id: 'blog', label: 'Blog Post', icon: 'FileText', description: 'Long-form SEO optimized content' },
    { id: 'social', label: 'Social Media', icon: 'Share2', description: 'Multi-platform social posts' },
    { id: 'email', label: 'Email Newsletter', icon: 'Mail', description: 'Email marketing content' },
    { id: 'video-script', label: 'Video Script', icon: 'Video', description: 'YouTube/social video scripts' }
  ];

  const platforms = [
    { id: 'wordpress', label: 'WordPress', icon: 'Globe' },
    { id: 'blogger', label: 'Blogger', icon: 'PenTool' },
    { id: 'medium', label: 'Medium', icon: 'BookOpen' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'Briefcase' },
    { id: 'twitter', label: 'Twitter/X', icon: 'Twitter' },
    { id: 'facebook', label: 'Facebook', icon: 'Facebook' }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal, authoritative tone' },
    { value: 'casual', label: 'Casual', description: 'Friendly, conversational tone' },
    { value: 'engaging', label: 'Engaging', description: 'Interactive, compelling tone' },
    { value: 'educational', label: 'Educational', description: 'Informative, teaching tone' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short', description: '300-600 words' },
    { value: 'medium', label: 'Medium', description: '600-1200 words' },
    { value: 'long', label: 'Long', description: '1200-2500 words' },
    { value: 'custom', label: 'Custom', description: 'Specify word count' }
  ];

  const handleTypeToggle = (typeId) => {
    if (selectedTypes?.includes(typeId)) {
      onTypesChange(selectedTypes?.filter(t => t !== typeId));
    } else {
      onTypesChange([...selectedTypes, typeId]);
    }
  };

  const handlePlatformToggle = (platformId) => {
    if (selectedPlatforms?.includes(platformId)) {
      onPlatformsChange(selectedPlatforms?.filter(p => p !== platformId));
    } else {
      onPlatformsChange([...selectedPlatforms, platformId]);
    }
  };

  const canGenerate = selectedTypes?.length > 0 && selectedPlatforms?.length > 0;

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Generation Options</h2>
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-primary" />
            <span className="text-sm text-muted-foreground">Configure AI Generation</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <span className="text-sm text-destructive">{error}</span>
            </div>
          </div>
        )}

        {/* Content Types Selection */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="FileText" size={16} className="text-foreground" />
            <span className="text-sm font-medium text-foreground">Content Types</span>
            <span className="text-xs text-muted-foreground">({selectedTypes?.length} selected)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contentTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => handleTypeToggle(type?.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedTypes?.includes(type?.id)
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border hover:border-muted-foreground bg-background'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${
                    selectedTypes?.includes(type?.id)
                      ? 'bg-primary/10' :'bg-muted'
                  }`}>
                    <Icon 
                      name={type?.icon} 
                      size={16} 
                      className={selectedTypes?.includes(type?.id) ? 'text-primary' : 'text-muted-foreground'} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{type?.label}</p>
                    <p className="text-xs text-muted-foreground">{type?.description}</p>
                  </div>
                  {selectedTypes?.includes(type?.id) && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Globe" size={16} className="text-foreground" />
            <span className="text-sm font-medium text-foreground">Target Platforms</span>
            <span className="text-xs text-muted-foreground">({selectedPlatforms?.length} selected)</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {platforms?.map((platform) => (
              <button
                key={platform?.id}
                onClick={() => handlePlatformToggle(platform?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                  selectedPlatforms?.includes(platform?.id)
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon name={platform?.icon} size={14} />
                <span className="text-sm">{platform?.label}</span>
                {selectedPlatforms?.includes(platform?.id) && (
                  <Icon name="Check" size={12} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Generation Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Tone Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="MessageSquare" size={16} className="text-foreground" />
              <span className="text-sm font-medium text-foreground">Content Tone</span>
            </div>
            
            <div className="space-y-2">
              {toneOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onToneChange(option?.value)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    tone === option?.value
                      ? 'border-primary bg-primary/5' :'border-border bg-background hover:border-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{option?.label}</p>
                      <p className="text-xs text-muted-foreground">{option?.description}</p>
                    </div>
                    {tone === option?.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Length Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="AlignLeft" size={16} className="text-foreground" />
              <span className="text-sm font-medium text-foreground">Content Length</span>
            </div>
            
            <div className="space-y-2">
              {lengthOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onLengthChange(option?.value)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    length === option?.value
                      ? 'border-primary bg-primary/5' :'border-border bg-background hover:border-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{option?.label}</p>
                      <p className="text-xs text-muted-foreground">{option?.description}</p>
                    </div>
                    {length === option?.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Optimization Toggle */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${seoEnabled ? 'bg-success/10' : 'bg-muted'}`}>
                <Icon 
                  name="Target" 
                  size={16} 
                  className={seoEnabled ? 'text-success' : 'text-muted-foreground'} 
                />
              </div>
              <div>
                <p className="font-medium text-foreground">SEO Optimization</p>
                <p className="text-xs text-muted-foreground">
                  Include meta descriptions, keywords, and SEO-friendly formatting
                </p>
              </div>
            </div>
            
            <button
              onClick={() => onSeoChange(!seoEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                seoEnabled ? 'bg-success' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  seoEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Generating Content...</span>
              </div>
              <span className="text-sm text-primary">{progress}%</span>
            </div>
            
            <div className="w-full bg-primary/20 rounded-full h-2 mb-3">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>• AI processing content</span>
                <span>• Optimizing for platforms</span>
                <span>• Generating variations</span>
              </div>
              <span>~{Math.ceil((100 - progress) * 0.5)}s remaining</span>
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedTypes?.length > 0 && selectedPlatforms?.length > 0 ? (
              <span>Ready to generate {selectedTypes?.length} content type(s) for {selectedPlatforms?.length} platform(s)</span>
            ) : (
              <span>Please select content types and platforms to continue</span>
            )}
          </div>
          
          <Button
            onClick={onGenerate}
            disabled={!canGenerate || isGenerating}
            size="lg"
            className="px-8"
          >
            {isGenerating ? (
              <>
                <Icon name="Loader2" size={18} className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Icon name="Wand2" size={18} className="mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerationOptions;