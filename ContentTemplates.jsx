import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentTemplates = ({ onTemplateSelect, isVisible, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 'blog-intro',
      name: 'Blog Introduction',
      category: 'blog',
      description: 'Engaging blog post introduction template',
      content: `# [Your Blog Title Here]\n\nHave you ever wondered about [topic]? In today's fast-paced world, [relevant context] has become increasingly important.\n\nIn this post, we'll explore:\n• [Key point 1]\n• [Key point 2]\n• [Key point 3]\n\nLet's dive in!`
    },
    {
      id: 'social-announcement',name: 'Social Announcement',category: 'social',description: 'Professional announcement template',
      content: `🎉 Exciting news! \n\n[Your announcement here]\n\nThis means:\n✅ [Benefit 1]\n✅ [Benefit 2]\n✅ [Benefit 3]\n\nWhat do you think? Share your thoughts below! 👇\n\n#announcement #news #community`
    },
    {
      id: 'how-to-guide',name: 'How-To Guide',category: 'educational',description: 'Step-by-step guide template',
      content: `How to [Action/Goal] in [Timeframe]\n\nStep 1: [First step]\n[Brief explanation]\n\nStep 2: [Second step]\n[Brief explanation]\n\nStep 3: [Third step]\n[Brief explanation]\n\nPro tip: [Additional advice]\n\nTry this out and let me know how it works for you!`
    },
    {
      id: 'question-post',name: 'Engagement Question',category: 'social',description: 'Question to drive engagement',
      content: `Quick question for you: 🤔\n\n[Your question here]?\n\nI'm curious because [context/reason].\n\nDrop your answer in the comments - I read every single one! 💬\n\n#question #community #engagement`
    },
    {
      id: 'list-post',
      name: 'List Article',
      category: 'blog',
      description: 'Numbered list article template',
      content: `# [Number] [Things/Ways/Tips] to [Achieve Goal]\n\n[Brief introduction about the topic]\n\n## 1. [First item]\n[Explanation and details]\n\n## 2. [Second item]\n[Explanation and details]\n\n## 3. [Third item]\n[Explanation and details]\n\n## Conclusion\n[Wrap up and call to action]`
    },
    {
      id: 'thread-starter',
      name: 'Twitter Thread',
      category: 'thread',
      description: 'Multi-part Twitter thread template',
      content: `🧵 Thread: [Topic] (1/5)\n\n[Hook or interesting statement]\n\nHere's what I learned: 👇\n\n---\n\n2/ [First main point]\n\n[Supporting details]\n\n---\n\n3/ [Second main point]\n\n[Supporting details]\n\n---\n\n4/ [Third main point]\n\n[Supporting details]\n\n---\n\n5/ Key takeaways:\n\n• [Takeaway 1]\n• [Takeaway 2]\n• [Takeaway 3]\n\nWhat's your experience with [topic]?`
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'Grid3X3' },
    { id: 'blog', name: 'Blog Posts', icon: 'FileText' },
    { id: 'social', name: 'Social Media', icon: 'Share2' },
    { id: 'educational', name: 'Educational', icon: 'BookOpen' },
    { id: 'thread', name: 'Threads', icon: 'MessageSquare' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates?.filter(template => template?.category === selectedCategory);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-prominent w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Content Templates</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose a template to get started quickly
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Categories Sidebar */}
          <div className="w-64 border-r border-border p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Categories</h3>
            <div className="space-y-1">
              {categories?.map((category) => (
                <Button
                  key={category?.id}
                  variant={selectedCategory === category?.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category?.id)}
                  className="w-full justify-start"
                >
                  <Icon name={category?.icon} size={16} />
                  <span className="ml-2">{category?.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates?.map((template) => (
                <div
                  key={template?.id}
                  className="bg-muted rounded-lg p-4 border border-border hover:border-primary/50 transition-colors cursor-pointer group"
                  onClick={() => {
                    onTemplateSelect(template?.content);
                    onClose();
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {template?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {template?.description}
                      </p>
                    </div>
                    <Icon 
                      name="ArrowRight" 
                      size={16} 
                      className="text-muted-foreground group-hover:text-primary transition-colors" 
                    />
                  </div>
                  
                  <div className="bg-background rounded border p-3 text-xs text-muted-foreground font-mono leading-relaxed max-h-32 overflow-hidden relative">
                    <div className="whitespace-pre-wrap">
                      {template?.content?.substring(0, 200)}
                      {template?.content?.length > 200 && '...'}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"></div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category to see more templates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTemplates;