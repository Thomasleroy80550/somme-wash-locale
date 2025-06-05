
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, User, MapPin, Plus, Eye } from "lucide-react";

const ReservationsSection = () => {
  const reservations = [
    {
      id: "RES-2024-001",
      guest: "Famille Martin",
      property: "Gîte Les Mouettes",
      checkin: "15/06/2024",
      checkout: "22/06/2024",
      nights: 7,
      amount: "890€",
      status: "Confirmée",
      guests: 4
    },
    {
      id: "RES-2024-002",
      guest: "Sophie Durand",
      property: "Studio Vue Mer",
      checkin: "18/06/2024",
      checkout: "20/06/2024",
      nights: 2,
      amount: "180€",
      status: "En attente",
      guests: 2
    },
    {
      id: "RES-2024-003",
      guest: "Pierre & Marie L.",
      property: "Maison du Phare",
      checkin: "20/06/2024",
      checkout: "27/06/2024",
      nights: 7,
      amount: "1250€",
      status: "Confirmée",
      guests: 6
    },
    {
      id: "RES-2024-004",
      guest: "Jean Moreau",
      property: "Gîte Les Mouettes",
      checkin: "25/06/2024",
      checkout: "29/06/2024",
      nights: 4,
      amount: "520€",
      status: "Check-in",
      guests: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmée": return "text-green-600 bg-green-100";
      case "En attente": return "text-orange-600 bg-orange-100";
      case "Check-in": return "text-blue-600 bg-blue-100";
      case "Check-out": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#145587]">Gestion des Réservations</h1>
          <p className="text-gray-600">Suivez vos réservations et séjours</p>
        </div>
        <Button className="bg-[#145587] hover:bg-[#145587]/90">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle réservation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Réservations ce mois</p>
                <p className="text-2xl font-bold text-[#145587]">23</p>
              </div>
              <Calendar className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupés aujourd'hui</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Check-in aujourd'hui</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus ce mois</p>
                <p className="text-2xl font-bold text-green-600">12.450€</p>
              </div>
              <div className="text-green-600">€</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Réservations récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Réservation</TableHead>
                <TableHead>Voyageur</TableHead>
                <TableHead>Propriété</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead>Départ</TableHead>
                <TableHead>Personnes</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.id}</TableCell>
                  <TableCell>{reservation.guest}</TableCell>
                  <TableCell>{reservation.property}</TableCell>
                  <TableCell>{reservation.checkin}</TableCell>
                  <TableCell>{reservation.checkout}</TableCell>
                  <TableCell>{reservation.guests}</TableCell>
                  <TableCell className="font-medium">{reservation.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
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

export default ReservationsSection;
