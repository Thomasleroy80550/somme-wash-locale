
import { MapPin, Truck, Clock } from 'lucide-react';

const DeliveryZones = () => {
  const zones = [
    { name: "Le Crotoy", delay: "J-1", color: "bg-green-500" },
    { name: "Saint-Valery-sur-Somme", delay: "J-1", color: "bg-green-500" },
    { name: "Cayeux-sur-Mer", delay: "J-2", color: "bg-blue-500" },
    { name: "Ault", delay: "J-2", color: "bg-blue-500" },
    { name: "Mers-les-Bains", delay: "J-3", color: "bg-purple-500" },
    { name: "Abbeville", delay: "J-2", color: "bg-blue-500" },
    { name: "Rue", delay: "J-1", color: "bg-green-500" },
    { name: "Fort-Mahon-Plage", delay: "J-2", color: "bg-blue-500" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Zones de Livraison</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous couvrons toute la Baie de Somme avec des délais de livraison adaptés à chaque zone
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Carte visuelle simplifiée */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Baie de Somme</h3>
              
              {/* Carte stylisée avec points */}
              <div className="relative h-96 bg-blue-200 rounded-2xl overflow-hidden">
                {/* Effet mer */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-400 opacity-30"></div>
                
                {/* Points de livraison positionnés */}
                <div className="absolute top-4 left-8 animate-bounce">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Le Crotoy</span>
                  </div>
                </div>
                
                <div className="absolute top-12 right-12 animate-bounce delay-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Saint-Valery</span>
                  </div>
                </div>
                
                <div className="absolute bottom-20 left-4 animate-bounce delay-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Cayeux-sur-Mer</span>
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-8 animate-bounce delay-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Mers-les-Bains</span>
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce delay-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Abbeville</span>
                  </div>
                </div>
                
                <div className="absolute top-1/3 right-1/4 animate-bounce delay-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Rue</span>
                  </div>
                </div>
                
                {/* Icône camion central */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-gentle-sway">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <Truck className="h-6 w-6 text-[#145587]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des zones */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Délais par Zone</h3>
            
            {/* Légende */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">J-1 (Livraison rapide)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">J-2 (Livraison standard)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">J-3 (Zone étendue)</span>
              </div>
            </div>

            {/* Liste des villes */}
            <div className="grid sm:grid-cols-2 gap-4">
              {zones.map((zone, index) => (
                <div 
                  key={zone.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${zone.color}`}></div>
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{zone.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">{zone.delay}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Information complémentaire */}
            <div className="bg-[#145587]/5 rounded-xl p-6 mt-8">
              <h4 className="font-semibold text-gray-900 mb-3">📍 Informations importantes</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Livraison gratuite dans toute la Baie de Somme</li>
                <li>• Créneaux de livraison flexibles selon vos besoins</li>
                <li>• Zones spéciales sur demande (nous consulter)</li>
                <li>• Service express disponible selon disponibilité</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryZones;
