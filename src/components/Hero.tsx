
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
                Linge de lit, de toilette et de table impeccablement entretenu 
                au cœur de la magnifique Baie de Somme.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-hero-appear-delay-2">
                <button 
                  onClick={() => setShowServicesSlideshow(true)}
                  className="bg-[#145587] text-white px-8 py-4 rounded-lg hover:bg-[#145587]/90 transition-colors font-semibold button-hover-bounce liquid-button"
                >
                  Découvrir nos services
                </button>
                <button 
                  onClick={scrollToContact}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-[#145587] hover:text-[#145587] transition-colors font-semibold button-hover-bounce liquid-button"
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
              {/* Machine à laver interactive */}
              <div className="washing-machine-container mb-8 animate-hero-appear-delay-2">
                <div className="washing-machine-drum animate-washing-cycle">
                  <div className="washing-machine-window">
                    <div className="water-level"></div>
                  </div>
                </div>
                {/* Bulles de savon */}
                <div className="absolute top-0 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-soap-bubbles" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-0 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-soap-bubbles" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-white/80 rounded-full animate-soap-bubbles" style={{animationDelay: '3s'}}></div>
              </div>

              <div className="bg-gradient-to-br from-[#145587]/10 to-[#145587]/20 rounded-3xl p-8 shadow-xl card-hover-animation fabric-card">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#145587]/5 rounded-lg p-4 text-center card-hover-animation fabric-card">
                      <div className="text-2xl font-bold text-[#145587]">100%</div>
                      <div className="text-sm text-gray-600">Qualité</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center card-hover-animation fabric-card">
                      <div className="text-2xl font-bold text-green-600">24h</div>
                      <div className="text-sm text-gray-600">Service</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center card-hover-animation fabric-card">
                      <div className="text-2xl font-bold text-purple-600">Éco</div>
                      <div className="text-sm text-gray-600">Responsable</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center card-hover-animation fabric-card">
                      <div className="text-2xl font-bold text-orange-600">Local</div>
                      <div className="text-sm text-gray-600">Baie de Somme</div>
                    </div>
                  </div>
                </div>
                
                {/* Particules de propreté */}
                <div className="particle-container">
                  <div className="floating-particle animate-cleanliness-particle" style={{top: '20%', left: '10%', animationDelay: '0s'}}></div>
                  <div className="floating-particle animate-cleanliness-particle" style={{top: '60%', left: '80%', animationDelay: '1s'}}></div>
                  <div className="floating-particle animate-cleanliness-particle" style={{top: '40%', left: '60%', animationDelay: '2s'}}></div>
                  <div className="floating-particle animate-cleanliness-particle" style={{top: '80%', left: '20%', animationDelay: '0.5s'}}></div>
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
