
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Hello Wash</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Réservations</CardTitle>
              <CardDescription>Gestion des réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Fonctionnalité en développement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Mes Gîtes</CardTitle>
              <CardDescription>Gestion des propriétés</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Fonctionnalité en développement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Voyageurs</CardTitle>
              <CardDescription>Gestion des clients</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Fonctionnalité en développement</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
