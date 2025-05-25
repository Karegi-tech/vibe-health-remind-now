
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Heart, Award, TrendingUp, Brain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface PatientTrackingProps {
  userType?: 'doctor' | 'patient';
  currentUser?: any;
}

export const PatientTracking = ({ userType, currentUser }: PatientTrackingProps) => {
  const [selectedPatient, setSelectedPatient] = useState(1);
  const { toast } = useToast();

  const allPatients = [
    {
      id: 1,
      name: 'Grace Njeri',
      condition: 'Diabetes Management',
      nextAppointment: '2024-05-26 10:00 AM',
      adherence: 85,
      points: 245,
      visits: 8,
      missedAppointments: 1,
      riskLevel: 'medium' as const,
      timeline: [
        { date: '2024-05-15', event: 'Regular Check-up', status: 'completed' },
        { date: '2024-05-26', event: 'Follow-up Visit', status: 'scheduled' },
        { date: '2024-06-05', event: 'Lab Results Review', status: 'upcoming' }
      ]
    },
    {
      id: 2,
      name: 'David Mwangi',
      condition: 'Post-Surgery Recovery',
      nextAppointment: '2024-05-26 2:00 PM',
      adherence: 95,
      points: 380,
      visits: 12,
      missedAppointments: 0,
      riskLevel: 'low' as const,
      timeline: [
        { date: '2024-05-10', event: 'Surgery Follow-up', status: 'completed' },
        { date: '2024-05-26', event: 'Recovery Check', status: 'scheduled' },
        { date: '2024-06-10', event: 'Final Assessment', status: 'upcoming' }
      ]
    },
    {
      id: 3,
      name: 'Mary Akinyi',
      condition: 'Hypertension Monitoring',
      nextAppointment: '2024-06-05 9:00 AM',
      adherence: 78,
      points: 190,
      visits: 6,
      missedAppointments: 2,
      riskLevel: 'high' as const,
      timeline: [
        { date: '2024-05-20', event: 'Blood Pressure Check', status: 'completed' },
        { date: '2024-06-05', event: 'Medication Review', status: 'scheduled' },
        { date: '2024-06-20', event: 'Follow-up', status: 'upcoming' }
      ]
    },
    {
      id: 4,
      name: 'James Kiprotich',
      condition: 'General Health Monitoring',
      nextAppointment: '2024-06-02 11:00 AM',
      adherence: 92,
      points: 320,
      visits: 4,
      missedAppointments: 0,
      riskLevel: 'low' as const,
      timeline: [
        { date: '2024-05-18', event: 'Annual Physical', status: 'completed' },
        { date: '2024-06-02', event: 'General Checkup', status: 'scheduled' },
        { date: '2024-09-02', event: 'Follow-up', status: 'upcoming' }
      ]
    }
  ];

  // Filter patients based on user type
  const patients = userType === 'doctor' 
    ? allPatients 
    : allPatients.filter(patient => patient.name === currentUser?.name);

  const currentPatient = patients.find(p => p.id === selectedPatient) || patients[0];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'upcoming': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const handleRemind = () => {
    toast({
      title: "Reminder Sent",
      description: `Appointment reminder sent to ${currentPatient.name}`,
    });
  };

  const handleReschedule = () => {
    toast({
      title: "Rescheduling",
      description: "Opening calendar to reschedule appointment...",
    });
  };

  return (
    <div className="space-y-6">
      {userType === 'doctor' && patients.length > 1 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Patient Selection
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPatient === patient.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPatient(patient.id)}
              >
                <h4 className="font-medium text-gray-800">{patient.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{patient.condition}</p>
                <Badge className={getRiskColor(patient.riskLevel)}>
                  {patient.riskLevel} risk
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center">
            <Heart className="w-4 h-4 mr-2 text-red-500" />
            Health Metrics
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Adherence Rate</span>
                <span>{currentPatient.adherence}%</span>
              </div>
              <Progress value={currentPatient.adherence} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{currentPatient.visits}</div>
                <div className="text-xs text-gray-600">Total Visits</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{currentPatient.missedAppointments}</div>
                <div className="text-xs text-gray-600">Missed</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center">
            <Award className="w-4 h-4 mr-2 text-yellow-500" />
            Gamification
          </h4>
          
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600">{currentPatient.points}</div>
            <div className="text-sm text-gray-600">Reward Points</div>
          </div>
          
          <div className="space-y-2">
            <Badge className="w-full justify-center bg-yellow-100 text-yellow-800">
              🏆 Perfect Attendance (3 months)
            </Badge>
            <Badge className="w-full justify-center bg-green-100 text-green-800">
              ⭐ Health Champion
            </Badge>
          </div>
          
          <Button className="w-full mt-4" variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Rewards
          </Button>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            Next Appointment
          </h4>
          
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-gray-800">{currentPatient.nextAppointment}</div>
            <div className="text-sm text-gray-600">{currentPatient.condition}</div>
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1" onClick={handleRemind}>
              <Clock className="w-3 h-3 mr-1" />
              Remind
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={handleReschedule}>
              Reschedule
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-green-500" />
            Appointment Timeline
          </h4>
          
          <div className="space-y-4">
            {currentPatient.timeline.map((event, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{event.event}</div>
                  <div className="text-sm text-gray-600">{event.date}</div>
                </div>
                <Badge variant={event.status === 'completed' ? 'default' : 'secondary'}>
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center">
            <Brain className="w-4 h-4 mr-2 text-purple-600" />
            AI Health Insights
          </h4>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">Adherence Trend</h5>
              <p className="text-sm text-blue-700">
                {currentPatient.adherence > 90 
                  ? "Excellent adherence! Keep up the great work."
                  : currentPatient.adherence > 75
                  ? "Good adherence. Consider setting more reminders."
                  : "Below target adherence. Recommend closer monitoring."}
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-800 mb-2">Health Recommendation</h5>
              <p className="text-sm text-green-700">
                Based on your condition, maintain regular exercise and follow your medication schedule.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-medium text-yellow-800 mb-2">Next Steps</h5>
              <p className="text-sm text-yellow-700">
                Schedule lab work before your next appointment for optimal care planning.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
