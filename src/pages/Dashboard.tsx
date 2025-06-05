
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import OverviewSection from "@/components/OverviewSection";
import OrdersSection from "@/components/OrdersSection";
import InvoicesSection from "@/components/InvoicesSection";
import ClientsSection from "@/components/ClientsSection";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'orders':
        return <OrdersSection />;
      case 'invoices':
        return <InvoicesSection />;
      case 'clients':
        return <ClientsSection />;
      case 'deliveries':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#145587] mb-4">Gestion des Livraisons</h1>
            <p className="text-gray-600">Section en cours de développement...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#145587] mb-4">Analytics Avancées</h1>
            <p className="text-gray-600">Section en cours de développement...</p>
          </div>
        );
      case 'calendar':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#145587] mb-4">Planning</h1>
            <p className="text-gray-600">Section en cours de développement...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#145587] mb-4">Paramètres</h1>
            <p className="text-gray-600">Section en cours de développement...</p>
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
