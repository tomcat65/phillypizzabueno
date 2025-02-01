export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      menu_categories: {
        Row: {
          id: string;
          name: string;
          display_order: number;
          is_active: boolean | null;
          created_at: string | null;
          created_by: string | null;
          modified_at: string | null;
          modified_by: string | null;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          display_order: number;
          is_active?: boolean | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          display_order?: number;
          is_active?: boolean | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
          image_url?: string | null;
        };
      };
      menu_items: {
        Row: {
          id: string;
          category_id: string | null;
          name: string;
          description: string | null;
          base_price: number;
          is_available: boolean | null;
          display_order: number | null;
          requires_size: boolean | null;
          allows_toppings: boolean | null;
          allows_sauces: boolean | null;
          max_sauces: number | null;
          allows_sides: boolean | null;
          max_sides: number | null;
          created_at: string | null;
          created_by: string | null;
          modified_at: string | null;
          modified_by: string | null;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          description?: string | null;
          base_price: number;
          is_available?: boolean | null;
          display_order?: number | null;
          requires_size?: boolean | null;
          allows_toppings?: boolean | null;
          allows_sauces?: boolean | null;
          max_sauces?: number | null;
          allows_sides?: boolean | null;
          max_sides?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          name?: string;
          description?: string | null;
          base_price?: number;
          is_available?: boolean | null;
          display_order?: number | null;
          requires_size?: boolean | null;
          allows_toppings?: boolean | null;
          allows_sauces?: boolean | null;
          max_sauces?: number | null;
          allows_sides?: boolean | null;
          max_sides?: number | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
        };
      };
      pizza_sizes: {
        Row: {
          id: string;
          size_inches: number;
          created_at: string | null;
          size_name: string | null;
          price_modifier: number | null;
        };
        Insert: {
          id?: string;
          size_inches: number;
          created_at?: string | null;
          size_name?: string | null;
          price_modifier?: number | null;
        };
        Update: {
          id?: string;
          size_inches?: number;
          created_at?: string | null;
          size_name?: string | null;
          price_modifier?: number | null;
        };
      };
      toppings: {
        Row: {
          id: string;
          name: string;
          price: number;
          is_cheese: boolean | null;
          image_url: string | null;
          created_at: string | null;
          created_by: string | null;
          modified_at: string | null;
          modified_by: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          is_cheese?: boolean | null;
          image_url?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          is_cheese?: boolean | null;
          image_url?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          modified_at?: string | null;
          modified_by?: string | null;
        };
      };
    };
    Views: {
      active_categories: {
        Row: {
          id: string | null;
          name: string | null;
          display_order: number | null;
          image_url: string | null;
          created_at: string | null;
        };
      };
      menu_system_overview: {
        Row: {
          menu_category: string | null;
          item_name: string | null;
          description: string | null;
          starting_price: number | null;
          is_available: boolean | null;
          has_size_options: boolean | null;
          allows_toppings: boolean | null;
          allows_sauces: boolean | null;
          created_at: string | null;
        };
      };
      special_menu_items: {
        Row: {
          item_id: string | null;
          category_name: string | null;
          item_name: string | null;
          description: string | null;
          base_price: number | null;
          is_available: boolean | null;
          allows_toppings: boolean | null;
          allows_sauces: boolean | null;
          max_sauces: number | null;
          category_image: string | null;
        };
      };
    };
    Functions: {
      get_available_beverages: {
        Args: Record<string, never>;
        Returns: {
          id: string;
          name: string;
          price: number;
          image_url: string | null;
          description: string | null;
        }[];
      };
      get_menu_system_overview: {
        Args: Record<string, never>;
        Returns: {
          menu_category: string | null;
          item_name: string | null;
          description: string | null;
          starting_price: number | null;
          is_available: boolean | null;
          has_size_options: boolean | null;
          allows_toppings: boolean | null;
          allows_sauces: boolean | null;
          created_at: string | null;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
