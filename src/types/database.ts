
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
  };
}
