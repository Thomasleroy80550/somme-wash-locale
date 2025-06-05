import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Hello Wash</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre blanchisserie de confiance au cœur de la Baie de Somme. 
              Nous mettons notre expertise au service de la qualité et de votre satisfaction.
            </p>
            <div className="flex items-center text-gray-300">
              <Heart className="h-4 w-4 mr-2 text-red-500" />
              <span>Fait avec passion en Baie de Somme</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Linge de lit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Linge de toilette</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Linge de table</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Devis personnalisé</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>03 XX XX XX XX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@hellowash.fr</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Baie de Somme</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 SAS Hello Wash. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
