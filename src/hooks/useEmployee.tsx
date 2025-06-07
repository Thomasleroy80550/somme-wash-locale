
import { useAuth } from './useAuth';

export const useEmployee = () => {
  const { user, isEmployee } = useAuth();
  
  return {
    isEmployee,
    user
  };
};
