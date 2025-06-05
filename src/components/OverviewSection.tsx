
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Package, Users, Euro, Truck } from "lucide-react";

const OverviewSection = () => {
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Fév', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Avr', value: 4500 },
    { name: 'Mai', value: 6000 },
    { name: 'Juin', value: 5500 },
  ];

  const ordersData = [
    { name: 'Lun', commandes: 12, livraisons: 10 },
    { name: 'Mar', commandes: 19, livraisons: 15 },
    { name: 'Mer', commandes: 15, livraisons: 18 },
    { name: 'Jeu', commandes: 25, livraisons: 22 },
    { name: 'Ven', commandes: 22, livraisons: 20 },
    { name: 'Sam', commandes: 30, livraisons: 28 },
    { name: 'Dim', commandes: 18, livraisons: 16 },
  ];

  const servicesData = [
    { name: 'Lavage Premium', value: 35, color: '#145587' },
    { name: 'Nettoyage Express', value: 25, color: '#2563eb' },
    { name: 'Lavage + Repassage', value: 20, color: '#16a34a' },
    { name: 'Nettoyage à sec', value: 20, color: '#ea580c' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#145587]">Vue d'ensemble</h1>
        <p className="text-gray-600">Tableau de bord principal avec vos métriques clés</p>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus du mois</p>
                <p className="text-2xl font-bold text-[#145587]">5,847€</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+12.5%</span>
                </div>
              </div>
              <Euro className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commandes ce mois</p>
                <p className="text-2xl font-bold text-[#145587]">143</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+8.2%</span>
                </div>
              </div>
              <Package className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clients actifs</p>
                <p className="text-2xl font-bold text-[#145587]">198</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">-2.1%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Livraisons</p>
                <p className="text-2xl font-bold text-[#145587]">87</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+15.3%</span>
                </div>
              </div>
              <Truck className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}€`, 'Revenus']} />
                <Line type="monotone" dataKey="value" stroke="#145587" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commandes vs Livraisons (7 derniers jours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commandes" fill="#145587" name="Commandes" />
                <Bar dataKey="livraisons" fill="#16a34a" name="Livraisons" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des services</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={servicesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {servicesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nouvelle commande #CMD-143</p>
                <p className="text-xs text-gray-500">Il y a 5 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Livraison terminée #CMD-138</p>
                <p className="text-xs text-gray-500">Il y a 15 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nouveau client inscrit</p>
                <p className="text-xs text-gray-500">Il y a 1 heure</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Facture FAC-2024-087 payée</p>
                <p className="text-xs text-gray-500">Il y a 2 heures</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;
