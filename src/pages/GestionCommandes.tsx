
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Package, 
  Calendar, 
  Truck, 
  Users, 
  TrendingUp, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types pour les données de test
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delivered';
  totalAmount: number;
  pickupDate: string;
  deliveryDate: string;
  items: string[];
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
}

const GestionCommandes = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Données de test
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'CMD-001',
      customerName: 'Jean Dupont',
      status: 'pending',
      totalAmount: 45.00,
      pickupDate: '2025-06-08',
      deliveryDate: '2025-06-10',
      items: ['Lavage chemises (5)', 'Nettoyage costume']
    },
    {
      id: '2',
      orderNumber: 'CMD-002',
      customerName: 'Marie Martin',
      status: 'in_progress',
      totalAmount: 32.50,
      pickupDate: '2025-06-07',
      deliveryDate: '2025-06-09',
      items: ['Lavage linge (3kg)', 'Repassage']
    },
    {
      id: '3',
      orderNumber: 'CMD-003',
      customerName: 'Pierre Durand',
      status: 'completed',
      totalAmount: 67.00,
      pickupDate: '2025-06-05',
      deliveryDate: '2025-06-07',
      items: ['Nettoyage rideaux', 'Lavage couettes (2)']
    }
  ]);

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '06 12 34 56 78',
      address: '123 Rue de la Paix, Amiens',
      totalOrders: 12
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '06 87 65 43 21',
      address: '456 Avenue du Commerce, Abbeville',
      totalOrders: 8
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', variant: 'default' as const },
      in_progress: { label: 'En cours', variant: 'secondary' as const },
      completed: { label: 'Terminé', variant: 'outline' as const },
      delivered: { label: 'Livré', variant: 'default' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    todayPickups: orders.filter(o => o.pickupDate === '2025-06-08').length,
    todayDeliveries: orders.filter(o => o.deliveryDate === '2025-06-08').length
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#145587] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">HW</span>
                  </div>
                  <h1 className="text-xl font-bold text-[#145587]">Hello Wash - Gestion</h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Connecté en tant que: {user?.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'dashboard', label: 'Tableau de bord', icon: TrendingUp },
                { id: 'orders', label: 'Commandes', icon: Package },
                { id: 'customers', label: 'Clients', icon: Users },
                { id: 'planning', label: 'Planning', icon: Calendar },
                { id: 'deliveries', label: 'Livraisons', icon: Truck }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#145587] text-[#145587]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Tableau de bord</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Commandes totales</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">En attente</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Collectes aujourd'hui</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.todayPickups}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Livraisons aujourd'hui</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.todayDeliveries}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Commandes récentes</CardTitle>
                  <CardDescription>Les dernières commandes reçues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.orderNumber} - {order.customerName}</p>
                          <p className="text-sm text-gray-500">{order.items.join(', ')}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(order.status)}
                          <span className="font-bold">{order.totalAmount}€</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des commandes</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle commande
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par nom ou numéro de commande..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </div>

              {/* Orders Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Numéro</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Collecte</TableHead>
                        <TableHead>Livraison</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{order.pickupDate}</TableCell>
                          <TableCell>{order.deliveryDate}</TableCell>
                          <TableCell className="font-bold">{order.totalAmount}€</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
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
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des clients</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau client
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Adresse</TableHead>
                        <TableHead>Commandes</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map(customer => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>{customer.address}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{customer.totalOrders}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
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
          )}

          {activeTab === 'planning' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Planning de production</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Planning de la semaine</CardTitle>
                  <CardDescription>Suivi de la production et des créneaux</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Module de planning en développement...</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'deliveries' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des livraisons</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Tournées de livraison</CardTitle>
                  <CardDescription>Organisation et suivi des livraisons</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Module de livraison en développement...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default GestionCommandes;
