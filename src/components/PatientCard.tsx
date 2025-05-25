
import { Phone, MessageCircle, Calendar, Clock, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { PatientMedicalHistory } from './PatientMedicalHistory';

interface MedicalHistory {
  id: number;
  date: string;
  type: string;
  description: string;
  doctor: string;
  status: 'completed' | 'ongoing' | 'follow-up';
}

interface Patient {
  id: number;
  name: string;
  phone?: string;
  condition: string;
  lastVisit: string;
  nextAppointment: string;
  riskLevel: 'low' | 'medium' | 'high';
  reminderSent: boolean;
  preferredChannel: string;
  age: number;
  location: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  medicalHistory: MedicalHistory[];
}

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const { toast } = useToast();
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);

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

  const handleCall = () => {
    if (patient.phone) {
      window.open(`tel:${patient.phone}`, '_self');
      toast({
        title: "Calling Patient",
        description: `Calling ${patient.name} at ${patient.phone}`,
      });
    } else {
      toast({
        title: "Error",
        description: "Phone number not available",
        variant: "destructive",
      });
    }
  };

  const sendReminder = () => {
    if (patient.phone) {
      const message = `Hello ${patient.name}, this is a reminder for your ${patient.condition} appointment on ${patient.nextAppointment}. Please confirm by replying YES.`;
      
      if (patient.preferredChannel === 'whatsapp') {
        window.open(`https://wa.me/254${patient.phone.substring(1)}?text=${encodeURIComponent(message)}`, '_blank');
      } else if (patient.preferredChannel === 'sms') {
        window.open(`sms:${patient.phone}?body=${encodeURIComponent(message)}`, '_blank');
      } else if (patient.preferredChannel === 'email') {
        window.open(`mailto:?subject=Appointment Reminder&body=${encodeURIComponent(message)}`, '_blank');
      }
      
      toast({
        title: "Reminder Sent",
        description: `${patient.preferredChannel} reminder sent to ${patient.name}`,
      });
    } else {
      toast({
        title: "Error",
        description: "Contact information not available",
        variant: "destructive",
      });
    }
  };

  const handleProfileClick = () => {
    setShowMedicalHistory(true);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-300 cursor-pointer"
           onClick={handleProfileClick}>
        <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{patient.name}</h3>
                <Badge className={`text-xs ${getRiskColor(patient.riskLevel)} w-fit`}>
                  {patient.riskLevel} risk
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-1 text-sm sm:text-base">{patient.condition}</p>
              {patient.phone && (
                <p className="text-gray-500 text-sm mb-3">📞 {patient.phone}</p>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600 truncate">Last visit: {patient.lastVisit}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600 truncate">Next: {patient.nextAppointment}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-3 w-full sm:w-auto"
               onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Preferred:</span>
              <span className="text-lg">{getChannelIcon(patient.preferredChannel)}</span>
            </div>
            
            <div className="flex space-x-2 w-full sm:w-auto">
              {!patient.reminderSent && (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none" onClick={sendReminder}>
                  <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Send</span> Reminder
                </Button>
              )}
              
              <Button size="sm" variant="outline" onClick={handleCall} className="flex-1 sm:flex-none">
                <Phone className="w-4 h-4 mr-1 sm:mr-2" />
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

      {showMedicalHistory && (
        <PatientMedicalHistory 
          patient={patient} 
          onClose={() => setShowMedicalHistory(false)} 
        />
      )}
    </>
  );
};
