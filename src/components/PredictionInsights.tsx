
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Users, Calendar, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const PredictionInsights = () => {
  const insights = [
    {
      title: 'High-Risk Patients',
      value: '3',
      change: '+1 from last week',
      color: 'text-red-600',
      icon: AlertTriangle,
      progress: 75,
      details: 'Mary Akinyi, Grace Njeri need attention'
    },
    {
      title: 'Follow-up Success Rate',
      value: '89%',
      change: '+5% improvement',
      color: 'text-green-600',
      icon: CheckCircle,
      progress: 89,
      details: 'Above target of 85%'
    },
    {
      title: 'Predicted No-Shows',
      value: '2',
      change: 'Next 48 hours',
      color: 'text-yellow-600',
      icon: TrendingUp,
      progress: 40,
      details: 'Send early reminders recommended'
    }
  ];

  const aiRecommendations = [
    {
      icon: Users,
      title: "Patient Prioritization",
      message: "Focus on Mary Akinyi - 76% chance of missing next appointment based on recent patterns",
      actionColor: "text-red-600"
    },
    {
      icon: Calendar,
      title: "Optimal Scheduling",
      message: "Tuesday 10-11 AM shows highest attendance rates for diabetes patients",
      actionColor: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Communication Strategy",
      message: "WhatsApp reminders show 23% better response rate than SMS for your patient demographics",
      actionColor: "text-green-600"
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <Brain className="w-6 h-6 mr-3 text-purple-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">AI Predictions</h3>
          <p className="text-sm text-gray-600">Real-time insights & forecasts</p>
        </div>
      </div>

      <div className="space-y-6">
        {insights.map((insight, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <insight.icon className={`w-4 h-4 ${insight.color}`} />
                <span className="text-sm font-medium text-gray-700">{insight.title}</span>
              </div>
              <span className={`text-lg font-bold ${insight.color}`}>{insight.value}</span>
            </div>
            
            <Progress value={insight.progress} className="h-2" />
            
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">{insight.change}</p>
              <p className="text-xs text-gray-600">{insight.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2"></div>
          AI Recommendations
        </h4>
        
        <div className="space-y-4">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <rec.icon className={`w-4 h-4 mt-0.5 ${rec.actionColor}`} />
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-800 mb-1">{rec.title}</h5>
                  <p className="text-xs text-gray-600">{rec.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
