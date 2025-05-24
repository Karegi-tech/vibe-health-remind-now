
import { Bell, Clock, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const ReminderPanel = () => {
  const reminders = [
    { time: '2 hours ago', message: 'Reminder sent to Sarah Johnson via WhatsApp', status: 'delivered' },
    { time: '1 day ago', message: 'SMS reminder to Michael Chen - No response', status: 'pending' },
    { time: '3 days ago', message: 'Email reminder to Emily Rodriguez', status: 'opened' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'opened': return 'text-blue-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'opened': return '👁️';
      case 'pending': return '⏳';
      default: return '📋';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-600" />
          Recent Reminders
        </h3>
        <Button size="sm" variant="outline">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {reminders.map((reminder, index) => (
          <div key={index} className="border-l-4 border-blue-200 pl-4 py-3 bg-gray-50 rounded-r-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {reminder.time}
              </span>
              <span className={`text-xs ${getStatusColor(reminder.status)} flex items-center`}>
                {getStatusIcon(reminder.status)} {reminder.status}
              </span>
            </div>
            <p className="text-sm text-gray-700">{reminder.message}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
          <MessageCircle className="w-4 h-4 mr-2" />
          Send Bulk Reminders
        </Button>
      </div>
    </Card>
  );
};
