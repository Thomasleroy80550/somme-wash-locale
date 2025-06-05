
import { MapPin, Users, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <section id="apropos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">À propos de Hello Wash</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Implantée au cœur de la magnifique Baie de Somme, Hello Wash est votre 
              partenaire de confiance pour tous vos besoins en linge professionnel. 
              Forte de notre expertise en blanchisserie et de notre connaissance du territoire, 
              nous vous proposons des services de location de linge de qualité supérieure.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-[#0052CC]/10 rounded-lg mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#0052CC]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Ancrage local</h4>
                  <p className="text-gray-600 text-sm">Au service de la Baie de Somme depuis des années</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mr-4 flex-shrink-0">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Équipe experte</h4>
                  <p className="text-gray-600 text-sm">Professionnels passionnés à votre service</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4 flex-shrink-0">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Qualité certifiée</h4>
                  <p className="text-gray-600 text-sm">Standards professionnels les plus élevés</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mr-4 flex-shrink-0">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Engagement éco</h4>
                  <p className="text-gray-600 text-sm">Respect de l'environnement et produits durables</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-[#0052CC]/10 via-[#0052CC]/5 to-white rounded-3xl p-8 shadow-xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">La Baie de Somme</h3>
                <p className="text-gray-600 mb-8">
                  Notre région d'exception nous inspire chaque jour. La pureté de l'air marin 
                  et la beauté des paysages se reflètent dans la qualité de nos services.
                </p>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-[#0052CC]">15+</div>
                      <div className="text-sm text-gray-600">Années d'expérience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">500+</div>
                      <div className="text-sm text-gray-600">Clients satisfaits</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">24h</div>
                      <div className="text-sm text-gray-600">Service rapide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
