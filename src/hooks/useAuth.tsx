
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Function to clean up all auth-related storage
const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, !!session);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check user roles
          setTimeout(async () => {
            try {
              const { data: roles } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id);
              
              if (roles) {
                const userRoles = roles.map(r => r.role);
                setIsAdmin(userRoles.includes('admin'));
                setIsEmployee(userRoles.includes('employee') || userRoles.includes('admin'));
              } else {
                setIsAdmin(false);
                setIsEmployee(false);
              }
            } catch (error) {
              console.error('Error checking user roles:', error);
              setIsAdmin(false);
              setIsEmployee(false);
            }
          }, 0);
        } else {
          setIsAdmin(false);
          setIsEmployee(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Clean up existing state before signing in
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log('Previous signout failed, continuing...');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast.success('Connexion réussie !');
        return { error: null };
      }
      
      return { error: null };
    } catch (error: any) {
      toast.error('Erreur de connexion: ' + error.message);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // Clean up existing state before signing up
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Inscription réussie ! Vérifiez votre email pour confirmer votre compte.');
      return { error: null };
    } catch (error: any) {
      toast.error('Erreur d\'inscription: ' + error.message);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('Starting signout process...');
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Reset local state immediately
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setIsEmployee(false);
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Supabase signout successful');
      } catch (err) {
        console.log('Supabase signout failed, but continuing...', err);
      }
      
      toast.success('Déconnexion réussie');
      
      // Force complete page reload to ensure clean state
      console.log('Redirecting to auth page...');
      window.location.href = '/auth';
    } catch (error: any) {
      console.error('Error during signout:', error);
      toast.error('Erreur de déconnexion');
      
      // Even if there's an error, try to redirect
      window.location.href = '/auth';
    }
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    isEmployee,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
