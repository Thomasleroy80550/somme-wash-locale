
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminNotificationSender from '@/components/AdminNotificationSender';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Send, MessageSquare, Users, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import AuthGuard from '@/components/AuthGuard';

interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<string, number>;
}

const AdminNotifications = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<NotificationStats>({
    total: 0,
    unread: 0,
    byType: {}
  });
  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchRecentNotifications();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      // Statistiques globales
      const { data: allNotifications, error } = await supabase
        .from('notifications')
        .select('message_type, read');

      if (error) throw error;

      const total = allNotifications?.length || 0;
      const unread = allNotifications?.filter(n => !n.read).length || 0;
      
      const byType = allNotifications?.reduce((acc: Record<string, number>, notification) => {
        const type = notification.message_type || 'other';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {}) || {};

      setStats({ total, unread, byType });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  const fetchRecentNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select(`
          id,
          title,
          message_type,
          sent_at,
          target_audience,
          created_by
        `)
        .order('sent_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setRecentNotifications(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des notifications récentes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (messageType: string | null) => {
    switch (messageType) {
      case 'news': return 'Actualité';
      case 'update': return 'Mise à jour';
      case 'position': return 'Position';
      case 'welcome': return 'Bienvenue';
      case 'launch': return 'Lancement';
      default: return 'Info';
    }
  };

  const getAudienceDescription = (targetAudience: any) => {
    if (!targetAudience) return 'Tous';
    
    switch (targetAudience.type) {
      case 'all': return 'Tous les membres';
      case 'position_range': 
        return `Positions ${targetAudience.min_position}-${targetAudience.max_position}`;
      case 'profile_type':
        return targetAudience.profile_type === 'gite' ? 'Gîtes' : 'Grands comptes';
      case 'location':
        return `Localisation: ${targetAudience.location}`;
      default: return 'Audience spécifique';
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#145587] mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion des Notifications
            </h1>
            <p className="text-gray-600 mt-2">
              Envoyez des messages aux membres de Hello Wash
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Total notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Badge className="h-4 w-4 mr-2" />
                  Non lues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.unread}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Type principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  {Object.entries(stats.byType).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Aucun'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Taux de lecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.total > 0 ? Math.round(((stats.total - stats.unread) / stats.total) * 100) : 0}%
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="send" className="space-y-6">
            <TabsList>
              <TabsTrigger value="send" className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Envoyer</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Historique</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="send">
              <AdminNotificationSender />
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications récentes</CardTitle>
                  <CardDescription>
                    Les 10 dernières notifications envoyées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentNotifications.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        Aucune notification envoyée pour le moment
                      </p>
                    ) : (
                      recentNotifications.map((notification) => (
                        <div key={notification.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">
                                {notification.title}
                              </h3>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <Badge variant="outline">
                                  {getTypeLabel(notification.message_type)}
                                </Badge>
                                <span>
                                  {getAudienceDescription(notification.target_audience)}
                                </span>
                                <span>
                                  {format(new Date(notification.sent_at), 'dd MMM yyyy HH:mm', { locale: fr })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminNotifications;
