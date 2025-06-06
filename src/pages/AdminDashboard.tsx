import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AuthGuard from '@/components/AuthGuard';
import { Database } from '@/types/database';
import { 
  Users, 
  Crown, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Mail,
  Search,
  Filter,
  Edit,
  Trash2,
  UserPlus
} from 'lucide-react';

type MemberProfile = Database['public']['Tables']['member_profiles']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row'];
};

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    validated: 0,
    priority: 0
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('member_profiles')
        .select(`
          *,
          profiles!inner (
            first_name,
            last_name,
            email,
            phone,
            company
          )
        `)
        .order('position', { ascending: true, nullsFirst: false });

      if (error) throw error;

      // Validate that each item in data has the correct structure
      const validMembers: MemberProfile[] = [];
      
      if (data) {
        for (const item of data) {
          if (item && item.profiles && typeof item.profiles === 'object' && 
              'first_name' in item.profiles && 'last_name' in item.profiles) {
            validMembers.push(item as MemberProfile);
          } else {
            console.error('Invalid member data structure:', item);
          }
        }
      }
      
      setMembers(validMembers);
      
      // Calculate stats
      const total = validMembers.length || 0;
      const pending = validMembers.filter(m => m.status === 'pending').length || 0;
      const validated = validMembers.filter(m => m.status === 'validated').length || 0;
      const priority = validMembers.filter(m => m.status === 'priority').length || 0;
      
      setStats({ total, pending, validated, priority });
    } catch (error: any) {
      toast.error('Erreur lors du chargement des membres: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateMemberStatus = async (memberId: string, newStatus: 'pending' | 'validated' | 'priority') => {
    try {
      const { error } = await supabase
        .from('member_profiles')
        .update({ status: newStatus })
        .eq('id', memberId);

      if (error) throw error;

      setMembers(prev => 
        prev.map(member => 
          member.id === memberId 
            ? { ...member, status: newStatus }
            : member
        )
      );

      toast.success('Statut mis à jour avec succès');
      
      // Send notification to user
      const member = members.find(m => m.id === memberId);
      if (member) {
        await sendNotification(
          member.user_id,
          'status_update',
          'Mise à jour de votre statut',
          `Votre statut dans la liste d'attente a été mis à jour: ${getStatusLabel(newStatus)}`
        );
      }
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour: ' + error.message);
    }
  };

  const sendNotification = async (userId: string, type: string, title: string, message: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type,
          title,
          message
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi de notification:', error);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'validated': return 'Validé';
      case 'priority': return 'Prioritaire';
      default: return status;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">En attente</Badge>;
      case 'validated':
        return <Badge variant="default" className="bg-green-100 text-green-800">Validé</Badge>;
      case 'priority':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Prioritaire</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.profiles.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.profiles.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.profiles.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#145587] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-gradient-to-br from-[#145587]/5 to-white">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/1cfec06e-dc8a-4f97-b6b2-1a5620825ffa.png" 
                  alt="Hello Wash Logo" 
                  className="h-12 w-auto"
                />
                <span className="ml-3 text-sm text-gray-600">Dashboard Admin</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="text-[#145587] hover:text-[#145587]/80 transition-colors">
                  Site principal
                </a>
                <Button variant="outline" onClick={signOut}>
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Administrateur
            </h1>
            <p className="text-gray-600">
              Gestion de la liste d'attente Hello Wash
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Membres</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#145587]">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Attente</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validés</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.validated}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prioritaires</CardTitle>
                <Crown className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.priority}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtres et Recherche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher par nom, email ou ville..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="validated">Validé</SelectItem>
                    <SelectItem value="priority">Prioritaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Members List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Liste des Membres ({filteredMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="bg-[#145587] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            #{member.position || '?'}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {member.profiles.first_name} {member.profiles.last_name}
                            </h3>
                            <p className="text-gray-600">{member.profiles.email}</p>
                          </div>
                          {getStatusBadge(member.status)}
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Type:</span> {
                              member.profile_type === 'gite' ? 'Gîtes Indépendants' : 'Grand Compte'
                            }
                          </div>
                          <div>
                            <span className="font-medium">Propriétés:</span> {member.number_of_properties}
                          </div>
                          <div>
                            <span className="font-medium">Capacité:</span> {member.total_capacity} personnes
                          </div>
                          <div>
                            <span className="font-medium">Localisation:</span> {member.location}
                          </div>
                          <div>
                            <span className="font-medium">Délai:</span> {member.delivery_delay.toUpperCase()}
                          </div>
                          <div>
                            <span className="font-medium">Inscription:</span> {
                              new Date(member.registration_date).toLocaleDateString('fr-FR')
                            }
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Select 
                          value={member.status} 
                          onValueChange={(value: 'pending' | 'validated' | 'priority') => 
                            updateMemberStatus(member.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="validated">Validé</SelectItem>
                            <SelectItem value="priority">Prioritaire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredMembers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Aucun membre trouvé avec les critères de recherche actuels.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </AuthGuard>
  );
};

export default AdminDashboard;
