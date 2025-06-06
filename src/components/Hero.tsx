
import { Sparkles, MapPin } from 'lucide-react';
import { useState } from 'react';
import ServicesSlideshow from './ServicesSlideshow';

const Hero = () => {
  const [showServicesSlideshow, setShowServicesSlideshow] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="accueil" className="relative bg-gradient-to-br from-[#145587]/5 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-hero-appear">
              <div className="flex items-center mb-4 animate-hero-appear-delay-1">
                <Sparkles className="h-6 w-6 text-[#145587] mr-2 animate-sparkle" />
                <span className="text-[#145587] font-semibold">Blanchisserie professionnelle</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-hero-appear-delay-1">
                Hello Wash
                <span className="block text-[#145587]">Baie de Somme</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-hero-appear-delay-2">
                Votre partenaire de confiance pour la location de linge de qualité. 
                Linge de lit, de toilette et de table impeccablement entretenus 
                au cœur de la magnifique Baie de Somme.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-hero-appear-delay-2">
                <button 
                  onClick={() => setShowServicesSlideshow(true)}
                  className="bg-[#145587] text-white px-8 py-4 rounded-lg hover:bg-[#145587]/90 transition-colors font-semibold button-hover-bounce"
                >
                  Découvrir nos services
                </button>
                <button 
                  onClick={scrollToContact}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-[#145587] hover:text-[#145587] transition-colors font-semibold button-hover-bounce"
                >
                  Demander un devis
                </button>
              </div>
              
              <div className="flex items-center text-gray-600 animate-hero-appear-delay-3">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Située au cœur de la Baie de Somme</span>
              </div>
            </div>
            
            <div className="relative animate-hero-appear-delay-1">
              <div className="bg-gradient-to-br from-[#145587]/10 to-[#145587]/20 rounded-3xl p-8 shadow-xl card-hover-animation">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#145587]/5 rounded-lg p-4 text-center card-hover-animation">
                      <div className="text-2xl font-bold text-[#145587]">100%</div>
                      <div className="text-sm text-gray-600">Qualité</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center card-hover-animation">
                      <div className="text-2xl font-bold text-green-600">24h</div>
                      <div className="text-sm text-gray-600">Service</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center card-hover-animation">
                      <div className="text-2xl font-bold text-purple-600">Éco</div>
                      <div className="text-sm text-gray-600">Responsable</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center card-hover-animation">
                      <div className="text-2xl font-bold text-orange-600">Local</div>
                      <div className="text-sm text-gray-600">Baie de Somme</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ServicesSlideshow 
        open={showServicesSlideshow} 
        onOpenChange={setShowServicesSlideshow} 
      />
    </>
  );
};

export default Hero;
