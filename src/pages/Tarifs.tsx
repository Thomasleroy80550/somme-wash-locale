import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Tarifs = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate('/#contact');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero section avec titre */}
      <section className="bg-gradient-to-br from-[#145587] to-[#145587]/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Grille de tarifs</h1>
            <p className="text-xl text-blue-100">Tarifs transparents pour les gîtes indépendants</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choisissez vos produits</h2>
              <p className="text-gray-600">Tarifs transparents pour tous nos services</p>
            </div>

            {/* Kits de lit */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#145587] mb-6 border-b border-gray-200 pb-2">🛏️ Kits de lit</h3>
              <div className="grid gap-4">
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Kit lit simple (90 cm)</h4>
                    <p className="text-sm text-gray-600">Pour un lit 1 place</p>
                    <p className="text-xs text-gray-500 mt-1">• 1 petit drap • 1 petite housse de couette • 1 taie d'oreiller</p>
                  </div>
                  <span className="text-2xl font-bold text-[#145587]">8,50 €</span>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Kit lit double standard (140 cm ou 160cm)</h4>
                    <p className="text-sm text-gray-600">Pour un lit 2 places</p>
                    <p className="text-xs text-gray-500 mt-1">• 1 grand drap • 1 grande housse de couette • 2 taies d'oreiller</p>
                  </div>
                  <span className="text-2xl font-bold text-[#145587]">10,50 €</span>
                </div>
              </div>
            </div>

            {/* Kits additionnels */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#145587] mb-6 border-b border-gray-200 pb-2">🧼 Kits additionnels</h3>
              <div className="grid gap-4">
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">🧺 Kit serviettes</h4>
                    <p className="text-sm text-gray-600">Serviettes de bain en coton blanc</p>
                    <p className="text-xs text-gray-500 mt-1">• 1 petite serviette • 1 drap de bain</p>
                  </div>
                  <span className="text-2xl font-bold text-[#145587]">5,00 €</span>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">🍽️ Kit cuisine</h4>
                    <p className="text-sm text-gray-600">Torchon de cuisine en coton</p>
                    <p className="text-xs text-gray-500 mt-1">• 2 torchons</p>
                  </div>
                  <span className="text-2xl font-bold text-[#145587]">3,20 €</span>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Tapis de bain</h4>
                    <p className="text-sm text-gray-600">Tapis en coton blanc</p>
                    <p className="text-xs text-gray-500 mt-1">• 1 tapis 50 x 70 cm</p>
                  </div>
                  <span className="text-2xl font-bold text-[#145587]">3,50 €</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-[#145587]/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prêt à commencer ?</h3>
              <p className="text-gray-600 mb-4">Contactez-nous pour configurer votre calendrier et automatiser vos commandes</p>
              <Button 
                onClick={scrollToContact}
                className="bg-[#145587] hover:bg-[#145587]/90 text-white px-8 py-3"
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tarifs;