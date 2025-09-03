import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Upload', path: '/content-upload', icon: 'Upload' },
    { label: 'Editor', path: '/content-editor', icon: 'Edit3' },
    { label: 'Library', path: '/content-library', icon: 'FolderOpen' },
    { label: 'Scheduler', path: '/content-scheduler', icon: 'Calendar' }
  ];

  const moreItems = [
    { label: 'Performance Analytics', path: '/performance-analytics', icon: 'Activity' },
    { label: 'Pricing Plans', path: '/pricing-plans', icon: 'DollarSign' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Analytics', path: '/analytics', icon: 'BarChart3' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logging out...');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">
              ContentFlow Pro
            </span>
          </div>
        </div>

        {/* Center Section - Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={location?.pathname === item?.path ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              className="flex items-center space-x-2"
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Button>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </Button>

            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-moderate z-50">
                <div className="py-1">
                  {moreItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => {
                        handleNavigation(item?.path);
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section - User Menu */}
        <div className="flex items-center space-x-3">
          {/* Processing Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Ready</span>
          </div>

          {/* User Account Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUserMenuToggle}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon name="ChevronDown" size={16} className="hidden sm:block" />
            </Button>

            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-moderate z-50">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleNavigation('/profile');
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavigation('/billing');
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
                  >
                    <Icon name="CreditCard" size={16} />
                    <span>Billing</span>
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  handleNavigation(item?.path);
                  onMenuToggle();
                }}
                className="w-full justify-start space-x-3"
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Button>
            ))}
            
            <div className="border-t border-border my-4"></div>
            
            {moreItems?.map((item) => (
              <Button
                key={item?.path}
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleNavigation(item?.path);
                  onMenuToggle();
                }}
                className="w-full justify-start space-x-3"
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;