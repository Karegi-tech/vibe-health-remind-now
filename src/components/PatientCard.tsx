
import { Phone, MessageCircle, Calendar, Clock, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Patient {
  id: number;
  name: string;
  condition: string;
  lastVisit: string;
  nextAppointment: string;
  riskLevel: 'low' | 'medium' | 'high';
  reminderSent: boolean;
  preferredChannel: string;
}

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return '💬';
      case 'sms': return '📱';
      case 'email': return '📧';
      default: return '📞';
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
              <Badge className={`text-xs ${getRiskColor(patient.riskLevel)}`}>
                {patient.riskLevel} risk
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-3">{patient.condition}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Last visit: {patient.lastVisit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Next: {patient.nextAppointment}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Preferred:</span>
            <span className="text-lg">{getChannelIcon(patient.preferredChannel)}</span>
          </div>
          
          <div className="flex space-x-2">
            {!patient.reminderSent && (
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Reminder
              </Button>
            )}
            
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
          
          {patient.reminderSent && (
            <div className="flex items-center space-x-1 text-green-600 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Reminder sent</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
