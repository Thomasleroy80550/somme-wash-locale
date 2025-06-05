
import { useState } from "react";
import { 
  Home, 
  Package, 
  FileText, 
  Users, 
  BarChart3, 
  Settings,
  Truck,
  Euro,
  Calendar
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMaintenance } from "@/hooks/useMaintenance";

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardSidebar = ({ activeSection, onSectionChange }: DashboardSidebarProps) => {
  const { isMaintenanceActive, toggleMaintenance } = useMaintenance();

  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Home },
    { id: 'orders', label: 'Commandes', icon: Package },
    { id: 'invoices', label: 'Factures', icon: FileText },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'deliveries', label: 'Livraisons', icon: Truck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'calendar', label: 'Planning', icon: Calendar },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#145587]">Dashboard Admin</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? 'bg-[#145587] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Mode Maintenance</h3>
          <p className="text-xs text-gray-600 mb-3">
            Statut: {isMaintenanceActive ? "Actif" : "Inactif"}
          </p>
          <Button 
            onClick={toggleMaintenance}
            variant={isMaintenanceActive ? "destructive" : "default"}
            size="sm"
            className="w-full"
          >
            {isMaintenanceActive ? "Désactiver" : "Activer"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSidebar;
