import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BatchProcessor = ({ urls, onProcess, isProcessing }) => {
  const [urlList, setUrlList] = useState('');
  const [parsedUrls, setParsedUrls] = useState([]);
  const [processingQueue, setProcessingQueue] = useState([]);
  const [completedUrls, setCompletedUrls] = useState([]);
  const [failedUrls, setFailedUrls] = useState([]);

  const handleUrlListChange = (e) => {
    const value = e?.target?.value;
    setUrlList(value);
    
    // Parse URLs from text
    const urlPattern = /https?:\/\/[^\s]+/g;
    const matches = value?.match(urlPattern) || [];
    const uniqueUrls = [...new Set(matches)];
    setParsedUrls(uniqueUrls);
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file && file?.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e?.target?.result;
        setUrlList(content);
        handleUrlListChange({ target: { value: content } });
      };
      reader?.readAsText(file);
    }
  };

  const validateUrl = (url) => {
    const urlPattern = /^https?:\/\/[^\s]+\.[^\s]+/;
    return urlPattern?.test(url);
  };

  const removeUrl = (indexToRemove) => {
    const newUrls = parsedUrls?.filter((_, index) => index !== indexToRemove);
    setParsedUrls(newUrls);
    
    // Update the text area to reflect the change
    const newUrlText = newUrls?.join('\n');
    setUrlList(newUrlText);
  };

  const handleBatchProcess = () => {
    const validUrls = parsedUrls?.filter(validateUrl);
    if (validUrls?.length > 0) {
      setProcessingQueue(validUrls);
      setCompletedUrls([]);
      setFailedUrls([]);
      onProcess(validUrls);
    }
  };

  const clearAll = () => {
    setUrlList('');
    setParsedUrls([]);
    setProcessingQueue([]);
    setCompletedUrls([]);
    setFailedUrls([]);
  };

  const getUrlStatus = (url) => {
    if (completedUrls?.includes(url)) return 'completed';
    if (failedUrls?.includes(url)) return 'failed';
    if (processingQueue?.includes(url)) return 'processing';
    return 'pending';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'failed': return <Icon name="XCircle" size={16} className="text-destructive" />;
      case 'processing': return <Icon name="Loader2" size={16} className="text-warning animate-spin" />;
      default: return <Icon name="Clock" size={16} className="text-muted-foreground" />;
    }
  };

  const validUrlCount = parsedUrls?.filter(validateUrl)?.length;
  const invalidUrlCount = parsedUrls?.length - validUrlCount;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Batch URL Processing</h2>
          <p className="text-sm text-muted-foreground">
            Process multiple URLs simultaneously for bulk content generation
          </p>
        </div>
        
        <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full">
          <Icon name="Layers" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Batch Mode</span>
        </div>
      </div>

      {/* URL Input Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Text Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Type" size={16} className="text-foreground" />
              <span className="text-sm font-medium text-foreground">Paste URLs</span>
            </div>
            <span className="text-xs text-muted-foreground">
              One URL per line
            </span>
          </div>
          
          <textarea
            value={urlList}
            onChange={handleUrlListChange}
            placeholder={`Paste URLs here, one per line:
https://example1.com/article
https://example2.com/blog-post
https://example3.com/content`}
            className="w-full h-40 px-4 py-3 rounded-lg border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            disabled={isProcessing}
          />
        </div>

        {/* File Upload */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Upload" size={16} className="text-foreground" />
            <span className="text-sm font-medium text-foreground">Upload Text File</span>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Icon name="FileText" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              Upload a .txt file containing URLs
            </p>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
              id="url-file-upload"
              disabled={isProcessing}
            />
            <label
              htmlFor="url-file-upload"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/80 transition-colors"
            >
              <Icon name="Upload" size={14} />
              <span>Choose File</span>
            </label>
          </div>
        </div>
      </div>

      {/* URL List Preview */}
      {parsedUrls?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="List" size={16} className="text-foreground" />
              <span className="text-sm font-medium text-foreground">Detected URLs</span>
              <div className="flex items-center space-x-4 text-xs">
                <span className="text-success">{validUrlCount} valid</span>
                {invalidUrlCount > 0 && (
                  <span className="text-destructive">{invalidUrlCount} invalid</span>
                )}
              </div>
            </div>
            
            <button
              onClick={clearAll}
              className="text-sm text-destructive hover:text-destructive/80 transition-colors"
              disabled={isProcessing}
            >
              Clear All
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto border border-border rounded-lg">
            {parsedUrls?.map((url, index) => {
              const isValid = validateUrl(url);
              const status = getUrlStatus(url);
              
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 border-b border-border last:border-b-0 ${
                    !isValid ? 'bg-destructive/5' : status === 'completed' ? 'bg-success/5' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getStatusIcon(status)}
                    <span className={`text-sm truncate ${
                      isValid ? 'text-foreground' : 'text-destructive'
                    }`}>
                      {url}
                    </span>
                    {!isValid && (
                      <span className="text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">
                        Invalid
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => removeUrl(index)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    disabled={isProcessing}
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Processing Status */}
      {isProcessing && processingQueue?.length > 0 && (
        <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Loader2" size={16} className="text-primary animate-spin" />
              <span className="text-sm font-medium text-primary">Processing URLs...</span>
            </div>
            <span className="text-sm text-primary">
              {completedUrls?.length + failedUrls?.length} of {processingQueue?.length}
            </span>
          </div>
          
          <div className="w-full bg-primary/20 rounded-full h-2 mb-3">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((completedUrls?.length + failedUrls?.length) / processingQueue?.length) * 100}%` 
              }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Processing at ~2 URLs per minute</span>
            <span>
              ETA: {Math.ceil((processingQueue?.length - completedUrls?.length - failedUrls?.length) * 30 / 60)} min
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={14} />
            <span>Concurrent processing</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={14} />
            <span>Rate limited for stability</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setParsedUrls(prev => prev?.filter(validateUrl))}
            disabled={isProcessing || parsedUrls?.length === 0}
          >
            <Icon name="Filter" size={16} className="mr-2" />
            Remove Invalid
          </Button>
          
          <Button
            onClick={handleBatchProcess}
            disabled={validUrlCount === 0 || isProcessing}
            className="px-6"
          >
            {isProcessing ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Icon name="Play" size={16} className="mr-2" />
                Process {validUrlCount} URLs
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={14} className="text-warning" />
          <span className="text-sm font-medium text-foreground">Batch Processing Tips</span>
        </div>
        
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Maximum 50 URLs per batch for optimal performance</li>
          <li>• URLs are processed sequentially to avoid rate limits</li>
          <li>• Failed URLs can be retried individually</li>
          <li>• Generated content will be available in your library</li>
        </ul>
      </div>
    </div>
  );
};

export default BatchProcessor;