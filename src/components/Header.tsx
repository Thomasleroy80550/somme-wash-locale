
import { MapPin, Phone, Mail } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/1cfec06e-dc8a-4f97-b6b2-1a5620825ffa.png" 
              alt="Hello Wash Logo" 
              className="h-12 w-auto"
            />
            <span className="ml-3 text-sm text-gray-600">Baie de Somme</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#accueil" className="text-gray-700 hover:text-[#145587] transition-colors">Accueil</a>
            <a href="#services" className="text-gray-700 hover:text-[#145587] transition-colors">Services</a>
            <a href="/dashboard" className="text-gray-700 hover:text-[#145587] transition-colors">Dashboard</a>
            <a href="#apropos" className="text-gray-700 hover:text-[#145587] transition-colors">À propos</a>
            <a href="#contact" className="text-gray-700 hover:text-[#145587] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Baie de Somme</span>
            </div>
            <a
              href="/member"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors mr-2"
            >
              Liste d'attente
            </a>
            <a
              href="tel:+33000000000"
              className="bg-[#145587] text-white px-4 py-2 rounded-lg hover:bg-[#145587]/90 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
