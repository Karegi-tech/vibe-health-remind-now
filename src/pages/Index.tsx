import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { PatientCard } from '@/components/PatientCard';
import { ReminderPanel } from '@/components/ReminderPanel';
import { PredictionInsights } from '@/components/PredictionInsights';
import { NotificationSettings } from '@/components/NotificationSettings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockPatients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      condition: 'Diabetes Follow-up',
      lastVisit: '2024-05-15',
      nextAppointment: '2024-05-30',
      riskLevel: 'medium' as const,
      reminderSent: true,
      preferredChannel: 'whatsapp'
    },
    {
      id: 2,
      name: 'Michael Chen',
      condition: 'Post-Surgery Check',
      lastVisit: '2024-05-10',
      nextAppointment: '2024-05-28',
      riskLevel: 'high' as const,
      reminderSent: false,
      preferredChannel: 'sms'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      condition: 'Hypertension Monitoring',
      lastVisit: '2024-05-20',
      nextAppointment: '2024-06-05',
      riskLevel: 'low' as const,
      reminderSent: true,
      preferredChannel: 'email'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-green-500 rounded-full mr-3"></div>
                    Patient Follow-Up Dashboard
                  </h2>
                  <div className="grid gap-4">
                    {mockPatients.map((patient) => (
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
          </div>
        )}

        {activeTab === 'settings' && (
          <NotificationSettings />
        )}
      </main>
    </div>
  );
};

export default Index;
