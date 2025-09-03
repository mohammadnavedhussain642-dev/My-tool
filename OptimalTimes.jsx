import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OptimalTimes = ({ onScheduleAtOptimalTime }) => {
  const optimalTimesData = [
    {
      platform: 'instagram',
      name: 'Instagram',
      icon: 'Instagram',
      color: 'bg-pink-500',
      times: [
        { day: 'Monday', time: '11:00 AM', engagement: '92%' },
        { day: 'Tuesday', time: '2:00 PM', engagement: '89%' },
        { day: 'Wednesday', time: '5:00 PM', engagement: '94%' },
        { day: 'Thursday', time: '11:00 AM', engagement: '87%' },
        { day: 'Friday', time: '1:00 PM', engagement: '91%' },
        { day: 'Saturday', time: '10:00 AM', engagement: '96%' },
        { day: 'Sunday', time: '9:00 AM', engagement: '88%' }
      ],
      nextOptimal: 'Today at 5:00 PM'
    },
    {
      platform: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600',
      times: [
        { day: 'Monday', time: '8:00 AM', engagement: '94%' },
        { day: 'Tuesday', time: '9:00 AM', engagement: '96%' },
        { day: 'Wednesday', time: '8:00 AM', engagement: '93%' },
        { day: 'Thursday', time: '9:00 AM', engagement: '97%' },
        { day: 'Friday', time: '8:00 AM', engagement: '89%' },
        { day: 'Saturday', time: '10:00 AM', engagement: '76%' },
        { day: 'Sunday', time: '7:00 PM', engagement: '71%' }
      ],
      nextOptimal: 'Tomorrow at 9:00 AM'
    },
    {
      platform: 'twitter',
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-sky-500',
      times: [
        { day: 'Monday', time: '9:00 AM', engagement: '88%' },
        { day: 'Tuesday', time: '9:00 AM', engagement: '91%' },
        { day: 'Wednesday', time: '9:00 AM', engagement: '89%' },
        { day: 'Thursday', time: '9:00 AM', engagement: '93%' },
        { day: 'Friday', time: '9:00 AM', engagement: '87%' },
        { day: 'Saturday', time: '10:00 AM', engagement: '84%' },
        { day: 'Sunday', time: '8:00 PM', engagement: '86%' }
      ],
      nextOptimal: 'Tomorrow at 9:00 AM'
    },
    {
      platform: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-700',
      times: [
        { day: 'Monday', time: '3:00 PM', engagement: '85%' },
        { day: 'Tuesday', time: '3:00 PM', engagement: '87%' },
        { day: 'Wednesday', time: '3:00 PM', engagement: '89%' },
        { day: 'Thursday', time: '3:00 PM', engagement: '91%' },
        { day: 'Friday', time: '1:00 PM', engagement: '88%' },
        { day: 'Saturday', time: '12:00 PM', engagement: '92%' },
        { day: 'Sunday', time: '1:00 PM', engagement: '90%' }
      ],
      nextOptimal: 'Today at 3:00 PM'
    }
  ];

  const timezoneData = {
    current: 'EST (UTC-5)',
    audience: [
      { timezone: 'EST', percentage: '45%', time: '3:00 PM' },
      { timezone: 'PST', percentage: '28%', time: '12:00 PM' },
      { timezone: 'GMT', percentage: '15%', time: '8:00 PM' },
      { timezone: 'IST', percentage: '12%', time: '1:30 AM' }
    ]
  };

  const getEngagementColor = (engagement) => {
    const percent = parseInt(engagement);
    if (percent >= 90) return 'text-success';
    if (percent >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getEngagementBg = (engagement) => {
    const percent = parseInt(engagement);
    if (percent >= 90) return 'bg-success/10';
    if (percent >= 80) return 'bg-warning/10';
    return 'bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Optimal Times by Platform */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} />
            <span>Optimal Posting Times</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Based on your audience engagement patterns
          </p>
        </div>

        <div className="p-4 space-y-4">
          {optimalTimesData?.map(platform => (
            <div key={platform?.platform} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${platform?.color} flex items-center justify-center`}>
                    <Icon name={platform?.icon} size={16} color="white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{platform?.name}</h4>
                    <p className="text-xs text-muted-foreground">Next: {platform?.nextOptimal}</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onScheduleAtOptimalTime(platform?.platform)}
                >
                  <Icon name="Clock" size={14} className="mr-2" />
                  Schedule Now
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {platform?.times?.map(timeSlot => (
                  <div key={timeSlot?.day} className="text-center">
                    <div className="text-xs font-medium text-foreground mb-1">
                      {timeSlot?.day?.slice(0, 3)}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {timeSlot?.time}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${getEngagementBg(timeSlot?.engagement)} ${getEngagementColor(timeSlot?.engagement)}`}>
                      {timeSlot?.engagement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Timezone Management */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Globe" size={20} />
            <span>Audience Timezones</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Current timezone: {timezoneData?.current}
          </p>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {timezoneData?.audience?.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{zone?.timezone}</div>
                    <div className="text-xs text-muted-foreground">{zone?.percentage} of audience</div>
                  </div>
                </div>
                <div className="text-sm text-foreground font-medium">
                  {zone?.time}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary">Pro Tip</p>
                <p className="text-xs text-primary/80 mt-1">
                  Schedule posts 2-3 hours before peak times in your primary audience timezone for maximum reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Zap" size={20} />
            <span>Quick Schedule</span>
          </h3>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2"
            onClick={() => onScheduleAtOptimalTime('all')}
          >
            <Icon name="Target" size={24} />
            <div className="text-center">
              <div className="text-sm font-medium">All Platforms</div>
              <div className="text-xs text-muted-foreground">Next optimal times</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2"
            onClick={() => onScheduleAtOptimalTime('peak')}
          >
            <Icon name="TrendingUp" size={24} />
            <div className="text-center">
              <div className="text-sm font-medium">Peak Hours</div>
              <div className="text-xs text-muted-foreground">Highest engagement</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OptimalTimes;