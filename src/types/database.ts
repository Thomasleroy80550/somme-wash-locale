

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
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          read?: boolean;
          sent_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          message?: string;
          read?: boolean;
          sent_at?: string;
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
    };
  };
}

