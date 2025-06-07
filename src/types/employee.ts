
export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  status: 'pending' | 'in_progress' | 'washing' | 'drying' | 'ironing' | 'ready' | 'delivered' | 'completed';
  total_amount: number | null;
  pickup_date: string | null;
  delivery_date: string | null;
  special_instructions: string | null;
  assigned_employee: string | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
    company: string | null;
  };
}

export interface OrderItem {
  id: string;
  order_id: string;
  item_type: string;
  quantity: number;
  unit_price: number | null;
  description: string | null;
  status: 'pending' | 'washing' | 'drying' | 'ironing' | 'ready';
  created_at: string;
  updated_at: string;
}

export interface DeliveryRoute {
  id: string;
  route_name: string;
  driver_id: string | null;
  route_date: string;
  status: 'planned' | 'in_progress' | 'completed';
  estimated_duration: string | null;
  actual_duration: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductionSchedule {
  id: string;
  order_item_id: string;
  machine_type: 'washing' | 'drying' | 'ironing';
  scheduled_start: string;
  scheduled_end: string;
  actual_start: string | null;
  actual_end: string | null;
  assigned_employee: string | null;
  status: 'scheduled' | 'in_progress' | 'completed' | 'delayed';
  created_at: string;
  updated_at: string;
}
