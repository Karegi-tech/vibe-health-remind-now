
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail, Calendar, Send, Check, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReminderSystemProps {
  userType: 'doctor' | 'patient';
}

export const ReminderSystem = ({ userType }: ReminderSystemProps) => {
  const { toast } = useToast();
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['whatsapp']);

  const reminderChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500',
      href: 'https://wa.me/254700123456?text=Hello%2C%20this%20is%20your%20appointment%20reminder',
      active: true
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: Phone,
      color: 'bg-blue-500',
      href: 'sms:+254700123456?body=Appointment%20reminder%20from%20HealthConnect',
      active: true
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'bg-purple-500',
      href: 'mailto:patient@example.com?subject=Appointment%20Reminder&body=Dear%20patient%2C%20this%20is%20a%20reminder',
      active: false
    },
    {
      id: 'voice',
      name: 'Voice Call',
      icon: Phone,
      color: 'bg-orange-500',
      href: 'tel:+254700123456',
      active: false
    }
  ];

  const upcomingReminders = [
    {
      id: 1,
      patient: 'Grace Njeri',
      appointment: '2024-05-26 10:00 AM',
      condition: 'Diabetes Follow-up',
      channels: ['whatsapp', 'sms'],
      status: 'scheduled',
      priority: 'high'
    },
    {
      id: 2,
      patient: 'David Mwangi',
      appointment: '2024-05-26 2:00 PM',
      condition: 'Post-Surgery Check',
      channels: ['whatsapp'],
      status: 'sent',
      priority: 'medium'
    },
    {
      id: 3,
      patient: 'Mary Akinyi',
      appointment: '2024-05-27 9:00 AM',
      condition: 'Hypertension Monitoring',
      channels: ['email', 'sms'],
      status: 'confirmed',
      priority: 'low'
    }
  ];

  const sendReminder = (channel: any, patient: string) => {
    if (channel.href.startsWith('http') || channel.href.startsWith('sms:') || channel.href.startsWith('mailto:') || channel.href.startsWith('tel:')) {
      window.open(channel.href, '_blank');
    }
    
    toast({
      title: "Reminder Sent",
      description: `${channel.name} reminder sent to ${patient}`,
    });
  };

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'sent': return <Send className="w-4 h-4 text-blue-500" />;
      case 'confirmed': return <Check className="w-4 h-4 text-green-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Send className="w-5 h-5 mr-2 text-blue-600" />
          Reminder Channels
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {reminderChannels.map((channel) => (
            <div
              key={channel.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedChannels.includes(channel.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleChannel(channel.id)}
            >
              <div className={`w-12 h-12 rounded-lg ${channel.color} flex items-center justify-center mb-3`}>
                <channel.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-gray-800">{channel.name}</h4>
              <Badge variant={channel.active ? "default" : "secondary"} className="text-xs mt-1">
                {channel.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          ))}
        </div>

        <Button
          onClick={() => {
            selectedChannels.forEach(channelId => {
              const channel = reminderChannels.find(c => c.id === channelId);
              if (channel) sendReminder(channel, 'All Patients');
            });
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        >
          Send Bulk Reminders ({selectedChannels.length} channels)
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          {userType === 'doctor' ? 'Upcoming Patient Reminders' : 'My Appointments'}
        </h3>

        <div className="space-y-4">
          {upcomingReminders.map((reminder) => (
            <div key={reminder.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-800">{reminder.patient}</h4>
                  <p className="text-sm text-gray-600">{reminder.condition}</p>
                  <p className="text-sm text-blue-600 font-medium">{reminder.appointment}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(reminder.status)}
                  <Badge className={getPriorityColor(reminder.priority)}>
                    {reminder.priority}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {reminder.channels.map(channelId => {
                    const channel = reminderChannels.find(c => c.id === channelId);
                    return channel ? (
                      <Button
                        key={channelId}
                        size="sm"
                        variant="outline"
                        onClick={() => sendReminder(channel, reminder.patient)}
                        className="flex items-center space-x-1"
                      >
                        <channel.icon className="w-3 h-3" />
                        <span className="text-xs">{channel.name}</span>
                      </Button>
                    ) : null;
                  })}
                </div>
                <span className="text-xs text-gray-500 capitalize">{reminder.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
