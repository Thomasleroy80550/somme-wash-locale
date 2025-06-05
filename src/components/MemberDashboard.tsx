
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MemberProfile, WaitingListStats } from '@/types/member';
import { 
  User, 
  Building2, 
  Clock, 
  Star, 
  Bell, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trophy,
  Users
} from 'lucide-react';

interface MemberDashboardProps {
  profile: MemberProfile;
  onProfileUpdate: (profile: MemberProfile) => void;
}

const MemberDashboard = ({ profile, onProfileUpdate }: MemberDashboardProps) => {
  const [waitingListStats] = useState<WaitingListStats>({
    totalMembers: 247,
    averageWaitTime: '2-3 semaines',
    nextUpdateDate: '15 janvier 2025',
  });

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
    return Math.max(0, 100 - (profile.position / waitingListStats.totalMembers) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Statut et position */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#145587]/10 to-[#145587]/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-[#145587]">
              <Trophy className="h-5 w-5 mr-2" />
              Votre Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#145587] mb-2">
              #{profile.position}
            </div>
            <p className="text-sm text-gray-600">sur {waitingListStats.totalMembers} membres</p>
            <Progress value={getProgressValue()} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-green-700">
              <Clock className="h-5 w-5 mr-2" />
              Statut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              {getStatusBadge(profile.status)}
            </div>
            <p className="text-sm text-green-600">
              Temps d'attente estimé: {waitingListStats.averageWaitTime}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-blue-700">
              <Bell className="h-5 w-5 mr-2" />
              Prochaine Mise à Jour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-blue-700 mb-2">
              {waitingListStats.nextUpdateDate}
            </div>
            <p className="text-sm text-blue-600">
              Nouvelles informations sur le lancement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Détails du profil */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="business">Activité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="resources">Ressources</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informations Personnelles
                <Button variant="ghost" size="sm" className="ml-auto">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nom complet</label>
                  <p className="text-lg">{profile.personalInfo.firstName} {profile.personalInfo.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {profile.personalInfo.email}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Téléphone</label>
                  <p className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {profile.personalInfo.phone}
                  </p>
                </div>
                {profile.personalInfo.company && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Entreprise</label>
                    <p className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                      {profile.personalInfo.company}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                    {profile.businessInfo.profileType === 'gite' ? 'Gîtes Indépendants' : 'Grand Compte'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Localisation</label>
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {profile.businessInfo.location}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre de propriétés</label>
                  <p className="text-2xl font-bold text-[#145587]">{profile.businessInfo.numberOfProperties}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Capacité totale</label>
                  <p className="text-2xl font-bold text-[#145587]">{profile.businessInfo.totalCapacity} personnes</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Services souhaités</label>
                <div className="flex gap-2 mt-2">
                  {profile.preferences.services.map((service, index) => (
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
                  {profile.preferences.deliveryDelay.toUpperCase()} (
                  {profile.preferences.deliveryDelay === 'j-1' ? 'Veille de l\'arrivée' :
                   profile.preferences.deliveryDelay === 'j-2' ? '2 jours avant' :
                   '3 jours avant'})
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Dernières Notifications
              </CardTitle>
              <CardDescription>
                Restez informé de l'avancement du projet Hello Wash
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-[#145587] pl-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Bienvenue dans la liste d'attente !</h4>
                  <span className="text-sm text-gray-500">Aujourd'hui</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Votre inscription a été confirmée. Vous êtes en position #{profile.position}.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-400 pl-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Prochaine mise à jour prévue</h4>
                  <span className="text-sm text-gray-500">Dans 5 jours</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Nouvelles informations sur le calendrier de lancement et les premières zones desservies.
                </p>
              </div>
              
              <div className="border-l-4 border-green-400 pl-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Tests pilotes bientôt disponibles</h4>
                  <span className="text-sm text-gray-500">Cette semaine</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Les premiers membres prioritaires seront contactés pour participer aux tests.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Guide de Préparation</CardTitle>
                <CardDescription>
                  Préparez votre activité pour Hello Wash
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#145587] rounded-full mr-3"></div>
                    Synchronisation des calendriers de réservation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#145587] rounded-full mr-3"></div>
                    Optimisation des plannings de ménage
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#145587] rounded-full mr-3"></div>
                    Formation de vos équipes
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Télécharger le guide
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communauté</CardTitle>
                <CardDescription>
                  Échangez avec d'autres propriétaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-[#145587]">{waitingListStats.totalMembers}</div>
                  <p className="text-sm text-gray-600">Membres inscrits</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Rejoindre le forum
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberDashboard;
