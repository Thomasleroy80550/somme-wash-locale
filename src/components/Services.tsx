
import { Bed, Bath, UtensilsCrossed, Sparkles, Clock, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Bed,
      title: "Linge de lit",
      description: "Draps, housses de couette, taies d'oreiller. Linge doux et impeccablement propre pour un confort optimal.",
      features: ["Coton de qualité", "Différentes tailles", "Livraison incluse"]
    },
    {
      icon: Bath,
      title: "Linge de toilette",
      description: "Serviettes, peignoirs, tapis de bain. Textiles absorbants et moelleux pour votre bien-être.",
      features: ["Ultra-absorbant", "Hypoallergénique", "Séchage rapide"]
    },
    {
      icon: UtensilsCrossed,
      title: "Linge de table",
      description: "Nappes, serviettes de table, chemins de table. Élégance et raffinement pour vos réceptions.",
      features: ["Designs variés", "Anti-taches", "Repassage professionnel"]
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
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                <service.icon className="h-8 w-8 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="mt-6 w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold">
                En savoir plus
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
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
