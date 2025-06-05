
import { useState, useEffect } from 'react';

export const useMaintenance = () => {
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false);
  const [isBypassed, setIsBypassed] = useState(false);

  useEffect(() => {
    // Ici vous pouvez configurer la logique pour activer/désactiver la maintenance
    // Pour l'instant, définissons-la comme active par défaut
    setIsMaintenanceActive(true);
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
