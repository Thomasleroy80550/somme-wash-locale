import { useEffect, useState } from 'react';

const WaterDropJourney = () => {
  const [drops, setDrops] = useState<Array<{id: number, delay: number}>>([]);

  useEffect(() => {
    // Générer des gouttes d'eau toutes les 3 secondes
    const interval = setInterval(() => {
      const newDrop = {
        id: Date.now(),
        delay: Math.random() * 1000 // Délai aléatoire pour variété
      };
      
      setDrops(prev => [...prev, newDrop]);

      // Nettoyer les gouttes après animation
      setTimeout(() => {
        setDrops(prev => prev.filter(drop => drop.id !== newDrop.id));
      }, 5000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-3 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full animate-water-drop opacity-60"
          style={{
            left: `${20 + Math.random() * 60}%`,
            animationDelay: `${drop.delay}ms`,
            filter: 'blur(0.5px)'
          }}
        />
      ))}
    </div>
  );
};

export default WaterDropJourney;