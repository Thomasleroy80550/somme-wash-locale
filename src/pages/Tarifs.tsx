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
                  <div className="text-right">
                    <span className="text-lg font-semibold text-[#145587] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      Prix sur demande
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Kit lit double standard (140 cm ou 160cm)</h4>
                    <p className="text-sm text-gray-600">Pour un lit 2 places</p>
                    <p className="text-xs text-gray-500 mt-1">• 1 grand drap • 1 grande housse de couette • 2 taies d'oreiller</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-[#145587] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      Prix sur demande
                    </span>
                  </div>
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
                  <div className="text-right">
                    <span className="text-lg font-semibold text-[#145587] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      Prix sur demande
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">🍽️ Kit cuisine</h4>
                    <p className="text-sm text-gray-600">Torchon de cuisine en coton</p>
                    <p className="text-xs text-gray-500 mt-1">• 2 torchons</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-[#145587] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      Prix sur demande
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Tapis de bain</h4>
                    <p className="text-sm text-gray-600">Tapis en coton blanc</p>
                    <p className="text-xs text-gray-500 mt-1">• 1 tapis 50 x 70 cm</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-[#145587] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      Prix sur demande
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conditions importantes */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#145587] mb-6 border-b border-gray-200 pb-2">📋 Conditions importantes</h3>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#145587] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800"><strong>Livraison incluse</strong> dans tous nos tarifs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#145587] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800"><strong>Sac de linge sale inclus</strong> pour le retour</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#145587] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800"><strong>Linge cautionné :</strong> Si le linge revient abîmé ou non conforme, il sera facturé. Chaque propriétaire est tenu de faire respecter cela à ses locataires.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#145587] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-800"><strong>Le respect est important</strong> pour maintenir la qualité de notre service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-[#145587]/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prêt à commencer ?</h3>
              <p className="text-gray-600 mb-6">Contactez-nous pour configurer votre calendrier et automatiser vos commandes</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-[#145587]">📧</div>
                  <a href="mailto:contact@hellowash.fr" className="text-lg font-semibold text-[#145587] hover:underline">
                    contact@hellowash.fr
                  </a>
                </div>
                
                <div className="flex items-center justify-center gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-[#145587]">📞</div>
                  <a href="tel:+33374475836" className="text-lg font-semibold text-[#145587] hover:underline">
                    03 74 47 58 36
                  </a>
                </div>
              </div>
              
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