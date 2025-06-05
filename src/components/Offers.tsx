import { Calendar, Truck, Building2, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Offers = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="offres" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Offres sur Mesure</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions adaptées à chaque type d'hébergement dans la Baie de Somme
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Offre Gîtes Indépendants avec animations */}
          <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
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
            
            <Button 
              onClick={scrollToContact}
              className="w-full bg-[#145587] hover:bg-[#145587]/90 text-white py-3 text-lg animate-fade-in"
            >
              Configurer mon calendrier
            </Button>
          </div>

          {/* Offre Grands Comptes */}
          <div className="bg-gradient-to-br from-[#145587] to-[#145587]/90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-white">
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
            
            <Button 
              onClick={scrollToContact}
              className="w-full bg-white text-[#145587] hover:bg-gray-100 py-3 text-lg font-semibold"
            >
              Demander un devis
            </Button>
          </div>
        </div>

        {/* Section avantages */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Pourquoi choisir nos offres ?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Gain de temps</h4>
                <p className="text-gray-600">Plus de gestion du linge, concentrez-vous sur vos hôtes</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Qualité constante</h4>
                <p className="text-gray-600">Linge impeccable pour chaque arrivée</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Service local</h4>
                <p className="text-gray-600">Partenaire de confiance en Baie de Somme</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
