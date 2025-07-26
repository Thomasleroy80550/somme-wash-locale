import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Tarifs = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate('/#contact');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Grille de tarifs</h1>
          </div>
          <p className="text-gray-600 mt-2">Tarifs pour les gîtes indépendants</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choisissez vos produits</h2>
            <p className="text-gray-600">Tarifs transparents pour tous nos services</p>
          </div>

          {/* Parures de lit */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#145587] mb-6 border-b border-gray-200 pb-2">Parures de lit</h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">Kit couette XL</h4>
                  <p className="text-sm text-gray-600">Pour un lit 2 places</p>
                  <p className="text-xs text-gray-500 mt-1">• 1 drap plat • 1 housse de couette • 2 taies d'oreiller</p>
                </div>
                <span className="text-2xl font-bold text-[#145587]">21,50 €</span>
              </div>
              
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">Kit couette S</h4>
                  <p className="text-sm text-gray-600">Pour un lit 1 place en 90 cm</p>
                  <p className="text-xs text-gray-500 mt-1">• 1 drap plat • 1 housse de couette • 1 taie d'oreiller</p>
                </div>
                <span className="text-2xl font-bold text-[#145587]">15,50 €</span>
              </div>
              
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">Kit draps XL</h4>
                  <p className="text-sm text-gray-600">Pour un lit 2 places</p>
                  <p className="text-xs text-gray-500 mt-1">• 2 draps plats • 2 taies d'oreiller</p>
                </div>
                <span className="text-2xl font-bold text-[#145587]">15,50 €</span>
              </div>
              
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">Kit draps S</h4>
                  <p className="text-sm text-gray-600">Pour un lit 1 place en 90 cm</p>
                  <p className="text-xs text-gray-500 mt-1">• 2 draps plats • 1 taie d'oreiller</p>
                </div>
                <span className="text-2xl font-bold text-[#145587]">12,00 €</span>
              </div>
            </div>
          </div>

          {/* Linge de bain */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#145587] mb-6 border-b border-gray-200 pb-2">Linge de bain</h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">Kit serviettes</h4>
                  <p className="text-sm text-gray-600">Serviettes de bain en coton blanc</p>
                  <p className="text-xs text-gray-500 mt-1">• 1 serviette de bain • 1 serviette de toilette</p>
                </div>
                <span className="text-2xl font-bold text-[#145587]">6,00 €</span>
              </div>
              
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">Serviette piscine</h4>
                  <p className="text-sm text-gray-600">Serviette en coton</p>
                  <p className="text-xs text-gray-500 mt-1">• 1 grande serviette 150 x 100 cm</p>
                </div>
                <span className="text-2xl font-bold text-[#145587]">5,50 €</span>
              </div>
              
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">Tapis de bain</h4>
                  <p className="text-sm text-gray-600">Tapis en coton blanc</p>
                  <p className="text-xs text-gray-500 mt-1">• 1 tapis 50 x 70 cm</p>
                </div>
                <span className="text-2xl font-bold text-[#145587]">3,00 €</span>
              </div>
            </div>
          </div>

          {/* Compléments */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#145587] mb-6 border-b border-gray-200 pb-2">Compléments</h3>
            <div className="grid gap-4">
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">Kit torchons</h4>
                  <p className="text-sm text-gray-600">Torchons de cuisine en coton</p>
                  <p className="text-xs text-gray-500 mt-1">• 2 torchons 40 x 40 cm</p>
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
    </div>
  );
};

export default Tarifs;