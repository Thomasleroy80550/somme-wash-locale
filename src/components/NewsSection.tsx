
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PublicNotification {
  id: string;
  title: string;
  message: string;
  message_type: string | null;
  sent_at: string;
  image_url: string | null;
  action_url: string | null;
}

const NewsSection = () => {
  const [news, setNews] = useState<PublicNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicNews();
  }, []);

  const fetchPublicNews = async () => {
    try {
      // Récupérer les actualités publiques récentes (type 'news' uniquement)
      const { data, error } = await supabase
        .from('notifications')
        .select('id, title, message, message_type, sent_at, image_url, action_url')
        .eq('message_type', 'news')
        .eq('status', 'published')
        .order('sent_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Erreur lors du chargement des actualités:', error);
        return;
      }

      setNews(data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dernières actualités
            </h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dernières actualités
          </h2>
          <p className="text-xl text-gray-600">
            Restez informé de l'avancement du projet Hello Wash
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              {item.image_url && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>Actualité</span>
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(item.sent_at), 'dd MMM yyyy', { locale: fr })}
                  </div>
                </div>
                
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-sm mb-4 line-clamp-3">
                  {item.message}
                </CardDescription>
                
                {item.action_url && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(item.action_url!, '_blank')}
                    className="flex items-center space-x-2"
                  >
                    <span>En savoir plus</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
