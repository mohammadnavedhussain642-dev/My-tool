import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EditorToolbar = ({ 
  onFormat, 
  activeFormats = [], 
  onUndo, 
  onRedo, 
  canUndo = false, 
  canRedo = false,
  onSave,
  isSaving = false
}) => {
  const formatButtons = [
    { name: 'bold', icon: 'Bold', tooltip: 'Bold (Ctrl+B)' },
    { name: 'italic', icon: 'Italic', tooltip: 'Italic (Ctrl+I)' },
    { name: 'underline', icon: 'Underline', tooltip: 'Underline (Ctrl+U)' },
    { name: 'strikethrough', icon: 'Strikethrough', tooltip: 'Strikethrough' }
  ];

  const listButtons = [
    { name: 'bulletList', icon: 'List', tooltip: 'Bullet List' },
    { name: 'numberedList', icon: 'ListOrdered', tooltip: 'Numbered List' }
  ];

  const alignButtons = [
    { name: 'alignLeft', icon: 'AlignLeft', tooltip: 'Align Left' },
    { name: 'alignCenter', icon: 'AlignCenter', tooltip: 'Align Center' },
    { name: 'alignRight', icon: 'AlignRight', tooltip: 'Align Right' }
  ];

  const insertButtons = [
    { name: 'link', icon: 'Link', tooltip: 'Insert Link' },
    { name: 'image', icon: 'Image', tooltip: 'Insert Image' },
    { name: 'quote', icon: 'Quote', tooltip: 'Quote' }
  ];

  const isActive = (format) => activeFormats?.includes(format);

  return (
    <div className="flex items-center justify-between p-3 bg-card border-b border-border">
      <div className="flex items-center space-x-1">
        {/* Undo/Redo */}
        <div className="flex items-center space-x-1 mr-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Icon name="Undo2" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Icon name="Redo2" size={16} />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2"></div>

        {/* Text Formatting */}
        <div className="flex items-center space-x-1 mr-3">
          {formatButtons?.map((button) => (
            <Button
              key={button?.name}
              variant={isActive(button?.name) ? "default" : "ghost"}
              size="sm"
              onClick={() => onFormat(button?.name)}
              title={button?.tooltip}
            >
              <Icon name={button?.icon} size={16} />
            </Button>
          ))}
        </div>

        <div className="w-px h-6 bg-border mx-2"></div>

        {/* Lists */}
        <div className="flex items-center space-x-1 mr-3">
          {listButtons?.map((button) => (
            <Button
              key={button?.name}
              variant={isActive(button?.name) ? "default" : "ghost"}
              size="sm"
              onClick={() => onFormat(button?.name)}
              title={button?.tooltip}
            >
              <Icon name={button?.icon} size={16} />
            </Button>
          ))}
        </div>

        <div className="w-px h-6 bg-border mx-2"></div>

        {/* Alignment */}
        <div className="flex items-center space-x-1 mr-3">
          {alignButtons?.map((button) => (
            <Button
              key={button?.name}
              variant={isActive(button?.name) ? "default" : "ghost"}
              size="sm"
              onClick={() => onFormat(button?.name)}
              title={button?.tooltip}
            >
              <Icon name={button?.icon} size={16} />
            </Button>
          ))}
        </div>

        <div className="w-px h-6 bg-border mx-2"></div>

        {/* Insert Elements */}
        <div className="flex items-center space-x-1">
          {insertButtons?.map((button) => (
            <Button
              key={button?.name}
              variant="ghost"
              size="sm"
              onClick={() => onFormat(button?.name)}
              title={button?.tooltip}
            >
              <Icon name={button?.icon} size={16} />
            </Button>
          ))}
        </div>
      </div>
      {/* Save Button */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-muted-foreground">
          Auto-saved 2 minutes ago
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;