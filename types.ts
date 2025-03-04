export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      base_pizzas: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          menu_item_id: string | null
          modified_at: string | null
          modified_by: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          menu_item_id?: string | null
          modified_at?: string | null
          modified_by?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          menu_item_id?: string | null
          modified_at?: string | null
          modified_by?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "base_pizzas_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_pizzas_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "special_menu_items"
            referencedColumns: ["item_id"]
          },
        ]
      }
      beverages: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          image_url: string | null
          menu_item_id: string | null
          modified_at: string | null
          modified_by: string | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          menu_item_id?: string | null
          modified_at?: string | null
          modified_by?: string | null
          name: string
          price: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          menu_item_id?: string | null
          modified_at?: string | null
          modified_by?: string | null
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "beverages_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beverages_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "special_menu_items"
            referencedColumns: ["item_id"]
          },
        ]
      }
      menu_categories: {
        Row: {
          created_at: string | null
          created_by: string | null
          display_order: number
          id: string
          image_url: string | null
          is_active: boolean | null
          modified_at: string | null
          modified_by: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          display_order: number
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          modified_at?: string | null
          modified_by?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          modified_at?: string | null
          modified_by?: string | null
          name?: string
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          allows_sauces: boolean | null
          allows_sides: boolean | null
          allows_toppings: boolean | null
          base_price: number
          category_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          id: string
          is_available: boolean | null
          max_sauces: number | null
          max_sides: number | null
          modified_at: string | null
          modified_by: string | null
          name: string
          requires_size: boolean | null
        }
        Insert: {
          allows_sauces?: boolean | null
          allows_sides?: boolean | null
          allows_toppings?: boolean | null
          base_price: number
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_available?: boolean | null
          max_sauces?: number | null
          max_sides?: number | null
          modified_at?: string | null
          modified_by?: string | null
          name: string
          requires_size?: boolean | null
        }
        Update: {
          allows_sauces?: boolean | null
          allows_sides?: boolean | null
          allows_toppings?: boolean | null
          base_price?: number
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_available?: boolean | null
          max_sauces?: number | null
          max_sides?: number | null
          modified_at?: string | null
          modified_by?: string | null
          name?: string
          requires_size?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "active_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "menu_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_specials: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          discount_percentage: number | null
          end_date: string
          id: string
          is_active: boolean | null
          menu_item_id: string | null
          name: string
          special_price: number | null
          start_date: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discount_percentage?: number | null
          end_date: string
          id?: string
          is_active?: boolean | null
          menu_item_id?: string | null
          name: string
          special_price?: number | null
          start_date: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          discount_percentage?: number | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          menu_item_id?: string | null
          name?: string
          special_price?: number | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_specials_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_specials_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "special_menu_items"
            referencedColumns: ["item_id"]
          },
        ]
      }
      order_item_wing_sauces: {
        Row: {
          created_at: string | null
          id: string
          order_item_id: string | null
          wing_sauce_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_item_id?: string | null
          wing_sauce_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_item_id?: string | null
          wing_sauce_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_wing_sauces_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_wing_sauces_wing_sauce_id_fkey"
            columns: ["wing_sauce_id"]
            isOneToOne: false
            referencedRelation: "wing_sauces"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item_wing_sides: {
        Row: {
          created_at: string | null
          id: string
          order_item_id: string | null
          wing_side_variant_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_item_id?: string | null
          wing_side_variant_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_item_id?: string | null
          wing_side_variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_wing_sides_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_wing_sides_wing_side_variant_id_fkey"
            columns: ["wing_side_variant_id"]
            isOneToOne: false
            referencedRelation: "wing_side_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          beverage_id: string | null
          created_at: string | null
          id: string
          item_price: number
          item_type: Database["public"]["Enums"]["item_type"]
          order_id: string | null
          pizza_variant_id: string | null
          quantity: number
          side_dish_id: string | null
          side_sauce_id: string | null
          special_instructions: string | null
          wing_style: Database["public"]["Enums"]["wing_style"] | null
          wing_variant_id: string | null
        }
        Insert: {
          beverage_id?: string | null
          created_at?: string | null
          id?: string
          item_price: number
          item_type: Database["public"]["Enums"]["item_type"]
          order_id?: string | null
          pizza_variant_id?: string | null
          quantity: number
          side_dish_id?: string | null
          side_sauce_id?: string | null
          special_instructions?: string | null
          wing_style?: Database["public"]["Enums"]["wing_style"] | null
          wing_variant_id?: string | null
        }
        Update: {
          beverage_id?: string | null
          created_at?: string | null
          id?: string
          item_price?: number
          item_type?: Database["public"]["Enums"]["item_type"]
          order_id?: string | null
          pizza_variant_id?: string | null
          quantity?: number
          side_dish_id?: string | null
          side_sauce_id?: string | null
          special_instructions?: string | null
          wing_style?: Database["public"]["Enums"]["wing_style"] | null
          wing_variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_beverage_id_fkey"
            columns: ["beverage_id"]
            isOneToOne: false
            referencedRelation: "available_beverages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_beverage_id_fkey"
            columns: ["beverage_id"]
            isOneToOne: false
            referencedRelation: "beverages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_pizza_variant_id_fkey"
            columns: ["pizza_variant_id"]
            isOneToOne: false
            referencedRelation: "pizza_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_side_dish_id_fkey"
            columns: ["side_dish_id"]
            isOneToOne: false
            referencedRelation: "side_dishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_side_sauce_id_fkey"
            columns: ["side_sauce_id"]
            isOneToOne: false
            referencedRelation: "side_sauces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_wing_variant_id_fkey"
            columns: ["wing_variant_id"]
            isOneToOne: false
            referencedRelation: "wing_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          created_by: string | null
          customer_name: string
          id: string
          modified_at: string | null
          modified_by: string | null
          phone: string
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          customer_name: string
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          phone: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          customer_name?: string
          id?: string
          modified_at?: string | null
          modified_by?: string | null
          phone?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          user_id?: string | null
        }
        Relationships: []
      }
      pizza_sizes: {
        Row: {
          created_at: string | null
          id: string
          price_modifier: number | null
          size_inches: number
          size_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          price_modifier?: number | null
          size_inches: number
          size_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          price_modifier?: number | null
          size_inches?: number
          size_name?: string | null
        }
        Relationships: []
      }
      pizza_variant_toppings: {
        Row: {
          created_at: string | null
          id: string
          included_quantity: number
          pizza_variant_id: string | null
          topping_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          included_quantity: number
          pizza_variant_id?: string | null
          topping_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          included_quantity?: number
          pizza_variant_id?: string | null
          topping_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pizza_variant_toppings_pizza_variant_id_fkey"
            columns: ["pizza_variant_id"]
            isOneToOne: false
            referencedRelation: "pizza_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pizza_variant_toppings_topping_id_fkey"
            columns: ["topping_id"]
            isOneToOne: false
            referencedRelation: "toppings"
            referencedColumns: ["id"]
          },
        ]
      }
      pizza_variants: {
        Row: {
          base_pizza_id: string | null
          base_price: number
          created_at: string | null
          id: string
          size_id: string | null
        }
        Insert: {
          base_pizza_id?: string | null
          base_price: number
          created_at?: string | null
          id?: string
          size_id?: string | null
        }
        Update: {
          base_pizza_id?: string | null
          base_price?: number
          created_at?: string | null
          id?: string
          size_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pizza_variants_base_pizza_id_fkey"
            columns: ["base_pizza_id"]
            isOneToOne: false
            referencedRelation: "base_pizzas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pizza_variants_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "pizza_sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      side_dishes: {
        Row: {
          base_price: number
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          menu_item_id: string | null
          modified_at: string | null
          modified_by: string | null
          name: string
          size_id: string | null
        }
        Insert: {
          base_price: number
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          menu_item_id?: string | null
          modified_at?: string | null
          modified_by?: string | null
          name: string
          size_id?: string | null
        }
        Update: {
          base_price?: number
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          menu_item_id?: string | null
          modified_at?: string | null
          modified_by?: string | null
          name?: string
          size_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "side_dishes_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "side_dishes_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "special_menu_items"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "side_dishes_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "wing_side_sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      side_sauces: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          image_url: string | null
          modified_at: string | null
          modified_by: string | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          modified_at?: string | null
          modified_by?: string | null
          name: string
          price: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          modified_at?: string | null
          modified_by?: string | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      toppings: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          image_url: string | null
          is_cheese: boolean | null
          modified_at: string | null
          modified_by: string | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_cheese?: boolean | null
          modified_at?: string | null
          modified_by?: string | null
          name: string
          price: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_cheese?: boolean | null
          modified_at?: string | null
          modified_by?: string | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      wing_quantities: {
        Row: {
          base_price: number
          created_at: string | null
          id: string
          max_sauces: number
          max_sides: number
          quantity: number
        }
        Insert: {
          base_price: number
          created_at?: string | null
          id?: string
          max_sauces: number
          max_sides: number
          quantity: number
        }
        Update: {
          base_price?: number
          created_at?: string | null
          id?: string
          max_sauces?: number
          max_sides?: number
          quantity?: number
        }
        Relationships: []
      }
      wing_sauces: {
        Row: {
          calories: number | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          calories?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          calories?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      wing_side_sizes: {
        Row: {
          created_at: string | null
          id: string
          price_modifier: number
          size_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          price_modifier: number
          size_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          price_modifier?: number
          size_name?: string
        }
        Relationships: []
      }
      wing_side_variants: {
        Row: {
          base_price: number
          created_at: string | null
          id: string
          size_id: string | null
          wing_side_id: string | null
        }
        Insert: {
          base_price: number
          created_at?: string | null
          id?: string
          size_id?: string | null
          wing_side_id?: string | null
        }
        Update: {
          base_price?: number
          created_at?: string | null
          id?: string
          size_id?: string | null
          wing_side_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wing_side_variants_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "wing_side_sizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wing_side_variants_wing_side_id_fkey"
            columns: ["wing_side_id"]
            isOneToOne: false
            referencedRelation: "wing_sides"
            referencedColumns: ["id"]
          },
        ]
      }
      wing_sides: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      wing_types: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          menu_item_id: string | null
          name: string
          price_modifier: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          menu_item_id?: string | null
          name: string
          price_modifier: number
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          menu_item_id?: string | null
          name?: string
          price_modifier?: number
        }
        Relationships: [
          {
            foreignKeyName: "wing_types_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wing_types_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "special_menu_items"
            referencedColumns: ["item_id"]
          },
        ]
      }
      wing_variants: {
        Row: {
          created_at: string | null
          final_price: number
          id: string
          quantity_id: string | null
          wing_type_id: string | null
        }
        Insert: {
          created_at?: string | null
          final_price: number
          id?: string
          quantity_id?: string | null
          wing_type_id?: string | null
        }
        Update: {
          created_at?: string | null
          final_price?: number
          id?: string
          quantity_id?: string | null
          wing_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wing_variants_quantity_id_fkey"
            columns: ["quantity_id"]
            isOneToOne: false
            referencedRelation: "wing_quantities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wing_variants_wing_type_id_fkey"
            columns: ["wing_type_id"]
            isOneToOne: false
            referencedRelation: "wing_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_categories: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string | null
          image_url: string | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string | null
          image_url?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string | null
          image_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      active_specials: {
        Row: {
          base_item_name: string | null
          description: string | null
          discount_percentage: number | null
          end_date: string | null
          id: string | null
          name: string | null
          special_price: number | null
          start_date: string | null
        }
        Relationships: []
      }
      available_beverages: {
        Row: {
          description: string | null
          id: string | null
          image_url: string | null
          name: string | null
          price: number | null
        }
        Relationships: []
      }
      current_pricing_overview: {
        Row: {
          base_price: number | null
          item_name: string | null
          item_type: string | null
          size: number | null
          topping_option: string | null
          topping_price: number | null
        }
        Relationships: []
      }
      menu_system_overview: {
        Row: {
          allows_sauces: boolean | null
          allows_toppings: boolean | null
          created_at: string | null
          description: string | null
          has_size_options: boolean | null
          is_available: boolean | null
          item_name: string | null
          menu_category: string | null
          starting_price: number | null
        }
        Relationships: []
      }
      special_menu_items: {
        Row: {
          allows_sauces: boolean | null
          allows_toppings: boolean | null
          base_price: number | null
          category_image: string | null
          category_name: string | null
          description: string | null
          is_available: boolean | null
          item_id: string | null
          item_name: string | null
          max_sauces: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_is_authenticated: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      create_admin_user: {
        Args: {
          user_email: string
          user_password: string
        }
        Returns: string
      }
      get_available_beverages: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          price: number
          image_url: string
          description: string
        }[]
      }
      get_current_pricing_overview: {
        Args: Record<PropertyKey, never>
        Returns: {
          item_type: string
          item_name: string
          size: number
          base_price: number
          topping_option: string
          topping_price: number
        }[]
      }
      get_menu_system_overview: {
        Args: Record<PropertyKey, never>
        Returns: {
          menu_category: string
          item_name: string
          description: string
          starting_price: number
          is_available: boolean
          has_size_options: boolean
          allows_toppings: boolean
          allows_sauces: boolean
          created_at: string
        }[]
      }
      get_tables_and_views: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          table_type: string
        }[]
      }
    }
    Enums: {
      item_type: "pizza" | "wings" | "beverage" | "appetizer" | "side"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "ready"
        | "delivered"
        | "cancelled"
      wing_style: "mixed" | "flats" | "drummettes"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
