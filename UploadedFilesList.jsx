import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadedFilesList = ({ files, onRemoveFile, onRetryUpload }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('video/')) return 'Video';
    if (type?.startsWith('audio/')) return 'Music';
    return 'File';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploading': return 'text-warning';
      case 'completed': return 'text-success';
      case 'error': return 'text-destructive';
      case 'processing': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading': return 'Upload';
      case 'completed': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      case 'processing': return 'Loader2';
      default: return 'Clock';
    }
  };

  if (files?.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No files uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground mb-4">Uploaded Files</h3>
      {files?.map((file, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-start space-x-4">
            {/* File Icon */}
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={getFileIcon(file?.type)} size={24} className="text-muted-foreground" />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {file?.name}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>{formatFileSize(file?.size)}</span>
                    {file?.duration && <span>{formatDuration(file?.duration)}</span>}
                    <span className="capitalize">{file?.type?.split('/')?.[0]}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  {file?.status === 'error' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRetryUpload(index)}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Retry
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFile(index)}
                    iconName="Trash2"
                    className="text-destructive hover:text-destructive"
                  >
                  </Button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-2 mt-3">
                <Icon 
                  name={getStatusIcon(file?.status)} 
                  size={16} 
                  className={`${getStatusColor(file?.status)} ${
                    file?.status === 'processing' || file?.status === 'uploading' ? 'animate-spin' : ''
                  }`}
                />
                <span className={`text-sm ${getStatusColor(file?.status)}`}>
                  {file?.status === 'uploading' && `Uploading... ${file?.progress || 0}%`}
                  {file?.status === 'completed' && 'Upload completed'}
                  {file?.status === 'error' && (file?.error || 'Upload failed')}
                  {file?.status === 'processing' && 'Processing...'}
                  {file?.status === 'pending' && 'Waiting to upload'}
                </span>
              </div>

              {/* Progress Bar */}
              {(file?.status === 'uploading' || file?.status === 'processing') && (
                <div className="w-full bg-border rounded-full h-1.5 mt-2">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      file?.status === 'uploading' ? 'bg-warning' : 'bg-primary'
                    }`}
                    style={{ width: `${file?.progress || 0}%` }}
                  ></div>
                </div>
              )}

              {/* File Preview Thumbnail */}
              {file?.thumbnail && (
                <div className="mt-3">
                  <img 
                    src={file?.thumbnail} 
                    alt="File preview"
                    className="w-20 h-20 object-cover rounded-lg border border-border"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadedFilesList;