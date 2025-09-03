import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [theme, setTheme] = useState('light');
  const [processingStatus, setProcessingStatus] = useState({
    status: 'ready',
    progress: 0,
    message: 'Ready to process'
  });

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      description: 'Overview and analytics'
    },
    { 
      label: 'Upload', 
      path: '/content-upload', 
      icon: 'Upload',
      description: 'Upload new content'
    },
    { 
      label: 'Editor', 
      path: '/content-editor', 
      icon: 'Edit3',
      description: 'Edit and refine content'
    },
    { 
      label: 'Library', 
      path: '/content-library', 
      icon: 'FolderOpen',
      description: 'Manage your content'
    },
    { 
      label: 'Scheduler', 
      path: '/content-scheduler', 
      icon: 'Calendar',
      description: 'Schedule publications'
    }
  ];

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement?.classList?.toggle('dark', savedTheme === 'dark');

    // Simulate processing status updates
    const interval = setInterval(() => {
      const statuses = [
        { status: 'ready', progress: 0, message: 'Ready to process' },
        { status: 'processing', progress: 45, message: 'Processing video...' },
        { status: 'complete', progress: 100, message: 'Processing complete' }
      ];
      setProcessingStatus(statuses?.[Math.floor(Math.random() * statuses?.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement?.classList?.toggle('dark', newTheme === 'dark');
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'text-warning';
      case 'complete': return 'text-success';
      default: return 'text-success';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing': return 'Loader2';
      case 'complete': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  return (
    <aside className={`fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-72'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                ContentFlow Pro
              </span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="ml-auto"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            
            return (
              <div key={item?.path} className="relative group">
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-3'} h-10`}
                >
                  <Icon name={item?.icon} size={18} />
                  {!isCollapsed && (
                    <span className="ml-3 text-sm">{item?.label}</span>
                  )}
                </Button>
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-moderate opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                    <div className="text-xs font-medium text-popover-foreground">{item?.label}</div>
                    <div className="text-xs text-muted-foreground">{item?.description}</div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Processing Status */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="bg-muted rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">Processing Status</span>
                <Icon 
                  name={getStatusIcon(processingStatus?.status)} 
                  size={14} 
                  className={`${getStatusColor(processingStatus?.status)} ${
                    processingStatus?.status === 'processing' ? 'animate-spin' : ''
                  }`}
                />
              </div>
              
              {processingStatus?.status === 'processing' && (
                <div className="w-full bg-border rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${processingStatus?.progress}%` }}
                  ></div>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">{processingStatus?.message}</p>
            </div>
          </div>
        )}

        {/* User Account Section */}
        <div className="p-4 border-t border-border space-y-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-3'} h-10`}
          >
            <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={18} />
            {!isCollapsed && (
              <span className="ml-3 text-sm">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
            )}
          </Button>

          {/* User Profile */}
          {!isCollapsed && (
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('/profile')}
                  className="w-full justify-start px-2 h-8 text-xs"
                >
                  <Icon name="Settings" size={14} />
                  <span className="ml-2">Settings</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start px-2 h-8 text-xs text-destructive hover:text-destructive"
                >
                  <Icon name="LogOut" size={14} />
                  <span className="ml-2">Sign out</span>
                </Button>
              </div>
            </div>
          )}

          {/* Collapsed User Menu */}
          {isCollapsed && (
            <div className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="w-full h-10"
              >
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} color="white" />
                </div>
              </Button>
              
              {/* Tooltip for collapsed user menu */}
              <div className="absolute left-full bottom-0 ml-2 w-48 bg-popover border border-border rounded-md shadow-moderate opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} color="white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-popover-foreground">John Doe</p>
                      <p className="text-xs text-muted-foreground">Pro Plan</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground hover:text-popover-foreground cursor-pointer">Settings</div>
                    <div className="text-xs text-destructive cursor-pointer">Sign out</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;