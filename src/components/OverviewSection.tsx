
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Building2, TrendingUp, Euro, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const OverviewSection = () => {
  const revenueData = [
    { month: 'Jan', revenue: 8400 },
    { month: 'Fév', revenue: 6200 },
    { month: 'Mar', revenue: 9800 },
    { month: 'Avr', revenue: 12500 },
    { month: 'Mai', revenue: 15200 },
    { month: 'Juin', revenue: 18900 },
  ];

  const occupancyData = [
    { property: 'Les Mouettes', occupancy: 85 },
    { property: 'Vue Mer', occupancy: 92 },
    { property: 'Du Phare', occupancy: 78 },
    { property: 'Central', occupancy: 88 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#145587] mb-2">Vue d'ensemble</h1>
        <p className="text-gray-600">Tableau de bord de vos gîtes en Baie de Somme</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Réservations ce mois</p>
                <p className="text-3xl font-bold text-[#145587]">47</p>
                <p className="text-xs text-green-600 mt-1">+12% vs mois dernier</p>
              </div>
              <Calendar className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Taux d'occupation</p>
                <p className="text-3xl font-bold text-green-600">86%</p>
                <p className="text-xs text-green-600 mt-1">+5% vs mois dernier</p>
              </div>
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Revenus ce mois</p>
                <p className="text-3xl font-bold text-green-600">18.900€</p>
                <p className="text-xs text-green-600 mt-1">+24% vs mois dernier</p>
              </div>
              <Euro className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Satisfaction moyenne</p>
                <p className="text-3xl font-bold text-yellow-600">4.8</p>
                <p className="text-xs text-green-600 mt-1">+0.2 vs mois dernier</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Évolution des revenus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}€`, 'Revenus']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#145587" 
                  strokeWidth={3}
                  dot={{ fill: '#145587', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Taux d'occupation par propriété
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Occupation']} />
                <Bar dataKey="occupancy" fill="#145587" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Prochaines arrivées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Famille Martin</p>
                  <p className="text-sm text-gray-600">Gîte Les Mouettes - 4 personnes</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Aujourd'hui</p>
                  <p className="text-xs text-gray-600">15:00</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Pierre & Marie L.</p>
                  <p className="text-sm text-gray-600">Maison du Phare - 6 personnes</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Demain</p>
                  <p className="text-xs text-gray-600">16:00</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">Sophie Durand</p>
                  <p className="text-sm text-gray-600">Studio Vue Mer - 2 personnes</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Vendredi</p>
                  <p className="text-xs text-gray-600">14:30</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prochains départs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium">Jean Moreau</p>
                  <p className="text-sm text-gray-600">Gîte Les Mouettes - 3 personnes</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Aujourd'hui</p>
                  <p className="text-xs text-gray-600">11:00</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium">Famille Dubois</p>
                  <p className="text-sm text-gray-600">Appartement Central - 4 personnes</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Demain</p>
                  <p className="text-xs text-gray-600">10:00</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Couple Leroy</p>
                  <p className="text-sm text-gray-600">Studio Vue Mer - 2 personnes</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Samedi</p>
                  <p className="text-xs text-gray-600">12:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;
