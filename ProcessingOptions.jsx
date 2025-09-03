import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProcessingOptions = ({ onStartProcessing, hasFiles, isProcessing }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedContentTypes, setSelectedContentTypes] = useState(['blog']);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram']);
  const [advancedOptions, setAdvancedOptions] = useState({
    includeTimestamps: false,
    generateSummary: true,
    optimizeForSEO: true,
    includeHashtags: true
  });

  const languageOptions = [
    { value: 'english', label: 'English', description: 'Primary language for transcription' },
    { value: 'hindi', label: 'Hindi', description: 'हिंदी भाषा में ट्रांसक्रिप्शन' },
    { value: 'auto', label: 'Auto-detect', description: 'Automatically detect language' }
  ];

  const contentTypeOptions = [
    { value: 'blog', label: 'Blog Post', description: 'Long-form article content' },
    { value: 'social', label: 'Social Media Posts', description: 'Platform-optimized posts' },
    { value: 'threads', label: 'Twitter Threads', description: 'Sequential tweet chains' },
    { value: 'summary', label: 'Content Summary', description: 'Key points and highlights' },
    { value: 'transcript', label: 'Full Transcript', description: 'Complete text transcription' }
  ];

  const platformOptions = [
    { value: 'instagram', label: 'Instagram', description: 'Visual-focused posts with hashtags' },
    { value: 'linkedin', label: 'LinkedIn', description: 'Professional networking content' },
    { value: 'twitter', label: 'Twitter/X', description: 'Short-form tweets and threads' },
    { value: 'facebook', label: 'Facebook', description: 'Engagement-optimized posts' },
    { value: 'reddit', label: 'Reddit', description: 'Community-specific formatting' },
    { value: 'discord', label: 'Discord', description: 'Server-friendly messages' },
    { value: 'quora', label: 'Quora', description: 'Question-answer structure' },
    { value: 'threads', label: 'Threads', description: 'Meta Threads optimization' }
  ];

  const handleContentTypeChange = (value) => {
    setSelectedContentTypes(prev => 
      prev?.includes(value) 
        ? prev?.filter(type => type !== value)
        : [...prev, value]
    );
  };

  const handlePlatformChange = (value) => {
    setSelectedPlatforms(prev => 
      prev?.includes(value) 
        ? prev?.filter(platform => platform !== value)
        : [...prev, value]
    );
  };

  const handleAdvancedOptionChange = (option, checked) => {
    setAdvancedOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  const handleStartProcessing = () => {
    const processingConfig = {
      language: selectedLanguage,
      contentTypes: selectedContentTypes,
      platforms: selectedPlatforms,
      advancedOptions
    };
    onStartProcessing(processingConfig);
  };

  const estimatedTime = selectedContentTypes?.length * selectedPlatforms?.length * 2; // 2 minutes per combination

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Processing Options</h3>
          <p className="text-sm text-muted-foreground">Configure AI transcription and content generation</p>
        </div>
      </div>
      {/* Language Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Transcription Language</label>
        <Select
          options={languageOptions}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          placeholder="Select language"
        />
      </div>
      {/* Content Types */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Content Types to Generate</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contentTypeOptions?.map((option) => (
            <div key={option?.value} className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <Checkbox
                checked={selectedContentTypes?.includes(option?.value)}
                onChange={(e) => handleContentTypeChange(option?.value)}
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{option?.label}</div>
                <div className="text-xs text-muted-foreground">{option?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Selection */}
      {selectedContentTypes?.includes('social') && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Target Platforms</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {platformOptions?.map((option) => (
              <div key={option?.value} className="flex items-start space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  checked={selectedPlatforms?.includes(option?.value)}
                  onChange={(e) => handlePlatformChange(option?.value)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{option?.label}</div>
                  <div className="text-xs text-muted-foreground">{option?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Advanced Options */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Advanced Options</label>
        <div className="space-y-3">
          <Checkbox
            label="Include timestamps in transcript"
            description="Add time markers for easy navigation"
            checked={advancedOptions?.includeTimestamps}
            onChange={(e) => handleAdvancedOptionChange('includeTimestamps', e?.target?.checked)}
          />
          <Checkbox
            label="Generate content summary"
            description="Create executive summary of key points"
            checked={advancedOptions?.generateSummary}
            onChange={(e) => handleAdvancedOptionChange('generateSummary', e?.target?.checked)}
          />
          <Checkbox
            label="SEO optimization"
            description="Include meta descriptions and keywords"
            checked={advancedOptions?.optimizeForSEO}
            onChange={(e) => handleAdvancedOptionChange('optimizeForSEO', e?.target?.checked)}
          />
          <Checkbox
            label="Include hashtags and mentions"
            description="Add relevant hashtags for social media"
            checked={advancedOptions?.includeHashtags}
            onChange={(e) => handleAdvancedOptionChange('includeHashtags', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Processing Summary */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Content types:</span>
          <span className="font-medium text-foreground">{selectedContentTypes?.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Target platforms:</span>
          <span className="font-medium text-foreground">{selectedPlatforms?.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estimated time:</span>
          <span className="font-medium text-foreground">{estimatedTime} minutes</span>
        </div>
      </div>
      {/* Start Processing Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={handleStartProcessing}
        disabled={!hasFiles || selectedContentTypes?.length === 0}
        loading={isProcessing}
        iconName="Play"
        iconPosition="left"
        className="mt-6"
      >
        {isProcessing ? 'Processing Content...' : 'Start AI Processing'}
      </Button>
      {!hasFiles && (
        <p className="text-sm text-muted-foreground text-center">
          Upload files to enable processing
        </p>
      )}
    </div>
  );
};

export default ProcessingOptions;