
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          company: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      member_profiles: {
        Row: {
          id: string;
          user_id: string;
          profile_type: string;
          number_of_properties: number;
          total_capacity: number;
          location: string;
          description: string | null;
          delivery_delay: string;
          services: string[];
          special_requests: string | null;
          status: string;
          position: number | null;
          registration_date: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          profile_type: string;
          number_of_properties?: number;
          total_capacity?: number;
          location: string;
          description?: string | null;
          delivery_delay?: string;
          services?: string[];
          special_requests?: string | null;
          status?: string;
          position?: number | null;
          registration_date?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          profile_type?: string;
          number_of_properties?: number;
          total_capacity?: number;
          location?: string;
          description?: string | null;
          delivery_delay?: string;
          services?: string[];
          special_requests?: string | null;
          status?: string;
          position?: number | null;
          registration_date?: string;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: 'admin' | 'member';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role?: 'admin' | 'member';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'admin' | 'member';
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          read: boolean;
          sent_at: string;
          target_audience: any;
          message_type: string;
          image_url: string | null;
          action_url: string | null;
          status: string;
          scheduled_for: string | null;
          created_by: string | null;
          priority: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          read?: boolean;
          sent_at?: string;
          target_audience?: any;
          message_type?: string;
          image_url?: string | null;
          action_url?: string | null;
          status?: string;
          scheduled_for?: string | null;
          created_by?: string | null;
          priority?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          read?: boolean;
          sent_at?: string;
          target_audience?: any;
          message_type?: string;
          image_url?: string | null;
          action_url?: string | null;
          status?: string;
          scheduled_for?: string | null;
          created_by?: string | null;
          priority?: number;
        };
      };
      calendar_integrations: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          ical_url: string;
          sync_enabled: boolean;
          last_sync_at: string | null;
          sync_status: string;
          sync_error: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          ical_url: string;
          sync_enabled?: boolean;
          last_sync_at?: string | null;
          sync_status?: string;
          sync_error?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          ical_url?: string;
          sync_enabled?: boolean;
          last_sync_at?: string | null;
          sync_status?: string;
          sync_error?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      calendar_events: {
        Row: {
          id: string;
          integration_id: string;
          user_id: string;
          external_id: string;
          title: string;
          description: string | null;
          start_date: string;
          end_date: string;
          location: string | null;
          all_day: boolean;
          recurrence_rule: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          integration_id: string;
          user_id: string;
          external_id: string;
          title: string;
          description?: string | null;
          start_date: string;
          end_date: string;
          location?: string | null;
          all_day?: boolean;
          recurrence_rule?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          integration_id?: string;
          user_id?: string;
          external_id?: string;
          title?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string;
          location?: string | null;
          all_day?: boolean;
          recurrence_rule?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      insert_member_with_position: {
        Args: {
          p_user_id: string;
          p_profile_type: string;
          p_location: string;
          p_delivery_delay: string;
          p_services: string[];
          p_number_of_properties?: number;
          p_total_capacity?: number;
          p_description?: string;
          p_special_requests?: string;
        };
        Returns: {
          id: string;
          position: number;
        }[];
      };
      reorganize_waiting_list_positions: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      send_notification_to_audience: {
        Args: {
          p_title: string;
          p_message: string;
          p_message_type?: string;
          p_target_audience?: any;
          p_image_url?: string;
          p_action_url?: string;
          p_created_by?: string;
        };
        Returns: number;
      };
      sync_calendar_integration: {
        Args: { integration_id: string };
        Returns: undefined;
      };
    };
  };
}
