import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import PricingCard from './components/PricingCard';
import FeatureComparison from './components/FeatureComparison';
import TestimonialSection from './components/TestimonialSection';
import FAQSection from './components/FAQSection';

const PricingPlans = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currentPlan, setCurrentPlan] = useState('pro'); // Mock current plan

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started with content creation',
      price: { monthly: 0, yearly: 0 },
      features: [
        '5 video uploads per month',
        '10 audio files per month',
        'Basic AI content generation',
        '50 social media posts',
        'Standard support',
        'Basic analytics'
      ],
      limitations: [
        'Watermark on exports',
        'Limited file formats',
        'No priority processing'
      ],
      buttonText: 'Get Started Free',
      isPopular: false,
      isCurrentPlan: currentPlan === 'free'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for content creators and small businesses',
      price: { monthly: 29, yearly: 290 },
      features: [
        '100 video uploads per month',
        '200 audio files per month',
        'Advanced AI content generation',
        'Unlimited social media posts',
        'Priority support',
        'Advanced analytics',
        'Custom templates',
        'API access',
        'Team collaboration (5 members)',
        'Content scheduling'
      ],
      limitations: [],
      buttonText: 'Upgrade to Pro',
      isPopular: true,
      isCurrentPlan: currentPlan === 'pro',
      badge: 'Most Popular'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large teams and organizations',
      price: { monthly: 99, yearly: 990 },
      features: [
        'Unlimited uploads',
        'Advanced AI models',
        'Custom AI training',
        'White-label solution',
        '24/7 dedicated support',
        'Custom integrations',
        'Advanced security features',
        'Team management',
        'Custom workflows',
        'SLA guarantee',
        'On-premise deployment'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      isPopular: false,
      isCurrentPlan: currentPlan === 'enterprise'
    }
  ];

  const handlePlanUpgrade = (planId) => {
    if (planId === currentPlan) return;
    
    if (planId === 'enterprise') {
      // Redirect to contact sales
      console.log('Redirect to contact sales');
    } else {
      // Handle upgrade/downgrade logic
      console.log(`Upgrading to ${planId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={handleMobileMenuToggle}
        isMenuOpen={isMobileMenuOpen}
      />
      
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleSidebarToggle}
        />
      </div>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Scale your content creation with our flexible pricing plans. 
              Upgrade or downgrade at any time with no long-term commitments.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-14 h-7 bg-muted rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'
                }`}></div>
              </button>
              <span className={`text-sm ${billingCycle === 'yearly' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <div className="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                Save 17%
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingPlans?.map((plan, index) => (
              <PricingCard
                key={plan?.id}
                plan={plan}
                billingCycle={billingCycle}
                onUpgrade={() => handlePlanUpgrade(plan?.id)}
                isCurrentPlan={plan?.isCurrentPlan}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-muted/50 rounded-lg p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Icon name="Shield" size={32} className="text-success mb-2" />
                <h4 className="font-medium text-foreground mb-1">Money-back Guarantee</h4>
                <p className="text-sm text-muted-foreground">30-day refund policy</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="CreditCard" size={32} className="text-primary mb-2" />
                <h4 className="font-medium text-foreground mb-1">Secure Payments</h4>
                <p className="text-sm text-muted-foreground">SSL encrypted & PCI compliant</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="Zap" size={32} className="text-warning mb-2" />
                <h4 className="font-medium text-foreground mb-1">Instant Activation</h4>
                <p className="text-sm text-muted-foreground">Start creating immediately</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="Users" size={32} className="text-secondary mb-2" />
                <h4 className="font-medium text-foreground mb-1">10,000+ Creators</h4>
                <p className="text-sm text-muted-foreground">Join our community</p>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <FeatureComparison plans={pricingPlans} />

          {/* Testimonials */}
          <TestimonialSection />

          {/* FAQ Section */}
          <FAQSection />

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team is here to help you choose the right plan for your needs. 
              Get in touch with our sales team for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Contact Sales
              </button>
              <button className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPlans;