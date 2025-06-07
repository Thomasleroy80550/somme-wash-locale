import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Truck, 
  Calendar,
  BarChart3,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types pour les données Supabase
interface SupabaseOrder {
  id: string;
  order_number: string;
  customer_id: string;
  status: string;
  total_amount: number;
  pickup_date: string;
  delivery_date: string;
  special_instructions: string;
  assigned_employee: string;
  created_at: string;
  updated_at: string;
  profiles?: any;
}

interface SupabaseOrderItem {
  id: string;
  order_id: string;
  item_type: string;
  quantity: number;
  unit_price: number;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface SupabaseProductionSchedule {
  id: string;
  order_item_id: string;
  machine_type: string;
  scheduled_start: string;
  scheduled_end: string;
  actual_start: string;
  actual_end: string;
  assigned_employee: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const EmployeeDashboard = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);
  const [orderItems, setOrderItems] = useState<SupabaseOrderItem[]>([]);
  const [productionSchedules, setProductionSchedules] = useState<SupabaseProductionSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*, profiles(first_name, last_name, email, company)')
          .order('created_at', { ascending: false });

        const { data: itemsData, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .order('created_at', { ascending: false });

        const { data: schedulesData, error: schedulesError } = await supabase
          .from('production_schedules')
          .select('*')
          .order('scheduled_start', { ascending: true });

        if (ordersError) throw ordersError;
        if (itemsError) throw itemsError;
        if (schedulesError) throw schedulesError;

        setOrders(ordersData || []);
        setOrderItems(itemsData || []);
        setProductionSchedules(schedulesData || []);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const inProgressOrders = orders.filter(order => order.status === 'in_progress').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', variant: 'secondary' as const },
      in_progress: { label: 'En cours', variant: 'default' as const },
      washing: { label: 'Lavage', variant: 'outline' as const },
      drying: { label: 'Séchage', variant: 'outline' as const },
      ironing: { label: 'Repassage', variant: 'outline' as const },
      ready: { label: 'Prêt', variant: 'default' as const },
      completed: { label: 'Terminé', variant: 'default' as const },
    };
    
    return statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'secondary' as const };
  };

  const updateOrderItemStatus = async (itemId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('order_items')
        .update({ status: newStatus })
        .eq('id', itemId);

      if (error) throw error;

      setOrderItems(items => 
        items.map(item => 
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      );

      toast({
        title: "Statut mis à jour",
        description: "Le statut de l'article a été mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#145587]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Cours</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Commandes</CardTitle>
              <CardDescription>
                Suivi en temps réel de toutes les commandes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input placeholder="Rechercher par numéro de commande..." />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Orders List */}
                <div className="space-y-2">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{order.order_number}</h3>
                          <p className="text-sm text-gray-600">
                            Client: {order.customer_id} • Total: {order.total_amount}€
                          </p>
                          <p className="text-sm text-gray-500">
                            Livraison: {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'Non programmée'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusBadge(order.status).variant}>
                            {getStatusBadge(order.status).label}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planning de Production</CardTitle>
              <CardDescription>
                Suivi des articles en cours de traitement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{item.item_type}</h3>
                        <p className="text-sm text-gray-600">
                          Quantité: {item.quantity} • {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadge(item.status).variant}>
                          {getStatusBadge(item.status).label}
                        </Badge>
                        <Select 
                          value={item.status}
                          onValueChange={(value) => updateOrderItemStatus(item.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="washing">Lavage</SelectItem>
                            <SelectItem value="drying">Séchage</SelectItem>
                            <SelectItem value="ironing">Repassage</SelectItem>
                            <SelectItem value="ready">Prêt</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyses de Performance</CardTitle>
              <CardDescription>
                Statistiques et métriques de production
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-6 border rounded-lg">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-[#145587]" />
                  <h3 className="font-semibold">Productivité Journalière</h3>
                  <p className="text-2xl font-bold text-[#145587]">95%</p>
                  <p className="text-sm text-gray-600">Objectif atteint</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold">Temps Moyen</h3>
                  <p className="text-2xl font-bold text-green-600">2.5h</p>
                  <p className="text-sm text-gray-600">Par commande</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planning des Livraisons</CardTitle>
              <CardDescription>
                Organisation des tournées et livraisons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <Truck className="h-8 w-8 text-[#145587]" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Tournée du Matin</h3>
                    <p className="text-sm text-gray-600">8h00 - 12h00 • 5 livraisons</p>
                  </div>
                  <Badge variant="outline">Programmée</Badge>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <Truck className="h-8 w-8 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Tournée de l'Après-midi</h3>
                    <p className="text-sm text-gray-600">14h00 - 18h00 • 3 livraisons</p>
                  </div>
                  <Badge variant="default">En cours</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard;
