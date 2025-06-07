
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  Package,
  AlertTriangle,
  LogIn,
  LogOut,
  Clock3
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, isWithinInterval } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string | null;
  all_day: boolean;
  status: string;
  integration_id: string;
  calendar_integrations: {
    name: string;
  };
}

interface EventAnalysis {
  type: 'check-in' | 'check-out' | 'blocked' | 'other';
  isStart: boolean;
  isEnd: boolean;
}

export const CalendarView = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Récupérer les événements du calendrier
  const { data: events, isLoading } = useQuery({
    queryKey: ['calendar-events', format(currentMonth, 'yyyy-MM')],
    queryFn: async () => {
      const startDate = startOfMonth(currentMonth);
      const endDate = endOfMonth(currentMonth);

      const { data, error } = await supabase
        .from('calendar_events')
        .select(`
          *,
          calendar_integrations (
            name
          )
        `)
        .gte('start_date', startDate.toISOString())
        .lte('end_date', endDate.toISOString())
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data as CalendarEvent[];
    },
    enabled: !!user
  });

  // Analyser le type d'événement
  const analyzeEvent = (event: CalendarEvent): EventAnalysis => {
    const title = event.title.toLowerCase();
    const description = (event.description || '').toLowerCase();
    const combined = `${title} ${description}`;
    
    const isSelectedDate = isSameDay(parseISO(event.start_date), selectedDate) || 
                          isSameDay(parseISO(event.end_date), selectedDate);
    
    // Mots-clés élargis pour la détection
    const checkInKeywords = ['check-in', 'checkin', 'arrivée', 'arrival', 'début', 'start', 'entrée', 'réservé pour'];
    const checkOutKeywords = ['check-out', 'checkout', 'départ', 'departure', 'fin', 'end', 'sortie', 'libération'];
    const blockedKeywords = ['blocked', 'bloqué', 'maintenance', 'indisponible', 'unavailable', 'fermé'];
    
    let type: 'check-in' | 'check-out' | 'blocked' | 'other' = 'other';
    
    if (checkInKeywords.some(keyword => combined.includes(keyword))) {
      type = 'check-in';
    } else if (checkOutKeywords.some(keyword => combined.includes(keyword))) {
      type = 'check-out';
    } else if (blockedKeywords.some(keyword => combined.includes(keyword))) {
      type = 'blocked';
    }
    
    // Analyser si c'est le début ou la fin de l'événement pour la date sélectionnée
    const eventStart = parseISO(event.start_date);
    const eventEnd = parseISO(event.end_date);
    const isStart = isSameDay(eventStart, selectedDate);
    const isEnd = isSameDay(eventEnd, selectedDate);
    
    return { type, isStart, isEnd };
  };

  // Récupérer les événements pour la date sélectionnée
  const selectedDateEvents = events?.filter(event => {
    const eventStart = parseISO(event.start_date);
    const eventEnd = parseISO(event.end_date);
    
    return (
      isSameDay(eventStart, selectedDate) ||
      isSameDay(eventEnd, selectedDate) ||
      isWithinInterval(selectedDate, { start: eventStart, end: eventEnd })
    );
  }).sort((a, b) => parseISO(a.start_date).getTime() - parseISO(b.start_date).getTime()) || [];

  // Obtenir les jours avec des événements pour le calendrier
  const daysWithEvents = events?.reduce((acc, event) => {
    const eventStart = parseISO(event.start_date);
    const eventEnd = parseISO(event.end_date);
    
    // Ajouter tous les jours de l'événement
    const days = eachDayOfInterval({ start: eventStart, end: eventEnd });
    days.forEach(day => {
      const dateKey = format(day, 'yyyy-MM-dd');
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
    });
    
    return acc;
  }, {} as Record<string, CalendarEvent[]>) || {};

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const getEventTypeColor = (event: CalendarEvent, analysis: EventAnalysis) => {
    const { type } = analysis;
    
    switch (type) {
      case 'check-in':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'check-out':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'blocked':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getEventIcon = (analysis: EventAnalysis) => {
    const { type, isStart, isEnd } = analysis;
    
    if (type === 'check-in' || (isStart && type === 'other')) {
      return <LogIn className="h-4 w-4" />;
    } else if (type === 'check-out' || (isEnd && type === 'other')) {
      return <LogOut className="h-4 w-4" />;
    } else if (type === 'blocked') {
      return <AlertTriangle className="h-4 w-4" />;
    }
    return <Clock3 className="h-4 w-4" />;
  };

  const getEventLabel = (event: CalendarEvent, analysis: EventAnalysis) => {
    const { isStart, isEnd, type } = analysis;
    
    if (isStart && isEnd) {
      return 'DÉBUT & FIN';
    } else if (isStart) {
      return type === 'check-in' ? 'DÉBUT' : 'DÉBUT';
    } else if (isEnd) {
      return type === 'check-out' ? 'FIN' : 'FIN';
    }
    return 'EN COURS';
  };

  const formatTime = (dateString: string, allDay: boolean) => {
    if (allDay) return 'Toute la journée';
    return format(parseISO(dateString), 'HH:mm', { locale: fr });
  };

  const getOptimalDeliveryTime = (events: CalendarEvent[]) => {
    if (events.length === 0) {
      return {
        suggestion: 'Journée libre - Idéal pour les livraisons',
        type: 'optimal'
      };
    }

    // Analyser les événements avec la nouvelle logique
    const analyzedEvents = events.map(event => ({
      event,
      analysis: analyzeEvent(event)
    }));

    const checkOuts = analyzedEvents.filter(({ analysis }) => 
      analysis.type === 'check-out' || analysis.isEnd
    );
    
    const checkIns = analyzedEvents.filter(({ analysis }) => 
      analysis.type === 'check-in' || analysis.isStart
    );

    // Si on a des départs et des arrivées
    if (checkOuts.length > 0 && checkIns.length > 0) {
      const latestCheckOut = Math.max(...checkOuts.map(({ event }) => parseISO(event.end_date).getTime()));
      const earliestCheckIn = Math.min(...checkIns.map(({ event }) => parseISO(event.start_date).getTime()));
      
      const timeDiff = earliestCheckIn - latestCheckOut;
      
      if (timeDiff > 3600000) { // Plus d'1 heure de différence
        return {
          suggestion: `Créneau optimal entre ${format(latestCheckOut, 'HH:mm')} et ${format(earliestCheckIn, 'HH:mm')}`,
          type: 'optimal'
        };
      }
    }

    // Si seulement des départs
    if (checkOuts.length > 0 && checkIns.length === 0) {
      const latestCheckOut = Math.max(...checkOuts.map(({ event }) => parseISO(event.end_date).getTime()));
      return {
        suggestion: `Livraison possible après ${format(latestCheckOut, 'HH:mm')}`,
        type: 'good'
      };
    }

    // Si seulement des arrivées
    if (checkIns.length > 0 && checkOuts.length === 0) {
      const earliestCheckIn = Math.min(...checkIns.map(({ event }) => parseISO(event.start_date).getTime()));
      return {
        suggestion: `Livraison possible avant ${format(earliestCheckIn, 'HH:mm')}`,
        type: 'good'
      };
    }

    // Analyser les créneaux libres entre les événements
    const sortedEvents = events.sort((a, b) => parseISO(a.start_date).getTime() - parseISO(b.start_date).getTime());
    
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      const currentEnd = parseISO(sortedEvents[i].end_date);
      const nextStart = parseISO(sortedEvents[i + 1].start_date);
      const gap = nextStart.getTime() - currentEnd.getTime();
      
      if (gap > 7200000) { // Plus de 2 heures
        return {
          suggestion: `Créneau disponible entre ${format(currentEnd, 'HH:mm')} et ${format(nextStart, 'HH:mm')}`,
          type: 'optimal'
        };
      }
    }

    return {
      suggestion: 'Journée chargée - Contactez votre gestionnaire pour optimiser',
      type: 'warning'
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#145587]"></div>
        <span className="ml-2">Chargement du calendrier...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Vue Calendrier
          </CardTitle>
          <CardDescription>
            Visualisez vos réservations et optimisez vos créneaux de livraison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calendrier */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                </h3>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                locale={fr}
                className="rounded-md border"
                modifiers={{
                  hasEvents: (date) => {
                    const dateKey = format(date, 'yyyy-MM-dd');
                    return !!daysWithEvents[dateKey];
                  }
                }}
                modifiersStyles={{
                  hasEvents: {
                    backgroundColor: '#145587',
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }}
              />

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#145587] rounded"></div>
                  <span>Jours avec événements</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Arrivées</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Départs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span>Bloqué</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Événements du jour sélectionné */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
              </h3>

              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Aucun événement prévu</p>
                  <p className="text-sm">Créneau libre pour les livraisons</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => {
                    const analysis = analyzeEvent(event);
                    return (
                      <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event, analysis)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              {getEventIcon(analysis)}
                              <h4 className="font-medium">{event.title}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {getEventLabel(event, analysis)}
                              </Badge>
                            </div>
                            
                            {event.description && (
                              <p className="text-sm opacity-75 mt-1">{event.description}</p>
                            )}
                            
                            <div className="flex items-center space-x-4 mt-2 text-sm">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTime(event.start_date, event.all_day)}
                                {!event.all_day && ` - ${formatTime(event.end_date, event.all_day)}`}
                              </div>
                              
                              {event.location && (
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                            
                            <Badge variant="outline" className="mt-2 text-xs">
                              {event.calendar_integrations.name}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Suggestion de livraison améliorée */}
                  <Card className={`${
                    getOptimalDeliveryTime(selectedDateEvents).type === 'optimal' 
                      ? 'bg-green-50 border-green-200' 
                      : getOptimalDeliveryTime(selectedDateEvents).type === 'good'
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Package className={`h-5 w-5 mt-0.5 ${
                          getOptimalDeliveryTime(selectedDateEvents).type === 'optimal' 
                            ? 'text-green-600' 
                            : getOptimalDeliveryTime(selectedDateEvents).type === 'good'
                            ? 'text-blue-600'
                            : 'text-yellow-600'
                        }`} />
                        <div>
                          <h4 className={`font-medium ${
                            getOptimalDeliveryTime(selectedDateEvents).type === 'optimal' 
                              ? 'text-green-800' 
                              : getOptimalDeliveryTime(selectedDateEvents).type === 'good'
                              ? 'text-blue-800'
                              : 'text-yellow-800'
                          }`}>
                            Suggestion de livraison
                          </h4>
                          <p className={`text-sm mt-1 ${
                            getOptimalDeliveryTime(selectedDateEvents).type === 'optimal' 
                              ? 'text-green-700' 
                              : getOptimalDeliveryTime(selectedDateEvents).type === 'good'
                              ? 'text-blue-700'
                              : 'text-yellow-700'
                          }`}>
                            {getOptimalDeliveryTime(selectedDateEvents).suggestion}
                          </p>
                          {getOptimalDeliveryTime(selectedDateEvents).type === 'warning' && (
                            <div className="flex items-center mt-2 text-sm text-yellow-600">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Optimisation recommandée
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      {events && events.length > 0 && (
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-8 w-8 text-[#145587]" />
                <div>
                  <p className="text-2xl font-bold text-[#145587]">{events.length}</p>
                  <p className="text-sm text-gray-600">Événements ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <LogIn className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {events.filter(e => {
                      const analysis = analyzeEvent(e);
                      return analysis.type === 'check-in' || analysis.isStart;
                    }).length}
                  </p>
                  <p className="text-sm text-gray-600">Arrivées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <LogOut className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {events.filter(e => {
                      const analysis = analyzeEvent(e);
                      return analysis.type === 'check-out' || analysis.isEnd;
                    }).length}
                  </p>
                  <p className="text-sm text-gray-600">Départs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {Object.keys(daysWithEvents).length}
                  </p>
                  <p className="text-sm text-gray-600">Jours avec événements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
