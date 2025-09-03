import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FeatureComparison = ({ plans }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const featureCategories = [
    {
      category: 'Content Processing',
      features: [
        { name: 'Video uploads per month', free: '5', pro: '100', enterprise: 'Unlimited' },
        { name: 'Audio files per month', free: '10', pro: '200', enterprise: 'Unlimited' },
        { name: 'Processing speed', free: 'Standard', pro: 'Fast', enterprise: 'Priority' },
        { name: 'File format support', free: 'Basic', pro: 'Extended', enterprise: 'All formats' }
      ]
    },
    {
      category: 'AI Features',
      features: [
        { name: 'AI content generation', free: 'Basic', pro: 'Advanced', enterprise: 'Custom AI' },
        { name: 'Custom templates', free: '✗', pro: '✓', enterprise: '✓' },
        { name: 'AI model training', free: '✗', pro: '✗', enterprise: '✓' },
        { name: 'Content optimization', free: '✗', pro: '✓', enterprise: '✓' }
      ]
    },
    {
      category: 'Collaboration',
      features: [
        { name: 'Team members', free: '1', pro: '5', enterprise: 'Unlimited' },
        { name: 'Content sharing', free: '✗', pro: '✓', enterprise: '✓' },
        { name: 'Role management', free: '✗', pro: '✗', enterprise: '✓' },
        { name: 'Workflow automation', free: '✗', pro: 'Basic', enterprise: 'Advanced' }
      ]
    },
    {
      category: 'Support & Security',
      features: [
        { name: 'Customer support', free: 'Community', pro: 'Email', enterprise: '24/7 Phone' },
        { name: 'SLA guarantee', free: '✗', pro: '✗', enterprise: '99.9%' },
        { name: 'Data encryption', free: 'Standard', pro: 'Advanced', enterprise: 'Enterprise-grade' },
        { name: 'Custom integrations', free: '✗', pro: 'API access', enterprise: 'Full custom' }
      ]
    }
  ];

  const displayedCategories = isExpanded ? featureCategories : featureCategories?.slice(0, 2);

  const formatFeatureValue = (value) => {
    if (value === '✓') return <Icon name="Check" size={16} className="text-success mx-auto" />;
    if (value === '✗') return <Icon name="X" size={16} className="text-muted-foreground mx-auto" />;
    return <span className="text-sm text-foreground">{value}</span>;
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Compare All Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See exactly what's included in each plan to make the best choice for your needs.
        </p>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Features</th>
                <th className="text-center p-4 font-medium text-foreground min-w-[120px]">Free</th>
                <th className="text-center p-4 font-medium text-foreground min-w-[120px] relative">
                  Pro
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                      Popular
                    </div>
                  </div>
                </th>
                <th className="text-center p-4 font-medium text-foreground min-w-[120px]">Enterprise</th>
              </tr>
            </thead>

            <tbody>
              {displayedCategories?.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  {/* Category Header */}
                  <tr className="bg-muted/20">
                    <td colSpan="4" className="p-4 font-semibold text-foreground border-t border-border">
                      {category?.category}
                    </td>
                  </tr>
                  
                  {/* Category Features */}
                  {category?.features?.map((feature, featureIndex) => (
                    <tr key={featureIndex} className="border-t border-border hover:bg-muted/20">
                      <td className="p-4 text-sm text-foreground">{feature?.name}</td>
                      <td className="p-4 text-center">{formatFeatureValue(feature?.free)}</td>
                      <td className="p-4 text-center bg-primary/5">{formatFeatureValue(feature?.pro)}</td>
                      <td className="p-4 text-center">{formatFeatureValue(feature?.enterprise)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Expand/Collapse Button */}
        <div className="p-4 border-t border-border bg-muted/20 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 mx-auto text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <span>{isExpanded ? 'Show Less' : 'Show All Features'}</span>
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison;