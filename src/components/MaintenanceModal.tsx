import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const MAINTENANCE_PASSWORD = 'HW2025#BaieSomme!Maint';
const STORAGE_KEY = 'hellowash_maintenance_bypass';

interface MaintenanceModalProps {
  isActive: boolean;
  onBypass: () => void;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({ isActive, onBypass }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà contourné la maintenance
    const bypass = localStorage.getItem(STORAGE_KEY);
    if (bypass) {
      const { timestamp, valid } = JSON.parse(bypass);
      const now = Date.now();
      const twelveHours = 12 * 60 * 60 * 1000;
      
      if (now - timestamp < twelveHours && valid) {
        onBypass();
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [onBypass]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Trop de tentatives. Veuillez attendre.');
      return;
    }

    if (password === MAINTENANCE_PASSWORD) {
      // Stocker le bypass avec timestamp
      const bypass = {
        timestamp: Date.now(),
        valid: true
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bypass));
      onBypass();
    } else {
      setAttempts(prev => prev + 1);
      setError('Mot de passe incorrect');
      setPassword('');
      
      if (attempts >= 2) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
        }, 30000); // 30 secondes de blocage
      }
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#145587] to-[#0a3a5c] backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-white/20 bg-white/95 backdrop-blur-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#145587] to-[#0a3a5c] rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#145587] to-[#0a3a5c] bg-clip-text text-transparent">
              Coming Soon
            </CardTitle>
            <p className="text-gray-600 mt-3 text-lg">
              Hello Wash arrive bientôt dans la Baie de Somme
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#145587] to-[#0a3a5c] h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
            <p className="text-sm text-gray-500">
              Nous préparons quelque chose d'extraordinaire pour vous
            </p>
            <p className="text-xs text-gray-400">
              Service de blanchisserie premium • Livraison à domicile • Baie de Somme
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Accès administrateur"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#145587] focus:border-transparent pr-12 bg-white/80"
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
              className="w-full bg-gradient-to-r from-[#145587] to-[#0a3a5c] hover:from-[#0a3a5c] hover:to-[#145587] text-white shadow-lg"
              disabled={isLocked || !password}
            >
              <Shield className="w-4 h-4 mr-2" />
              Accéder au site
            </Button>
          </form>

          <div className="text-center text-xs text-gray-400 space-y-1">
            <p>Tentatives: {attempts}/3</p>
            <p>Pour plus d'informations: contact@hellowash.fr</p>
            <p className="text-[#145587] font-medium">🌊 Bientôt disponible en Baie de Somme</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceModal;
