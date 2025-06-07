
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ICalEvent {
  uid: string;
  summary: string;
  description?: string;
  dtstart: string;
  dtend: string;
  location?: string;
  rrule?: string;
  status?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get user from JWT token
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('Non autorisé')
    }

    const { integrationId } = await req.json()

    console.log(`Synchronisation du calendrier ${integrationId} pour l'utilisateur ${user.id}`)

    // Récupérer l'intégration
    const { data: integration, error: integrationError } = await supabaseClient
      .from('calendar_integrations')
      .select('*')
      .eq('id', integrationId)
      .eq('user_id', user.id)
      .single()

    if (integrationError || !integration) {
      throw new Error('Intégration calendrier introuvable')
    }

    // Marquer comme en cours de synchronisation
    await supabaseClient.rpc('sync_calendar_integration', { integration_id: integrationId })

    console.log(`Téléchargement du calendrier depuis: ${integration.ical_url}`)

    // Télécharger et parser le fichier iCal
    const icalResponse = await fetch(integration.ical_url)
    if (!icalResponse.ok) {
      throw new Error(`Erreur lors du téléchargement: ${icalResponse.status}`)
    }

    const icalData = await icalResponse.text()
    console.log(`Calendrier téléchargé, taille: ${icalData.length} caractères`)

    // Parser le contenu iCal
    const events = parseICalData(icalData)
    console.log(`${events.length} événements trouvés`)

    // Supprimer les anciens événements de cette intégration
    await supabaseClient
      .from('calendar_events')
      .delete()
      .eq('integration_id', integrationId)

    // Insérer les nouveaux événements
    if (events.length > 0) {
      const eventsToInsert = events.map(event => ({
        integration_id: integrationId,
        user_id: user.id,
        external_id: event.uid,
        title: event.summary || 'Événement sans titre',
        description: event.description || null,
        start_date: event.dtstart,
        end_date: event.dtend,
        location: event.location || null,
        all_day: isAllDayEvent(event.dtstart, event.dtend),
        recurrence_rule: event.rrule || null,
        status: event.status || 'confirmed'
      }))

      const { error: insertError } = await supabaseClient
        .from('calendar_events')
        .insert(eventsToInsert)

      if (insertError) {
        console.error('Erreur insertion événements:', insertError)
        throw new Error('Erreur lors de l\'insertion des événements')
      }
    }

    // Marquer la synchronisation comme réussie
    await supabaseClient
      .from('calendar_integrations')
      .update({ 
        sync_status: 'success',
        last_sync_at: new Date().toISOString(),
        sync_error: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', integrationId)

    console.log(`Synchronisation terminée avec succès: ${events.length} événements`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        eventsCount: events.length,
        message: `${events.length} événements synchronisés avec succès`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Erreur de synchronisation:', error)

    // Marquer l'intégration comme ayant une erreur si possible
    try {
      const { integrationId } = await req.json()
      if (integrationId) {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? ''
        )
        
        await supabaseClient
          .from('calendar_integrations')
          .update({ 
            sync_status: 'error',
            sync_error: error.message,
            updated_at: new Date().toISOString()
          })
          .eq('id', integrationId)
      }
    } catch (updateError) {
      console.error('Erreur lors de la mise à jour du statut:', updateError)
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

function parseICalData(icalData: string): ICalEvent[] {
  const events: ICalEvent[] = []
  const lines = icalData.split('\n').map(line => line.trim())
  
  let currentEvent: Partial<ICalEvent> = {}
  let inEvent = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    if (line === 'BEGIN:VEVENT') {
      inEvent = true
      currentEvent = {}
    } else if (line === 'END:VEVENT' && inEvent) {
      if (currentEvent.uid && currentEvent.dtstart && currentEvent.dtend) {
        events.push(currentEvent as ICalEvent)
      }
      inEvent = false
    } else if (inEvent && line.includes(':')) {
      const colonIndex = line.indexOf(':')
      const property = line.substring(0, colonIndex)
      const value = line.substring(colonIndex + 1)

      // Gérer les propriétés avec des paramètres (ex: DTSTART;VALUE=DATE:20241201)
      const [propName] = property.split(';')
      
      switch (propName) {
        case 'UID':
          currentEvent.uid = value
          break
        case 'SUMMARY':
          currentEvent.summary = decodeICalText(value)
          break
        case 'DESCRIPTION':
          currentEvent.description = decodeICalText(value)
          break
        case 'DTSTART':
          currentEvent.dtstart = parseICalDate(value)
          break
        case 'DTEND':
          currentEvent.dtend = parseICalDate(value)
          break
        case 'LOCATION':
          currentEvent.location = decodeICalText(value)
          break
        case 'RRULE':
          currentEvent.rrule = value
          break
        case 'STATUS':
          currentEvent.status = value.toLowerCase()
          break
      }
    }
  }

  return events
}

function parseICalDate(dateStr: string): string {
  // Format YYYYMMDDTHHMMSS ou YYYYMMDD
  if (dateStr.length === 8) {
    // Date seulement (YYYYMMDD)
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    return `${year}-${month}-${day}T00:00:00Z`
  } else if (dateStr.length >= 15) {
    // Date et heure (YYYYMMDDTHHMMSS)
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)
    const hour = dateStr.substring(9, 11)
    const minute = dateStr.substring(11, 13)
    const second = dateStr.substring(13, 15)
    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
  }
  
  // Fallback: essayer de parser directement
  return new Date(dateStr).toISOString()
}

function decodeICalText(text: string): string {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
}

function isAllDayEvent(startDate: string, endDate: string): boolean {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  // Vérifier si c'est exactement minuit à minuit
  return (
    start.getHours() === 0 && 
    start.getMinutes() === 0 && 
    start.getSeconds() === 0 &&
    end.getHours() === 0 && 
    end.getMinutes() === 0 && 
    end.getSeconds() === 0
  )
}
