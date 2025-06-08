import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/database';
import MemberRegistrationSecure from '@/components/MemberRegistrationSecure';
import MemberDashboard from '@/components/MemberDashboard';
import NotificationCenter from '@/components/NotificationCenter';
import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Building2, MapPin, Clock, Bell, Settings } from 'lucide-react';
import { toast } from 'sonner';
type MemberProfile = Database['public']['Tables']['member_profiles']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row'];
};
const Member = () => {
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [memberProfile, setMemberProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (user) {
      fetchMemberProfile();
    }
  }, [user]);
  const fetchMemberProfile = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching member profile for user:', user.id);

      // Récupérer le profil membre avec les informations du profil utilisateur
      const {
        data,
        error
      } = await supabase.from('member_profiles').select(`
          *,
          profiles (*)
        `).eq('user_id', user.id).maybeSingle();
      if (error) {
        console.error('Erreur lors de la récupération du profil membre:', error);
        throw error;
      }
      console.log('Member profile data:', data);
      if (data) {
        setMemberProfile(data as MemberProfile);
        console.log('Member profile position:', data.position);
      }
    } catch (error: any) {
      console.error('Erreur:', error);
      setError(error.message);
      toast.error('Erreur lors du chargement de votre profil');
    } finally {
      setLoading(false);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };
  const handleRegistrationSuccess = () => {
    console.log('Registration successful, refreshing profile...');
    fetchMemberProfile();
  };
  const handleProfileUpdate = () => {
    console.log('Profile update requested, refreshing...');
    fetchMemberProfile();
  };
  if (loading) {
    return <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#145587] mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de votre profil...</p>
          </div>
        </div>
      </AuthGuard>;
  }
  if (error) {
    return <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="text-red-600">Erreur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={fetchMemberProfile} className="w-full">
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </AuthGuard>;
  }
  return <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#145587] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">HW</span>
                  </div>
                  <h1 className="text-xl font-bold text-[#145587]">Hello Wash</h1>
                </div>
                {memberProfile && <Badge variant="outline" className="text-[#145587] border-[#145587]">
                    Membre #{memberProfile.position || 'En cours'}
                  </Badge>}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {memberProfile?.profiles?.first_name} {memberProfile?.profiles?.last_name}
                  </span>
                </div>
                
                <Button variant="outline" size="sm" onClick={handleSignOut} className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!memberProfile ? <MemberRegistrationSecure onSuccess={handleRegistrationSuccess} /> : <div className="space-y-8">
              {/* Notifications en haut */}
              <NotificationCenter userId={user!.id} />
              
              {/* Dashboard principal */}
              <MemberDashboard profile={memberProfile} onProfileUpdate={handleProfileUpdate} />
            </div>}
        </div>
      </div>
    </AuthGuard>;
};
export default Member;