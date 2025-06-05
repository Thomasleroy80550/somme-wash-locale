
import { Bed, Bath, UtensilsCrossed, Sparkles, Clock, Shield } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Services = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const services = [
    {
      id: "linge-lit",
      icon: Bed,
      title: "Linge de lit",
      description: "Draps, housses de couette, taies d'oreiller. Linge doux et impeccablement propre pour un confort optimal.",
      features: ["Coton de qualité", "Différentes tailles", "Livraison incluse"],
      available: true,
      detailedDescription: "Notre service de location de linge de lit comprend une gamme complète de produits en coton de qualité supérieure. Nous proposons des draps housse, draps plats, housses de couette et taies d'oreiller dans toutes les tailles standards.",
      additionalFeatures: [
        "Coton 100% percale pour un confort optimal",
        "Disponible en blanc classique et couleurs neutres",
        "Tailles disponibles : 90x190, 140x190, 160x200, 180x200",
        "Livraison et collecte à domicile incluses",
        "Entretien professionnel avec produits écologiques",
        "Rotation hebdomadaire ou selon vos besoins"
      ]
    },
    {
      id: "linge-toilette",
      icon: Bath,
      title: "Linge de toilette",
      description: "Serviettes, peignoirs, tapis de bain. Textiles absorbants et moelleux pour votre bien-être.",
      features: ["Ultra-absorbant", "Hypoallergénique", "Séchage rapide"],
      available: true,
      detailedDescription: "Notre collection de linge de toilette offre le parfait équilibre entre douceur, absorption et durabilité. Tous nos textiles sont traités avec des produits hypoallergéniques.",
      additionalFeatures: [
        "Serviettes de bain et de toilette en coton éponge",
        "Peignoirs en coton bouclé ultra-doux",
        "Tapis de bain antidérapants",
        "Traitement antibactérien naturel",
        "Séchage rapide et grande absorption",
        "Couleurs neutres et élégantes"
      ]
    },
    {
      id: "linge-table",
      icon: UtensilsCrossed,
      title: "Linge de table",
      description: "Nappes, serviettes de table, chemins de table. Élégance et raffinement pour vos réceptions.",
      features: ["Designs variés", "Anti-taches", "Repassage professionnel"],
      available: false,
      detailedDescription: "Sublimez vos tables avec notre collection de linge de table élégant. Parfait pour les événements professionnels, réceptions ou dîners familiaux. Ce service sera disponible très prochainement.",
      additionalFeatures: [
        "Nappes rondes, carrées et rectangulaires",
        "Serviettes de table assorties",
        "Chemins de table et sets de table",
        "Traitement anti-taches professionnel",
        "Repassage impeccable inclus",
        "Designs classiques et modernes disponibles"
      ]
    }
  ];

  const advantages = [
    {
      icon: Sparkles,
      title: "Propreté impeccable",
      description: "Nettoyage professionnel avec des produits écologiques"
    },
    {
      icon: Clock,
      title: "Service rapide",
      description: "Livraison et collecte selon vos besoins"
    },
    {
      icon: Shield,
      title: "Qualité garantie",
      description: "Linge de qualité supérieure, contrôlé et certifié"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services de Location</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hello Wash vous propose une gamme complète de linge professionnel pour tous vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className={`bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${!service.available ? 'opacity-75' : ''}`}>
              <div className={`flex items-center justify-center w-16 h-16 ${service.available ? 'bg-[#145587]/10' : 'bg-gray-200'} rounded-2xl mb-6 relative`}>
                <service.icon className={`h-8 w-8 ${service.available ? 'text-[#145587]' : 'text-gray-400'}`} />
                {!service.available && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Bientôt
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className={`w-2 h-2 ${service.available ? 'bg-[#145587]' : 'bg-gray-400'} rounded-full mr-3`}></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => setOpenModal(service.id)}
                className={`w-full ${service.available 
                  ? 'bg-white border-2 border-[#145587] text-[#145587] hover:bg-[#145587] hover:text-white' 
                  : 'bg-gray-100 border-2 border-gray-300 text-gray-500 cursor-not-allowed'
                } py-3 rounded-lg transition-colors font-semibold`}
                disabled={!service.available}
              >
                {service.available ? 'En savoir plus' : 'Bientôt disponible'}
              </button>
            </div>
          ))}
        </div>

        {/* Modales pour chaque service */}
        {services.map((service) => (
          <Dialog key={service.id} open={openModal === service.id} onOpenChange={() => setOpenModal(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center text-2xl">
                  <div className={`flex items-center justify-center w-12 h-12 ${service.available ? 'bg-[#145587]/10' : 'bg-gray-200'} rounded-xl mr-4`}>
                    <service.icon className={`h-6 w-6 ${service.available ? 'text-[#145587]' : 'text-gray-400'}`} />
                  </div>
                  {service.title}
                  {!service.available && (
                    <span className="ml-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                      Bientôt
                    </span>
                  )}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed mt-4">
                  {service.detailedDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-4">Services inclus :</h4>
                <ul className="space-y-3">
                  {service.additionalFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`w-2 h-2 ${service.available ? 'bg-[#145587]' : 'bg-gray-400'} rounded-full mr-3 mt-2 flex-shrink-0`}></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`mt-8 p-6 ${service.available ? 'bg-[#145587]/5' : 'bg-orange-50'} rounded-lg`}>
                <h4 className={`font-semibold ${service.available ? 'text-[#145587]' : 'text-orange-900'} mb-2`}>
                  {service.available ? 'Contactez-nous pour un devis personnalisé' : 'Service bientôt disponible'}
                </h4>
                <p className={service.available ? 'text-[#145587]/80' : 'text-orange-700'}>
                  {service.available 
                    ? 'Nos équipes sont à votre disposition pour établir une offre adaptée à vos besoins spécifiques.'
                    : 'Ce service sera lancé très prochainement. Contactez-nous pour être informé de la date de lancement.'
                  }
                </p>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        <div className="bg-gradient-to-r from-[#145587] to-[#145587]/90 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Pourquoi choisir Hello Wash ?</h3>
            <p className="text-blue-100 text-lg">L'excellence au service de votre confort</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">{advantage.title}</h4>
                <p className="text-blue-100">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
