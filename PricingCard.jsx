import React from 'react';
import Icon from '../../../components/AppIcon';

const PricingCard = ({ plan, billingCycle, onUpgrade, isCurrentPlan }) => {
  const price = plan?.price?.[billingCycle];
  const yearlyDiscount = billingCycle === 'yearly' ? (plan?.price?.monthly * 12 - plan?.price?.yearly) : 0;

  return (
    <div className={`relative bg-card border rounded-xl p-6 ${
      plan?.isPopular 
        ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-lg' 
        : 'border-border hover:border-primary/50'
    } transition-all duration-200`}>
      
      {/* Popular Badge */}
      {plan?.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
            {plan?.badge || 'Most Popular'}
          </div>
        </div>
      )}

      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute top-6 right-6">
          <div className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full text-xs font-medium">
            Current Plan
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">{plan?.name}</h3>
        <p className="text-muted-foreground mb-4">{plan?.description}</p>
        
        <div className="mb-4">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-foreground">${price}</span>
            {price > 0 && (
              <span className="text-muted-foreground ml-2">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            )}
          </div>
          
          {billingCycle === 'yearly' && yearlyDiscount > 0 && (
            <div className="text-sm text-success mt-2">
              Save ${yearlyDiscount} per year
            </div>
          )}
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-3 mb-8">
        {plan?.features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
        
        {plan?.limitations?.map((limitation, index) => (
          <div key={index} className="flex items-start space-x-3 opacity-60">
            <Icon name="X" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{limitation}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="space-y-4">
        <button
          onClick={onUpgrade}
          disabled={isCurrentPlan && plan?.id !== 'free'}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isCurrentPlan && plan?.id !== 'free' ?'bg-muted text-muted-foreground cursor-not-allowed'
              : plan?.isPopular
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
          }`}
        >
          {isCurrentPlan && plan?.id !== 'free' ?'Current Plan' 
            : plan?.buttonText
          }
        </button>
        
        {plan?.id === 'pro' && !isCurrentPlan && (
          <div className="text-center">
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              Start 14-day free trial
            </button>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-border text-center">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="CreditCard" size={12} />
            <span>Cancel anytime</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Secure billing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;