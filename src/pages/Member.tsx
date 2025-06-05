
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MemberRegistration from '@/components/MemberRegistration';
import MemberDashboard from '@/components/MemberDashboard';
import { MemberProfile } from '@/types/member';

const Member = () => {
  const [memberProfile, setMemberProfile] = useState<MemberProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Charger le profil depuis localStorage
    const savedProfile = localStorage.getItem('helloWashMemberProfile');
    if (savedProfile) {
      try {
        setMemberProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleRegistrationSuccess = (profile: MemberProfile) => {
    setMemberProfile(profile);
    localStorage.setItem('helloWashMemberProfile', JSON.stringify(profile));
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
            <a href="/" className="text-[#145587] hover:text-[#145587]/80 transition-colors">
              ← Retour à l'accueil
            </a>
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
            <MemberRegistration onSuccess={handleRegistrationSuccess} />
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Bienvenue, {memberProfile.personalInfo.firstName} !
              </h1>
              <p className="text-xl text-gray-600">
                Votre espace membre Hello Wash
              </p>
            </div>
            <MemberDashboard 
              profile={memberProfile} 
              onProfileUpdate={handleRegistrationSuccess}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Member;
