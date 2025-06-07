
import EmployeeDashboard from '@/components/EmployeeDashboard';
import AuthGuard from '@/components/AuthGuard';

const EmployeeDashboardPage = () => {
  return (
    <AuthGuard requireEmployee>
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white">
        <div className="container mx-auto px-4 py-8">
          <EmployeeDashboard />
        </div>
      </div>
    </AuthGuard>
  );
};

export default EmployeeDashboardPage;
