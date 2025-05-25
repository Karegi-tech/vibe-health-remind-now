
import { Bell, Settings, Calendar, Brain, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardHeader = ({ activeTab, setActiveTab }: DashboardHeaderProps) => {
  const { toast } = useToast();
  const [notifications] = useState([
    { id: 1, message: "Grace Njeri confirmed appointment", time: "5 min ago", type: "success" },
    { id: 2, message: "David Mwangi needs follow-up", time: "15 min ago", type: "warning" },
    { id: 3, message: "New patient registration", time: "1 hour ago", type: "info" }
  ]);

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: `You have ${notifications.length} new notifications`,
    });
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Link2Care</h1>
              <p className="text-sm text-gray-600">Smart Follow-Up System</p>
            </div>
          </div>

          <nav className="flex space-x-1">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
            <Button
              variant={activeTab === 'reminders' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('reminders')}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Reminders</span>
            </Button>
            <Button
              variant={activeTab === 'tracking' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('tracking')}
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Tracking</span>
            </Button>
            <Button
              variant={activeTab === 'predictions' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('predictions')}
              className="flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span>AI Insights</span>
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('settings')}
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="relative cursor-pointer" onClick={handleNotificationClick}>
              <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">DR</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
