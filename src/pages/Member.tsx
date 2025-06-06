
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import AuthGuard from '@/components/AuthGuard';
import MemberRegistrationSecure from '@/components/MemberRegistrationSecure';
import MemberDashboard from '@/components/MemberDashboard';
import { Database } from '@/types/database';

type MemberProfile = Database['public']['Tables']['member_profiles']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row'];
};

const Member = () => {
  const { user, signOut } = useAuth();
  const [memberProfile, setMemberProfile] = useState<MemberProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadMemberProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadMemberProfile = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      console.log('Loading member profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('member_profiles')
        .select(`
          *,
          profiles!inner (*)
        `)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        throw error;
      }

      console.log('Profile data loaded:', data);
      
      // Check if data has the correct structure before setting it
      if (data && data.profiles && typeof data.profiles === 'object') {
        setMemberProfile(data as MemberProfile);
      } else {
        console.error('Unexpected profile data structure:', data);
      }
    } catch (error: any) {
      console.error('Erreur lors du chargement du profil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSuccess = () => {
    console.log('Registration successful, reloading profile...');
    loadMemberProfile();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#145587] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/1cfec06e-dc8a-4f97-b6b2-1a5620825ffa.png" 
                  alt="Hello Wash Logo" 
                  className="h-12 w-auto"
                />
                <span className="ml-3 text-sm text-gray-600">Espace Membre</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="text-[#145587] hover:text-[#145587]/80 transition-colors">
                  ← Retour à l'accueil
                </a>
                <button 
                  onClick={signOut}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!memberProfile ? (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Rejoignez la Liste d'Attente
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Soyez parmi les premiers à bénéficier des services Hello Wash dans la Baie de Somme
                </p>
              </div>
              <MemberRegistrationSecure onSuccess={handleRegistrationSuccess} />
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Bienvenue, {memberProfile.profiles.first_name} !
                </h1>
                <p className="text-xl text-gray-600">
                  Votre espace membre Hello Wash
                </p>
              </div>
              <MemberDashboard 
                profile={memberProfile} 
                onProfileUpdate={loadMemberProfile}
              />
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
};

export default Member;
