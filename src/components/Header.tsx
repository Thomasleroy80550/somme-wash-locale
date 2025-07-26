
import { MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, isAdmin } = useAuth();

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
            {user && isAdmin && (
              <a href="/admin" className="text-gray-700 hover:text-[#145587] transition-colors">Admin</a>
            )}
            {user && (
              <a href="/gestion-commandes" className="text-gray-700 hover:text-[#145587] transition-colors">Gestion</a>
            )}
            <a href="#apropos" className="text-gray-700 hover:text-[#145587] transition-colors">À propos</a>
            <a href="#contact" className="text-gray-700 hover:text-[#145587] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Baie de Somme</span>
            </div>
            
            <a
              href="tel:+33668124026"
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
