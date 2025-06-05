
import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, Wrench } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-[#145587]/20">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-[#145587]/10 rounded-full flex items-center justify-center">
            <Wrench className="w-8 h-8 text-[#145587]" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-[#145587]">
              Maintenance en cours
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Hello Wash effectue une maintenance technique pour améliorer nos services
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              Nous serons de retour très bientôt
            </p>
            <p className="text-xs text-gray-400">
              Merci pour votre patience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe administrateur"
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
          </form>

          <div className="text-center text-xs text-gray-400 space-y-1">
            <p>Tentatives: {attempts}/3</p>
            <p>Pour toute urgence: contact@hellowash-bds.fr</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceModal;
