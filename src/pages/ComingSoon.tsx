
import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Sparkles, Mail, MapPin, Heart, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const MAINTENANCE_PASSWORD = 'HW2025#BaieSomme!Maint';
const STORAGE_KEY = 'hellowash_maintenance_bypass';

const ComingSoon = () => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState('');

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Trop de tentatives. Veuillez attendre.');
      return;
    }

    if (password === MAINTENANCE_PASSWORD) {
      const bypass = {
        timestamp: Date.now(),
        valid: true
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bypass));
      window.location.href = '/';
    } else {
      setAttempts(prev => prev + 1);
      setError('Mot de passe incorrect');
      setPassword('');
      
      if (attempts >= 2) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
        }, 30000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#145587] via-[#1e6b9a] to-[#0a3a5c] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-bubble-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/5 rounded-full animate-gentle-sway"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-bubble-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-sparkle"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/1cfec06e-dc8a-4f97-b6b2-1a5620825ffa.png" 
              alt="Hello Wash Logo" 
              className="h-16 w-auto"
            />
            <div className="ml-4 text-white">
              <h1 className="text-2xl font-bold">Hello Wash</h1>
              <p className="text-sm opacity-80">Baie de Somme</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full mb-8 animate-pulse">
              <Droplets className="w-12 h-12 text-white animate-gentle-sway" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Coming Soon
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Hello Wash arrive bientôt dans la Baie de Somme
            </p>
            
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
              Nous préparons quelque chose d'extraordinaire pour vous. 
              Un service de blanchisserie premium avec livraison à domicile.
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-16">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex justify-between text-white mb-2">
                    <span>Progression du projet</span>
                    <span className="font-bold">75%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-white to-white/80 h-3 rounded-full animate-pulse transition-all duration-1000" 
                      style={{width: '75%'}}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">🚀</div>
                    <p className="text-sm">Plateforme</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">🚛</div>
                    <p className="text-sm">Logistique</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">🌊</div>
                    <p className="text-sm">Baie de Somme</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Preview */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">Nos services à venir</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🛏️', title: 'Linge de lit', desc: 'Draps, housses, oreillers' },
                { icon: '🛁', title: 'Linge de toilette', desc: 'Serviettes, peignoirs' },
                { icon: '🍽️', title: 'Linge de table', desc: 'Nappes, serviettes de table' }
              ].map((service, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                    <p className="text-white/80 text-sm">{service.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-16">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-xl mx-auto">
              <CardContent className="p-8 text-center">
                <Mail className="w-8 h-8 text-white mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-4">
                  Soyez les premiers informés
                </h4>
                <p className="text-white/80 mb-6">
                  Recevez une notification dès notre lancement
                </p>
                <div className="flex gap-3">
                  <input 
                    type="email" 
                    placeholder="Votre email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button className="bg-white text-[#145587] hover:bg-white/90 px-6">
                    Notify me
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 py-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/80">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Baie de Somme</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@hellowash.fr</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-red-400" />
                <span>Fait avec passion en Baie de Somme</span>
              </div>
              
              {/* Admin Access - Discrete */}
              <Dialog open={adminModalOpen} onOpenChange={setAdminModalOpen}>
                <DialogTrigger asChild>
                  <button className="text-white/40 hover:text-white/60 transition-colors p-2">
                    <Shield className="w-4 h-4" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Accès Administrateur</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAdminAccess} className="space-y-4">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe admin"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145587] focus:border-transparent pr-12"
                        disabled={isLocked}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={isLocked}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    {isLocked && (
                      <p className="text-orange-500 text-sm text-center">
                        Trop de tentatives. Attente de 30 secondes...
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-[#145587] hover:bg-[#145587]/90"
                      disabled={isLocked || !password}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Accéder au site
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      Tentatives: {attempts}/3
                    </p>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="text-center mt-6 text-white/60 text-sm">
            <p>&copy; 2025 SAS Hello Wash. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
