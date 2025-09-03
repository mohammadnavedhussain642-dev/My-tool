import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  iconColor = "var(--color-primary)", 
  buttonText = "Get Started", 
  onClick,
  isNew = false,
  disabled = false 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-moderate transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          disabled ? 'bg-muted' : 'bg-primary/10'
        }`}>
          <Icon 
            name={icon} 
            size={24} 
            color={disabled ? "var(--color-muted-foreground)" : iconColor} 
          />
        </div>
        {isNew && (
          <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
            New
          </span>
        )}
      </div>
      
      <h3 className={`text-lg font-semibold mb-2 ${
        disabled ? 'text-muted-foreground' : 'text-foreground'
      }`}>
        {title}
      </h3>
      
      <p className={`text-sm mb-4 ${
        disabled ? 'text-muted-foreground' : 'text-muted-foreground'
      }`}>
        {description}
      </p>
      
      <Button
        variant={disabled ? "ghost" : "outline"}
        size="sm"
        onClick={onClick}
        disabled={disabled}
        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        iconName="ArrowRight"
        iconPosition="right"
        iconSize={16}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default FeatureCard;