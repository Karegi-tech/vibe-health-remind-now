
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Heart, Award, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const PatientTracking = () => {
  const [selectedPatient, setSelectedPatient] = useState(1);

  const patients = [
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
    }
  ];

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

  return (
    <div className="space-y-6">
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
            <Badge className="w-full justify-center bg-gold-100 text-gold-800">
              🏆 Perfect Attendance (3 months)
            </Badge>
            <Badge className="w-full justify-center bg-silver-100 text-silver-800">
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
            <Button size="sm" className="flex-1">
              <Clock className="w-3 h-3 mr-1" />
              Remind
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Reschedule
            </Button>
          </div>
        </Card>
      </div>

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
    </div>
  );
};
