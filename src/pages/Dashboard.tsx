
import React, { useState, useEffect } from 'react';
import { ArrowRight, Package, Truck, Clock, MapPin, Bell, Calendar, BarChart3, CheckCircle, User, Euro } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Badge } from '../components/ui/badge';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, time: string}>>([]);
  const [driverPosition, setDriverPosition] = useState(0);
  const [stats, setStats] = useState({
    orders: 127,
    savings: 245,
    points: 89
  });

  // Simulation du temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Animation du livreur
      setDriverPosition(prev => (prev + 2) % 100);
      
      // Notifications aléatoires
      if (Math.random() < 0.1) {
        const messages = [
          "Votre commande CMD-004 est en préparation",
          "Nouveau créneau disponible demain 14h-16h",
          "Points de fidélité ajoutés à votre compte",
          "Livraison terminée avec succès"
        ];
        const newNotif = {
          id: Date.now(),
          message: messages[Math.floor(Math.random() * messages.length)],
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };
        setNotifications(prev => [newNotif, ...prev.slice(0, 2)]);
      }

      // Mise à jour des stats
      if (Math.random() < 0.05) {
        setStats(prev => ({
          orders: prev.orders + Math.floor(Math.random() * 3),
          savings: prev.savings + Math.floor(Math.random() * 10),
          points: prev.points + Math.floor(Math.random() * 5)
        }));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const mockOrders = [
    { 
      id: "CMD-001", 
      status: "En préparation", 
      progress: 25, 
      eta: "Demain 14h-16h", 
      location: "Le Crotoy",
      items: ["Linge de maison", "Vêtements"]
    },
    { 
      id: "CMD-002", 
      status: "En livraison", 
      progress: 75, 
      eta: "Aujourd'hui 16h-18h", 
      location: "Saint-Valery",
      items: ["Costume", "Chemises"]
    },
    { 
      id: "CMD-003", 
      status: "Livré", 
      progress: 100, 
      eta: "Livré hier", 
      location: "Rue",
      items: ["Rideaux", "Couette"]
    },
  ];

  const timeSlots = [
    { time: "08h-10h", available: true, date: "2024-06-06" },
    { time: "10h-12h", available: false, date: "2024-06-06" },
    { time: "14h-16h", available: true, date: "2024-06-06" },
    { time: "16h-18h", available: true, date: "2024-06-06" },
    { time: "08h-10h", available: true, date: "2024-06-07" },
    { time: "10h-12h", available: true, date: "2024-06-07" },
    { time: "14h-16h", available: false, date: "2024-06-07" },
    { time: "16h-18h", available: true, date: "2024-06-07" },
  ];

  const hasDeliveryToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString() || 
           date.toDateString() === new Date(today.getTime() + 24 * 60 * 60 * 1000).toDateString();
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Demo</h1>
                <p className="text-sm text-gray-600">Démonstration interactive - Mis à jour : {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              </div>
            </div>
            <Button asChild>
              <a href="/">Retour à l'accueil</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques en temps réel */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Commandes</p>
                  <p className="text-3xl font-bold animate-pulse">{stats.orders}</p>
                </div>
                <Package className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Économies</p>
                  <p className="text-3xl font-bold animate-pulse">{stats.savings}€</p>
                </div>
                <Euro className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Points Fidélité</p>
                  <p className="text-3xl font-bold animate-pulse">{stats.points}</p>
                </div>
                <User className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications en temps réel */}
        {notifications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-[#145587]" />
              Notifications temps réel
            </h3>
            <div className="space-y-2">
              {notifications.map((notif) => (
                <div key={notif.id} className="bg-blue-50 border-l-4 border-blue-400 p-4 animate-fade-in">
                  <div className="flex justify-between">
                    <p className="text-blue-800">{notif.message}</p>
                    <span className="text-blue-600 text-sm">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Calendrier de livraison */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-[#145587]" />
                Planificateur de Livraisons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                  delivery: hasDeliveryToday
                }}
                modifiersStyles={{
                  delivery: { backgroundColor: '#145587', color: 'white', borderRadius: '50%' }
                }}
                className="rounded-md border"
              />
              
              {selectedDate && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-3">
                    Créneaux disponibles - {selectedDate.toLocaleDateString('fr-FR')}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots
                      .filter(slot => slot.date === selectedDate.toISOString().split('T')[0])
                      .map((slot, index) => (
                        <Button
                          key={index}
                          variant={slot.available ? "outline" : "secondary"}
                          disabled={!slot.available}
                          className={slot.available ? "hover:bg-[#145587] hover:text-white" : ""}
                        >
                          {slot.time}
                          {!slot.available && " (Occupé)"}
                        </Button>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Suivi livreur en temps réel */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-6 w-6 mr-2 text-[#145587]" />
                Livreur en Temps Réel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-100 h-32 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-blue-200"></div>
                <div 
                  className="absolute top-1/2 w-4 h-4 bg-[#145587] rounded-full transform -translate-y-1/2 transition-all duration-2000 ease-linear flex items-center justify-center"
                  style={{ left: `${driverPosition}%` }}
                >
                  <Truck className="h-3 w-3 text-white" />
                </div>
                <div className="absolute bottom-2 left-2 text-xs text-gray-600">
                  Départ
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-600">
                  Arrivée
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Progression</span>
                  <span className="text-sm font-medium">{Math.round(driverPosition)}%</span>
                </div>
                <Progress value={driverPosition} className="h-2" />
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Position actuelle: Rue de la Paix, Le Crotoy
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  <Clock className="h-4 w-4 inline mr-1" />
                  ETA: {Math.max(5, Math.round((100 - driverPosition) / 10))} min
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commandes avec détails étendus */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Suivi de vos commandes</h3>
          <div className="grid gap-6">
            {mockOrders.map((order) => (
              <Card key={order.id} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#145587]/10 rounded-full p-3">
                        <Package className="h-6 w-6 text-[#145587]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.location}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {order.items.map((item, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Livré' ? 'bg-green-100 text-green-800' :
                        order.status === 'En livraison' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'Livré' && <CheckCircle className="h-4 w-4 inline mr-1" />}
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
                  
                  {order.status === 'En livraison' && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">
                        🚚 Votre commande arrive bientôt !
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Le livreur sera chez vous dans environ {Math.max(5, Math.round((100 - driverPosition) / 10))} minutes
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA amélioré */}
        <div className="bg-gradient-to-r from-[#145587] to-blue-600 rounded-2xl p-8 text-center text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">
            Impressionnant, non ? 🚀
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Cette démonstration montre les fonctionnalités temps réel de votre futur dashboard Hello Wash. 
            Calendrier synchronisé, suivi GPS, notifications instantanées et bien plus !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
            />
            <Button className="bg-white text-[#145587] hover:bg-gray-100 whitespace-nowrap px-6">
              Être notifié du lancement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
