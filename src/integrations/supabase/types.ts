export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calendar_events: {
        Row: {
          all_day: boolean
          created_at: string
          description: string | null
          end_date: string
          external_id: string
          id: string
          integration_id: string
          location: string | null
          recurrence_rule: string | null
          start_date: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          all_day?: boolean
          created_at?: string
          description?: string | null
          end_date: string
          external_id: string
          id?: string
          integration_id: string
          location?: string | null
          recurrence_rule?: string | null
          start_date: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          all_day?: boolean
          created_at?: string
          description?: string | null
          end_date?: string
          external_id?: string
          id?: string
          integration_id?: string
          location?: string | null
          recurrence_rule?: string | null
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "calendar_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_integrations: {
        Row: {
          created_at: string
          ical_url: string
          id: string
          last_sync_at: string | null
          name: string
          sync_enabled: boolean
          sync_error: string | null
          sync_status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ical_url: string
          id?: string
          last_sync_at?: string | null
          name: string
          sync_enabled?: boolean
          sync_error?: string | null
          sync_status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ical_url?: string
          id?: string
          last_sync_at?: string | null
          name?: string
          sync_enabled?: boolean
          sync_error?: string | null
          sync_status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      delivery_routes: {
        Row: {
          actual_duration: unknown | null
          created_at: string
          driver_id: string | null
          estimated_duration: unknown | null
          id: string
          route_date: string
          route_name: string
          status: string
          updated_at: string
        }
        Insert: {
          actual_duration?: unknown | null
          created_at?: string
          driver_id?: string | null
          estimated_duration?: unknown | null
          id?: string
          route_date: string
          route_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          actual_duration?: unknown | null
          created_at?: string
          driver_id?: string | null
          estimated_duration?: unknown | null
          id?: string
          route_date?: string
          route_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_routes_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_profiles: {
        Row: {
          delivery_delay: string
          description: string | null
          id: string
          location: string
          number_of_properties: number
          position: number | null
          profile_type: string
          registration_date: string | null
          services: string[]
          special_requests: string | null
          status: string
          total_capacity: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          delivery_delay?: string
          description?: string | null
          id?: string
          location: string
          number_of_properties?: number
          position?: number | null
          profile_type: string
          registration_date?: string | null
          services?: string[]
          special_requests?: string | null
          status?: string
          total_capacity?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          delivery_delay?: string
          description?: string | null
          id?: string
          location?: string
          number_of_properties?: number
          position?: number | null
          profile_type?: string
          registration_date?: string | null
          services?: string[]
          special_requests?: string | null
          status?: string
          total_capacity?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_member_profiles_user_id"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_by: string | null
          id: string
          image_url: string | null
          message: string
          message_type: string | null
          priority: number | null
          read: boolean | null
          scheduled_for: string | null
          sent_at: string | null
          status: string | null
          target_audience: Json | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          message: string
          message_type?: string | null
          priority?: number | null
          read?: boolean | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          target_audience?: Json | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          message?: string
          message_type?: string | null
          priority?: number | null
          read?: boolean | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          target_audience?: Json | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          item_type: string
          order_id: string
          quantity: number
          status: string
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          item_type: string
          order_id: string
          quantity?: number
          status?: string
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          item_type?: string
          order_id?: string
          quantity?: number
          status?: string
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          assigned_employee: string | null
          created_at: string
          customer_id: string
          delivery_date: string | null
          id: string
          order_number: string
          pickup_date: string | null
          special_instructions: string | null
          status: string
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          assigned_employee?: string | null
          created_at?: string
          customer_id: string
          delivery_date?: string | null
          id?: string
          order_number: string
          pickup_date?: string | null
          special_instructions?: string | null
          status?: string
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          assigned_employee?: string | null
          created_at?: string
          customer_id?: string
          delivery_date?: string | null
          id?: string
          order_number?: string
          pickup_date?: string | null
          special_instructions?: string | null
          status?: string
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_assigned_employee_fkey"
            columns: ["assigned_employee"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      production_schedules: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          assigned_employee: string | null
          created_at: string
          id: string
          machine_type: string
          order_item_id: string
          scheduled_end: string
          scheduled_start: string
          status: string
          updated_at: string
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          assigned_employee?: string | null
          created_at?: string
          id?: string
          machine_type: string
          order_item_id: string
          scheduled_end: string
          scheduled_start: string
          status?: string
          updated_at?: string
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          assigned_employee?: string | null
          created_at?: string
          id?: string
          machine_type?: string
          order_item_id?: string
          scheduled_end?: string
          scheduled_start?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "production_schedules_assigned_employee_fkey"
            columns: ["assigned_employee"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "production_schedules_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      route_orders: {
        Row: {
          actual_time: unknown | null
          estimated_time: unknown | null
          id: string
          order_id: string
          route_id: string
          sequence_order: number
        }
        Insert: {
          actual_time?: unknown | null
          estimated_time?: unknown | null
          id?: string
          order_id: string
          route_id: string
          sequence_order: number
        }
        Update: {
          actual_time?: unknown | null
          estimated_time?: unknown | null
          id?: string
          order_id?: string
          route_id?: string
          sequence_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "route_orders_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_orders_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "delivery_routes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      insert_member_with_position: {
        Args: {
          p_user_id: string
          p_profile_type: string
          p_location: string
          p_delivery_delay: string
          p_services: string[]
          p_number_of_properties?: number
          p_total_capacity?: number
          p_description?: string
          p_special_requests?: string
        }
        Returns: {
          id: string
          position: number
        }[]
      }
      reorganize_waiting_list_positions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      send_notification_to_audience: {
        Args: {
          p_title: string
          p_message: string
          p_message_type?: string
          p_target_audience?: Json
          p_image_url?: string
          p_action_url?: string
          p_created_by?: string
        }
        Returns: number
      }
      sync_calendar_integration: {
        Args: { integration_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "member" | "employee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "member", "employee"],
    },
  },
} as const
