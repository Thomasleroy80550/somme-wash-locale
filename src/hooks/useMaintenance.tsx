
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'hellowash_maintenance_bypass';

export const useMaintenance = () => {
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);

  useEffect(() => {
    // Activer la maintenance par défaut
    setIsMaintenanceActive(true);
    
    // Vérifier si l'utilisateur a déjà contourné la maintenance
    const bypass = localStorage.getItem(STORAGE_KEY);
    if (bypass) {
      const { timestamp, valid } = JSON.parse(bypass);
      const now = Date.now();
      const twelveHours = 12 * 60 * 60 * 1000;
      
      if (now - timestamp < twelveHours && valid) {
        setIsBypassed(true);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const toggleMaintenance = () => {
    setIsMaintenanceActive(!isMaintenanceActive);
  };

  const bypassMaintenance = () => {
    setIsBypassed(true);
  };

  const shouldShowMaintenance = isMaintenanceActive && !isBypassed;

  return {
    isMaintenanceActive,
    isBypassed,
    shouldShowMaintenance,
    toggleMaintenance,
    bypassMaintenance
  };
};
