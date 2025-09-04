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
  return <div className="min-h-screen">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Forfaits location de linge</h2>
              <p className="text-gray-600">Tarifs transparents pour tous nos services</p>
              <p className="text-sm text-gray-500 mt-2"><em>Nos prix sont HT</em></p>
            </div>

            {/* Offre spéciale nouveaux clients */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
                <div className="text-lg font-bold mb-2">🎉 OFFRE NOUVEAUX CLIENTS</div>
                <div className="text-2xl font-bold mb-2">-20% sur votre première commande</div>
                <div className="text-sm opacity-90">Valable jusqu'au 31 décembre 2024</div>
              </div>
            </div>

            {/* Forfaits location de linge */}
            <div className="mb-8">
              <div className="grid gap-4">
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors relative">
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    POPULAIRE
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Kit Duo</h4>
                    <p className="text-sm text-gray-600">Location kit complet</p>
                    <p className="text-xs text-gray-500 mt-1">1 drap plat, 1 housse de couette, 2 taies d'oreiller, 2 serviettes de bain, 2 serviettes à main, 1 tapis de bain, 1 torchon</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 line-through">30,00 €</div>
                    <span className="text-2xl font-bold text-[#145587]">
                      25,00 €
                    </span>
                    <div className="text-xs text-green-600 font-semibold">Économisez 5€</div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Kit grand lit</h4>
                    <p className="text-sm text-gray-600">Location pour 1 lit 2 places en 140, 160 ou 180 cm</p>
                    <p className="text-xs text-gray-500 mt-1">1 drap, 1 housse de couette, 2 taies d'oreiller</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#145587]">
                      19,00 €
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Kit petit lit</h4>
                    <p className="text-sm text-gray-600">Location pour un lit 1 place en 80 ou 90 cm</p>
                    <p className="text-xs text-gray-500 mt-1">1 drap, 1 housse de couette, 1 taie d'oreiller</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#145587]">
                      14,00 €
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Kit bain 2 personnes</h4>
                    <p className="text-sm text-gray-600">Pour 2 personnes</p>
                    <p className="text-xs text-gray-500 mt-1">2 serviettes de bain, 2 serviettes à main</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#145587]">
                      8,50 €
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Kit bain 1 personne</h4>
                    <p className="text-sm text-gray-600">Pour 1 personne</p>
                    <p className="text-xs text-gray-500 mt-1">1 serviette de bain, 1 serviette à main</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#145587]">
                      5,00 €
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">Kit torchons</h4>
                    <p className="text-sm text-gray-600">Torchons de cuisine</p>
                    <p className="text-xs text-gray-500 mt-1">2 torchons 40x40 cm</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#145587]">
                      1,80 €
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Remises en volume */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#145587] mb-6 border-b border-gray-200 pb-2">💰 Remises en volume</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">-10%</div>
                  <div className="text-sm font-semibold text-gray-700">À partir de 5 kits</div>
                  <div className="text-xs text-gray-500">par commande</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">-15%</div>
                  <div className="text-sm font-semibold text-gray-700">À partir de 10 kits</div>
                  <div className="text-xs text-gray-500">par commande</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">-20%</div>
                  <div className="text-sm font-semibold text-gray-700">Contrat annuel</div>
                  <div className="text-xs text-gray-500">engagement 12 mois</div>
                </div>
              </div>
            </div>

            {/* Tarifs location à l'unité */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#145587] mb-6 border-b border-gray-200 pb-2">Tarifs location à l'unité</h3>
              <div className="grid gap-3">
                

                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Housse de couette grand lit</h4>
                    <p className="text-xs text-gray-500">1 housse de couette 220x240 ou 240x260</p>
                  </div>
                  <span className="text-lg font-bold text-[#145587]">9,00 €</span>
                </div>

                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Housse de couette petit lit</h4>
                    <p className="text-xs text-gray-500">1 housse de couette</p>
                  </div>
                  <span className="text-lg font-bold text-[#145587]">7,00 €</span>
                </div>

                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Drap plat / Drap grand lit</h4>
                    <p className="text-xs text-gray-500">1 drap plat ou plat de 140, 160 ou 180 cm</p>
                  </div>
                  <span className="text-lg font-bold text-[#145587]">6,00 €</span>
                </div>

                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Drap plat / Drap petit lit</h4>
                    <p className="text-xs text-gray-500">1 drap plat 80x200 ou 90x200</p>
                  </div>
                  <span className="text-lg font-bold text-[#145587]">5,00 €</span>
                </div>

                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Draps de bain</h4>
                    <p className="text-xs text-gray-500">1 serviette de bain</p>
                  </div>
                  <span className="text-lg font-bold text-[#145587]">3,50 €</span>
                </div>

                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Tapis salle de bain</h4>
                    <p className="text-xs text-gray-500">1 tapis de salle de bain</p>
                  </div>
                  <span className="text-lg font-bold text-[#145587]">3,00 €</span>
                </div>

                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Taie d'oreiller</h4>
                    <p className="text-xs text-gray-500">1 taie d'oreiller 50x70cm ou 65x65cm</p>
                  </div>
                  <span className="text-lg font-bold text-[#145587]">2,00 €</span>
                </div>

                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Torchon</h4>
                    <p className="text-xs text-gray-500">1 torchon</p>
                  </div>
                  <span className="text-lg font-bold text-[#145587]">1,50 €</span>
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

            {/* Prix TTC */}
            

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
              
              <Button onClick={scrollToContact} className="bg-[#145587] hover:bg-[#145587]/90 text-white px-8 py-3">
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Tarifs;