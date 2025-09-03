import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SchedulingModal = ({ 
  isOpen, 
  onClose, 
  onSchedule, 
  selectedDate, 
  selectedPost,
  mode = 'create' // 'create', 'edit', 'reschedule'
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    platforms: [],
    scheduledDate: '',
    scheduledTime: '',
    timezone: 'EST',
    recurring: false,
    recurringType: 'none',
    recurringDays: [],
    endDate: '',
    tags: [],
    priority: 'medium'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const platformOptions = [
    { value: 'instagram', label: 'Instagram', icon: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'Linkedin' },
    { value: 'twitter', label: 'Twitter', icon: 'Twitter' },
    { value: 'facebook', label: 'Facebook', icon: 'Facebook' },
    { value: 'youtube', label: 'YouTube', icon: 'Youtube' },
    { value: 'tiktok', label: 'TikTok', icon: 'Video' },
    { value: 'reddit', label: 'Reddit', icon: 'MessageCircle' }
  ];

  const timezoneOptions = [
    { value: 'EST', label: 'Eastern Time (EST)' },
    { value: 'PST', label: 'Pacific Time (PST)' },
    { value: 'GMT', label: 'Greenwich Mean Time (GMT)' },
    { value: 'IST', label: 'India Standard Time (IST)' },
    { value: 'JST', label: 'Japan Standard Time (JST)' },
    { value: 'AEST', label: 'Australian Eastern Time (AEST)' }
  ];

  const recurringOptions = [
    { value: 'none', label: 'No Repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const weekDays = [
    { value: 'monday', label: 'Mon' },
    { value: 'tuesday', label: 'Tue' },
    { value: 'wednesday', label: 'Wed' },
    { value: 'thursday', label: 'Thu' },
    { value: 'friday', label: 'Fri' },
    { value: 'saturday', label: 'Sat' },
    { value: 'sunday', label: 'Sun' }
  ];

  useEffect(() => {
    if (isOpen) {
      if (selectedPost && mode === 'edit') {
        // Populate form with existing post data
        setFormData({
          title: selectedPost?.title || '',
          content: selectedPost?.content || '',
          platforms: selectedPost?.platforms || [selectedPost?.platform],
          scheduledDate: selectedPost?.scheduledDate ? new Date(selectedPost.scheduledDate)?.toISOString()?.split('T')?.[0] : '',
          scheduledTime: selectedPost?.scheduledDate ? new Date(selectedPost.scheduledDate)?.toTimeString()?.slice(0, 5) : '',
          timezone: selectedPost?.timezone || 'EST',
          recurring: selectedPost?.recurring || false,
          recurringType: selectedPost?.recurringType || 'none',
          recurringDays: selectedPost?.recurringDays || [],
          endDate: selectedPost?.endDate || '',
          tags: selectedPost?.tags || [],
          priority: selectedPost?.priority || 'medium'
        });
      } else if (selectedDate) {
        // Set date from calendar selection
        setFormData(prev => ({
          ...prev,
          scheduledDate: selectedDate?.toISOString()?.split('T')?.[0],
          scheduledTime: selectedDate?.toTimeString()?.slice(0, 5)
        }));
      }
    }
  }, [isOpen, selectedPost, selectedDate, mode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData?.content?.trim()) {
      newErrors.content = 'Content is required';
    }

    if (formData?.platforms?.length === 0) {
      newErrors.platforms = 'Select at least one platform';
    }

    if (!formData?.scheduledDate) {
      newErrors.scheduledDate = 'Date is required';
    }

    if (!formData?.scheduledTime) {
      newErrors.scheduledTime = 'Time is required';
    }

    // Validate that scheduled time is in the future
    if (formData?.scheduledDate && formData?.scheduledTime) {
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
      if (scheduledDateTime <= new Date()) {
        newErrors.scheduledTime = 'Scheduled time must be in the future';
      }
    }

    if (formData?.recurring && formData?.recurringType === 'custom' && formData?.recurringDays?.length === 0) {
      newErrors.recurringDays = 'Select at least one day for custom recurring';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
      
      const postData = {
        ...formData,
        scheduledDate: scheduledDateTime?.toISOString(),
        id: selectedPost?.id || Date.now()?.toString(),
        status: 'scheduled',
        createdAt: new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      };

      await onSchedule(postData);
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        platforms: [],
        scheduledDate: '',
        scheduledTime: '',
        timezone: 'EST',
        recurring: false,
        recurringType: 'none',
        recurringDays: [],
        endDate: '',
        tags: [],
        priority: 'medium'
      });
      setErrors({});
    } catch (error) {
      console.error('Error scheduling post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlatformChange = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev?.platforms?.includes(platform)
        ? prev?.platforms?.filter(p => p !== platform)
        : [...prev?.platforms, platform]
    }));
  };

  const handleRecurringDayChange = (day) => {
    setFormData(prev => ({
      ...prev,
      recurringDays: prev?.recurringDays?.includes(day)
        ? prev?.recurringDays?.filter(d => d !== day)
        : [...prev?.recurringDays, day]
    }));
  };

  const getCharacterCount = (platform) => {
    const limits = {
      twitter: 280,
      instagram: 2200,
      linkedin: 3000,
      facebook: 63206,
      youtube: 5000,
      tiktok: 2200,
      reddit: 40000
    };
    return limits?.[platform] || 2200;
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'edit':
        return 'Edit Scheduled Post';
      case 'reschedule':
        return 'Reschedule Post';
      default:
        return 'Schedule New Post';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">{getModalTitle()}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <Input
            label="Post Title"
            type="text"
            value={formData?.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e?.target?.value }))}
            error={errors?.title}
            placeholder="Enter post title..."
            required
          />

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content *
            </label>
            <textarea
              value={formData?.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e?.target?.value }))}
              className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Write your post content..."
              required
            />
            {errors?.content && (
              <p className="text-sm text-destructive mt-1">{errors?.content}</p>
            )}
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Characters: {formData?.content?.length}</span>
              {formData?.platforms?.length > 0 && (
                <span>
                  Limit: {Math.min(...formData?.platforms?.map(p => getCharacterCount(p)))}
                </span>
              )}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Platforms *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {platformOptions?.map(platform => (
                <div key={platform?.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData?.platforms?.includes(platform?.value)}
                    onChange={() => handlePlatformChange(platform?.value)}
                  />
                  <Icon name={platform?.icon} size={16} />
                  <span className="text-sm text-foreground">{platform?.label}</span>
                </div>
              ))}
            </div>
            {errors?.platforms && (
              <p className="text-sm text-destructive mt-1">{errors?.platforms}</p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData?.scheduledDate}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e?.target?.value }))}
              error={errors?.scheduledDate}
              required
            />
            <Input
              label="Time"
              type="time"
              value={formData?.scheduledTime}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e?.target?.value }))}
              error={errors?.scheduledTime}
              required
            />
          </div>

          {/* Timezone */}
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={formData?.timezone}
            onChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}
          />

          {/* Recurring */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Checkbox
                checked={formData?.recurring}
                onChange={(e) => setFormData(prev => ({ ...prev, recurring: e?.target?.checked }))}
              />
              <label className="text-sm font-medium text-foreground">
                Recurring Post
              </label>
            </div>

            {formData?.recurring && (
              <div className="space-y-4 ml-6">
                <Select
                  label="Repeat"
                  options={recurringOptions}
                  value={formData?.recurringType}
                  onChange={(value) => setFormData(prev => ({ ...prev, recurringType: value }))}
                />

                {formData?.recurringType === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Repeat on days
                    </label>
                    <div className="flex space-x-2">
                      {weekDays?.map(day => (
                        <div key={day?.value} className="flex items-center space-x-1">
                          <Checkbox
                            checked={formData?.recurringDays?.includes(day?.value)}
                            onChange={() => handleRecurringDayChange(day?.value)}
                          />
                          <span className="text-xs text-foreground">{day?.label}</span>
                        </div>
                      ))}
                    </div>
                    {errors?.recurringDays && (
                      <p className="text-sm text-destructive mt-1">{errors?.recurringDays}</p>
                    )}
                  </div>
                )}

                <Input
                  label="End Date (Optional)"
                  type="date"
                  value={formData?.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e?.target?.value }))}
                />
              </div>
            )}
          </div>

          {/* Priority */}
          <Select
            label="Priority"
            options={priorityOptions}
            value={formData?.priority}
            onChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
          />

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Calendar"
              iconPosition="left"
            >
              {mode === 'edit' ? 'Update Post' : 'Schedule Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchedulingModal;