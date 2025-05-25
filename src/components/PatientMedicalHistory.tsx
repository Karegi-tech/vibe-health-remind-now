
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  User, 
  Calendar, 
  MapPin, 
  Heart, 
  Pill, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  Clock
} from 'lucide-react';

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
  age: number;
  location: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  riskLevel: 'low' | 'medium' | 'high';
  medicalHistory: MedicalHistory[];
}

interface PatientMedicalHistoryProps {
  patient: Patient;
  onClose: () => void;
}

export const PatientMedicalHistory = ({ patient, onClose }: PatientMedicalHistoryProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
              <p className="text-gray-600">Medical History & Profile</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex border-b border-gray-200">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="rounded-none border-b-2 border-transparent"
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('history')}
            className="rounded-none border-b-2 border-transparent"
          >
            Medical History
          </Button>
          <Button
            variant={activeTab === 'medications' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('medications')}
            className="rounded-none border-b-2 border-transparent"
          >
            Medications
          </Button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <User className="w-5 h-5 mr-2" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Age:</span>
                    <span className="font-medium">{patient.age} years</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Location:</span>
                    <span className="font-medium">{patient.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Blood Type:</span>
                    <span className="font-medium">{patient.bloodType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`w-4 h-4 ${getRiskColor(patient.riskLevel)}`} />
                    <span className="text-sm text-gray-600">Risk Level:</span>
                    <Badge className={`${patient.riskLevel === 'high' ? 'bg-red-100 text-red-800' : patient.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {patient.riskLevel}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                    Allergies & Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patient.allergies.map((allergy, index) => (
                      <Badge key={index} className="bg-red-100 text-red-800 mr-2 mb-2">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="w-5 h-5 mr-2" />
                    Current Condition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{patient.condition}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {patient.medicalHistory.map((record) => (
                <Card key={record.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{record.date}</span>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">{record.type}</h4>
                        <p className="text-gray-600 text-sm mb-2">{record.description}</p>
                        <p className="text-xs text-gray-500">Dr. {record.doctor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Pill className="w-5 h-5 mr-2 text-blue-500" />
                    Current Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patient.medications.map((medication, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium text-blue-800">{medication}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
