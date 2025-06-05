
import { MapPin, Clock, Truck } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const DeliveryZones = () => {
  const zones = [
    { name: "Le Crotoy", delay: "J-1", color: "bg-green-500", description: "Livraison express" },
    { name: "Saint-Valery-sur-Somme", delay: "J-1", color: "bg-green-500", description: "Livraison express" },
    { name: "Cayeux-sur-Mer", delay: "J-2", color: "bg-blue-500", description: "Livraison standard" },
    { name: "Ault", delay: "J-2", color: "bg-blue-500", description: "Livraison standard" },
    { name: "Mers-les-Bains", delay: "J-3", color: "bg-purple-500", description: "Zone étendue" },
    { name: "Abbeville", delay: "J-2", color: "bg-blue-500", description: "Livraison standard" },
    { name: "Rue", delay: "J-1", color: "bg-green-500", description: "Livraison express" },
    { name: "Fort-Mahon-Plage", delay: "J-2", color: "bg-blue-500", description: "Livraison standard" }
  ];

  const getDelayColor = (delay: string) => {
    switch (delay) {
      case "J-1": return "text-green-700 bg-green-50";
      case "J-2": return "text-blue-700 bg-blue-50";
      case "J-3": return "text-purple-700 bg-purple-50";
      default: return "text-gray-700 bg-gray-50";
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Zones de Livraison</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Nous couvrons toute la Baie de Somme avec des délais de livraison adaptés à chaque zone
          </p>
          
          {/* Légende */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">J-1 - Livraison express</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">J-2 - Livraison standard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">J-3 - Zone étendue</span>
            </div>
          </div>
        </div>

        {/* Grille des zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {zones.map((zone, index) => (
            <Card 
              key={zone.name}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-4 h-4 rounded-full ${zone.color} animate-pulse`}></div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDelayColor(zone.delay)}`}>
                    {zone.delay}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="h-5 w-5 text-[#145587]" />
                  <h3 className="font-bold text-gray-900 text-lg">{zone.name}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{zone.description}</p>
                
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Délai : {zone.delay}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informations complémentaires */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-[#145587]/10 rounded-full p-3">
              <Truck className="h-8 w-8 text-[#145587]" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Informations de Livraison</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-[#145587] font-semibold">🚚 Livraison Gratuite</div>
              <p className="text-gray-600 text-sm">Dans toute la Baie de Somme</p>
            </div>
            <div className="space-y-2">
              <div className="text-[#145587] font-semibold">⏰ Créneaux Flexibles</div>
              <p className="text-gray-600 text-sm">Selon vos disponibilités</p>
            </div>
            <div className="space-y-2">
              <div className="text-[#145587] font-semibold">📞 Sur Demande</div>
              <p className="text-gray-600 text-sm">Zones spéciales possibles</p>
            </div>
            <div className="space-y-2">
              <div className="text-[#145587] font-semibold">⚡ Service Express</div>
              <p className="text-gray-600 text-sm">Selon disponibilité</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryZones;
