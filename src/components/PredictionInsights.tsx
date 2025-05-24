
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
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
      progress: 75
    },
    {
      title: 'Follow-up Success Rate',
      value: '89%',
      change: '+5% improvement',
      color: 'text-green-600',
      icon: CheckCircle,
      progress: 89
    },
    {
      title: 'Predicted No-Shows',
      value: '2',
      change: 'Next 48 hours',
      color: 'text-yellow-600',
      icon: TrendingUp,
      progress: 40
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
            
            <p className="text-xs text-gray-500">{insight.change}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 -mx-6 -mb-6 px-6 pb-6 rounded-b-lg">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">AI Recommendation</span>
        </div>
        <p className="text-sm text-gray-600">
          Consider scheduling earlier follow-ups for patients with diabetes to improve outcomes by 15%.
        </p>
      </div>
    </Card>
  );
};
