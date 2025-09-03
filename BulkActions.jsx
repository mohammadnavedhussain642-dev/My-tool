import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedItems, onBulkEdit, onBulkSchedule, onBulkDelete, onBulkExport, onClearSelection }) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const exportFormatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'docx', label: 'Word Document' },
    { value: 'txt', label: 'Text File' },
    { value: 'json', label: 'JSON Data' },
    { value: 'csv', label: 'CSV Spreadsheet' }
  ];

  const handleBulkExport = () => {
    onBulkExport(selectedItems, exportFormat);
    setShowExportOptions(false);
  };

  if (selectedItems?.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card border border-border rounded-lg shadow-prominent p-4 min-w-96">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{selectedItems?.length}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedItems?.length} item{selectedItems?.length > 1 ? 's' : ''} selected
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            iconName="X"
            className="h-8 w-8"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkEdit(selectedItems)}
            iconName="Edit3"
            iconPosition="left"
          >
            Edit
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkSchedule(selectedItems)}
            iconName="Calendar"
            iconPosition="left"
          >
            Schedule
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExportOptions(!showExportOptions)}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>

            {showExportOptions && (
              <div className="absolute bottom-full left-0 mb-2 w-64 bg-popover border border-border rounded-md shadow-moderate p-3">
                <div className="space-y-3">
                  <Select
                    label="Export Format"
                    options={exportFormatOptions}
                    value={exportFormat}
                    onChange={setExportFormat}
                  />
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowExportOptions(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleBulkExport}
                      className="flex-1"
                    >
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkDelete(selectedItems)}
            iconName="Trash2"
            iconPosition="left"
            className="text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/40"
          >
            Delete
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Quick actions:</span>
            <button
              onClick={() => onBulkSchedule(selectedItems, 'tomorrow')}
              className="text-primary hover:underline"
            >
              Schedule for tomorrow
            </button>
            <span>•</span>
            <button
              onClick={() => onBulkExport(selectedItems, 'pdf')}
              className="text-primary hover:underline"
            >
              Export as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;