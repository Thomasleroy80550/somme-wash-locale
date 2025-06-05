
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import OverviewSection from "@/components/OverviewSection";
import ReservationsSection from "@/components/ReservationsSection";
import PropertiesSection from "@/components/PropertiesSection";
import GuestsSection from "@/components/GuestsSection";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'reservations':
        return <ReservationsSection />;
      case 'properties':
        return <PropertiesSection />;
      case 'guests':
        return <GuestsSection />;
      case 'calendar':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#145587] mb-4">Calendrier des Réservations</h1>
            <p className="text-gray-600">Planification des séjours en cours de développement...</p>
          </div>
        );
      case 'finance':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#145587] mb-4">Finances</h1>
            <p className="text-gray-600">Gestion financière en cours de développement...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#145587] mb-4">Paramètres</h1>
            <p className="text-gray-600">Configuration en cours de développement...</p>
          </div>
        );
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
