import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsPanel = () => {
  // Mock analytics data
  const weeklyPostsData = [
    { day: 'Mon', posts: 12, engagement: 85 },
    { day: 'Tue', posts: 15, engagement: 92 },
    { day: 'Wed', posts: 8, engagement: 78 },
    { day: 'Thu', posts: 18, engagement: 96 },
    { day: 'Fri', posts: 14, engagement: 88 },
    { day: 'Sat', posts: 22, engagement: 94 },
    { day: 'Sun', posts: 16, engagement: 82 }
  ];

  const platformDistribution = [
    { platform: 'Instagram', posts: 35, color: '#E1306C' },
    { platform: 'LinkedIn', posts: 28, color: '#0077B5' },
    { platform: 'Twitter', posts: 22, color: '#1DA1F2' },
    { platform: 'Facebook', posts: 15, color: '#1877F2' }
  ];

  const engagementTrends = [
    { month: 'Aug', likes: 1200, comments: 340, shares: 180 },
    { month: 'Sep', likes: 1450, comments: 420, shares: 220 },
    { month: 'Oct', likes: 1680, comments: 380, shares: 260 },
    { month: 'Nov', likes: 1920, comments: 510, shares: 340 },
    { month: 'Dec', likes: 2150, comments: 580, shares: 390 },
    { month: 'Jan', likes: 2380, comments: 640, shares: 420 }
  ];

  const performanceMetrics = [
    {
      title: 'Total Posts Scheduled',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: 'Calendar',
      color: 'text-primary'
    },
    {
      title: 'Average Engagement',
      value: '89.2%',
      change: '+5.8%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      title: 'Best Performing Time',
      value: '2:00 PM',
      change: 'EST',
      trend: 'neutral',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      title: 'Failed Posts',
      value: '23',
      change: '-8.2%',
      trend: 'down',
      icon: 'AlertCircle',
      color: 'text-destructive'
    }
  ];

  const upcomingOptimalTimes = [
    { platform: 'Instagram', time: 'Today 5:00 PM', engagement: '94%', color: 'bg-pink-500' },
    { platform: 'LinkedIn', time: 'Tomorrow 9:00 AM', engagement: '97%', color: 'bg-blue-600' },
    { platform: 'Twitter', time: 'Tomorrow 9:00 AM', engagement: '91%', color: 'bg-sky-500' },
    { platform: 'Facebook', time: 'Today 3:00 PM', engagement: '89%', color: 'bg-blue-700' }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="BarChart3" size={20} />
            <span>Performance Overview</span>
          </h3>
        </div>

        <div className="p-4 grid grid-cols-2 gap-4">
          {performanceMetrics?.map((metric, index) => (
            <div key={index} className="p-3 rounded-lg bg-muted">
              <div className="flex items-center justify-between mb-2">
                <Icon name={metric?.icon} size={16} className={metric?.color} />
                <div className={`flex items-center space-x-1 text-xs ${getTrendColor(metric?.trend)}`}>
                  <Icon name={getTrendIcon(metric?.trend)} size={12} />
                  <span>{metric?.change}</span>
                </div>
              </div>
              <div className="text-lg font-semibold text-foreground">{metric?.value}</div>
              <div className="text-xs text-muted-foreground">{metric?.title}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Weekly Posts Chart */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Weekly Posting Activity</h3>
        </div>
        <div className="p-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyPostsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="day" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
                <Bar dataKey="posts" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Platform Distribution */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Platform Distribution</h3>
        </div>
        <div className="p-4">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="posts"
                >
                  {platformDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {platformDistribution?.map((platform, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: platform?.color }}
                ></div>
                <span className="text-xs text-foreground">{platform?.platform}</span>
                <span className="text-xs text-muted-foreground">{platform?.posts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Engagement Trends */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Engagement Trends</h3>
        </div>
        <div className="p-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="likes" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="comments" 
                  stroke="var(--color-secondary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="shares" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs text-foreground">Likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span className="text-xs text-foreground">Comments</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-xs text-foreground">Shares</span>
            </div>
          </div>
        </div>
      </div>
      {/* Upcoming Optimal Times */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Target" size={20} />
            <span>Next Optimal Times</span>
          </h3>
        </div>
        <div className="p-4 space-y-3">
          {upcomingOptimalTimes?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item?.color}`}></div>
                <div>
                  <div className="text-sm font-medium text-foreground">{item?.platform}</div>
                  <div className="text-xs text-muted-foreground">{item?.time}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-success">{item?.engagement}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Insights */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Lightbulb" size={20} />
            <span>Quick Insights</span>
          </h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start space-x-2">
              <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary">Peak Performance</p>
                <p className="text-xs text-primary/80 mt-1">
                  Thursday posts show 15% higher engagement than average
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
            <div className="flex items-start space-x-2">
              <Icon name="Clock" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Timing Opportunity</p>
                <p className="text-xs text-warning/80 mt-1">
                  Consider posting more content between 2-4 PM for better reach
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-success/5 border border-success/20">
            <div className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-success">Great Progress</p>
                <p className="text-xs text-success/80 mt-1">
                  Your posting consistency has improved by 23% this month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;