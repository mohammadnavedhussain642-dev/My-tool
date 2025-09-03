import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlatformPanel = ({ platform, content, onContentChange }) => {
  const getCharacterLimit = (platformId) => {
    const limits = {
      blog: null,
      instagram: 2200,
      linkedin: 3000,
      twitter: 280,
      facebook: 63206,
      reddit: 40000,
      discord: 2000,
      quora: 300000,
      threads: 500
    };
    return limits?.[platformId];
  };

  const getHashtagSuggestions = (platformId) => {
    const suggestions = {
      instagram: ['#content', '#socialmedia', '#marketing', '#creator', '#viral'],
      linkedin: ['#professional', '#business', '#networking', '#career', '#industry'],
      twitter: ['#trending', '#tech', '#news', '#discussion', '#community'],
      facebook: ['#engagement', '#share', '#community', '#business', '#local'],
      reddit: ['#discussion', '#community', '#advice', '#help', '#question'],
      threads: ['#threads', '#meta', '#social', '#conversation', '#trending']
    };
    return suggestions?.[platformId] || [];
  };

  const characterLimit = getCharacterLimit(platform?.id);
  const currentLength = content?.length;
  const isOverLimit = characterLimit && currentLength > characterLimit;
  const hashtagSuggestions = getHashtagSuggestions(platform?.id);

  const formatGuidelines = {
    blog: [
      "Use clear headings and subheadings",
      "Include engaging introduction and conclusion",
      "Break content into digestible paragraphs",
      "Add relevant images and links"
    ],
    instagram: [
      "Start with an engaging hook",
      "Use line breaks for readability",
      "Include relevant hashtags (5-10 recommended)",
      "Add call-to-action at the end"
    ],
    linkedin: [
      "Professional tone and language",
      "Include industry insights",
      "Use bullet points for key information",
      "Tag relevant connections or companies"
    ],
    twitter: [
      "Concise and impactful messaging",
      "Use relevant hashtags (1-2 recommended)",
      "Include mentions when appropriate",
      "Consider thread format for longer content"
    ],
    facebook: [
      "Conversational and engaging tone",
      "Ask questions to encourage interaction",
      "Use emojis sparingly but effectively",
      "Include relevant links and media"
    ],
    reddit: [
      "Follow subreddit rules and guidelines",
      "Provide value and context",
      "Use proper formatting (markdown supported)",
      "Engage authentically with community"
    ],
    discord: [
      "Casual and community-friendly tone",
      "Use Discord markdown formatting",
      "Consider channel-specific context",
      "Encourage discussion and interaction"
    ],
    quora: [
      "Answer format with clear structure",
      "Provide detailed explanations",
      "Include personal experience or expertise",
      "Use proper grammar and formatting"
    ],
    threads: [
      "Conversational and authentic tone",
      "Use line breaks for readability",
      "Include relevant hashtags",
      "Encourage replies and engagement"
    ]
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Platform Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name={platform?.icon} size={20} />
            <span>{platform?.name}</span>
          </h3>
          {characterLimit && (
            <div className={`text-sm font-medium ${
              isOverLimit ? 'text-destructive' : 
              currentLength > characterLimit * 0.8 ? 'text-warning' : 'text-muted-foreground'
            }`}>
              {currentLength}/{characterLimit}
            </div>
          )}
        </div>
        
        {platform?.description && (
          <p className="text-sm text-muted-foreground">{platform?.description}</p>
        )}
      </div>
      {/* Content Preview */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Preview Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Preview</h4>
            <Button variant="ghost" size="sm">
              <Icon name="Eye" size={16} />
              <span className="ml-1 hidden sm:inline">Preview</span>
            </Button>
          </div>
          
          <div className="bg-muted rounded-lg p-3 min-h-[120px] border-2 border-dashed border-border">
            <div className="text-sm text-foreground whitespace-pre-wrap">
              {content || "Your content will appear here..."}
            </div>
          </div>
        </div>

        {/* Character Count Progress */}
        {characterLimit && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Character Usage</span>
              <span className={isOverLimit ? 'text-destructive' : 'text-muted-foreground'}>
                {Math.round((currentLength / characterLimit) * 100)}%
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isOverLimit ? 'bg-destructive' : 
                  currentLength > characterLimit * 0.8 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${Math.min((currentLength / characterLimit) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Hashtag Suggestions */}
        {hashtagSuggestions?.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Suggested Hashtags</h4>
            <div className="flex flex-wrap gap-2">
              {hashtagSuggestions?.map((hashtag, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newContent = content + (content?.endsWith(' ') ? '' : ' ') + hashtag;
                    onContentChange(newContent);
                  }}
                  className="text-xs"
                >
                  {hashtag}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Formatting Guidelines */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Formatting Guidelines</h4>
          <ul className="space-y-2">
            {formatGuidelines?.[platform?.id]?.map((guideline, index) => (
              <li key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                <Icon name="Check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SEO Suggestions (for blog) */}
        {platform?.id === 'blog' && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">SEO Optimization</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-xs text-muted-foreground">Readability Score</span>
                <span className="text-xs font-medium text-success">Good (78/100)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-xs text-muted-foreground">SEO Score</span>
                <span className="text-xs font-medium text-warning">Fair (65/100)</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>• Add more relevant keywords</p>
                <p>• Include internal links</p>
                <p>• Optimize meta description</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="default"
          size="sm"
          className="w-full"
          iconName="Send"
          iconPosition="left"
        >
          Publish to {platform?.name}
        </Button>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            iconName="Calendar"
            iconPosition="left"
          >
            Schedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlatformPanel;