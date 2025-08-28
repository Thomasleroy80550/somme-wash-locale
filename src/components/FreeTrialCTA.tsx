import { Gift, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const FreeTrialCTA = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-white/10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Demandez votre essai gratuit
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            On vous livre 1 jeu complet de linge pour tester notre service sans engagement
          </p>
          
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg group"
          >
            Je demande mon essai gratuit
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <p className="text-white/80 text-sm mt-4">
            ✓ Livraison gratuite ✓ Aucun engagement ✓ Test complet de nos services
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialCTA;