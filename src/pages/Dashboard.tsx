<think>

</think>

import React, { useState, useEffect } from 'react';
import { ArrowRight, Package, Truck, Clock, MapPin, Bell, Calendar, User, Home, Bed, CreditCard, FileText, Download, Star, Filter, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, time: string}>>([]);
  const [driverPosition, setDriverPosition] = useState({ x: 20, y: 50 });
  const [stats, setStats] = useState({
    orders: 34,
    collections: 28,
    totalBilled: 1240,
    properties: 5
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
          collections: prev.collections + Math.floor(Math.random() * 1),
          totalBilled: prev.totalBilled + Math.floor(Math.random() * 50),
          properties: prev.properties
        }));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Mock data pour les nouvelles sections
  const properties = [
    { id: 1, name: "Gîte Les Roses", address: "12 Rue des Fleurs, Le Crotoy", capacity: "6 personnes", linentStatus: "propre", monthlyCost: 145, collectionsPerMonth: 8 },
    { id: 2, name: "Villa Océan", address: "45 Avenue de la Mer, Saint-Valery", capacity: "8 personnes", linentStatus: "en-cours", monthlyCost: 220, collectionsPerMonth: 12 },
    { id: 3, name: "Maison du Port", address: "23 Quai Maritime, Rue", capacity: "4 personnes", linentStatus: "a-collecter", monthlyCost: 95, collectionsPerMonth: 6 },
    { id: 4, name: "Cottage Baie", address: "78 Chemin des Dunes, Fort-Mahon", capacity: "10 personnes", linentStatus: "propre", monthlyCost: 180, collectionsPerMonth: 10 },
    { id: 5, name: "Studio Mer", address: "5 Place du Marché, Berck", capacity: "2 personnes", linentStatus: "en-cours", monthlyCost: 85, collectionsPerMonth: 4 }
  ];

  const invoices = [
    { id: "F-2024-001", date: "2024-06-01", amount: 245.50, status: "paid", property: "Gîte Les Roses", services: "Linge complet x3" },
    { id: "F-2024-002", date: "2024-06-05", amount: 180.00, status: "pending", property: "Villa Océan", services: "Linge de lit x2" },
    { id: "F-2024-003", date: "2024-05-28", amount: 320.75, status: "paid", property: "Maison du Port", services: "Linge complet x4" },
    { id: "F-2024-004", date: "2024-05-25", amount: 125.00, status: "overdue", property: "Studio Mer", services: "Serviettes x6" }
  ];

  const detailedOrders = [
    { 
      id: "CMD-001", 
      date: "2025-06-06",
      property: "Gîte Les Roses",
      status: "Collecte programmée", 
      progress: 25, 
      eta: "Demain 10h-12h", 
      items: [
        { type: "Linge de lit", quantity: 2, price: 15.00 },
        { type: "Serviettes", quantity: 8, price: 12.00 }
      ],
      total: 42.00,
      guest: "Famille Martin",
      rating: null
    },
    { 
      id: "CMD-002", 
      date: "2025-06-05",
      property: "Villa Océan",
      status: "En livraison", 
      progress: 75, 
      eta: "Aujourd'hui 16h-18h", 
      items: [
        { type: "Linge de lit", quantity: 3, price: 22.50 },
        { type: "Draps housses", quantity: 3, price: 18.00 },
        { type: "Serviettes", quantity: 12, price: 18.00 }
      ],
      total: 58.50,
      guest: "Couple Dubois",
      rating: null
    },
    { 
      id: "CMD-003", 
      date: "2025-06-03",
      property: "Maison du Port",
      status: "Livré", 
      progress: 100, 
      eta: "Livré", 
      items: [
        { type: "Linge de lit complet", quantity: 4, price: 30.00 },
        { type: "Serviettes familiales", quantity: 15, price: 22.50 }
      ],
      total: 52.50,
      guest: "Groupe d'amis",
      rating: 5
    }
  ];

  // Réservations Airbnb étendues avec beaucoup plus de dates de juin à novembre 2025
  const airbnbReservations = [
    // Juin 2025
    { date: "2025-06-07", guest: "Famille Martin", property: "Gîte Les Roses", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "Avant 15h" },
    { date: "2025-06-08", guest: "Famille Martin", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-06-09", guest: "Famille Martin", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-06-10", guest: "Famille Martin", property: "Gîte Les Roses", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "12h-14h" },
    
    { date: "2025-06-12", guest: "Couple Dubois", property: "Villa Océan", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "Avant 16h" },
    { date: "2025-06-13", guest: "Couple Dubois", property: "Villa Océan", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-06-14", guest: "Couple Dubois", property: "Villa Océan", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-06-15", guest: "Couple Dubois", property: "Villa Océan", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-06-16", guest: "Couple Dubois", property: "Villa Océan", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "11h-13h" },
    
    { date: "2025-06-18", guest: "Famille Rousseau", property: "Cottage Baie", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "Avant 17h" },
    { date: "2025-06-19", guest: "Famille Rousseau", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-06-20", guest: "Famille Rousseau", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-06-21", guest: "Famille Rousseau", property: "Cottage Baie", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "10h-12h" },
    
    { date: "2025-06-25", guest: "Groupe d'amis", property: "Maison du Port", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "14h-16h" },
    { date: "2025-06-26", guest: "Groupe d'amis", property: "Maison du Port", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-06-27", guest: "Groupe d'amis", property: "Maison du Port", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-06-28", guest: "Groupe d'amis", property: "Maison du Port", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "11h-13h" },
    
    { date: "2025-06-30", guest: "Couple Bernard", property: "Studio Mer", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "Avant 15h" },
    
    // Juillet 2025
    { date: "2025-07-01", guest: "Couple Bernard", property: "Studio Mer", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-02", guest: "Couple Bernard", property: "Studio Mer", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "12h-14h" },
    
    { date: "2025-07-05", guest: "Famille Lefebvre", property: "Gîte Les Roses", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "Avant 16h" },
    { date: "2025-07-06", guest: "Famille Lefebvre", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-07", guest: "Famille Lefebvre", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-08", guest: "Famille Lefebvre", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-09", guest: "Famille Lefebvre", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-10", guest: "Famille Lefebvre", property: "Gîte Les Roses", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "11h-13h" },
    
    { date: "2025-07-12", guest: "Groupe étudiants", property: "Villa Océan", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "14h-16h" },
    { date: "2025-07-13", guest: "Groupe étudiants", property: "Villa Océan", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-14", guest: "Groupe étudiants", property: "Villa Océan", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-15", guest: "Groupe étudiants", property: "Villa Océan", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "10h-12h" },
    
    { date: "2025-07-20", guest: "Famille Moreau", property: "Cottage Baie", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "Avant 17h" },
    { date: "2025-07-21", guest: "Famille Moreau", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-22", guest: "Famille Moreau", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-23", guest: "Famille Moreau", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-24", guest: "Famille Moreau", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-25", guest: "Famille Moreau", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-07-26", guest: "Famille Moreau", property: "Cottage Baie", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "12h-14h" },
    
    // Août 2025 (haute saison)
    { date: "2025-08-01", guest: "Famille Petit", property: "Gîte Les Roses", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "Avant 15h" },
    { date: "2025-08-02", guest: "Famille Petit", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-03", guest: "Famille Petit", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-04", guest: "Famille Petit", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-05", guest: "Famille Petit", property: "Gîte Les Roses", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "11h-13h" },
    
    { date: "2025-08-06", guest: "Couple Girard", property: "Studio Mer", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "Avant 16h" },
    { date: "2025-08-07", guest: "Couple Girard", property: "Studio Mer", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-08", guest: "Couple Girard", property: "Studio Mer", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-09", guest: "Couple Girard", property: "Studio Mer", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "12h-14h" },
    
    { date: "2025-08-15", guest: "Famille Durand", property: "Villa Océan", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "14h-16h" },
    { date: "2025-08-16", guest: "Famille Durand", property: "Villa Océan", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-17", guest: "Famille Durand", property: "Villa Océan", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-18", guest: "Famille Durand", property: "Villa Océan", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-19", guest: "Famille Durand", property: "Villa Océan", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-20", guest: "Famille Durand", property: "Villa Océan", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-21", guest: "Famille Durand", property: "Villa Océan", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "10h-12h" },
    
    { date: "2025-08-25", guest: "Groupe amis", property: "Maison du Port", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "Avant 17h" },
    { date: "2025-08-26", guest: "Groupe amis", property: "Maison du Port", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-27", guest: "Groupe amis", property: "Maison du Port", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-08-28", guest: "Groupe amis", property: "Maison du Port", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "11h-13h" },
    
    // Septembre 2025
    { date: "2025-09-05", guest: "Famille Thomas", property: "Cottage Baie", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "Avant 15h" },
    { date: "2025-09-06", guest: "Famille Thomas", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-09-07", guest: "Famille Thomas", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-09-08", guest: "Famille Thomas", property: "Cottage Baie", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "12h-14h" },
    
    { date: "2025-09-12", guest: "Couple Roux", property: "Studio Mer", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "Avant 16h" },
    { date: "2025-09-13", guest: "Couple Roux", property: "Studio Mer", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-09-14", guest: "Couple Roux", property: "Studio Mer", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "11h-13h" },
    
    { date: "2025-09-20", guest: "Famille Garcia", property: "Gîte Les Roses", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "14h-16h" },
    { date: "2025-09-21", guest: "Famille Garcia", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-09-22", guest: "Famille Garcia", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-09-23", guest: "Famille Garcia", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-09-24", guest: "Famille Garcia", property: "Gîte Les Roses", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "10h-12h" },
    
    // Octobre 2025
    { date: "2025-10-10", guest: "Couple Laurent", property: "Villa Océan", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "Avant 17h" },
    { date: "2025-10-11", guest: "Couple Laurent", property: "Villa Océan", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-10-12", guest: "Couple Laurent", property: "Villa Océan", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-10-13", guest: "Couple Laurent", property: "Villa Océan", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "12h-14h" },
    
    { date: "2025-10-18", guest: "Famille Simon", property: "Cottage Baie", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "Avant 15h" },
    { date: "2025-10-19", guest: "Famille Simon", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-10-20", guest: "Famille Simon", property: "Cottage Baie", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-10-21", guest: "Famille Simon", property: "Cottage Baie", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "11h-13h" },
    
    { date: "2025-10-25", guest: "Groupe collègues", property: "Maison du Port", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "14h-16h" },
    { date: "2025-10-26", guest: "Groupe collègues", property: "Maison du Port", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-10-27", guest: "Groupe collègues", property: "Maison du Port", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "10h-12h" },
    
    // Novembre 2025
    { date: "2025-11-01", guest: "Famille Blanc", property: "Gîte Les Roses", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "Avant 16h" },
    { date: "2025-11-02", guest: "Famille Blanc", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-11-03", guest: "Famille Blanc", property: "Gîte Les Roses", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-11-04", guest: "Famille Blanc", property: "Gîte Les Roses", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "12h-14h" },
    
    { date: "2025-11-08", guest: "Couple Mercier", property: "Studio Mer", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "Avant 15h" },
    { date: "2025-11-09", guest: "Couple Mercier", property: "Studio Mer", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-11-10", guest: "Couple Mercier", property: "Studio Mer", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "11h-13h" },
    
    { date: "2025-11-15", guest: "Famille Leroy", property: "Villa Océan", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "14h-16h" },
    { date: "2025-11-16", guest: "Famille Leroy", property: "Villa Océan", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-11-17", guest: "Famille Leroy", property: "Villa Océan", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-11-18", guest: "Famille Leroy", property: "Villa Océan", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "10h-12h" },
    
    { date: "2025-11-22", guest: "Groupe famille", property: "Cottage Baie", status: "checkin", platform: "Booking.com", linentStatus: "livré", collectTime: "Avant 17h" },
    { date: "2025-11-23", guest: "Groupe famille", property: "Cottage Baie", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-11-24", guest: "Groupe famille", property: "Cottage Baie", status: "occupied", platform: "Booking.com", linentStatus: "en-cours", collectTime: null },
    { date: "2025-11-25", guest: "Groupe famille", property: "Cottage Baie", status: "checkout", platform: "Booking.com", linentStatus: "à-collecter", collectTime: "12h-14h" },
    
    { date: "2025-11-28", guest: "Couple Fabre", property: "Maison du Port", status: "checkin", platform: "Airbnb", linentStatus: "livré", collectTime: "Avant 15h" },
    { date: "2025-11-29", guest: "Couple Fabre", property: "Maison du Port", status: "occupied", platform: "Airbnb", linentStatus: "en-cours", collectTime: null },
    { date: "2025-11-30", guest: "Couple Fabre", property: "Maison du Port", status: "checkout", platform: "Airbnb", linentStatus: "à-collecter", collectTime: "11h-13h" }
  ];

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

  const hasReservation = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return airbnbReservations.some(res => res.date === dateStr);
  };

  const getReservationsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return airbnbReservations.filter(res => res.date === dateStr);
  };

  const getLinenStatusColor = (status: string) => {
    switch (status) {
      case 'propre': return 'bg-green-100 text-green-800';
      case 'en-cours': return 'bg-blue-100 text-blue-800';
      case 'a-collecter': return 'bg-orange-100 text-orange-800';
      case 'livré': return 'bg-purple-100 text-purple-800';
      case 'à-livrer': return 'bg-yellow-100 text-yellow-800';
      case 'à-collecter': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLinenStatusText = (status: string) => {
    switch (status) {
      case 'propre': return 'Propre';
      case 'en-cours': return 'En cours';
      case 'a-collecter': return 'À collecter';
      case 'à-collecter': return 'À collecter';
      case 'livré': return 'Livré';
      case 'à-livrer': return 'À livrer';
      default: return status;
    }
  };

  const getPlatformBadgeColor = (platform: string) => {
    switch (platform) {
      case 'Airbnb': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Booking.com': return 'bg-blue-100 text-blue-800 border border-blue-200';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Espace Client - Gestionnaire de Gîtes</h1>
                <p className="text-sm text-gray-600">Service de linge professionnel - Mis à jour : {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              </div>
            </div>
            <Button asChild>
              <a href="/">Retour à l'accueil</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              Mes hébergements
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Commandes linge
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Factures
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Planning
            </TabsTrigger>
          </TabsList>

          {/* Tableau de bord principal */}
          <TabsContent value="dashboard">
            {/* KPIs */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Commandes ce mois</p>
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
                      <p className="text-green-100">Collectes ce mois</p>
                      <p className="text-3xl font-bold animate-pulse">{stats.collections}</p>
                    </div>
                    <Truck className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total facturé</p>
                      <p className="text-3xl font-bold animate-pulse">{stats.totalBilled}€</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Hébergements</p>
                      <p className="text-3xl font-bold">{stats.properties}</p>
                    </div>
                    <Home className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Carte de suivi existante */}
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

              {/* Aperçu des hébergements */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bed className="h-6 w-6 mr-2 text-[#145587]" />
                    Aperçu hébergements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {properties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{property.name}</p>
                        <p className="text-sm text-gray-600">{property.capacity}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getLinenStatusColor(property.linentStatus)}>
                          {getLinenStatusText(property.linentStatus)}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{property.monthlyCost}€/mois</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Voir tous les hébergements
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Commandes récentes simplifiées */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Commandes récentes</h3>
              <div className="grid gap-4">
                {mockOrders.slice(0, 2).map((order) => (
                  <Card key={order.id} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-[#145587]/10 rounded-full p-2">
                            <Package className="h-5 w-5 text-[#145587]" />
                          </div>
                          <div>
                            <h4 className="font-medium">{order.id}</h4>
                            <p className="text-sm text-gray-600">{order.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={order.status === 'Livré' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{order.eta}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Section Mes hébergements */}
          <TabsContent value="properties">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Mes hébergements</h2>
                <Button>
                  <Home className="h-4 w-4 mr-2" />
                  Ajouter un hébergement
                </Button>
              </div>

              <div className="grid gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-[#145587]/10 rounded-full p-3">
                              <Home className="h-6 w-6 text-[#145587]" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">{property.name}</h3>
                              <p className="text-gray-600">{property.address}</p>
                              <p className="text-sm text-gray-500">{property.capacity}</p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <p className="text-sm text-blue-600 font-medium">Coût linge/mois</p>
                              <p className="text-2xl font-bold text-blue-800">{property.monthlyCost}€</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <p className="text-sm text-green-600 font-medium">Collectes/mois</p>
                              <p className="text-2xl font-bold text-green-800">{property.collectionsPerMonth}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="text-sm text-purple-600 font-medium">État du linge</p>
                              <Badge className={getLinenStatusColor(property.linentStatus)}>
                                {getLinenStatusText(property.linentStatus)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button size="sm">
                            <Package className="h-4 w-4 mr-2" />
                            Programmer collecte
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Détails
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Section Commandes détaillées */}
          <TabsContent value="orders">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Historique des commandes</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrer
                  </Button>
                  <Button>
                    <Package className="h-4 w-4 mr-2" />
                    Nouvelle commande
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {detailedOrders.map((order) => (
                  <Card key={order.id} className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{order.id}</h3>
                          <p className="text-gray-600">{order.property}</p>
                          <p className="text-sm text-gray-500">Client: {order.guest}</p>
                          <p className="text-sm text-gray-500">Date: {order.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            order.status === 'Livré' ? 'bg-green-100 text-green-800' :
                            order.status === 'En livraison' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {order.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{order.eta}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">Détail des articles</h4>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.type} (x{item.quantity})</span>
                              <span>{item.price.toFixed(2)}€</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                          <span>Total</span>
                          <span>{order.total.toFixed(2)}€</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progression</span>
                            <span>{order.progress}%</span>
                          </div>
                          <Progress value={order.progress} className="h-2" />
                        </div>
                        
                        <div className="ml-4 flex items-center gap-2">
                          {order.rating && (
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < order.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Détails
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Section Factures */}
          <TabsContent value="invoices">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Factures et paiements</h2>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger tout
                </Button>
              </div>

              <div className="grid gap-4">
                {invoices.map((invoice) => (
                  <Card key={invoice.id} className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="bg-[#145587]/10 rounded-full p-3">
                            <FileText className="h-6 w-6 text-[#145587]" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{invoice.id}</h3>
                            <p className="text-gray-600">{invoice.property}</p>
                            <p className="text-sm text-gray-500">{invoice.services}</p>
                            <p className="text-sm text-gray-500">Date: {invoice.date}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold">{invoice.amount.toFixed(2)}€</p>
                          <Badge className={
                            invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {invoice.status === 'paid' ? 'Payé' :
                             invoice.status === 'pending' ? 'En attente' : 'En retard'}
                          </Badge>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              PDF
                            </Button>
                            {invoice.status !== 'paid' && (
                              <Button size="sm">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Payer
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Section Calendrier avec style Airbnb amélioré */}
          <TabsContent value="calendar">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Planning des réservations</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#FF5A5F] rounded-md border border-red-300"></div>
                    <span>Airbnb</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#003580] rounded-md border border-blue-300"></div>
                    <span>Booking.com</span>
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-6 w-6 mr-2 text-[#145587]" />
                      Calendrier synchronisé
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
                        reservation: { 
                          backgroundColor: '#FF5A5F', 
                          color: 'white', 
                          borderRadius: '8px',
                          fontWeight: '600'
                        }
                      }}
                      className="rounded-md border"
                    />
                    
                    {selectedDate && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-3">
                          Réservations - {selectedDate.toLocaleDateString('fr-FR')}
                        </h4>
                        <div className="space-y-3">
                          {getReservationsForDate(selectedDate).map((reservation, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <p className="font-semibold text-gray-900">{reservation.property}</p>
                                  <p className="text-sm text-gray-600">{reservation.guest}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Badge className={`${getPlatformBadgeColor(reservation.platform)} rounded-full px-3 py-1 font-medium`}>
                                    {reservation.platform}
                                  </Badge>
                                  <Badge 
                                    className={`rounded-full px-3 py-1 font-medium ${
                                      reservation.status === 'checkin' ? 'bg-green-100 text-green-800 border border-green-200' :
                                      reservation.status === 'checkout' ? 'bg-orange-100 text-orange-800 border border-orange-200' : 
                                      'bg-blue-100 text-blue-800 border border-blue-200'
                                    }`}
                                  >
                                    {reservation.status === 'checkin' ? 'Arrivée' :
                                     reservation.status === 'checkout' ? 'Départ' : 'Occupé'}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600 font-medium">Linge:</span>
                                  <Badge className={`${getLinenStatusColor(reservation.linentStatus)} rounded-full px-3 py-1`}>
                                    {getLinenStatusText(reservation.linentStatus)}
                                  </Badge>
                                </div>
                                {reservation.collectTime && (
                                  <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                                    📅 {reservation.collectTime}
                                  </span>
                                )}
                              </div>
                            </div>
                          )) || (
                            <p className="text-gray-500 text-sm text-center py-8">Aucune réservation ce jour</p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Planning des services linge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Aujourd'hui
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Collecte - Gîte Les Roses (Airbnb)</span>
                            <span className="text-blue-600">10h-12h</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Livraison - Villa Océan (Airbnb)</span>
                            <span className="text-blue-600">16h-18h</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-medium text-green-800 mb-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Demain
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Collecte - Maison du Port (Booking)</span>
                            <span className="text-green-600">09h-11h</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Livraison - Cottage Baie (Airbnb)</span>
                            <span className="text-green-600">14h-16h</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-2">Actions automatiques</h4>
                        <div className="space-y-2 text-sm text-orange-700">
                          <p>✅ Collecte automatique programmée 2h avant chaque arrivée</p>
                          <p>✅ Livraison automatique 1h avant check-in</p>
                          <p>✅ Notifications envoyées aux voyageurs</p>
                        </div>
                      </div>

                      <Button className="w-full">
                        <Package className="h-4 w-4 mr-2" />
                        Programmer une collecte manuelle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
