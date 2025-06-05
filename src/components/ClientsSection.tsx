
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Mail, Phone, MapPin } from "lucide-react";

const ClientsSection = () => {
  const clients = [
    {
      id: "CLT-001",
      nom: "Marie Dupont",
      email: "marie.dupont@email.com",
      telephone: "06 12 34 56 78",
      adresse: "123 Rue de la Paix, 75001 Paris",
      commandes: 15,
      derniereCommande: "2024-06-05",
      totalDepense: "389.50€",
      statut: "Actif"
    },
    {
      id: "CLT-002",
      nom: "Jean Martin",
      email: "jean.martin@email.com", 
      telephone: "06 87 65 43 21",
      adresse: "456 Avenue des Champs, 69001 Lyon",
      commandes: 8,
      derniereCommande: "2024-06-04",
      totalDepense: "195.75€",
      statut: "Actif"
    },
    {
      id: "CLT-003",
      nom: "Sophie Bernard",
      email: "sophie.bernard@email.com",
      telephone: "06 11 22 33 44",
      adresse: "789 Boulevard Saint-Michel, 13001 Marseille",
      commandes: 22,
      derniereCommande: "2024-06-03",
      totalDepense: "567.25€",
      statut: "VIP"
    },
    {
      id: "CLT-004",
      nom: "Pierre Durand",
      email: "pierre.durand@email.com",
      telephone: "06 99 88 77 66",
      adresse: "321 Rue Victor Hugo, 31000 Toulouse",
      commandes: 3,
      derniereCommande: "2024-05-28",
      totalDepense: "98.25€",
      statut: "Inactif"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP": return "text-purple-600 bg-purple-100";
      case "Actif": return "text-green-600 bg-green-100";
      case "Inactif": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#145587]">Gestion des Clients</h1>
          <p className="text-gray-600">Gérez votre base de données clients</p>
        </div>
        <Button className="bg-[#145587] hover:bg-[#145587]/90">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total clients</p>
                <p className="text-2xl font-bold text-[#145587]">247</p>
              </div>
              <Users className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clients actifs</p>
                <p className="text-2xl font-bold text-green-600">198</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clients VIP</p>
                <p className="text-2xl font-bold text-purple-600">23</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nouveaux ce mois</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Dernière commande</TableHead>
                <TableHead>Total dépensé</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.nom}</div>
                      <div className="text-sm text-gray-500">{client.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-1" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {client.telephone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm max-w-48">
                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{client.adresse}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{client.commandes}</TableCell>
                  <TableCell>{client.derniereCommande}</TableCell>
                  <TableCell className="font-medium">{client.totalDepense}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.statut)}`}>
                      {client.statut}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsSection;
