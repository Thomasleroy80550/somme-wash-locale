
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMaintenance } from "@/hooks/useMaintenance";

const Dashboard = () => {
  const { isMaintenanceActive, toggleMaintenance } = useMaintenance();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#145587] mb-8">Dashboard Admin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mode Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Statut actuel: {isMaintenanceActive ? "Actif" : "Inactif"}
              </p>
              <Button 
                onClick={toggleMaintenance}
                variant={isMaintenanceActive ? "destructive" : "default"}
                className="w-full"
              >
                {isMaintenanceActive ? "Désactiver" : "Activer"} la maintenance
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[#145587]">0</p>
              <p className="text-sm text-gray-600">Commandes aujourd'hui</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">0€</p>
              <p className="text-sm text-gray-600">Revenus du mois</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
