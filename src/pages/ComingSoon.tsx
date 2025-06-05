import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Mail, MapPin, Heart, Droplets, Truck, Activity, Bell, User, Home, Package, Users, Settings, TrendingUp, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Services from '@/components/Services';
import Offers from '@/components/Offers';

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
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
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
              <Droplets className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
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
                    <span className="font-bold">65%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-white to-white/80 h-3 rounded-full animate-pulse transition-all duration-1000" 
                      style={{width: '65%'}}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">📋</div>
                    <p className="text-sm">Préparation</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">🚧</div>
                    <p className="text-sm">Travaux</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">🚀</div>
                    <p className="text-sm">Ouverture</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md">
        <Services />
      </div>

      {/* Offers Section */}
      <div className="relative z-10 bg-gradient-to-br from-gray-50/95 to-white/95 backdrop-blur-md">
        <Offers />
      </div>

      {/* Dashboard Mockup Preview */}
      <section className="relative z-10 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#145587] mb-4">Aperçu de votre futur dashboard</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez l'interface d'administration que vous utiliserez pour gérer vos commandes et suivre vos livraisons
            </p>
          </div>
          
          {/* Browser Mockup Frame */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800 rounded-t-lg p-4 shadow-2xl">
              {/* Browser Bar */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-700 rounded px-3 py-1 text-gray-300 text-sm">
                    https://admin.hellowash.fr/dashboard
                  </div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="bg-white rounded-lg overflow-hidden relative">
                {/* Preview Overlay */}
                <div className="absolute top-4 right-4 z-20 bg-[#145587] text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  APERÇU
                </div>
                
                {/* Top Navigation */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src="/lovable-uploads/1cfec06e-dc8a-4f97-b6b2-1a5620825ffa.png" 
                        alt="Hello Wash" 
                        className="h-8 w-auto"
                      />
                      <h1 className="text-xl font-bold text-[#145587]">Dashboard Admin</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-[#145587] text-white text-xs">AD</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-64 bg-gray-50 border-r border-gray-200 min-h-[600px]">
                    <nav className="p-4 space-y-2">
                      <div className="flex items-center space-x-3 px-3 py-2 bg-[#145587] text-white rounded-lg">
                        <Home className="w-4 h-4" />
                        <span className="text-sm font-medium">Dashboard</span>
                      </div>
                      <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Package className="w-4 h-4" />
                        <span className="text-sm">Commandes</span>
                      </div>
                      <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Clients</span>
                      </div>
                      <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Truck className="w-4 h-4" />
                        <span className="text-sm">Livraisons</span>
                      </div>
                      <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Paramètres</span>
                      </div>
                    </nav>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-6 bg-gray-50">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#145587]" />
                            Mode Maintenance
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-4">
                            Statut actuel: <span className="text-green-600 font-medium">Inactif</span>
                          </p>
                          <Button className="w-full bg-[#145587] hover:bg-[#145587]/90 text-xs">
                            Activer la maintenance
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#145587]" />
                            Statistiques
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold text-[#145587] mb-1">24</p>
                          <p className="text-sm text-gray-600">Commandes aujourd'hui</p>
                          <div className="mt-2 text-xs text-green-600">+12% vs hier</div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Truck className="w-5 h-5 text-[#145587]" />
                            Suivi livraison
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-green-600 animate-pulse" />
                            <p className="text-2xl font-bold text-green-600">Live</p>
                          </div>
                          <p className="text-sm text-gray-600">3 livraisons en cours</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Commandes récentes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-blue-100 text-[#145587] text-xs">MC</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">Marie Caron</p>
                                <p className="text-xs text-gray-500">Le Crotoy - 15 pièces</p>
                              </div>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-blue-100 text-[#145587] text-xs">PD</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">Pierre Dubois</p>
                                <p className="text-xs text-gray-500">Fort-Mahon - 8 pièces</p>
                              </div>
                              <Clock className="w-4 h-4 text-orange-500" />
                            </div>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-blue-100 text-[#145587] text-xs">SL</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">Sophie Leclerc</p>
                                <p className="text-xs text-gray-500">Rue - 22 pièces</p>
                              </div>
                              <Truck className="w-4 h-4 text-blue-500" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Planning du jour
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-500">09:00</span>
                              <span>Collecte Le Crotoy</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-500">11:30</span>
                              <span>Livraison Fort-Mahon</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-500">14:00</span>
                              <span>Collecte Rue</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className="text-gray-500">16:30</span>
                              <span>Livraison Saint-Valery</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-16 py-8 border-t border-white/20 bg-[#145587]">
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
