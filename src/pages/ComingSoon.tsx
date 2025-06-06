
import { useState } from 'react';
import { Sparkles, MapPin, Calendar, Building2, Users, TrendingUp, Clock, Mail, Bed, Bath, UtensilsCrossed, Truck, CheckCircle, UserPlus, Package, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [activeStep, setActiveStep] = useState(0);
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

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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

  const processSteps = [
    {
      id: 1,
      icon: UserPlus,
      title: "Inscription",
      subtitle: "Rejoignez Hello Wash",
      description: "Créez votre compte et connectez votre calendrier de réservation (Airbnb, Booking, etc.)",
      details: [
        "Inscription rapide en 2 minutes",
        "Synchronisation automatique des calendriers",
        "Configuration de vos préférences de livraison"
      ],
      color: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      position: { x: 10, y: 20 }
    },
    {
      id: 2,
      icon: Calendar,
      title: "Planification Automatique",
      subtitle: "On s'occupe de tout",
      description: "Notre système surveille vos réservations et programme automatiquement les livraisons",
      details: [
        "Détection automatique des nouvelles réservations",
        "Calcul du délai optimal (J-1, J-2 ou J-3)",
        "Confirmation par notification"
      ],
      color: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      position: { x: 30, y: 10 }
    },
    {
      id: 3,
      icon: Truck,
      title: "Livraison",
      subtitle: "Linge frais livré",
      description: "Votre linge propre arrive avant vos hôtes, prêt à être installé",
      details: [
        "Livraison dans le créneau choisi",
        "Linge emballé et étiquetté par pièce",
        "Notification de livraison en temps réel"
      ],
      color: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      position: { x: 70, y: 10 }
    },
    {
      id: 4,
      icon: Home,
      title: "Installation",
      subtitle: "Gîte prêt pour vos hôtes",
      description: "Installez le linge frais et profitez de l'accueil parfait de vos voyageurs",
      details: [
        "Linge de qualité hôtelière",
        "Emballage facile à identifier",
        "Gîte prêt en quelques minutes"
      ],
      color: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      position: { x: 90, y: 20 }
    },
    {
      id: 5,
      icon: Package,
      title: "Collecte",
      subtitle: "On récupère le sale",
      description: "Après le départ, nous récupérons le linge sale pour le cycle suivant",
      details: [
        "Collecte programmée automatiquement",
        "Sacs de collecte fournis",
        "Nettoyage professionnel garanti"
      ],
      color: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
      position: { x: 75, y: 35 }
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

      {/* Nos Offres Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Offres sur Mesure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions adaptées à chaque type d'hébergement dans la Baie de Somme
            </p>
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mt-4">
              <Clock className="h-4 w-4 mr-2" />
              Bientôt disponibles
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Offre Gîtes Indépendants */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden opacity-90">
              {/* Éléments de scintillement */}
              <div className="absolute top-4 right-4 animate-sparkle">
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </div>
              <div className="absolute top-16 right-12 animate-sparkle delay-300">
                <Sparkles className="h-3 w-3 text-blue-400" />
              </div>
              <div className="absolute top-8 right-20 animate-sparkle delay-700">
                <Sparkles className="h-2 w-2 text-green-400" />
              </div>
              <div className="absolute bottom-16 left-4 animate-sparkle delay-500">
                <Sparkles className="h-3 w-3 text-purple-400" />
              </div>
              <div className="absolute bottom-8 left-12 animate-sparkle delay-1000">
                <Sparkles className="h-2 w-2 text-pink-400" />
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-[#145587]/10 rounded-2xl mr-4 animate-gentle-sway">
                  <Building2 className="h-8 w-8 text-[#145587]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Gîtes Indépendants</h3>
                  <p className="text-[#145587] font-semibold">Solution automatisée</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Synchronisez votre calendrier et recevez automatiquement le linge propre avant l'arrivée de vos hôtes.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mr-4 flex-shrink-0">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Synchronisation calendrier</h4>
                    <p className="text-gray-600">Connectez votre calendrier de réservation pour une gestion automatique</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mr-4 flex-shrink-0">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Livraison programmée</h4>
                    <p className="text-gray-600">Le linge arrive avant vos hôtes, prêt à être installé</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-4 flex-shrink-0">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Choix du délai</h4>
                    <p className="text-gray-600">Sélectionnez J-1, J-2 ou J-3 selon vos préférences</p>
                    <div className="flex gap-2 mt-3">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">J-1</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">J-2</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">J-3</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-100 text-orange-800 px-4 py-3 rounded-2xl text-center">
                <p className="font-semibold">Bientôt disponible</p>
                <p className="text-sm mt-1">Soyez notifié du lancement</p>
              </div>
            </div>

            {/* Offre Grands Comptes */}
            <div className="bg-gradient-to-br from-[#145587] to-[#145587]/90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-white opacity-90">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mr-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Grands Comptes</h3>
                  <p className="text-blue-100 font-semibold">Solution industrielle</p>
                </div>
              </div>
              
              <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                Livraison en rolls pour les hôtels, résidences et établissements à fort volume.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mr-4 flex-shrink-0">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Livraison en rolls</h4>
                    <p className="text-blue-100">Transport optimisé pour grandes quantités</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mr-4 flex-shrink-0">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Planning personnalisé</h4>
                    <p className="text-blue-100">Fréquence adaptée à votre occupation</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mr-4 flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Service premium</h4>
                    <p className="text-blue-100">Gestionnaire dédié et suivi personnalisé</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <p className="text-white/90 text-center font-medium">
                  💼 Devis personnalisé requis
                </p>
                <p className="text-blue-100 text-center text-sm mt-2">
                  Tarifs préférentiels selon volume
                </p>
              </div>
              
              <div className="bg-orange-100 text-orange-800 px-4 py-3 rounded-2xl text-center">
                <p className="font-semibold">Bientôt disponible</p>
                <p className="text-sm mt-1">Demandez à être contacté</p>
              </div>
            </div>
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

          <div className="bg-white rounded-2xl shadow-xl p-8">
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
          </div>
        </div>
      </section>

      {/* Comment ça marche - Parcours Animé */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Un parcours simple et automatisé pour transformer la gestion de votre linge
            </p>
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Clock className="h-4 w-4 mr-2" />
              Processus entièrement automatisé
            </div>
          </div>

          {/* Parcours Animé */}
          <div className="relative h-[600px] mx-auto max-w-6xl">
            {/* Lignes de connexion animées */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="25%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="75%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              
              {/* Chemin principal */}
              <path
                d="M 100,150 Q 200,100 300,120 T 500,120 Q 600,100 700,150 Q 750,200 720,250"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
                className="animate-pulse"
              />
              
              {/* Points de progression */}
              {processSteps.map((step, index) => {
                const progress = activeStep >= index ? 1 : 0;
                return (
                  <circle
                    key={step.id}
                    cx={100 + index * 150}
                    cy={150 + (index % 2) * 50}
                    r="8"
                    fill={progress ? "#3b82f6" : "#e5e7eb"}
                    className="transition-all duration-500"
                    style={{
                      transform: progress ? 'scale(1.2)' : 'scale(1)',
                      filter: progress ? 'drop-shadow(0 0 8px #3b82f6)' : 'none'
                    }}
                  />
                );
              })}
            </svg>

            {/* Cartes flottantes */}
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className={`absolute transform transition-all duration-700 ease-out cursor-pointer group ${
                  activeStep === index ? 'scale-110 z-20' : 'scale-100 z-10'
                }`}
                style={{
                  left: `${step.position.x}%`,
                  top: `${step.position.y}%`,
                  transform: `translate(-50%, -50%) ${activeStep === index ? 'scale(1.1)' : 'scale(1)'}`,
                }}
                onMouseEnter={() => setActiveStep(index)}
              >
                <Card className={`w-80 shadow-xl bg-gradient-to-br ${step.bgGradient} border-2 transition-all duration-300 ${
                  activeStep === index 
                    ? 'border-blue-400 shadow-2xl animate-gentle-sway' 
                    : 'border-transparent hover:border-blue-200 hover:shadow-xl'
                }`}>
                  <CardHeader className="text-center pb-4 relative">
                    {/* Icône animée */}
                    <div className="relative mx-auto mb-4">
                      <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center text-white shadow-lg group-hover:animate-gentle-sway`}>
                        <step.icon className="h-10 w-10" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold animate-pulse">
                        {step.id}
                      </div>
                      
                      {/* Particules flottantes pour l'étape active */}
                      {activeStep === index && (
                        <>
                          <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                          <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                          <div className="absolute -top-4 right-4 w-1 h-1 bg-green-400 rounded-full animate-ping delay-500"></div>
                        </>
                      )}
                    </div>
                    
                    <CardTitle className="text-xl mb-2 text-gray-900">{step.title}</CardTitle>
                    <p className="text-sm font-medium text-blue-600">{step.subtitle}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-700 text-sm mb-4 text-center">
                      {step.description}
                    </p>

                    {/* Liste des détails avec animations */}
                    <div className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-start text-xs text-gray-600 transition-all duration-300 ${
                            activeStep === index ? 'animate-slide-up' : ''
                          }`}
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Barre de progression pour l'étape active */}
                    {activeStep === index && (
                      <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full animate-pulse w-full"></div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}

            {/* Éléments décoratifs flottants */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-40 left-40 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute bottom-20 right-40 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700 opacity-40"></div>
          </div>

          {/* Navigation du parcours */}
          <div className="flex justify-center mt-12 space-x-4">
            {processSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? `bg-gradient-to-r ${step.color} scale-125 shadow-lg` 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#145587] to-[#145587]/80 rounded-3xl p-8 text-white relative overflow-hidden">
              {/* Éléments décoratifs */}
              <div className="absolute top-4 right-4 animate-sparkle">
                <Sparkles className="h-6 w-6 text-yellow-300" />
              </div>
              <div className="absolute bottom-4 left-4 animate-sparkle delay-500">
                <Sparkles className="h-4 w-4 text-blue-300" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Prêt à simplifier la gestion de votre linge ?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Rejoignez notre liste d'attente et soyez parmi les premiers à découvrir cette révolution dans la gestion du linge pour gîtes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-[#145587] hover:bg-gray-100 px-8 py-3 text-lg font-semibold animate-gentle-sway"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Rejoindre la Liste d'Attente
                </Button>
                <span className="text-blue-100 text-sm">🎯 Position prioritaire garantie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter" className="py-16 bg-[#145587]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Rejoignez notre Liste d'Attente</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Soyez les premiers à découvrir Hello Wash et profitez d'offres exclusives de lancement
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <form onSubmit={handleNewsletterSignup} className="flex gap-4 flex-1">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white flex-1"
                required
              />
              <Button type="submit" className="bg-white text-[#145587] hover:bg-gray-100 whitespace-nowrap">
                <Mail className="h-4 w-4 mr-2" />
                S'inscrire
              </Button>
            </form>
          </div>
          
          <div className="mt-6">
            <a 
              href="/auth"
              className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Inscription Complète - Liste d'Attente Prioritaire
            </a>
            <p className="text-blue-100 text-sm mt-2">
              Accès prioritaire aux tests et lancement exclusif
            </p>
          </div>
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
            &copy; 2025 Hello Wash. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
