import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for Enterprise customers.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes! Pro plan comes with a 14-day free trial. No credit card required to start. You can also start with our Free plan and upgrade anytime.'
    },
    {
      question: 'What happens to my data if I downgrade?',
      answer: 'Your data remains safe. If you exceed your new plan\'s limits, you\'ll have read-only access to older content until you upgrade again or delete some files.'
    },
    {
      question: 'Do you offer educational discounts?',
      answer: 'Yes, we offer 50% discounts for students and educators. Contact our support team with your academic email for verification.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your billing period.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'Free users get community support, Pro users get email support with 24-hour response time, and Enterprise users get 24/7 phone and email support with dedicated account managers.'
    },
    {
      question: 'Are there any setup fees?',
      answer: 'No setup fees for Free and Pro plans. Enterprise plans may have implementation fees depending on custom requirements.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get answers to common questions about our pricing and plans.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq?.question}</span>
                <Icon 
                  name={openFAQ === index ? 'ChevronUp' : 'ChevronDown'} 
                  size={20} 
                  className="text-muted-foreground flex-shrink-0"
                />
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4 border-t border-border bg-muted/20">
                  <p className="text-muted-foreground pt-4">{faq?.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you choose the right plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Icon name="MessageCircle" size={16} />
                <span>Contact Support</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                <Icon name="Book" size={16} />
                <span>View Documentation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;