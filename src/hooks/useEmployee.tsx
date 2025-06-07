
import { useAuth } from './useAuth';

export const useEmployee = () => {
  const { user, isAdmin } = useAuth();
  
  // Pour cette démo, on vérifie si l'utilisateur est admin ou si son email contient "employee"
  // Dans un vrai système, on utiliserait la table user_roles
  const isEmployee = isAdmin || (user?.email && user.email.includes('employee'));
  
  return {
    isEmployee,
    user
  };
};
