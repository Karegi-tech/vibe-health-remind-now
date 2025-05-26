import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { PatientCard } from '@/components/PatientCard';
import { ReminderPanel } from '@/components/ReminderPanel';
import { PredictionInsights } from '@/components/PredictionInsights';
import { NotificationSettings } from '@/components/NotificationSettings';
import { LoginScreen } from '@/components/LoginScreen';
import { ReminderSystem } from '@/components/ReminderSystem';
import { PatientTracking } from '@/components/PatientTracking';
import { Button } from '@/components/ui/button';
import { LogOut, Heart, Users, Brain, MessageCircle } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<'doctor' | 'patient'>('doctor');

  const handleLogin = (type: 'doctor' | 'patient', userData: any) => {
    setUserType(type);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setUserType('doctor');
    setActiveTab('dashboard');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section - Restored Original Design */}
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                  Link2Care
                  <span className="text-gradient bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Healthcare</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Revolutionary AI-powered healthcare follow-up system connecting doctors and patients 
                  for better health outcomes through smart reminders and intelligent tracking.
                </p>
              </div>
              
              <div className="relative mx-auto max-w-4xl">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                    alt="Healthcare professional using technology for patient care"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">Smart Reminders</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">AI Insights</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">Patient Tracking</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">Better Outcomes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }

  const allPatients = [
    {
      id: 1,
      name: 'Grace Njeri',
      phone: '0716283502',
      condition: 'Diabetes Follow-up',
      lastVisit: '2024-05-15',
      nextAppointment: '2024-05-30',
      riskLevel: 'medium' as const,
      reminderSent: true,
      preferredChannel: 'whatsapp',
      age: 45,
      location: 'Nairobi, Kenya',
      bloodType: 'A+',
      allergies: ['Penicillin', 'Shellfish'],
      medications: ['Metformin 500mg', 'Lisinopril 10mg', 'Aspirin 81mg'],
      medicalHistory: [
        {
          id: 1,
          date: '2024-05-15',
          type: 'Routine Diabetes Check',
          description: 'HbA1c levels at 7.2%, blood pressure stable. Recommended dietary changes and continued medication.',
          doctor: 'Dr. Kamau',
          status: 'completed' as const
        },
        {
          id: 2,
          date: '2024-04-10',
          type: 'Lab Results Review',
          description: 'Kidney function tests normal, glucose levels improving with current treatment plan.',
          doctor: 'Dr. Kamau',
          status: 'completed' as const
        },
        {
          id: 3,
          date: '2024-03-05',
          type: 'Initial Diabetes Diagnosis',
          description: 'Type 2 diabetes diagnosed. Started on Metformin, lifestyle counseling provided.',
          doctor: 'Dr. Wanjiku',
          status: 'completed' as const
        }
      ]
    },
    {
      id: 2,
      name: 'David Mwangi',
      phone: '0708403670',
      condition: 'Post-Surgery Check',
      lastVisit: '2024-05-10',
      nextAppointment: '2024-05-28',
      riskLevel: 'high' as const,
      reminderSent: false,
      preferredChannel: 'sms',
      age: 38,
      location: 'Mombasa, Kenya',
      bloodType: 'O-',
      allergies: ['Latex', 'Codeine'],
      medications: ['Ibuprofen 400mg', 'Omeprazole 20mg', 'Physiotherapy'],
      medicalHistory: [
        {
          id: 1,
          date: '2024-05-10',
          type: 'Post-Surgery Follow-up',
          description: 'Knee replacement surgery recovery progressing well. Some swelling noted, physical therapy ongoing.',
          doctor: 'Dr. Ochieng',
          status: 'ongoing' as const
        },
        {
          id: 2,
          date: '2024-04-20',
          type: 'Knee Replacement Surgery',
          description: 'Total knee replacement surgery completed successfully. Patient tolerated procedure well.',
          doctor: 'Dr. Ochieng',
          status: 'completed' as const
        },
        {
          id: 3,
          date: '2024-04-05',
          type: 'Pre-Surgery Assessment',
          description: 'Pre-operative clearance obtained. All tests within normal limits for surgery.',
          doctor: 'Dr. Mutua',
          status: 'completed' as const
        }
      ]
    },
    {
      id: 3,
      name: 'Mary Akinyi',
      phone: '0799641327',
      condition: 'Hypertension Monitoring',
      lastVisit: '2024-05-20',
      nextAppointment: '2024-06-05',
      riskLevel: 'low' as const,
      reminderSent: true,
      preferredChannel: 'email',
      age: 52,
      location: 'Kisumu, Kenya',
      bloodType: 'B+',
      allergies: ['Sulfa drugs'],
      medications: ['Amlodipine 5mg', 'Hydrochlorothiazide 25mg'],
      medicalHistory: [
        {
          id: 1,
          date: '2024-05-20',
          type: 'Hypertension Check-up',
          description: 'Blood pressure well controlled at 130/80. Patient compliance with medication excellent.',
          doctor: 'Dr. Otieno',
          status: 'completed' as const
        },
        {
          id: 2,
          date: '2024-04-15',
          type: 'Medication Adjustment',
          description: 'Increased Amlodipine dose due to elevated readings. Patient education on salt reduction.',
          doctor: 'Dr. Otieno',
          status: 'completed' as const
        },
        {
          id: 3,
          date: '2024-03-10',
          type: 'Annual Physical',
          description: 'Comprehensive physical examination. Hypertension detected, treatment initiated.',
          doctor: 'Dr. Otieno',
          status: 'completed' as const
        }
      ]
    },
    {
      id: 4,
      name: 'James Kiprotich',
      phone: '0722555444',
      condition: 'General Checkup',
      lastVisit: '2024-05-18',
      nextAppointment: '2024-06-02',
      riskLevel: 'low' as const,
      reminderSent: false,
      preferredChannel: 'whatsapp',
      age: 28,
      location: 'Eldoret, Kenya',
      bloodType: 'AB+',
      allergies: ['None known'],
      medications: ['Multivitamin', 'Vitamin D3'],
      medicalHistory: [
        {
          id: 1,
          date: '2024-05-18',
          type: 'Annual Physical Examination',
          description: 'Complete physical examination. All vital signs normal, recommended preventive care measures.',
          doctor: 'Dr. Cheruiyot',
          status: 'completed' as const
        },
        {
          id: 2,
          date: '2024-01-15',
          type: 'Vaccination Update',
          description: 'Received annual flu vaccination and updated tetanus shot. No adverse reactions.',
          doctor: 'Dr. Kiprop',
          status: 'completed' as const
        },
        {
          id: 3,
          date: '2023-11-20',
          type: 'Sports Physical',
          description: 'Pre-participation sports physical for marathon training. Cleared for athletic activities.',
          doctor: 'Dr. Cheruiyot',
          status: 'completed' as const
        }
      ]
    }
  ];

  // Filter patients based on user type
  const displayPatients = userType === 'doctor' 
    ? allPatients 
    : allPatients.filter(patient => patient.name === user.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {user.name}
            </h1>
            <p className="text-gray-600">
              {userType === 'doctor' ? 'Doctor Dashboard' : 'Patient Portal'}
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {userType === 'doctor' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-green-500 rounded-full mr-3"></div>
                      Patient Follow-Up Dashboard
                    </h2>
                    <div className="grid gap-4">
                      {displayPatients.map((patient) => (
                        <PatientCard key={patient.id} patient={patient} />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <ReminderPanel />
                  <PredictionInsights />
                </div>
              </div>
            ) : (
              <PatientTracking userType={userType} currentUser={user} />
            )}
          </div>
        )}

        {activeTab === 'reminders' && (
          <ReminderSystem userType={userType} currentUser={user} />
        )}

        {activeTab === 'tracking' && (
          <PatientTracking userType={userType} currentUser={user} />
        )}

        {activeTab === 'predictions' && (
          <PredictionInsights />
        )}

        {activeTab === 'settings' && (
          <NotificationSettings />
        )}
      </main>
    </div>
  );
};

export default Index;
