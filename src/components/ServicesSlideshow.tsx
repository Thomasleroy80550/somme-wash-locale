
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Bed, Bath, UtensilsCrossed, Sparkles } from 'lucide-react';

interface ServiceSlide {
  id: string;
  icon: any;
  title: string;
  description: string;
  features: string[];
  image: string;
  available: boolean;
}

interface ServicesSlideshowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServicesSlideshow = ({ open, onOpenChange }: ServicesSlideshowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: ServiceSlide[] = [
    {
      id: "intro",
      icon: null,
      title: "Découvrez nos services Hello Wash",
      description: "Votre partenaire de confiance pour la location de linge professionnel dans la Baie de Somme",
      features: [
        "Linge de qualité supérieure",
        "Livraison et collecte incluses",
        "Entretien professionnel écologique",
        "Service personnalisé"
      ],
      image: "bg-gradient-to-br from-[#145587]/20 to-[#145587]/5",
      available: true
    },
    {
      id: "linge-lit",
      icon: Bed,
      title: "Linge de lit",
      description: "Draps, housses de couette, taies d'oreiller en coton de qualité supérieure pour un confort optimal.",
      features: [
        "Coton 100% pour un confort optimal",
        "Tailles disponibles : Petit lit ou Grand lit",
        "Livraison et collecte à domicile incluses",
        "Entretien professionnel avec produits écologiques"
      ],
      image: "bg-gradient-to-br from-blue-50 to-blue-100",
      available: true
    },
    {
      id: "linge-toilette",
      icon: Bath,
      title: "Linge de toilette",
      description: "Serviettes, draps de bain, tapis de bain ultra-absorbants et moelleux pour votre bien-être.",
      features: [
        "Serviettes en coton éponge ultra-doux",
        "Draps de bain 140cm en coton éponge",
        "Tapis de bain antidérapants",
        "Traitement antibactérien naturel"
      ],
      image: "bg-gradient-to-br from-green-50 to-green-100",
      available: true
    },
    {
      id: "linge-table",
      icon: UtensilsCrossed,
      title: "Linge de table",
      description: "Nappes, serviettes de table, chemins de table pour sublimer vos réceptions.",
      features: [
        "Nappes rondes, carrées et rectangulaires",
        "Serviettes de table assorties",
        "Traitement anti-taches professionnel",
        "Designs classiques et modernes"
      ],
      image: "bg-gradient-to-br from-orange-50 to-orange-100",
      available: false
    },
    {
      id: "conclusion",
      icon: Sparkles,
      title: "Prêt à transformer votre expérience linge ?",
      description: "Rejoignez nos clients satisfaits et découvrez le confort d'un linge impeccable, livré directement chez vous dans la Baie de Somme.",
      features: [
        "Plus de lessives à faire !",
        "Plus de temps pour vous !",
        "Plus de soucis de repassage !",
        "Que du plaisir à profiter !"
      ],
      image: "bg-gradient-to-br from-[#145587]/10 via-purple-50 to-pink-50",
      available: true
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  const scrollToContact = () => {
    onOpenChange(false);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Éléments décoratifs animés
  const getBubbles = () => {
    return Array.from({ length: 6 }, (_, i) => (
      <div
        key={i}
        className={`absolute w-2 h-2 bg-white/40 rounded-full animate-bubble-float`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      />
    ));
  };

  const getSparkles = () => {
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`absolute w-1 h-1 bg-[#145587]/60 rounded-full animate-sparkle`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 1.5}s`
        }}
      />
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden">
        <div className="relative h-full">
          {/* Éléments décoratifs animés */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {getBubbles()}
            {getSparkles()}
          </div>

          {/* Header avec navigation */}
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
            <div className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full animate-gentle-sway">
              {currentSlide + 1} / {slides.length}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300 hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Contenu du slide */}
          <div className={`h-full ${currentSlideData.image} flex items-center justify-center p-8 transition-all duration-500`}>
            <div className="max-w-3xl text-center space-y-6 animate-fade-in">
              {currentSlideData.icon && (
                <div className={`flex items-center justify-center w-20 h-20 ${currentSlideData.available ? 'bg-[#145587]/10' : 'bg-gray-200'} rounded-3xl mx-auto relative ${currentSlideData.id === 'linge-toilette' ? 'animate-washing-spin' : 'animate-gentle-sway'}`}>
                  <currentSlideData.icon className={`h-10 w-10 ${currentSlideData.available ? 'text-[#145587]' : 'text-gray-400'}`} />
                  {!currentSlideData.available && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-bounce">
                      Bientôt
                    </div>
                  )}
                </div>
              )}
              
              <h2 className="text-4xl font-bold text-gray-900 animate-gentle-sway">{currentSlideData.title}</h2>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {currentSlideData.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {currentSlideData.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center text-left bg-white/60 backdrop-blur-sm p-4 rounded-lg hover:bg-white/80 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className={`w-3 h-3 ${currentSlideData.available ? 'bg-[#145587]' : 'bg-gray-400'} rounded-full mr-3 flex-shrink-0 animate-sparkle`}></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              {currentSlide === 0 && (
                <Button 
                  onClick={nextSlide}
                  className="bg-[#145587] hover:bg-[#145587]/90 text-white px-8 py-3 text-lg mt-8 hover:scale-105 transition-all duration-300"
                >
                  Découvrir nos services
                </Button>
              )}

              {currentSlide === slides.length - 1 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button 
                    onClick={scrollToContact}
                    className="bg-[#145587] hover:bg-[#145587]/90 text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
                  >
                    Demander un devis
                  </Button>
                  <Button 
                    onClick={() => onOpenChange(false)}
                    variant="outline"
                    className="border-[#145587] text-[#145587] hover:bg-[#145587] hover:text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
                  >
                    Fermer
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Dots navigation */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentSlide ? 'bg-[#145587] animate-pulse' : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServicesSlideshow;
