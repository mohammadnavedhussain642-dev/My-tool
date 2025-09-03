import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ 
  currentDate, 
  onDateChange, 
  viewMode, 
  onViewModeChange, 
  scheduledPosts, 
  onPostClick,
  onDateClick,
  onDragOver,
  onDrop 
}) => {
  const [draggedPost, setDraggedPost] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    let day = startOfWeek?.getDay();
    const diff = startOfWeek?.getDate() - day;
    startOfWeek?.setDate(diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      weekDays?.push(day);
    }
    return weekDays;
  };

  const getPostsForDate = (date) => {
    if (!date) return [];
    const dateStr = date?.toDateString();
    return scheduledPosts?.filter(post => 
      new Date(post.scheduledDate)?.toDateString() === dateStr
    );
  };

  const handleDragStart = (e, post) => {
    setDraggedPost(post);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedPost(null);
  };

  const handleDrop = (e, date) => {
    e?.preventDefault();
    if (draggedPost && date) {
      onDrop(draggedPost, date);
    }
    setDraggedPost(null);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    onDateChange(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(currentDate?.getDate() + (direction * 7));
    onDateChange(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(currentDate?.getDate() + direction);
    onDateChange(newDate);
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getPlatformIcon = (platform) => {
    const platformIcons = {
      instagram: 'Instagram',
      linkedin: 'Linkedin',
      twitter: 'Twitter',
      facebook: 'Facebook',
      youtube: 'Youtube',
      tiktok: 'Video',
      reddit: 'MessageCircle'
    };
    return platformIcons?.[platform] || 'Share2';
  };

  const getPlatformColor = (platform) => {
    const platformColors = {
      instagram: 'bg-pink-500',
      linkedin: 'bg-blue-600',
      twitter: 'bg-sky-500',
      facebook: 'bg-blue-700',
      youtube: 'bg-red-600',
      tiktok: 'bg-black',
      reddit: 'bg-orange-600'
    };
    return platformColors?.[platform] || 'bg-gray-500';
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-card rounded-lg border border-border">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth(-1)}
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">
              {currentDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateMonth(1)}
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('day')}
            >
              Day
            </Button>
          </div>
        </div>
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-b border-border">
          {weekDays?.map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days?.map((day, index) => {
            const posts = getPostsForDate(day);
            const isToday = day && day?.toDateString() === new Date()?.toDateString();
            const isCurrentMonth = day && day?.getMonth() === currentDate?.getMonth();

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b border-border last:border-r-0 ${
                  day ? 'cursor-pointer hover:bg-muted/50' : ''
                } ${isToday ? 'bg-primary/5' : ''} ${!isCurrentMonth ? 'opacity-50' : ''}`}
                onClick={() => day && onDateClick(day)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day)}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday ? 'text-primary' : 'text-foreground'
                    }`}>
                      {day?.getDate()}
                    </div>
                    <div className="space-y-1">
                      {posts?.slice(0, 3)?.map(post => (
                        <div
                          key={post?.id}
                          className="text-xs p-1 rounded bg-muted cursor-pointer hover:bg-muted/80 flex items-center space-x-1"
                          onClick={(e) => {
                            e?.stopPropagation();
                            onPostClick(post);
                          }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, post)}
                          onDragEnd={handleDragEnd}
                        >
                          <div className={`w-2 h-2 rounded-full ${getPlatformColor(post?.platform)}`}></div>
                          <span className="truncate flex-1">{post?.title}</span>
                        </div>
                      ))}
                      {posts?.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{posts?.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="bg-card rounded-lg border border-border">
        {/* Week Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateWeek(-1)}
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">
              {weekDays?.[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays?.[6]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateWeek(1)}
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>
        {/* Week Days Header */}
        <div className="grid grid-cols-8 border-b border-border">
          <div className="p-3 border-r border-border"></div>
          {weekDays?.map(day => {
            const isToday = day?.toDateString() === new Date()?.toDateString();
            return (
              <div key={day?.toISOString()} className={`p-3 text-center border-r border-border last:border-r-0 ${
                isToday ? 'bg-primary/5' : ''
              }`}>
                <div className="text-sm font-medium text-foreground">
                  {day?.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-semibold ${
                  isToday ? 'text-primary' : 'text-foreground'
                }`}>
                  {day?.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        {/* Time Slots */}
        <div className="max-h-96 overflow-y-auto">
          {hours?.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-border last:border-b-0">
              <div className="p-2 text-xs text-muted-foreground border-r border-border text-center">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              {weekDays?.map(day => {
                const dayPosts = getPostsForDate(day)?.filter(post => {
                  const postHour = new Date(post.scheduledDate)?.getHours();
                  return postHour === hour;
                });

                return (
                  <div
                    key={`${day?.toISOString()}-${hour}`}
                    className="min-h-[60px] p-1 border-r border-border last:border-r-0 hover:bg-muted/50 cursor-pointer"
                    onClick={() => onDateClick(new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour))}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour))}
                  >
                    {dayPosts?.map(post => (
                      <div
                        key={post?.id}
                        className="text-xs p-1 rounded bg-muted cursor-pointer hover:bg-muted/80 mb-1 flex items-center space-x-1"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onPostClick(post);
                        }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, post)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className={`w-2 h-2 rounded-full ${getPlatformColor(post?.platform)}`}></div>
                        <span className="truncate">{post?.title}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayPosts = getPostsForDate(currentDate);

    return (
      <div className="bg-card rounded-lg border border-border">
        {/* Day Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateDay(-1)}
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">
              {currentDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateDay(1)}
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>
        {/* Time Slots */}
        <div className="max-h-96 overflow-y-auto">
          {hours?.map(hour => {
            const hourPosts = dayPosts?.filter(post => {
              const postHour = new Date(post.scheduledDate)?.getHours();
              return postHour === hour;
            });

            return (
              <div key={hour} className="flex border-b border-border last:border-b-0">
                <div className="w-20 p-3 text-sm text-muted-foreground border-r border-border text-center">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
                <div
                  className="flex-1 min-h-[80px] p-3 hover:bg-muted/50 cursor-pointer"
                  onClick={() => onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour))}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour))}
                >
                  <div className="space-y-2">
                    {hourPosts?.map(post => (
                      <div
                        key={post?.id}
                        className="p-3 rounded-lg bg-muted cursor-pointer hover:bg-muted/80 flex items-center space-x-3"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onPostClick(post);
                        }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, post)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className={`w-3 h-3 rounded-full ${getPlatformColor(post?.platform)}`}></div>
                        <Icon name={getPlatformIcon(post?.platform)} size={16} className="text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{post?.title}</div>
                          <div className="text-xs text-muted-foreground">{formatTime(post?.scheduledDate)}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          post?.status === 'published' ? 'bg-success/10 text-success' :
                          post?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                        }`}>
                          {post?.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
    </div>
  );
};

export default CalendarView;