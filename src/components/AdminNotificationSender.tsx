
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Send, Users, MapPin, Building2, Hash } from 'lucide-react';

interface NotificationForm {
  title: string;
  message: string;
  messageType: string;
  targetType: string;
  minPosition: string;
  maxPosition: string;
  profileType: string;
  location: string;
  imageUrl: string;
  actionUrl: string;
}

const AdminNotificationSender = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<NotificationForm>({
    title: '',
    message: '',
    messageType: 'news',
    targetType: 'all',
    minPosition: '',
    maxPosition: '',
    profileType: '',
    location: '',
    imageUrl: '',
    actionUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // Préparer l'audience cible
      let targetAudience: any = { type: formData.targetType };

      switch (formData.targetType) {
        case 'position_range':
          targetAudience = {
            type: 'position_range',
            min_position: parseInt(formData.minPosition),
            max_position: parseInt(formData.maxPosition)
          };
          break;
        case 'profile_type':
          targetAudience = {
            type: 'profile_type',
            profile_type: formData.profileType
          };
          break;
        case 'location':
          targetAudience = {
            type: 'location',
            location: formData.location
          };
          break;
      }

      // Appeler la fonction pour envoyer la notification
      const { data, error } = await supabase.rpc('send_notification_to_audience', {
        p_title: formData.title,
        p_message: formData.message,
        p_message_type: formData.messageType,
        p_target_audience: targetAudience,
        p_image_url: formData.imageUrl || null,
        p_action_url: formData.actionUrl || null,
        p_created_by: user.id
      });

      if (error) throw error;

      toast.success(`Notification envoyée à ${data} utilisateur(s)`);
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        message: '',
        messageType: 'news',
        targetType: 'all',
        minPosition: '',
        maxPosition: '',
        profileType: '',
        location: '',
        imageUrl: '',
        actionUrl: ''
      });
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi:', error);
      toast.error('Erreur lors de l\'envoi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Send className="h-5 w-5" />
          <span>Envoyer une notification</span>
        </CardTitle>
        <CardDescription>
          Créer et envoyer des notifications aux membres de Hello Wash
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contenu du message */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contenu du message</h3>
            
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Titre de la notification"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Contenu du message..."
                className="min-h-[100px]"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="messageType">Type de message</Label>
              <Select 
                value={formData.messageType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, messageType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">📢 Actualité</SelectItem>
                  <SelectItem value="update">📅 Mise à jour</SelectItem>
                  <SelectItem value="position">👤 Position</SelectItem>
                  <SelectItem value="launch">🚀 Lancement</SelectItem>
                  <SelectItem value="info">ℹ️ Information</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Audience cible */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Audience cible</h3>
            
            <RadioGroup 
              value={formData.targetType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, targetType: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Tous les membres</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="position_range" id="position_range" />
                <Label htmlFor="position_range" className="flex items-center space-x-2">
                  <Hash className="h-4 w-4" />
                  <span>Par position dans la liste</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="profile_type" id="profile_type" />
                <Label htmlFor="profile_type" className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Par type de profil</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="location" id="location" />
                <Label htmlFor="location" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Par localisation</span>
                </Label>
              </div>
            </RadioGroup>

            {/* Champs conditionnels selon le type d'audience */}
            {formData.targetType === 'position_range' && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div>
                  <Label htmlFor="minPosition">Position min</Label>
                  <Input
                    id="minPosition"
                    type="number"
                    value={formData.minPosition}
                    onChange={(e) => setFormData(prev => ({ ...prev, minPosition: e.target.value }))}
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label htmlFor="maxPosition">Position max</Label>
                  <Input
                    id="maxPosition"
                    type="number"
                    value={formData.maxPosition}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxPosition: e.target.value }))}
                    placeholder="100"
                  />
                </div>
              </div>
            )}

            {formData.targetType === 'profile_type' && (
              <div className="ml-6">
                <Label htmlFor="profileType">Type de profil</Label>
                <Select 
                  value={formData.profileType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, profileType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gite">Gîtes indépendants</SelectItem>
                    <SelectItem value="grand-compte">Grands comptes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.targetType === 'location' && (
              <div className="ml-6">
                <Label htmlFor="location">Localisation</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Paris, Bordeaux, Provence..."
                />
              </div>
            )}
          </div>

          {/* Options avancées */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Options avancées (optionnel)</h3>
            
            <div>
              <Label htmlFor="imageUrl">URL de l'image</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            
            <div>
              <Label htmlFor="actionUrl">Lien d'action</Label>
              <Input
                id="actionUrl"
                value={formData.actionUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, actionUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading || !formData.title || !formData.message}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer la notification'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminNotificationSender;
