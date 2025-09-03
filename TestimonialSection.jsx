import React from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      company: '@sarahcreates',
      content: 'ContentFlow Pro has revolutionized my content creation process. What used to take hours now takes minutes.',
      rating: 5,
      plan: 'Pro',
      avatar: 'S'
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director',
      company: 'TechStart Inc.',
      content: 'The Enterprise plan gives us everything we need to scale our content marketing across multiple brands.',
      rating: 5,
      plan: 'Enterprise',
      avatar: 'M'
    },
    {
      name: 'Emma Davis',
      role: 'Podcast Producer',
      company: 'Indie Podcaster',
      content: 'Started with the free plan and upgraded to Pro after seeing the amazing results. Best investment I\'ve made!',
      rating: 5,
      plan: 'Pro',
      avatar: 'E'
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)]?.map((_, index) => (
          <Icon
            key={index}
            name="Star"
            size={16}
            className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">What Our Users Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of creators who have transformed their content workflow with our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials?.map((testimonial, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            {/* Rating */}
            <div className="flex items-center justify-between mb-4">
              {renderStars(testimonial?.rating)}
              <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                {testimonial?.plan}
              </div>
            </div>

            {/* Content */}
            <blockquote className="text-foreground mb-6">
              "{testimonial?.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                {testimonial?.avatar}
              </div>
              <div>
                <div className="font-medium text-foreground">{testimonial?.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial?.role}</div>
                <div className="text-sm text-primary">{testimonial?.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-foreground mb-2">10,000+</div>
          <div className="text-sm text-muted-foreground">Active Users</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-foreground mb-2">4.9/5</div>
          <div className="text-sm text-muted-foreground">User Rating</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-foreground mb-2">50M+</div>
          <div className="text-sm text-muted-foreground">Content Pieces Created</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-foreground mb-2">99.9%</div>
          <div className="text-sm text-muted-foreground">Uptime</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;