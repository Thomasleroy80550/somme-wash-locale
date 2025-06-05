
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { MemberProfile } from '@/types/member';
import { User, Building2, MapPin, Clock, Sparkles } from 'lucide-react';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit faire au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  company: z.string().optional(),
  profileType: z.enum(['gite', 'grand-compte']),
  numberOfProperties: z.number().min(1, 'Au moins 1 propriété requise'),
  totalCapacity: z.number().min(1, 'Capacité minimale requise'),
  location: z.string().min(1, 'Localisation requise'),
  description: z.string().optional(),
  deliveryDelay: z.enum(['j-1', 'j-2', 'j-3']),
  services: z.array(z.string()).min(1, 'Sélectionnez au moins un service'),
  specialRequests: z.string().optional(),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

interface MemberRegistrationProps {
  onSuccess: (profile: MemberProfile) => void;
}

const MemberRegistration = ({ onSuccess }: MemberRegistrationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      profileType: 'gite',
      numberOfProperties: 1,
      totalCapacity: 4,
      deliveryDelay: 'j-1',
      services: [],
    },
  });

  const onSubmit = async (data: RegistrationForm) => {
    setIsSubmitting(true);
    
    try {
      // Simuler un délai d'inscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const memberProfile: MemberProfile = {
        id: crypto.randomUUID(),
        personalInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          company: data.company,
        },
        businessInfo: {
          profileType: data.profileType,
          numberOfProperties: data.numberOfProperties,
          totalCapacity: data.totalCapacity,
          location: data.location,
          description: data.description,
        },
        preferences: {
          deliveryDelay: data.deliveryDelay,
          services: data.services,
          specialRequests: data.specialRequests,
        },
        status: 'pending',
        registrationDate: new Date().toISOString(),
        position: Math.floor(Math.random() * 50) + 1, // Position simulée
      };

      onSuccess(memberProfile);
      
      toast({
        title: "Inscription réussie !",
        description: "Vous êtes maintenant sur notre liste d'attente prioritaire.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { id: 'linge-lit', label: 'Linge de lit' },
    { id: 'linge-toilette', label: 'Linge de toilette' },
    { id: 'linge-table', label: 'Linge de table' },
  ];

  const baySommeLocations = [
    'Saint-Valery-sur-Somme',
    'Cayeux-sur-Mer',
    'Le Crotoy',
    'Fort-Mahon-Plage',
    'Rue',
    'Crécy-en-Ponthieu',
    'Abbeville',
    'Autre commune de la Baie de Somme',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="text-center bg-gradient-to-r from-[#145587] to-[#145587]/90 text-white rounded-t-lg">
          <CardTitle className="text-2xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 mr-2" />
            Inscription Liste d'Attente
          </CardTitle>
          <CardDescription className="text-blue-100">
            Rejoignez les professionnels de l'hébergement qui nous font confiance
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Informations personnelles */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <User className="h-5 w-5 text-[#145587]" />
                  <span>Informations personnelles</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entreprise / Nom commercial</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Optionnel : nom de votre entreprise ou marque
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Informations business */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <Building2 className="h-5 w-5 text-[#145587]" />
                  <span>Votre activité</span>
                </div>
                
                <FormField
                  control={form.control}
                  name="profileType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de profil *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gite">Gîtes Indépendants</SelectItem>
                          <SelectItem value="grand-compte">Grand Compte (Hôtel/Résidence)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="numberOfProperties"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de propriétés *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacité totale (personnes) *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre commune" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {baySommeLocations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Préférences de service */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <Clock className="h-5 w-5 text-[#145587]" />
                  <span>Préférences de service</span>
                </div>
                
                <FormField
                  control={form.control}
                  name="deliveryDelay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Délai de livraison préféré *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="j-1">J-1 (Veille de l'arrivée)</SelectItem>
                          <SelectItem value="j-2">J-2 (2 jours avant)</SelectItem>
                          <SelectItem value="j-3">J-3 (3 jours avant)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <FormLabel>Services souhaités *</FormLabel>
                      <div className="grid md:grid-cols-3 gap-4">
                        {serviceOptions.map((service) => (
                          <FormField
                            key={service.id}
                            control={form.control}
                            name="services"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={service.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(service.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, service.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== service.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {service.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demandes spéciales</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez vos besoins spécifiques, contraintes particulières..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Optionnel : toute information qui nous aiderait à mieux vous servir
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#145587] hover:bg-[#145587]/90 text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Inscription en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Rejoindre la Liste d'Attente
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberRegistration;
