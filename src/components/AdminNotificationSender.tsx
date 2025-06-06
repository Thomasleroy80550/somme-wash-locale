
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Send, Users, Target, MapPin, Building2, Hash } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationForm {
  title: string;
  message: string;
  messageType: string;
  targetType: string;
  profileType?: string;
  location?: string;
  minPosition?: number;
  maxPosition?: number;
  imageUrl?: string;
  actionUrl?: string;
}

const AdminNotificationSender = () => {
  const [form, setForm] = useState<NotificationForm>({
    title: '',
    message: '',
    messageType: 'news',
    targetType: 'all'
  });
  const [sending, setSending] = useState(false);
  const [previewCount, setPreviewCount] = useState<number | null>(null);

  const messageTypes = [
    { value: 'news', label: 'Actualités', icon: '📰' },
    { value: 'update', label: 'Mise à jour', icon: '🔄' },
    { value: 'position', label: 'Position', icon: '📍' },
    { value: 'welcome', label: 'Bienvenue', icon: '👋' },
    { value: 'launch', label: 'Lancement', icon: '🚀' },
    { value: 'info', label: 'Information', icon: 'ℹ️' }
  ];

  const targetTypes = [
    { value: 'all', label: 'Tous les membres', icon: <Users className="h-4 w-4" /> },
    { value: 'profile_type', label: 'Par type de profil', icon: <Building2 className="h-4 w-4" /> },
    { value: 'location', label: 'Par localisation', icon: <MapPin className="h-4 w-4" /> },
    { value: 'position_range', label: 'Par position', icon: <Hash className="h-4 w-4" /> }
  ];

  const profileTypes = [
    { value: 'gite_independant', label: 'Gîte Indépendant' },
    { value: 'hotel', label: 'Hôtel' },
    { value: 'residence', label: 'Résidence' }
  ];

  const handlePreview = async () => {
    try {
      const targetAudience = buildTargetAudience();
      
      // Simuler le comptage sans envoyer
      const { data, error } = await supabase
        .from('member_profiles')
        .select('user_id', { count: 'exact' })
        .neq('status', 'rejected');

      if (error) throw error;

      // Pour une vraie prévisualisation, on devrait appliquer les filtres
      let count = data?.length || 0;
      
      if (form.targetType === 'profile_type' && form.profileType) {
        const { count: filteredCount } = await supabase
          .from('member_profiles')
          .select('*', { count: 'exact', head: true })
          .eq('profile_type', form.profileType)
          .neq('status', 'rejected');
        count = filteredCount || 0;
      }

      setPreviewCount(count);
      toast.success(`Prévisualisation: ${count} membres seront notifiés`);
    } catch (error: any) {
      console.error('Erreur lors de la prévisualisation:', error);
      toast.error('Erreur lors de la prévisualisation');
    }
  };

  const buildTargetAudience = () => {
    const audience: any = { type: form.targetType };

    switch (form.targetType) {
      case 'profile_type':
        audience.profile_type = form.profileType;
        break;
      case 'location':
        audience.location = form.location;
        break;
      case 'position_range':
        audience.min_position = form.minPosition;
        audience.max_position = form.maxPosition;
        break;
    }

    return audience;
  };

  const handleSend = async () => {
    if (!form.title.trim() || !form.message.trim()) {
      toast.error('Le titre et le message sont obligatoires');
      return;
    }

    if (form.targetType === 'profile_type' && !form.profileType) {
      toast.error('Veuillez sélectionner un type de profil');
      return;
    }

    if (form.targetType === 'location' && !form.location?.trim()) {
      toast.error('Veuillez saisir une localisation');
      return;
    }

    if (form.targetType === 'position_range' && (!form.minPosition || !form.maxPosition)) {
      toast.error('Veuillez saisir une plage de positions');
      return;
    }

    setSending(true);

    try {
      const { data: currentUser } = await supabase.auth.getUser();
      
      const { data, error } = await supabase.rpc('send_notification_to_audience', {
        p_title: form.title,
        p_message: form.message,
        p_message_type: form.messageType,
        p_target_audience: buildTargetAudience(),
        p_image_url: form.imageUrl || null,
        p_action_url: form.actionUrl || null,
        p_created_by: currentUser.user?.id || null
      });

      if (error) throw error;

      toast.success(`Notification envoyée avec succès à ${data} membres`);
      
      // Réinitialiser le formulaire
      setForm({
        title: '',
        message: '',
        messageType: 'news',
        targetType: 'all'
      });
      setPreviewCount(null);
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi:', error);
      toast.error('Erreur lors de l\'envoi de la notification');
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Send className="h-5 w-5 mr-2" />
          Envoyer une notification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Titre */}
        <div className="space-y-2">
          <Label htmlFor="title">Titre *</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Titre de la notification"
            maxLength={100}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Contenu de votre notification..."
            rows={4}
            maxLength={500}
          />
          <div className="text-sm text-gray-500 text-right">
            {form.message.length}/500 caractères
          </div>
        </div>

        {/* Type de message */}
        <div className="space-y-2">
          <Label>Type de message</Label>
          <Select value={form.messageType} onValueChange={(value) => setForm({ ...form, messageType: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {messageTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <span className="flex items-center">
                    <span className="mr-2">{type.icon}</span>
                    {type.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Audience cible */}
        <div className="space-y-4">
          <Label>Audience cible</Label>
          <Select value={form.targetType} onValueChange={(value) => setForm({ ...form, targetType: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {targetTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <span className="flex items-center">
                    {type.icon}
                    <span className="ml-2">{type.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Options spécifiques selon le type d'audience */}
          {form.targetType === 'profile_type' && (
            <Select value={form.profileType} onValueChange={(value) => setForm({ ...form, profileType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type de profil" />
              </SelectTrigger>
              <SelectContent>
                {profileTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {form.targetType === 'location' && (
            <Input
              value={form.location || ''}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Ex: Baie de Somme, Le Crotoy..."
            />
          )}

          {form.targetType === 'position_range' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Position minimum</Label>
                <Input
                  type="number"
                  value={form.minPosition || ''}
                  onChange={(e) => setForm({ ...form, minPosition: parseInt(e.target.value) })}
                  placeholder="1"
                  min="1"
                />
              </div>
              <div>
                <Label>Position maximum</Label>
                <Input
                  type="number"
                  value={form.maxPosition || ''}
                  onChange={(e) => setForm({ ...form, maxPosition: parseInt(e.target.value) })}
                  placeholder="100"
                  min="1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Options avancées */}
        <div className="space-y-4">
          <Label>Options avancées (optionnel)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imageUrl">URL de l'image</Label>
              <Input
                id="imageUrl"
                value={form.imageUrl || ''}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="actionUrl">Lien d'action</Label>
              <Input
                id="actionUrl"
                value={form.actionUrl || ''}
                onChange={(e) => setForm({ ...form, actionUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Prévisualisation */}
        {previewCount !== null && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <Target className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-semibold text-blue-900">
                Prévisualisation: {previewCount} membres seront notifiés
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePreview}
            disabled={!form.title.trim() || !form.message.trim()}
          >
            <Target className="h-4 w-4 mr-2" />
            Prévisualiser
          </Button>
          
          <Button
            onClick={handleSend}
            disabled={sending || !form.title.trim() || !form.message.trim()}
            className="bg-[#145587] hover:bg-[#145587]/90"
          >
            {sending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            {sending ? 'Envoi...' : 'Envoyer la notification'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminNotificationSender;
