
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Plus, Filter, Search } from "lucide-react";

const OrdersSection = () => {
  const orders = [
    {
      id: "#CMD-001",
      client: "Marie Dupont",
      service: "Lavage Premium",
      status: "En cours",
      date: "2024-06-05",
      montant: "25.90€",
      adresse: "123 Rue de la Paix, Paris"
    },
    {
      id: "#CMD-002",
      client: "Jean Martin", 
      service: "Nettoyage Express",
      status: "Terminé",
      date: "2024-06-04",
      montant: "15.50€",
      adresse: "456 Avenue des Champs, Lyon"
    },
    {
      id: "#CMD-003",
      client: "Sophie Bernard",
      service: "Lavage + Repassage",
      status: "Collecté",
      date: "2024-06-03",
      montant: "45.00€",
      adresse: "789 Boulevard Saint-Michel, Marseille"
    },
    {
      id: "#CMD-004",
      client: "Pierre Durand",
      service: "Nettoyage à sec",
      status: "En attente",
      date: "2024-06-02",
      montant: "32.75€",
      adresse: "321 Rue Victor Hugo, Toulouse"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terminé": return "text-green-600 bg-green-100";
      case "En cours": return "text-blue-600 bg-blue-100";
      case "Collecté": return "text-orange-600 bg-orange-100";
      case "En attente": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#145587]">Gestion des Commandes</h1>
          <p className="text-gray-600">Suivez et gérez toutes vos commandes</p>
        </div>
        <Button className="bg-[#145587] hover:bg-[#145587]/90">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle commande
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total aujourd'hui</p>
                <p className="text-2xl font-bold text-[#145587]">12</p>
              </div>
              <Package className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Terminées</p>
                <p className="text-2xl font-bold text-green-600">7</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus du jour</p>
                <p className="text-2xl font-bold text-green-600">319€</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Commandes récentes</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell className="max-w-48 truncate">{order.adresse}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{order.montant}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersSection;
