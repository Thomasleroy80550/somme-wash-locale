
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, ExternalLink, Sparkles, Megaphone } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

type Notification = Database['public']['Tables']['notifications']['Row'];

const NewsSection = () => {
  const [news, setNews] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicNews();
  }, []);

  const fetchPublicNews = async () => {
    try {
      // Récupérer les actualités publiques (on prend les dernières news générales)
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .in('message_type', ['news', 'launch', 'info'])
        .eq('status', 'published')
        .order('sent_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Erreur lors du chargement des actualités:', error);
        return;
      }

      // Filtrer pour ne garder que les actualités les plus récentes et pertinentes
      const publicNews = data?.filter(item => 
        item.title && item.message && 
        (item.message_type === 'news' || item.message_type === 'launch' || item.message_type === 'info')
      ) || [];

      setNews(publicNews.slice(0, 3)); // Limiter à 3 actualités
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNewsIcon = (messageType: string) => {
    switch (messageType) {
      case 'launch':
        return <Sparkles className="h-5 w-5" />;
      case 'news':
        return <Megaphone className="h-5 w-5" />;
      case 'info':
        return <Bell className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getNewsColor = (messageType: string) => {
    switch (messageType) {
      case 'launch':
        return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'news':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'info':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getBadgeColor = (messageType: string) => {
    switch (messageType) {
      case 'launch':
        return 'bg-purple-500 text-white';
      case 'news':
        return 'bg-blue-500 text-white';
      case 'info':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#145587] mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des actualités...</p>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null; // Ne pas afficher la section s'il n'y a pas d'actualités
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Actualités Hello Wash</h2>
          <p className="text-xl text-gray-600">Restez informé des dernières nouvelles</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-full ${getNewsColor(item.message_type)}`}>
                    {getNewsIcon(item.message_type)}
                  </div>
                  <Badge className={getBadgeColor(item.message_type)}>
                    {item.message_type === 'launch' ? 'Lancement' : 
                     item.message_type === 'news' ? 'Actualité' : 'Info'}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-gray-900 mt-4">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDistanceToNow(new Date(item.sent_at), { 
                      addSuffix: true, 
                      locale: fr 
                    })}
                  </span>
                  
                  {item.action_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(item.action_url!, '_blank')}
                      className="text-[#145587] border-[#145587] hover:bg-[#145587] hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      En savoir plus
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action pour s'inscrire */}
        <div className="text-center mt-12">
          <div className="bg-[#145587] rounded-2xl p-8 text-white">
            <Bell className="h-12 w-12 mx-auto mb-4 text-blue-200" />
            <h3 className="text-2xl font-bold mb-4">Restez informé</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Inscrivez-vous à notre liste d'attente pour recevoir toutes les actualités 
              et être prévenu du lancement de Hello Wash en priorité.
            </p>
            <Button 
              onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#145587] hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Rejoindre la liste d'attente
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
