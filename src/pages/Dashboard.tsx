import React, { useState, useEffect } from 'react';
import { ArrowRight, Package, Truck, Clock, MapPin, Bell, Calendar, User, Home, Bed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Badge } from '../components/ui/badge';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, time: string}>>([]);
  const [driverPosition, setDriverPosition] = useState({ x: 20, y: 50 });
  const [stats, setStats] = useState({
    orders: 34,
    guests: 12
  });

  // Simulation du temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Animation du livreur sur la carte
      setDriverPosition(prev => ({
        x: (prev.x + 1.2) % 85,
        y: 50 + Math.sin(prev.x * 0.08) * 5
      }));
      
      // Notifications aléatoires pour gîtes
      if (Math.random() < 0.08) {
        const messages = [
          "Nouvelle collecte programmée - Gîte Les Roses",
          "Livraison linge propre effectuée - Villa Océan", 
          "Réservation confirmée pour demain 10h",
          "Linge collecté avec succès - Maison du Port"
        ];
        const newNotif = {
          id: Date.now(),
          message: messages[Math.floor(Math.random() * messages.length)],
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };
        setNotifications(prev => [newNotif, ...prev.slice(0, 2)]);
      }

      // Mise à jour des stats
      if (Math.random() < 0.03) {
        setStats(prev => ({
          orders: prev.orders + Math.floor(Math.random() * 2),
          guests: prev.guests + Math.floor(Math.random() * 1)
        }));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const mockOrders = [
    { 
      id: "CMD-001", 
      status: "Collecte programmée", 
      progress: 25, 
      eta: "Demain 10h-12h", 
      location: "Gîte Les Roses - Le Crotoy",
      items: ["Linge de lit (2 lits)", "Serviettes de toilette"],
      guest: "Famille Martin"
    },
    { 
      id: "CMD-002", 
      status: "En livraison", 
      progress: 75, 
      eta: "Aujourd'hui 16h-18h", 
      location: "Villa Océan - Saint-Valery",
      items: ["Linge de lit (3 lits)", "Draps housses", "Serviettes"],
      guest: "Couple Dubois"
    },
    { 
      id: "CMD-003", 
      status: "Livré", 
      progress: 100, 
      eta: "Livré hier", 
      location: "Maison du Port - Rue",
      items: ["Linge de lit complet", "Serviettes familiales"],
      guest: "Groupe d'amis"
    },
  ];

  // Réservations style Airbnb pour le calendrier
  const reservations = [
    { date: "2024-06-06", guest: "Famille Martin", property: "Gîte Les Roses", status: "occupied" },
    { date: "2024-06-07", guest: "Famille Martin", property: "Gîte Les Roses", status: "occupied" },
    { date: "2024-06-08", guest: "Couple Dubois", property: "Villa Océan", status: "checkout" },
    { date: "2024-06-09", guest: "Groupe d'amis", property: "Maison du Port", status: "checkin" },
    { date: "2024-06-10", guest: "Groupe d'amis", property: "Maison du Port", status: "occupied" },
  ];

  const hasReservation = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return reservations.some(res => res.date === dateStr);
  };

  const getReservationsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return reservations.filter(res => res.date === dateStr);
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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Gîtes</h1>
                <p className="text-sm text-gray-600">Service de linge pour locations - Mis à jour : {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              </div>
            </div>
            <Button asChild>
              <a href="/">Retour à l'accueil</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques simplifiées */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Commandes Linge</p>
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
                  <p className="text-green-100">Clients Actifs</p>
                  <p className="text-3xl font-bold animate-pulse">{stats.guests}</p>
                </div>
                <Home className="h-8 w-8 text-green-200" />
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
          {/* Calendrier des réservations style Airbnb */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-[#145587]" />
                Réservations Gîtes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                  reservation: hasReservation
                }}
                modifiersStyles={{
                  reservation: { backgroundColor: '#145587', color: 'white', borderRadius: '4px' }
                }}
                className="rounded-md border"
              />
              
              {selectedDate && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-3">
                    Réservations - {selectedDate.toLocaleDateString('fr-FR')}
                  </h4>
                  <div className="space-y-2">
                    {getReservationsForDate(selectedDate).map((reservation, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{reservation.property}</p>
                            <p className="text-sm text-gray-600">{reservation.guest}</p>
                          </div>
                          <Badge variant={
                            reservation.status === 'checkin' ? 'default' :
                            reservation.status === 'checkout' ? 'secondary' : 'outline'
                          }>
                            {reservation.status === 'checkin' ? 'Arrivée' :
                             reservation.status === 'checkout' ? 'Départ' : 'Occupé'}
                          </Badge>
                        </div>
                      </div>
                    )) || (
                      <p className="text-gray-500 text-sm">Aucune réservation ce jour</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Carte style Uber Eats simplifiée */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-6 w-6 mr-2 text-[#145587]" />
                Suivi Livraison - Live
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-100 h-48 rounded-xl relative overflow-hidden shadow-inner">
                {/* Fond flat style Google Maps */}
                <div className="absolute inset-0 bg-gray-100"></div>
                
                {/* Zones colorées simples */}
                <div className="absolute top-4 left-4 w-16 h-12 bg-green-200 rounded-lg opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-20 h-8 bg-blue-200 rounded-lg opacity-60"></div>
                <div className="absolute top-8 right-8 w-12 h-12 bg-orange-200 rounded-lg opacity-60"></div>
                
                {/* Routes principales simplifiées */}
                <div className="absolute inset-0">
                  {/* Route principale horizontale */}
                  <div className="absolute top-1/2 left-0 right-0 h-3 bg-white rounded-full shadow-sm transform -translate-y-1/2 border border-gray-300"></div>
                  
                  {/* Route verticale */}
                  <div className="absolute left-1/3 top-0 bottom-0 w-3 bg-white rounded-full shadow-sm border border-gray-300"></div>
                  
                  {/* Route diagonale */}
                  <div 
                    className="absolute top-6 left-6 w-32 h-3 bg-white rounded-full shadow-sm border border-gray-300 transform rotate-45 origin-left"
                  ></div>
                </div>
                
                {/* Itinéraire principal en bleu */}
                <svg className="absolute inset-0 w-full h-full">
                  <path 
                    d="M 10,96 L 80,96 L 160,96 L 280,96" 
                    stroke="#2563eb" 
                    strokeWidth="4" 
                    fill="none"
                    strokeLinecap="round"
                    className="drop-shadow-sm"
                  />
                </svg>
                
                {/* Point de départ moderne */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  <span className="absolute top-6 left-0 text-xs text-gray-700 whitespace-nowrap font-medium bg-white px-2 py-1 rounded shadow-sm">
                    Laverie Hello Wash
                  </span>
                </div>
                
                {/* Point d'arrivée moderne */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                  <span className="absolute top-6 right-0 text-xs text-gray-700 whitespace-nowrap font-medium bg-white px-2 py-1 rounded shadow-sm">
                    Gîte Les Roses
                  </span>
                </div>
                
                {/* Truck moderne style Uber Eats */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ease-linear z-10"
                  style={{ 
                    left: `${15 + (driverPosition.x * 0.7)}%`, 
                    top: `${driverPosition.y}%` 
                  }}
                >
                  {/* Ombre du truck */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm"></div>
                  
                  {/* Truck container */}
                  <div className="relative">
                    {/* Corps du truck */}
                    <div className="w-8 h-5 bg-[#145587] rounded-lg shadow-lg border border-white/20">
                      <div className="absolute inset-1 bg-gradient-to-b from-white/20 to-transparent rounded"></div>
                    </div>
                    
                    {/* Cabine */}
                    <div className="absolute -left-1 top-0 w-3 h-4 bg-[#145587] rounded-l-lg border border-white/20"></div>
                    
                    {/* Roues */}
                    <div className="absolute -bottom-1 left-1 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute -bottom-1 right-1 w-2 h-2 bg-gray-800 rounded-full"></div>
                    
                    {/* Icône truck */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Truck className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Labels des zones */}
                <div className="absolute top-2 left-2 text-xs text-gray-600 font-medium bg-white/80 px-2 py-1 rounded">Le Crotoy</div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-600 font-medium bg-white/80 px-2 py-1 rounded">Saint-Valery</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progression</span>
                  <span className="text-sm font-medium">{Math.round(driverPosition.x)}%</span>
                </div>
                <Progress value={driverPosition.x} className="h-3" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-800 font-medium">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Position
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      En route vers le gîte
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                    <p className="text-sm text-green-800 font-medium">
                      <Clock className="h-4 w-4 inline mr-1" />
                      ETA
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {Math.max(2, Math.round((100 - driverPosition.x) / 10))} min
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commandes linge de gîte */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Linge Gîtes</h3>
          <div className="grid gap-6">
            {mockOrders.map((order) => (
              <Card key={order.id} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#145587]/10 rounded-full p-3">
                        <Bed className="h-6 w-6 text-[#145587]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.location}</p>
                        <p className="text-sm text-blue-600 font-medium">{order.guest}</p>
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
                        🧺 Linge propre en route vers votre gîte !
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Arrivée prévue dans {Math.max(2, Math.round((100 - driverPosition.x) / 10))} minutes
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA adapté aux gîtes */}
        <div className="bg-gradient-to-r from-[#145587] to-blue-600 rounded-2xl p-8 text-center text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">
            Service de linge professionnel pour vos gîtes 🏠
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Calendrier synchronisé avec vos réservations, suivi en temps réel des collectes et livraisons, 
            gestion automatique du linge de lit et des serviettes pour tous vos hébergements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email du gestionnaire de gîtes"
              className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
            />
            <Button className="bg-white text-[#145587] hover:bg-gray-100 whitespace-nowrap px-6">
              Démarrer le service
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
