
import { ArrowRight, Package, Truck, Clock, MapPin, Bell, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

const Dashboard = () => {
  const mockOrders = [
    { id: "CMD-001", status: "En préparation", progress: 25, eta: "Demain 14h-16h", location: "Le Crotoy" },
    { id: "CMD-002", status: "En livraison", progress: 75, eta: "Aujourd'hui 16h-18h", location: "Saint-Valery" },
    { id: "CMD-003", status: "Livré", progress: 100, eta: "Livré hier", location: "Rue" },
  ];

  const features = [
    {
      icon: Package,
      title: "Suivi en temps réel",
      description: "Suivez vos commandes depuis la préparation jusqu'à la livraison"
    },
    {
      icon: Truck,
      title: "Livraison trackée",
      description: "Position GPS du livreur et heure d'arrivée estimée"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Alertes SMS/email à chaque étape importante"
    },
    {
      icon: Calendar,
      title: "Planification",
      description: "Choisissez vos créneaux de livraison préférés"
    },
    {
      icon: BarChart3,
      title: "Historique",
      description: "Consultez l'historique de toutes vos commandes"
    },
    {
      icon: MapPin,
      title: "Zone de livraison",
      description: "Vérifiez la disponibilité dans votre secteur"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/1cfec06e-dc8a-4f97-b6b2-1a5620825ffa.png" 
                alt="Hello Wash Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Client</h1>
                <p className="text-sm text-gray-600">Suivi de vos commandes en temps réel</p>
              </div>
            </div>
            <Button asChild>
              <a href="/">Retour à l'accueil</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bientôt disponible : Votre espace client
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Un dashboard complet pour suivre vos commandes, gérer vos livraisons et accéder à tous nos services Hello Wash
          </p>
          <div className="bg-gradient-to-r from-[#145587] to-blue-600 text-white px-6 py-3 rounded-full inline-flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Lancement prévu : Printemps 2024</span>
          </div>
        </div>

        {/* Preview des commandes */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Aperçu : Suivi de vos commandes</h3>
          <div className="grid gap-6">
            {mockOrders.map((order) => (
              <Card key={order.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#145587]/10 rounded-full p-2">
                        <Package className="h-5 w-5 text-[#145587]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Livré' ? 'bg-green-100 text-green-800' :
                        order.status === 'En livraison' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{order.eta}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span>{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Fonctionnalités du futur dashboard
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#145587]/10 rounded-full p-2">
                      <feature.icon className="h-6 w-6 text-[#145587]" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Soyez les premiers informés
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour être notifié dès le lancement du dashboard client et bénéficier d'un accès anticipé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#145587]"
            />
            <Button className="bg-[#145587] hover:bg-[#145587]/90 whitespace-nowrap">
              M'inscrire
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
