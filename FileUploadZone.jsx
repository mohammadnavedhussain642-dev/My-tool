import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFileSelect, isUploading, uploadProgress }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

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
    const validFiles = files?.filter(file => 
      file?.type?.startsWith('video/') || file?.type?.startsWith('audio/')
    );
    if (validFiles?.length > 0) {
      onFileSelect(validFiles);
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onFileSelect(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : isUploading
            ? 'border-warning bg-warning/5' :'border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5'
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
          onChange={handleFileInput}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-warning/20 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-warning animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Uploading Files...</h3>
              <div className="w-full max-w-xs mx-auto bg-border rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {isDragOver ? 'Drop files here' : 'Upload your content'}
              </h3>
              <p className="text-muted-foreground">
                Drag and drop video or audio files, or click to browse
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-muted rounded">MP4</span>
                <span className="px-2 py-1 bg-muted rounded">MOV</span>
                <span className="px-2 py-1 bg-muted rounded">AVI</span>
                <span className="px-2 py-1 bg-muted rounded">MP3</span>
                <span className="px-2 py-1 bg-muted rounded">WAV</span>
                <span className="px-2 py-1 bg-muted rounded">M4A</span>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleBrowseClick}
              iconName="FolderOpen"
              iconPosition="left"
              className="mt-4"
            >
              Browse Files
            </Button>
          </div>
        )}

        <div className="mt-6 text-xs text-muted-foreground">
          Maximum file size: 500MB per file
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;