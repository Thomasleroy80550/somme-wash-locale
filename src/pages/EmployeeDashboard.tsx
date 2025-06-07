
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '@/hooks/useEmployee';
import EmployeeDashboard from '@/components/EmployeeDashboard';
import AuthGuard from '@/components/AuthGuard';

const EmployeeDashboardPage = () => {
  const { isEmployee } = useEmployee();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmployee) {
      navigate('/auth');
    }
  }, [isEmployee, navigate]);

  if (!isEmployee) {
    return null;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white">
        <div className="container mx-auto px-4 py-8">
          <EmployeeDashboard />
        </div>
      </div>
    </AuthGuard>
  );
};

export default EmployeeDashboardPage;
