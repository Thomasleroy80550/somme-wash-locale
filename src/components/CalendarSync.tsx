
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Calendar, 
  Plus, 
  RefreshCw, 
  Trash2, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  ExternalLink,
  Settings
} from 'lucide-react';
import { CalendarView } from './CalendarView';

interface CalendarIntegration {
  id: string;
  name: string;
  ical_url: string;
  sync_enabled: boolean;
  last_sync_at: string | null;
  sync_status: 'pending' | 'success' | 'error' | 'syncing';
  sync_error: string | null;
  created_at: string;
}

const CalendarSync = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    ical_url: ''
  });

  // Récupérer les intégrations calendrier
  const { data: integrations, isLoading } = useQuery({
    queryKey: ['calendar-integrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calendar_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as CalendarIntegration[];
    },
    enabled: !!user
  });

  // Mutation pour ajouter une intégration
  const addIntegrationMutation = useMutation({
    mutationFn: async (integration: { name: string; ical_url: string }) => {
      const { data, error } = await supabase
        .from('calendar_integrations')
        .insert([{
          ...integration,
          user_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-integrations'] });
      toast.success('Calendrier ajouté avec succès');
      setShowAddForm(false);
      setNewIntegration({ name: '', ical_url: '' });
    },
    onError: (error) => {
      toast.error('Erreur lors de l\'ajout: ' + error.message);
    }
  });

  // Mutation pour synchroniser
  const syncMutation = useMutation({
    mutationFn: async (integrationId: string) => {
      const { data, error } = await supabase.functions.invoke('sync-calendar', {
        body: { integrationId }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['calendar-integrations'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      toast.success(data.message || 'Synchronisation réussie');
    },
    onError: (error) => {
      toast.error('Erreur de synchronisation: ' + error.message);
    }
  });

  // Mutation pour supprimer une intégration
  const deleteIntegrationMutation = useMutation({
    mutationFn: async (integrationId: string) => {
      const { error } = await supabase
        .from('calendar_integrations')
        .delete()
        .eq('id', integrationId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-integrations'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      toast.success('Calendrier supprimé');
    },
    onError: (error) => {
      toast.error('Erreur lors de la suppression: ' + error.message);
    }
  });

  const handleAddIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntegration.name.trim() || !newIntegration.ical_url.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (!isValidICalUrl(newIntegration.ical_url)) {
      toast.error('URL iCal invalide. Elle doit se terminer par .ics ou contenir webcal://');
      return;
    }

    addIntegrationMutation.mutate(newIntegration);
  };

  const isValidICalUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return (
        url.includes('.ics') || 
        url.startsWith('webcal://') ||
        urlObj.hostname.includes('google.com') ||
        urlObj.hostname.includes('outlook.') ||
        urlObj.hostname.includes('airbnb.') ||
        urlObj.hostname.includes('booking.com')
      );
    } catch {
      return false;
    }
  };

  const getStatusBadge = (status: string, syncError?: string | null) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Synchronisé</Badge>;
      case 'error':
        return (
          <Badge variant="destructive" title={syncError || 'Erreur inconnue'}>
            Erreur
          </Badge>
        );
      case 'syncing':
        return <Badge variant="secondary">Synchronisation...</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline">En attente</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span className="ml-2">Chargement...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec bouton d'ajout */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendriers Synchronisés</h2>
          <p className="text-gray-600">Gérez vos intégrations iCal pour optimiser vos livraisons</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-[#145587] hover:bg-[#145587]/90">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un calendrier
        </Button>
      </div>

      {/* Liste des intégrations */}
      <div className="grid gap-4">
        {integrations?.map((integration) => (
          <Card key={integration.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-[#145587]" />
                  <div>
                    <h3 className="font-medium text-gray-900">{integration.name}</h3>
                    <p className="text-sm text-gray-500 truncate max-w-md">
                      {integration.ical_url}
                    </p>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    {getStatusBadge(integration.sync_status, integration.sync_error)}
                  </div>
                  
                  {integration.last_sync_at && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Dernière sync: {new Date(integration.last_sync_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                </div>

                {integration.sync_error && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    {integration.sync_error}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => syncMutation.mutate(integration.id)}
                  disabled={syncMutation.isPending || integration.sync_status === 'syncing'}
                >
                  <RefreshCw className={`h-4 w-4 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(integration.ical_url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteIntegrationMutation.mutate(integration.id)}
                  disabled={deleteIntegrationMutation.isPending}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {integrations?.length === 0 && (
          <Card className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun calendrier synchronisé</h3>
            <p className="text-gray-600 mb-4">
              Ajoutez vos calendriers iCal (Google Calendar, Airbnb, Booking.com, etc.) pour optimiser vos livraisons
            </p>
            <Button onClick={() => setShowAddForm(true)} className="bg-[#145587] hover:bg-[#145587]/90">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter votre premier calendrier
            </Button>
          </Card>
        )}
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <form onSubmit={handleAddIntegration} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Ajouter un calendrier iCal</h3>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Annuler
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom du calendrier</Label>
                <Input
                  id="name"
                  placeholder="ex: Réservations Airbnb"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="ical_url">URL iCal</Label>
                <Input
                  id="ical_url"
                  placeholder="https://calendar.google.com/calendar/ical/..."
                  value={newIntegration.ical_url}
                  onChange={(e) => setNewIntegration(prev => ({ ...prev, ical_url: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="bg-blue-100 p-3 rounded-lg text-sm text-blue-800">
              <h4 className="font-medium mb-2">Comment obtenir l'URL iCal :</h4>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Google Calendar:</strong> Paramètres → Intégrer le calendrier → URL secrète au format iCal</li>
                <li>• <strong>Airbnb:</strong> Calendrier → Exporter → Copier le lien iCal</li>
                <li>• <strong>Booking.com:</strong> Extranet → Tarifs et disponibilités → Synchronisation calendrier</li>
                <li>• <strong>Outlook:</strong> Paramètres calendrier → Calendrier partagé → iCal</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              disabled={addIntegrationMutation.isPending}
              className="bg-[#145587] hover:bg-[#145587]/90"
            >
              {addIntegrationMutation.isPending ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Ajouter le calendrier
            </Button>
          </form>
        </Card>
      )}

      <Separator />

      {/* Vue calendrier */}
      <CalendarView />
    </div>
  );
};

export default CalendarSync;
