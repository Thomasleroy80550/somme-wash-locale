
import { MapPin, Users, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <section id="apropos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">À propos de Hello Wash</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Hello Wash est née de l'expérience de <strong>HelloKeys.fr</strong>, spécialiste de la conciergerie 
              Airbnb dans la Baie de Somme. Face à la nécessité d'internaliser la gestion du linge 
              pour nos clients propriétaires, nous avons développé une expertise pointue en blanchisserie 
              professionnelle.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Forte de cette expérience terrain et de notre connaissance du territoire, Hello Wash 
              vous propose aujourd'hui des services de location de linge de qualité supérieure, 
              étendus à tous les professionnels de la région.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-[#145587]/10 rounded-lg mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#145587]" />
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
            <div className="bg-gradient-to-br from-[#145587]/10 via-[#145587]/5 to-white rounded-3xl p-8 shadow-xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">HelloKeys.fr & Hello Wash</h3>
                <p className="text-gray-600 mb-8">
                  Notre expérience dans la conciergerie Airbnb nous a menés naturellement vers 
                  l'excellence en gestion du linge professionnel.
                </p>
                
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-[#145587]">4</div>
                      <div className="text-sm text-gray-600">Années d'expérience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">+150</div>
                      <div className="text-sm text-gray-600">Propriétaires</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">30k</div>
                      <div className="text-sm text-gray-600">Voyageurs</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    + de 150 propriétaires et 30 000 voyageurs font confiance à Hello Keys !
                  </p>
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
