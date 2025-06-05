
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Eye, Plus } from "lucide-react";

const InvoicesSection = () => {
  const invoices = [
    {
      id: "FAC-2024-001",
      client: "Marie Dupont",
      date: "2024-06-05",
      echeance: "2024-06-20",
      montant: "125.90€",
      status: "Payée",
      commandes: 5
    },
    {
      id: "FAC-2024-002", 
      client: "Jean Martin",
      date: "2024-06-04",
      echeance: "2024-06-19",
      montant: "89.50€",
      status: "En attente",
      commandes: 3
    },
    {
      id: "FAC-2024-003",
      client: "Sophie Bernard",
      date: "2024-06-03",
      echeance: "2024-06-18",
      montant: "245.00€",
      status: "Payée",
      commandes: 8
    },
    {
      id: "FAC-2024-004",
      client: "Pierre Durand",
      date: "2024-06-02",
      echeance: "2024-06-17",
      montant: "67.75€",
      status: "En retard",
      commandes: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Payée": return "text-green-600 bg-green-100";
      case "En attente": return "text-orange-600 bg-orange-100";
      case "En retard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#145587]">Gestion des Factures</h1>
          <p className="text-gray-600">Suivez vos factures et paiements</p>
        </div>
        <Button className="bg-[#145587] hover:bg-[#145587]/90">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle facture
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Factures ce mois</p>
                <p className="text-2xl font-bold text-[#145587]">47</p>
              </div>
              <FileText className="w-8 h-8 text-[#145587]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Payées</p>
                <p className="text-2xl font-bold text-green-600">38</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-orange-600">7</p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En retard</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <FileText className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Factures récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Facture</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.echeance}</TableCell>
                  <TableCell>{invoice.commandes}</TableCell>
                  <TableCell className="font-medium">{invoice.montant}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
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

export default InvoicesSection;
