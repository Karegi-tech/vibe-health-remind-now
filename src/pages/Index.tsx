
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
import { LogOut } from 'lucide-react';

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
    return <LoginScreen onLogin={handleLogin} />;
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
      preferredChannel: 'whatsapp'
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
      preferredChannel: 'sms'
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
      preferredChannel: 'email'
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
      preferredChannel: 'whatsapp'
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
