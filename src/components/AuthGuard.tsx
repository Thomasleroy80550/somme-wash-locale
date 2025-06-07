
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireEmployee?: boolean;
}

const AuthGuard = ({ children, requireAdmin = false, requireEmployee = false }: AuthGuardProps) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasRedirected, setHasRedirected] = useState(false);

  // Pour cette démo, on considère qu'un utilisateur est employé si son email contient "employee" ou s'il est admin
  const isEmployee = isAdmin || (user?.email && user.email.includes('employee'));

  useEffect(() => {
    console.log('AuthGuard - user:', !!user, 'loading:', loading, 'isAdmin:', isAdmin, 'isEmployee:', isEmployee, 'requireAdmin:', requireAdmin, 'requireEmployee:', requireEmployee);
    
    if (!loading && !hasRedirected) {
      if (!user) {
        console.log('AuthGuard - No user, redirecting to auth');
        setHasRedirected(true);
        navigate('/auth', { state: { from: location.pathname }, replace: true });
      } else if (requireAdmin && !isAdmin) {
        console.log('AuthGuard - User not admin, redirecting to member');
        setHasRedirected(true);
        navigate('/member', { replace: true });
      } else if (requireEmployee && !isEmployee && !isAdmin) {
        console.log('AuthGuard - User not employee, redirecting to member');
        setHasRedirected(true);
        navigate('/member', { replace: true });
      }
    }
  }, [user, loading, isAdmin, isEmployee, requireAdmin, requireEmployee, navigate, location.pathname, hasRedirected]);

  // Reset redirect flag when location changes
  useEffect(() => {
    setHasRedirected(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#145587] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user || (requireAdmin && !isAdmin) || (requireEmployee && !isEmployee && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
