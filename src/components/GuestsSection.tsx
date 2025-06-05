
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Mail, Phone, Plus, Eye, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GuestsSection = () => {
  const guests = [
    {
      id: "CLI-001",
      name: "Famille Martin",
      email: "martin.famille@email.com",
      phone: "06 12 34 56 78",
      lastVisit: "15/06/2024",
      totalStays: 5,
      totalSpent: "2.890€",
      rating: 4.9,
      status: "VIP"
    },
    {
      id: "CLI-002",
      name: "Sophie Durand",
      email: "sophie.durand@email.com",
      phone: "06 87 65 43 21",
      lastVisit: "10/06/2024",
      totalStays: 2,
      totalSpent: "580€",
      rating: 4.5,
      status: "Régulier"
    },
    {
      id: "CLI-003",
      name: "Pierre & Marie Leclerc",
      email: "leclerc.couple@email.com",
      phone: "06 11 22 33 44",
      lastVisit: "08/06/2024",
      totalStays: 8,
      totalSpent: "4.250€",
      rating: 5.0,
      status: "VIP"
    },
    {
      id: "CLI-004",
      name: "Jean Moreau",
      email: "j.moreau@email.com",
      phone: "06 55 66 77 88",
      lastVisit: "25/05/2024",
      totalStays: 1,
      totalSpent: "320€",
      rating: 4.2,
      status: "Nouveau"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP": return "text-purple-600 bg-purple-100";
      case "Régulier": return "text-blue-600 bg-blue-100";
      case "Nouveau": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#145587]">Gestion des Voyageurs</h1>
          <p className="text-gray-600">Base de données clients et historique</p>
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
                <p className="text-2xl font-bold text-[#145587]">187</p>
              </div>
              <Users className="w-8 h-8 text-[#145587]" />
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
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nouveaux ce mois</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction moyenne</p>
                <p className="text-2xl font-bold text-yellow-600">4.7</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des voyageurs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Dernier séjour</TableHead>
                <TableHead>Nb séjours</TableHead>
                <TableHead>Total dépensé</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-[#145587] text-white text-xs">
                          {getInitials(guest.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{guest.name}</div>
                        <div className="text-sm text-gray-500">{guest.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-1" />
                        {guest.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {guest.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{guest.lastVisit}</TableCell>
                  <TableCell>{guest.totalStays}</TableCell>
                  <TableCell className="font-medium">{guest.totalSpent}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {guest.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guest.status)}`}>
                      {guest.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
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

export default GuestsSection;
