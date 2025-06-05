
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Users, Star, Plus, Eye, Edit } from "lucide-react";

const PropertiesSection = () => {
  const properties = [
    {
      id: "GITE-001",
      name: "Gîte Les Mouettes",
      type: "Maison",
      capacity: 6,
      rooms: 3,
      location: "Le Crotoy",
      rate: "€120/nuit",
      occupancy: "85%",
      rating: 4.8,
      status: "Disponible"
    },
    {
      id: "GITE-002",
      name: "Studio Vue Mer",
      type: "Studio",
      capacity: 2,
      rooms: 1,
      location: "Saint-Valery",
      rate: "€90/nuit",
      occupancy: "92%",
      rating: 4.6,
      status: "Occupé"
    },
    {
      id: "GITE-003",
      name: "Maison du Phare",
      type: "Villa",
      capacity: 8,
      rooms: 4,
      location: "Fort-Mahon",
      rate: "€180/nuit",
      occupancy: "78%",
      rating: 4.9,
      status: "Disponible"
    },
    {
      id: "GITE-004",
      name: "Appartement Central",
      type: "Appartement",
      capacity: 4,
      rooms: 2,
      location: "Rue",
      rate: "€85/nuit",
      occupancy: "88%",
      rating: 4.5,
      status: "Maintenance"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible": return "text-green-600 bg-green-100";
      case "Occupé": return "text-blue-600 bg-blue-100";
      case "Maintenance": return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#145587]">Mes Propriétés</h1>
          <p className="text-gray-600">Gérez vos gîtes et hébergements</p>
        </div>
        <Button className="bg-[#145587] hover:bg-[#145587]/90">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un gîte
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total propriétés</p>
                <p className="text-2xl font-bold text-[#145587]">12</p>
              </div>
              <Building2 className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux d'occupation</p>
                <p className="text-2xl font-bold text-green-600">86%</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Note moyenne</p>
                <p className="text-2xl font-bold text-yellow-600">4.7</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus moyens/nuit</p>
                <p className="text-2xl font-bold text-green-600">119€</p>
              </div>
              <div className="text-green-600">€</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des propriétés</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead>Capacité</TableHead>
                <TableHead>Tarif</TableHead>
                <TableHead>Occupation</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.capacity} pers.</TableCell>
                  <TableCell className="font-medium">{property.rate}</TableCell>
                  <TableCell>{property.occupancy}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {property.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                      {property.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
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

export default PropertiesSection;
