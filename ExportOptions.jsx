import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportOptions = ({ content, isVisible, onClose }) => {
  const [selectedFormats, setSelectedFormats] = useState(['pdf']);
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Document',
      description: 'Professional PDF with formatting',
      icon: 'FileText',
      extension: '.pdf'
    },
    {
      id: 'docx',
      name: 'Word Document',
      description: 'Microsoft Word compatible format',
      icon: 'FileType',
      extension: '.docx'
    },
    {
      id: 'txt',
      name: 'Plain Text',
      description: 'Simple text file without formatting',
      icon: 'File',
      extension: '.txt'
    },
    {
      id: 'html',
      name: 'HTML File',
      description: 'Web-ready HTML document',
      icon: 'Code',
      extension: '.html'
    },
    {
      id: 'markdown',
      name: 'Markdown',
      description: 'Markdown formatted text',
      icon: 'Hash',
      extension: '.md'
    }
  ];

  const socialPlatforms = [
    {
      id: 'instagram',
      name: 'Instagram Post',
      description: 'Optimized for Instagram sharing',
      icon: 'Instagram',
      color: 'text-pink-600'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Article',
      description: 'Professional LinkedIn format',
      icon: 'Linkedin',
      color: 'text-blue-700'
    },
    {
      id: 'twitter',
      name: 'Twitter Thread',
      description: 'Split into Twitter-sized chunks',
      icon: 'Twitter',
      color: 'text-sky-500'
    },
    {
      id: 'facebook',
      name: 'Facebook Post',
      description: 'Facebook-optimized content',
      icon: 'Facebook',
      color: 'text-blue-600'
    }
  ];

  const handleFormatToggle = (formatId) => {
    setSelectedFormats(prev => 
      prev?.includes(formatId) 
        ? prev?.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleExport = async () => {
    if (selectedFormats?.length === 0) return;
    
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would trigger actual file downloads
    selectedFormats?.forEach(format => {
      const formatInfo = exportFormats?.find(f => f?.id === format);
      console.log(`Exporting as ${formatInfo?.name}...`);
      
      // Create and trigger download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `content-${Date.now()}${formatInfo?.extension}`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
    });
    
    setIsExporting(false);
    onClose();
  };

  const handleDirectPublish = (platformId) => {
    console.log(`Publishing to ${platformId}...`);
    // In a real app, this would integrate with platform APIs
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-prominent w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Export & Publish</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose how you want to export or publish your content
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

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* File Export Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Export as File</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exportFormats?.map((format) => (
                <div
                  key={format?.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedFormats?.includes(format?.id)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleFormatToggle(format?.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedFormats?.includes(format?.id) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <Icon name={format?.icon} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{format?.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format?.description}
                      </p>
                    </div>
                    {selectedFormats?.includes(format?.id) && (
                      <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Publishing Section */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Direct Publishing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socialPlatforms?.map((platform) => (
                <div
                  key={platform?.id}
                  className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer group"
                  onClick={() => handleDirectPublish(platform?.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Icon name={platform?.icon} size={16} className={platform?.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {platform?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {platform?.description}
                      </p>
                    </div>
                    <Icon 
                      name="ExternalLink" 
                      size={16} 
                      className="text-muted-foreground group-hover:text-primary transition-colors" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Settings */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Export Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Include metadata</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Add timestamp</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Compress files</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {selectedFormats?.length} format{selectedFormats?.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              disabled={selectedFormats?.length === 0 || isExporting}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Exporting...' : 'Export Files'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;