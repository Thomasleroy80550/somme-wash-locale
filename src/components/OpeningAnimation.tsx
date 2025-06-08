
import { useState, useEffect } from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import LoadingProgress from './LoadingProgress';

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation = ({ onComplete }: OpeningAnimationProps) => {
  const [phase, setPhase] = useState<'loading' | 'logo' | 'transition' | 'reveal' | 'complete'>('loading');
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Check if animation has been shown before
    const hasSeenAnimation = localStorage.getItem('hello-wash-opening-seen');
    if (hasSeenAnimation) {
      onComplete();
      return;
    }

    // Show skip button after 1 second
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    // Phase progression
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => setPhase('logo'), 200);
          return 100;
        }
        
        return newProgress;
      });
    }, 40);

    // Phase transitions
    const logoTimer = setTimeout(() => setPhase('transition'), 2200);
    const transitionTimer = setTimeout(() => setPhase('reveal'), 3200);
    const completeTimer = setTimeout(() => {
      setPhase('complete');
      localStorage.setItem('hello-wash-opening-seen', 'true');
      setTimeout(onComplete, 500);
    }, 4200);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(progressTimer);
      clearTimeout(logoTimer);
      clearTimeout(transitionTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    localStorage.setItem('hello-wash-opening-seen', 'true');
    onComplete();
  };

  if (phase === 'complete') return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#145587] to-[#145587]/80 flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-particle opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        ))}
      </div>

      {/* Skip button */}
      {showSkip && phase !== 'complete' && (
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors text-sm font-medium animate-fade-in z-10"
        >
          Passer l'animation
        </button>
      )}

      {/* Loading Phase */}
      {phase === 'loading' && (
        <div className="text-center animate-fade-in">
          <LoadingProgress progress={progress} />
        </div>
      )}

      {/* Logo Phase */}
      {phase === 'logo' && (
        <div className="text-center animate-logo-entrance">
          <div className="relative mb-8">
            <div className="animate-logo-glow">
              <img 
                src="/lovable-uploads/1cfec06e-dc8a-4f97-b6b2-1a5620825ffa.png" 
                alt="Hello Wash" 
                className="h-24 w-auto mx-auto animate-gentle-float"
              />
            </div>
            <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl animate-pulse-glow"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 animate-text-reveal">
            Hello Wash
          </h1>
          
          <div className="flex items-center justify-center text-white/80 animate-text-reveal-delay">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="text-lg">Baie de Somme</span>
          </div>

          <div className="mt-8 text-white/60 animate-text-reveal-delay-2">
            <p className="text-sm">Blanchisserie connectée</p>
          </div>
        </div>
      )}

      {/* Transition Phase */}
      {phase === 'transition' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Logo particles explosion */}
          <div className="relative">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full animate-particle-explosion"
                style={{
                  '--rotation': `${i * 30}deg`,
                  animationDelay: `${i * 0.1}s`
                } as any}
              />
            ))}
          </div>

          {/* Ripple effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-white/30 rounded-full animate-ripple"></div>
            <div className="absolute w-48 h-48 border border-white/20 rounded-full animate-ripple-delay"></div>
            <div className="absolute w-64 h-64 border border-white/10 rounded-full animate-ripple-delay-2"></div>
          </div>
        </div>
      )}

      {/* Reveal Phase */}
      {phase === 'reveal' && (
        <div className="absolute inset-0">
          {/* Curtain reveal effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-curtain-reveal"></div>
          
          {/* Content preview */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="text-center text-white animate-content-preview">
              <h2 className="text-2xl font-bold mb-4">Bientôt disponible</h2>
              <p className="text-white/80">La première blanchisserie connectée</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpeningAnimation;
