import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, 
  Truck, 
  Clock, 
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Activity,
  BarChart3
} from 'lucide-react';
import { Order, OrderItem, ProductionSchedule } from '@/types/employee';

const EmployeeDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productionSchedules, setProductionSchedules] = useState<ProductionSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Récupérer les commandes avec les profils clients
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:customer_id (
            first_name,
            last_name,
            email,
            company
          )
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (ordersError) throw ordersError;

      // Récupérer les articles de commande
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (itemsError) throw itemsError;

      // Récupérer les plannings de production
      const { data: schedulesData, error: schedulesError } = await supabase
        .from('production_schedules')
        .select('*')
        .order('scheduled_start', { ascending: true });

      if (schedulesError) throw schedulesError;

      // Type cast the data to ensure proper types
      setOrders((ordersData || []) as Order[]);
      setOrderItems((itemsData || []) as OrderItem[]);
      setProductionSchedules((schedulesData || []) as ProductionSchedule[]);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du tableau de bord",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Statut mis à jour",
        description: "Le statut de la commande a été modifié avec succès",
      });

      fetchDashboardData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', variant: 'secondary' as const, color: 'bg-orange-100 text-orange-800' },
      in_progress: { label: 'En cours', variant: 'default' as const, color: 'bg-blue-100 text-blue-800' },
      washing: { label: 'Lavage', variant: 'default' as const, color: 'bg-blue-100 text-blue-800' },
      drying: { label: 'Séchage', variant: 'default' as const, color: 'bg-yellow-100 text-yellow-800' },
      ironing: { label: 'Repassage', variant: 'default' as const, color: 'bg-purple-100 text-purple-800' },
      ready: { label: 'Prêt', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      delivered: { label: 'Livré', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      completed: { label: 'Terminé', variant: 'default' as const, color: 'bg-gray-100 text-gray-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant} className={config.color}>{config.label}</Badge>;
  };

  const getStats = () => {
    const todayOrders = orders.filter(order => 
      new Date(order.created_at).toDateString() === new Date().toDateString()
    );
    
    const pendingOrders = orders.filter(order => order.status === 'pending');
    const inProgressOrders = orders.filter(order => ['in_progress', 'washing', 'drying', 'ironing'].includes(order.status));
    const completedToday = orders.filter(order => 
      order.status === 'completed' && 
      new Date(order.updated_at).toDateString() === new Date().toDateString()
    );

    return {
      todayOrders: todayOrders.length,
      pendingOrders: pendingOrders.length,
      inProgressOrders: inProgressOrders.length,
      completedToday: completedToday.length,
      totalRevenue: orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#145587] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#145587]">Tableau de Bord Employé</h1>
          <p className="text-gray-600">Suivi des commandes et production en temps réel</p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Package className="h-5 w-5 mr-2" />
              Commandes Aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{stats.todayOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <Clock className="h-5 w-5 mr-2" />
              En Attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{stats.pendingOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Activity className="h-5 w-5 mr-2" />
              En Production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{stats.inProgressOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Terminées Aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.completedToday}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
          <TabsTrigger value="schedule">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Commandes Récentes
              </CardTitle>
              <CardDescription>
                Suivi en temps réel des commandes et de leur statut
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Commande #{order.order_number}</h3>
                        <p className="text-sm text-gray-600">
                          {order.profiles?.first_name} {order.profiles?.last_name} 
                          {order.profiles?.company && ` - ${order.profiles.company}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="pending">En attente</option>
                          <option value="in_progress">En cours</option>
                          <option value="washing">Lavage</option>
                          <option value="drying">Séchage</option>
                          <option value="ironing">Repassage</option>
                          <option value="ready">Prêt</option>
                          <option value="delivered">Livré</option>
                          <option value="completed">Terminé</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Collecte:</span> 
                        {order.pickup_date ? new Date(order.pickup_date).toLocaleDateString('fr-FR') : 'Non planifiée'}
                      </div>
                      <div>
                        <span className="font-medium">Livraison:</span> 
                        {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('fr-FR') : 'Non planifiée'}
                      </div>
                      <div>
                        <span className="font-medium">Montant:</span> 
                        {order.total_amount ? `${order.total_amount}€` : 'À définir'}
                      </div>
                    </div>

                    {order.special_instructions && (
                      <div className="bg-blue-50 p-3 rounded">
                        <span className="font-medium text-blue-800">Instructions spéciales:</span>
                        <p className="text-blue-700">{order.special_instructions}</p>
                      </div>
                    )}
                  </div>
                ))}
                
                {orders.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucune commande trouvée
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Suivi de Production
              </CardTitle>
              <CardDescription>
                Planification et suivi des tâches de production
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productionSchedules.map((schedule) => (
                  <div key={schedule.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold capitalize">{schedule.machine_type}</h3>
                        <p className="text-sm text-gray-600">
                          Planifié: {new Date(schedule.scheduled_start).toLocaleString('fr-FR')} - 
                          {new Date(schedule.scheduled_end).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      {getStatusBadge(schedule.status)}
                    </div>
                    
                    {schedule.status === 'in_progress' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression estimée</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
                
                {productionSchedules.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucune tâche de production programmée
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performances Hebdomadaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Commandes traitées</span>
                    <span className="font-bold">{orders.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Chiffre d'affaires</span>
                    <span className="font-bold">{stats.totalRevenue.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Taux de completion</span>
                    <span className="font-bold">
                      {orders.length > 0 ? 
                        ((orders.filter(o => o.status === 'completed').length / orders.length) * 100).toFixed(1) 
                        : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Prévisions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm font-medium text-blue-800">Demain</p>
                    <p className="text-lg font-bold text-blue-600">8 commandes prévues</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm font-medium text-green-800">Cette semaine</p>
                    <p className="text-lg font-bold text-green-600">32 commandes prévues</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-sm font-medium text-purple-800">Charge de travail</p>
                    <p className="text-lg font-bold text-purple-600">Normale</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Planning de la Journée
              </CardTitle>
              <CardDescription>
                Organisation des tâches et optimisation des ressources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-blue-600 mb-3">Lavage</h3>
                    <div className="space-y-2">
                      <div className="text-sm bg-blue-50 p-2 rounded">
                        <div className="font-medium">9h00 - 11h00</div>
                        <div>Commande #001 - Linge de lit</div>
                      </div>
                      <div className="text-sm bg-blue-50 p-2 rounded">
                        <div className="font-medium">11h30 - 13h30</div>
                        <div>Commande #002 - Serviettes</div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-600 mb-3">Séchage</h3>
                    <div className="space-y-2">
                      <div className="text-sm bg-yellow-50 p-2 rounded">
                        <div className="font-medium">10h00 - 12h00</div>
                        <div>Commande #001 - Linge de lit</div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-purple-600 mb-3">Repassage</h3>
                    <div className="space-y-2">
                      <div className="text-sm bg-purple-50 p-2 rounded">
                        <div className="font-medium">14h00 - 16h00</div>
                        <div>Commande #001 - Linge de lit</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Livraisons Programmées</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="text-sm">
                      <span className="font-medium">16h30:</span> Livraison commande #001 - Gîte Les Roses
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">17h00:</span> Livraison commande #002 - Hôtel Belle Vue
                    </div>
                  </div>
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
