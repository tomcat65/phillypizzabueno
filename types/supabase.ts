export type Database = {
  public: {
    Tables: {
      menu_categories: {
        Row: {
          id: string;
          name: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          display_order: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          description: string;
          base_price: number;
          image_url: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          description: string;
          base_price: number;
          image_url: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          description?: string;
          base_price?: number;
          image_url?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      pizza_sizes: {
        Row: {
          id: string;
          name: string;
          size_inches: number;
          price_multiplier: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          size_inches: number;
          price_multiplier: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          size_inches?: number;
          price_multiplier?: number;
          created_at?: string;
        };
      };
      toppings: {
        Row: {
          id: string;
          name: string;
          price: number;
          category: "meat" | "veggie" | "cheese";
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          category: "meat" | "veggie" | "cheese";
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          category?: "meat" | "veggie" | "cheese";
          is_active?: boolean;
          created_at?: string;
        };
      };
      wing_types: {
        Row: {
          id: string;
          name: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          created_at?: string;
        };
      };
      wing_quantities: {
        Row: {
          id: string;
          pieces: number;
          price: number;
          max_sauces: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          pieces: number;
          price: number;
          max_sauces: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          pieces?: number;
          price?: number;
          max_sauces?: number;
          created_at?: string;
        };
      };
      wing_sauces: {
        Row: {
          id: string;
          name: string;
          description: string;
          heat_level: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          heat_level: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          heat_level?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          status:
            | "pending"
            | "confirmed"
            | "preparing"
            | "ready"
            | "completed"
            | "cancelled";
          total_amount: number;
          special_instructions: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          status?:
            | "pending"
            | "confirmed"
            | "preparing"
            | "ready"
            | "completed"
            | "cancelled";
          total_amount: number;
          special_instructions?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          status?:
            | "pending"
            | "confirmed"
            | "preparing"
            | "ready"
            | "completed"
            | "cancelled";
          total_amount?: number;
          special_instructions?: string | null;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          item_type: "pizza" | "wings" | "sides" | "beverages";
          item_id: string;
          quantity: number;
          unit_price: number;
          customizations: Record<string, any>;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          item_type: "pizza" | "wings" | "sides" | "beverages";
          item_id: string;
          quantity: number;
          unit_price: number;
          customizations?: Record<string, any>;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          item_type?: "pizza" | "wings" | "sides" | "beverages";
          item_id?: string;
          quantity?: number;
          unit_price?: number;
          customizations?: Record<string, any>;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "customer" | "staff" | "admin";
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: "customer" | "staff" | "admin";
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "customer" | "staff" | "admin";
          created_at?: string;
        };
      };
    };
    Views: {
      menu_system_overview: {
        Row: {
          category_name: string;
          item_name: string;
          base_price: number;
          is_active: boolean;
        };
      };
      current_pricing_overview: {
        Row: {
          item_type: string;
          item_name: string;
          price: number;
          size?: string;
        };
      };
    };
  };
};
