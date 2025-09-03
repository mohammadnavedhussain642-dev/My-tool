import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ContentEditor = ({ 
  content, 
  onContentChange, 
  placeholder = "Start writing your content...",
  readOnly = false 
}) => {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    if (content) {
      const words = content?.trim()?.split(/\s+/)?.filter(word => word?.length > 0)?.length;
      const characters = content?.length;
      const avgWordsPerMinute = 200;
      const estimatedReadingTime = Math.ceil(words / avgWordsPerMinute);
      
      setWordCount(words);
      setCharacterCount(characters);
      setReadingTime(estimatedReadingTime);
    } else {
      setWordCount(0);
      setCharacterCount(0);
      setReadingTime(0);
    }
  }, [content]);

  const handleContentChange = (e) => {
    const newContent = e?.target?.value;
    onContentChange(newContent);
  };

  const handleKeyDown = (e) => {
    // Handle keyboard shortcuts
    if (e?.ctrlKey || e?.metaKey) {
      switch (e?.key) {
        case 's':
          e?.preventDefault();
          // Trigger save
          break;
        case 'z':
          if (!e?.shiftKey) {
            e?.preventDefault();
            // Trigger undo
          }
          break;
        case 'y':
          e?.preventDefault();
          // Trigger redo
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Editor Area */}
      <div className="flex-1 relative">
        <textarea
          ref={editorRef}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          className="w-full h-full p-6 bg-transparent border-none outline-none resize-none text-foreground placeholder-muted-foreground text-base leading-relaxed font-normal"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.6'
          }}
        />
        
        {/* Floating Stats */}
        {content && (
          <div className="absolute bottom-4 right-4 bg-popover border border-border rounded-lg shadow-moderate p-3 space-y-1">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="FileText" size={12} />
              <span>{wordCount} words</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Type" size={12} />
              <span>{characterCount} characters</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>{readingTime} min read</span>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-3 bg-muted border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>{wordCount} words</span>
          <span>{characterCount} characters</span>
          <span>{readingTime} min read</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Auto-saved</span>
          </div>
          <span>•</span>
          <span>Last saved 2 minutes ago</span>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;