
import { MessageCircle, Phone, Bell, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export const NotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    whatsapp: true,
    sms: true,
    email: false,
    voice: false
  });

  const channels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      description: 'Instant messaging with rich media support'
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: Phone,
      color: 'text-blue-600',
      description: 'Traditional text messaging'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Bell,
      color: 'text-purple-600',
      description: 'Detailed notifications with attachments'
    },
    {
      id: 'voice',
      name: 'Voice Assistant',
      icon: Clock,
      color: 'text-orange-600',
      description: 'Alexa & Google Assistant integration'
    }
  ];

  const handleSwitchChange = (channelId: string, enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      [channelId]: enabled
    }));
  };

  const resetToDefaults = () => {
    setSettings({
      whatsapp: true,
      sms: true,
      email: false,
      voice: false
    });
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values",
    });
  };

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been saved successfully",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Notification Settings</h2>
        <p className="text-gray-600">Configure how you want to reach your patients</p>
      </div>

      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Communication Channels</h3>
        
        <div className="grid gap-6">
          {channels.map((channel) => (
            <div key={channel.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                  <channel.icon className={`w-6 h-6 ${channel.color}`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{channel.name}</h4>
                  <p className="text-sm text-gray-600">{channel.description}</p>
                </div>
              </div>
              <Switch 
                checked={settings[channel.id as keyof typeof settings]} 
                onCheckedChange={(checked) => handleSwitchChange(channel.id, checked)}
              />
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Smart Reminder Settings</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-3">Escalation Rules</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• 1st reminder: 24 hours before</div>
                <div>• 2nd reminder: 2 hours before</div>
                <div>• No response: Call after 30 minutes</div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <h4 className="font-semibold text-gray-800 mb-3">AI Optimization</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• Best time prediction: ✅ Enabled</div>
                <div>• Risk assessment: ✅ Enabled</div>
                <div>• Auto-rescheduling: ✅ Enabled</div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
          <Button variant="outline" onClick={resetToDefaults}>Reset to Defaults</Button>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            onClick={saveSettings}
          >
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};
