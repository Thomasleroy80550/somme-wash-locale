
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Database } from '@/types/database';
import { 
  User, 
  Building2, 
  Clock, 
  Bell, 
  MapPin,
  Phone,
  Mail,
  Trophy,
  Users,
  CalendarDays,
  Check,
  ArrowRight,
  Star,
  CheckCircle2
} from 'lucide-react';

type MemberProfile = Database['public']['Tables']['member_profiles']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row'];
};

interface MemberDashboardProps {
  profile: MemberProfile;
  onProfileUpdate: () => void;
}

const MemberDashboard = ({ profile, onProfileUpdate }: MemberDashboardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">En attente</Badge>;
      case 'validated':
        return <Badge variant="default" className="bg-green-100 text-green-800">Validé</Badge>;
      case 'priority':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Prioritaire</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getProgressValue = () => {
    if (!profile.position) return 0;
    return Math.max(0, 100 - (profile.position / 250) * 100);
  };

  // Fonction pour obtenir le badge en fonction de la position
  const getPositionBadge = () => {
    if (!profile.position) return null;
    
    if (profile.position <= 10) {
      return <Badge variant="default" className="bg-[#145587] text-white ml-2">Membre Fondateur</Badge>;
    } else if (profile.position <= 30) {
      return <Badge variant="default" className="bg-green-800 text-white ml-2">Confirmé</Badge>;
    } else if (profile.position <= 100) {
      return <Badge variant="default" className="bg-[#ff9640] text-white ml-2">En attente</Badge>;
    }
    return null;
  };

  // Fonction pour estimer le temps d'attente
  const getEstimatedWaitTime = () => {
    if (!profile.position) return "Indéterminé";
    
    if (profile.position <= 20) return "1-2 semaines";
    if (profile.position <= 50) return "1 mois";
    if (profile.position <= 100) return "2-3 mois";
    return "3+ mois";
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="waitlist" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="waitlist">Liste d'Attente</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="business">Activité</TabsTrigger>
        </TabsList>

        {/* Nouvelle section Liste d'Attente */}
        <TabsContent value="waitlist" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-[#145587]/10 to-[#145587]/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-[#145587]">
                  <Trophy className="h-5 w-5 mr-2" />
                  Votre Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-3xl font-bold text-[#145587] mb-2">
                    #{profile.position || '?'}
                  </div>
                  {getPositionBadge()}
                </div>
                <p className="text-sm text-gray-600">sur la liste d'attente</p>
                <Progress value={getProgressValue()} className="mt-3" />
                <p className="text-xs mt-1 text-gray-500">
                  Plus votre position est basse, plus vite vous serez client rapidement.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-green-700">
                  <Clock className="h-5 w-5 mr-2" />
                  Temps d'attente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-green-700 mb-2">
                  {getEstimatedWaitTime()}
                </div>
                <p className="text-sm text-green-600">
                  Estimation basée sur votre position
                </p>
                <div className="mt-3 flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                  Nous lançons notre service très bientôt
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-blue-700">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  Prochaine étape
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold text-blue-700 mb-2">
                  20 Juib 2025
                </div>
                <p className="text-sm text-blue-600">
                  Pose des machines
                </p>
                <div className="mt-3 text-sm text-gray-600">
                  <Bell className="h-4 w-4 mr-2 inline text-blue-600" />
                  Vous serez notifié par email
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendrier des événements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2" />
                Calendrier du projet Hello Wash
              </CardTitle>
              <CardDescription>
                Les grandes étapes à venir pour le lancement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative pl-8 before:absolute before:left-3 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
                  <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-blue-600 bg-blue-100">
                    <CheckCircle2 className="h-3 w-3 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">Mai 2025</h3>
                  <p className="mt-1 text-sm text-gray-600">Livraison du batiment</p>
                </div>
                
                <div className="relative pl-8 before:absolute before:left-3 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
                  <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-blue-600 bg-blue-100">
                    <CheckCircle2 className="h-3 w-3 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">5 Juin 2025</h3>
                  <p className="mt-1 text-sm text-gray-600">Réception et installation des première commmande de matériel</p>
                </div>
                
                 <div className="relative pl-8 before:absolute before:left-3 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
                  <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-blue-600 bg-white">
                    <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                  </div>
                  <h3 className="font-medium text-gray-900">10 Juin 2025</h3>
                  <p className="mt-1 text-sm text-gray-600">Début des travaux de plomberie et électricité</p>
                </div>

                  <div className="relative pl-8 before:absolute before:left-3 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
                  <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white">
                    <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                  </div>
                  <h3 className="font-medium text-gray-900">20 Juin 2025</h3>
                  <p className="mt-1 text-sm text-gray-600">Pose des machine et réception du linge</p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white">
                    <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                  </div>
                  <h3 className="font-medium text-gray-900">Juin - Juillet 2025</h3>
                  <p className="mt-1 text-sm text-gray-600">Ouverture</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Que se passe-t-il ensuite ? */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowRight className="h-5 w-5 mr-2" />
                Que se passe-t-il ensuite ?
              </CardTitle>
              <CardDescription>
                Tout ce que vous devez savoir sur le processus de lancement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <Check className="h-5 w-5 mr-2 text-[#145587]" />
                  Processus de lancement
                </h3>
                <p className="text-gray-600 pl-7">
                  Notre service sera lancé progressivement, en commençant par un nombre limité de propriétés dans les zones clés 
                  de la Baie de Somme. Cela nous permettra d'assurer la qualité optimale de notre service et de recueillir vos retours 
                  pour nous améliorer constamment.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-[#145587]" />
                  Critères de sélection
                </h3>
                <div className="pl-7 space-y-2">
                  <p className="text-gray-600">
                    Les membres seront intégrés au service selon ces critères :
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Votre position dans la liste d'attente</li>
                    <li>Votre localisation (nous commencerons par certaines zones)</li>
                    <li>Le type et le nombre de propriétés que vous gérez</li>
                    <li>Les services spécifiques dont vous avez besoin</li>
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-[#145587]" />
                  Communication
                </h3>
                <div className="pl-7">
                  <p className="text-gray-600 mb-2">
                    Vous serez régulièrement informé de l'avancement du projet et de votre position via :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" /> Mises à jour par email
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Bell className="h-4 w-4 mr-2 text-gray-500" /> Notifications sur cette plateforme
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" /> Contact personnel (membres prioritaires)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenu existant du profil */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nom complet</label>
                  <p className="text-lg">{profile.profiles.first_name} {profile.profiles.last_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {profile.profiles.email}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {profile.profiles.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Téléphone</label>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {profile.profiles.phone}
                    </p>
                  </div>
                )}
                {profile.profiles.company && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Entreprise</label>
                    <p className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                      {profile.profiles.company}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenu existant de l'activité */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Détails de votre Activité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Type de profil</label>
                  <p className="text-lg capitalize">
                    {profile.profile_type === 'gite' ? 'Gîtes Indépendants' : 'Grand Compte'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Localisation</label>
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {profile.location}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre de propriétés</label>
                  <p className="text-2xl font-bold text-[#145587]">{profile.number_of_properties}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Capacité totale</label>
                  <p className="text-2xl font-bold text-[#145587]">{profile.total_capacity} personnes</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Services souhaités</label>
                <div className="flex gap-2 mt-2">
                  {profile.services.map((service, index) => (
                    <Badge key={index} variant="outline">
                      {service === 'linge-lit' ? 'Linge de lit' :
                       service === 'linge-toilette' ? 'Linge de toilette' :
                       'Linge de table'}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Délai de livraison préféré</label>
                <p className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {profile.delivery_delay.toUpperCase()} (
                  {profile.delivery_delay === 'j-1' ? 'Veille de l\'arrivée' :
                   profile.delivery_delay === 'j-2' ? '2 jours avant' :
                   '3 jours avant'})
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberDashboard;
