import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlatformTabs = ({ activePlatform, onPlatformChange, platforms }) => {
  const platformIcons = {
    blog: 'FileText',
    instagram: 'Instagram',
    linkedin: 'Linkedin',
    twitter: 'Twitter',
    facebook: 'Facebook',
    reddit: 'MessageCircle',
    discord: 'MessageSquare',
    quora: 'HelpCircle',
    threads: 'AtSign'
  };

  const platformColors = {
    blog: 'text-blue-600',
    instagram: 'text-pink-600',
    linkedin: 'text-blue-700',
    twitter: 'text-sky-500',
    facebook: 'text-blue-600',
    reddit: 'text-orange-600',
    discord: 'text-indigo-600',
    quora: 'text-red-600',
    threads: 'text-gray-800'
  };

  return (
    <div className="flex items-center space-x-1 p-2 bg-muted rounded-lg overflow-x-auto">
      {platforms?.map((platform) => (
        <Button
          key={platform?.id}
          variant={activePlatform === platform?.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onPlatformChange(platform?.id)}
          className="flex items-center space-x-2 whitespace-nowrap"
        >
          <Icon 
            name={platformIcons?.[platform?.id] || 'Globe'} 
            size={16} 
            className={activePlatform !== platform?.id ? platformColors?.[platform?.id] : ''}
          />
          <span className="hidden sm:inline">{platform?.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default PlatformTabs;