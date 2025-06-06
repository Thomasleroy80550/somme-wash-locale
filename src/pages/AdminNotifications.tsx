
import AdminNotificationSender from '@/components/AdminNotificationSender';
import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminNotifications = () => {
  const navigate = useNavigate();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/admin')}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Retour Admin</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#145587] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">HW</span>
                  </div>
                  <h1 className="text-xl font-bold text-[#145587]">Hello Wash - Notifications</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Notifications</h1>
            <p className="text-gray-600">
              Envoyez des actualités, informations et mises à jour à vos membres
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar avec statistiques */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="h-5 w-5 mr-2" />
                      Audience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Membres totaux</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gîtes indépendants</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Grands comptes</span>
                      <span className="font-semibold">0</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Types de messages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-blue-500 rounded mr-2"></span>
                      <span>Actualités générales</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-purple-500 rounded mr-2"></span>
                      <span>Annonces de lancement</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded mr-2"></span>
                      <span>Informations importantes</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-orange-500 rounded mr-2"></span>
                      <span>Mises à jour</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-yellow-500 rounded mr-2"></span>
                      <span>Messages de bienvenue</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-red-500 rounded mr-2"></span>
                      <span>Notifications de position</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Formulaire principal */}
            <div className="lg:col-span-3">
              <AdminNotificationSender />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminNotifications;
