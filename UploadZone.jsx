import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { type: 'Video', formats: 'MP4, MOV, AVI, MKV', icon: 'Video', color: 'text-primary' },
    { type: 'Audio', formats: 'MP3, WAV, M4A, FLAC', icon: 'Headphones', color: 'text-secondary' }
  ];

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFileUpload(files);
  };

  const handleFileUpload = async (files) => {
    if (files?.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      if (onFileUpload) {
        onFileUpload(files);
      }
    }, 2000);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Upload</h3>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="video/*,audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Loader2" size={32} className="text-primary animate-spin" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">Uploading...</p>
              <p className="text-sm text-muted-foreground">Processing your files</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2 max-w-xs mx-auto">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Support for video and audio files up to 500MB
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={openFileDialog}
              iconName="FolderOpen"
              iconPosition="left"
              iconSize={16}
            >
              Browse Files
            </Button>
          </div>
        )}
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {supportedFormats?.map((format, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <Icon name={format?.icon} size={20} className={format?.color} />
            <div>
              <p className="text-sm font-medium text-foreground">{format?.type}</p>
              <p className="text-xs text-muted-foreground">{format?.formats}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadZone;