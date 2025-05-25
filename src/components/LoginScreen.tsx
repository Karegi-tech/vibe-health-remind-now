
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { User, Stethoscope, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginScreenProps {
  onLogin: (userType: 'doctor' | 'patient', userData: any) => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [userType, setUserType] = useState<'doctor' | 'patient'>('doctor');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { toast } = useToast();

  const handleLogin = () => {
    if (!credentials.username || !credentials.password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    // Mock authentication
    const userData = {
      id: 1,
      name: userType === 'doctor' ? 'Dr. Sarah Wanjiku' : 'James Kiprotich',
      type: userType,
      email: userType === 'doctor' ? 'swanjiku@healthconnect.ke' : 'jkiprotich@gmail.com'
    };

    toast({
      title: "Login Successful",
      description: `Welcome back, ${userData.name}!`,
    });

    onLogin(userType, userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">HealthConnect AI</h1>
          <p className="text-gray-600">Smart Follow-Up System</p>
        </div>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <Button
            variant={userType === 'doctor' ? 'default' : 'ghost'}
            onClick={() => setUserType('doctor')}
            className="flex-1"
          >
            <Stethoscope className="w-4 h-4 mr-2" />
            Doctor
          </Button>
          <Button
            variant={userType === 'patient' ? 'default' : 'ghost'}
            onClick={() => setUserType('patient')}
            className="flex-1"
          >
            <User className="w-4 h-4 mr-2" />
            Patient
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <Button onClick={handleLogin} className="w-full">
            Login
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Demo credentials: username: demo, password: demo
        </div>
      </Card>
    </div>
  );
};
