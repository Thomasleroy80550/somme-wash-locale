
import { useState } from 'react';
import { Sparkles, MapPin, Calendar, Building2, Users, TrendingUp, Clock, Mail, Bed, Bath, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Merci !",
        description: "Vous serez notifié du lancement de Hello Wash.",
      });
      setEmail('');
    }
  };

  const services = [
    {
      icon: Bed,
      title: "Linge de lit",
      description: "Draps, housses de couette, taies d'oreiller de qualité supérieure",
      available: true
    },
    {
      icon: Bath,
      title: "Linge de toilette", 
      description: "Serviettes ultra-absorbantes et moelleuses",
      available: true
    },
    {
      icon: UtensilsCrossed,
      title: "Linge de table",
      description: "Nappes et serviettes élégantes pour vos réceptions",
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/1cfec06e-dc8a-4f97-b6b2-1a5620825ffa.png" 
                alt="Hello Wash Logo" 
                className="h-12 w-auto"
              />
              <span className="ml-3 text-sm text-gray-600">Baie de Somme</span>
            </div>
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
              Bientôt disponible
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-[#145587]/10 text-[#145587] px-6 py-3 rounded-full mb-8 animate-fade-in">
            <Sparkles className="h-5 w-5 mr-2 animate-sparkle" />
            <span className="font-semibold">Lancement très prochainement</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Hello Wash
            <span className="block text-[#145587] animate-gentle-sway">arrive bientôt</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            La première blanchisserie connectée de la Baie de Somme. 
            Location de linge premium avec gestion automatisée pour vos gîtes et hébergements.
          </p>

          <div className="flex items-center justify-center text-gray-600 mb-12">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Baie de Somme, France</span>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-gray-600">Location de linge professionnel de qualité</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`relative ${!service.available ? 'opacity-75' : ''}`}>
                <CardHeader>
                  <div className={`flex items-center justify-center w-16 h-16 ${service.available ? 'bg-[#145587]/10' : 'bg-gray-200'} rounded-2xl mb-4 relative`}>
                    <service.icon className={`h-8 w-8 ${service.available ? 'text-[#145587]' : 'text-gray-400'}`} />
                    {!service.available && (
                      <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Bientôt
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard Propriétaire</h2>
            <p className="text-gray-600">Gestion automatisée de vos gîtes - Aperçu</p>
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mt-4">
              <Clock className="h-4 w-4 mr-2" />
              Bientôt disponible
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-dashed border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-blue-700">
                    <Calendar className="h-5 w-5 mr-2" />
                    Réservations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700 mb-2">24</div>
                  <p className="text-blue-600 text-sm">Ce mois-ci</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-green-700">
                    <Building2 className="h-5 w-5 mr-2" />
                    Mes Gîtes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-700 mb-2">3</div>
                  <p className="text-green-600 text-sm">Propriétés actives</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-purple-700">
                    <Users className="h-5 w-5 mr-2" />
                    Voyageurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700 mb-2">156</div>
                  <p className="text-purple-600 text-sm">Total clients</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-[#145587]/5 to-[#145587]/10">
              <CardHeader>
                <CardTitle className="flex items-center text-[#145587]">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Synchronisation Calendrier
                </CardTitle>
                <CardDescription>
                  Livraison automatique avant l'arrivée de vos hôtes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Prochaine livraison</div>
                    <div className="font-semibold">Demain 14h - Gîte des Mouettes</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Status</div>
                    <div className="font-semibold text-green-600">✓ Synchronisé Airbnb</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">Bientôt disponible</div>
                <p className="text-gray-600">Dashboard complet en cours de développement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-[#145587]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Restez informés</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Soyez les premiers à découvrir Hello Wash et profitez d'offres exclusives de lancement
          </p>
          
          <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
                required
              />
              <Button type="submit" className="bg-white text-[#145587] hover:bg-gray-100 whitespace-nowrap">
                <Mail className="h-4 w-4 mr-2" />
                S'inscrire
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/1cfec06e-dc8a-4f97-b6b2-1a5620825ffa.png" 
              alt="Hello Wash Logo" 
              className="h-8 w-auto mr-3"
            />
            <span className="text-xl font-bold">Hello Wash</span>
          </div>
          <p className="text-gray-400 mb-4">
            Blanchisserie connectée - Baie de Somme
          </p>
          <p className="text-gray-500 text-sm">
            &copy; 2024 Hello Wash. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
