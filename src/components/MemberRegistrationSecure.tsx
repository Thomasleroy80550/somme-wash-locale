
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface MemberRegistrationSecureProps {
  onSuccess: () => void;
}

const MemberRegistrationSecure = ({ onSuccess }: MemberRegistrationSecureProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    company: '',
    profileType: 'gite' as 'gite' | 'grand-compte',
    numberOfProperties: 1,
    totalCapacity: 1,
    location: '',
    description: '',
    deliveryDelay: 'j-1' as 'j-1' | 'j-2' | 'j-3',
    services: [] as string[],
    specialRequests: ''
  });

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const ensureUserProfileExists = async (userId: string): Promise<void> => {
    try {
      console.log('Vérification de l\'existence du profil utilisateur...');
      
      // Vérifier si le profil utilisateur existe
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (checkError) {
        console.error('Erreur lors de la vérification du profil:', checkError);
        throw checkError;
      }

      if (existingProfile) {
        console.log('Profil utilisateur existe déjà');
        return;
      }

      console.log('Création du profil utilisateur...');
      
      // Si le profil n'existe pas, le créer
      const { error: createError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: user?.email || '',
          first_name: user?.user_metadata?.first_name || '',
          last_name: user?.user_metadata?.last_name || ''
        });

      if (createError) {
        console.error('Erreur lors de la création du profil:', createError);
        throw createError;
      }

      console.log('Profil utilisateur créé avec succès');
    } catch (error) {
      console.error('Erreur dans ensureUserProfileExists:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vous devez être connecté pour vous inscrire');
      return;
    }

    setLoading(true);

    try {
      // D'abord, s'assurer que le profil utilisateur existe
      await ensureUserProfileExists(user.id);

      // Vérifier si un profil membre existe déjà
      const { data: existingProfile, error: checkError } = await supabase
        .from('member_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError) {
        console.error('Erreur lors de la vérification du profil:', checkError);
        throw checkError;
      }

      if (existingProfile) {
        toast.error('Vous êtes déjà inscrit à la liste d\'attente');
        onSuccess();
        return;
      }

      // Mettre à jour le profil avec les informations supplémentaires
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          phone: formData.phone,
          company: formData.company || null
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      console.log('Insertion du profil membre avec fonction sécurisée...');
      
      // Utiliser la fonction sécurisée pour insérer avec position automatique
      const { data: insertResult, error: memberError } = await supabase.rpc('insert_member_with_position', {
        p_user_id: user.id,
        p_profile_type: formData.profileType,
        p_number_of_properties: formData.numberOfProperties,
        p_total_capacity: formData.totalCapacity,
        p_location: formData.location,
        p_description: formData.description || null,
        p_delivery_delay: formData.deliveryDelay,
        p_services: formData.services,
        p_special_requests: formData.specialRequests || null
      });

      if (memberError) {
        console.error('Erreur lors de l\'insertion:', memberError);
        throw memberError;
      }

      console.log('Insertion du profil membre réussie:', insertResult);

      // Envoyer une notification de bienvenue
      await supabase.from('notifications').insert({
        user_id: user.id,
        type: 'welcome',
        title: 'Bienvenue dans la liste d\'attente !',
        message: 'Votre inscription a été confirmée. Vous recevrez une notification dès que nous aurons des mises à jour.'
      });

      toast.success('Inscription réussie ! Bienvenue dans la liste d\'attente Hello Wash.');
      onSuccess();
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error);
      toast.error('Erreur lors de l\'inscription: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Finaliser votre inscription</CardTitle>
          <CardDescription>
            Complétez vos informations pour rejoindre la liste d'attente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations de contact</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">Entreprise (optionnel)</Label>
                  <Input
                    id="company"
                    placeholder="Nom de votre entreprise"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations sur votre activité</h3>
              
              <div>
                <Label>Type de profil *</Label>
                <RadioGroup 
                  value={formData.profileType}
                  onValueChange={(value: 'gite' | 'grand-compte') => 
                    setFormData(prev => ({ ...prev, profileType: value }))
                  }
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gite" id="gite" />
                    <Label htmlFor="gite">Gîtes indépendants (1-5 propriétés)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grand-compte" id="grand-compte" />
                    <Label htmlFor="grand-compte">Grand compte (6+ propriétés)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numberOfProperties">Nombre de propriétés *</Label>
                  <Input
                    id="numberOfProperties"
                    type="number"
                    min="1"
                    value={formData.numberOfProperties}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      numberOfProperties: parseInt(e.target.value) || 1 
                    }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="totalCapacity">Capacité totale (personnes) *</Label>
                  <Input
                    id="totalCapacity"
                    type="number"
                    min="1"
                    value={formData.totalCapacity}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      totalCapacity: parseInt(e.target.value) || 1 
                    }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Localisation principale *</Label>
                <Input
                  id="location"
                  placeholder="Ville, région"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description de votre activité (optionnel)</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez brièvement votre activité..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {/* Service Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Préférences de service</h3>
              
              <div>
                <Label>Services souhaités *</Label>
                <div className="mt-2 space-y-2">
                  {[
                    { id: 'linge-lit', label: 'Linge de lit' },
                    { id: 'linge-toilette', label: 'Linge de toilette' },
                    { id: 'linge-table', label: 'Linge de table' }
                  ].map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={service.id}
                        checked={formData.services.includes(service.id)}
                        onCheckedChange={(checked) => 
                          handleServiceChange(service.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={service.id}>{service.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="deliveryDelay">Délai de livraison préféré *</Label>
                <Select 
                  value={formData.deliveryDelay}
                  onValueChange={(value: 'j-1' | 'j-2' | 'j-3') => 
                    setFormData(prev => ({ ...prev, deliveryDelay: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="j-1">J-1 (Veille de l'arrivée)</SelectItem>
                    <SelectItem value="j-2">J-2 (2 jours avant)</SelectItem>
                    <SelectItem value="j-3">J-3 (3 jours avant)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialRequests">Demandes particulières (optionnel)</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Horaires préférés, contraintes particulières..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={loading || formData.services.length === 0}
            >
              {loading ? 'Inscription en cours...' : 'Finaliser mon inscription'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberRegistrationSecure;
