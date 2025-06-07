
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
  AlertTriangle
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
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

  // Récupérer les événements pour la date sélectionnée
  const selectedDateEvents = events?.filter(event => {
    const eventStart = parseISO(event.start_date);
    const eventEnd = parseISO(event.end_date);
    
    return (
      isSameDay(eventStart, selectedDate) ||
      isSameDay(eventEnd, selectedDate) ||
      (eventStart <= selectedDate && eventEnd >= selectedDate)
    );
  }) || [];

  // Obtenir les jours avec des événements pour le calendrier
  const daysWithEvents = events?.reduce((acc, event) => {
    const eventDate = parseISO(event.start_date);
    const dateKey = format(eventDate, 'yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
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

  const getEventTypeColor = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('check-in') || titleLower.includes('arrivée')) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    if (titleLower.includes('check-out') || titleLower.includes('départ')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (titleLower.includes('blocked') || titleLower.includes('bloqué')) {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const formatTime = (dateString: string, allDay: boolean) => {
    if (allDay) return 'Toute la journée';
    return format(parseISO(dateString), 'HH:mm', { locale: fr });
  };

  const getOptimalDeliveryTime = (events: CalendarEvent[]) => {
    // Logique simple pour suggérer un créneau de livraison
    const checkOuts = events.filter(e => 
      e.title.toLowerCase().includes('check-out') || 
      e.title.toLowerCase().includes('départ')
    );
    
    const checkIns = events.filter(e => 
      e.title.toLowerCase().includes('check-in') || 
      e.title.toLowerCase().includes('arrivée')
    );

    if (checkOuts.length > 0 && checkIns.length > 0) {
      const latestCheckOut = Math.max(...checkOuts.map(e => parseISO(e.end_date).getTime()));
      const earliestCheckIn = Math.min(...checkIns.map(e => parseISO(e.start_date).getTime()));
      
      if (earliestCheckIn > latestCheckOut) {
        return {
          suggestion: `Entre ${format(latestCheckOut, 'HH:mm')} et ${format(earliestCheckIn, 'HH:mm')}`,
          type: 'optimal'
        };
      }
    }

    return {
      suggestion: 'Aucun créneau optimal détecté',
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

              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#145587] rounded"></div>
                  <span>Jours avec événements</span>
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
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event.title)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
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
                  ))}

                  {/* Suggestion de livraison */}
                  {selectedDateEvents.length > 0 && (
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Package className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-800">Suggestion de livraison</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              {getOptimalDeliveryTime(selectedDateEvents).suggestion}
                            </p>
                            {getOptimalDeliveryTime(selectedDateEvents).type === 'warning' && (
                              <div className="flex items-center mt-2 text-sm text-yellow-600">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Contactez votre gestionnaire pour optimiser ce créneau
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      {events && events.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
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
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {events.filter(e => e.title.toLowerCase().includes('check-in')).length}
                  </p>
                  <p className="text-sm text-gray-600">Arrivées</p>
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
                  <p className="text-sm text-gray-600">Jours avec livraisons</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
