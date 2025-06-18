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
      bookings: {
        Row: {
          adults: number | null
          booking_type: string
          check_in_date: string | null
          check_out_date: string | null
          children: number | null
          created_at: string | null
          hotel_id: string | null
          id: string
          notes: string | null
          package_id: string | null
          payment_status: string | null
          provider_id: string | null
          status: string | null
          total_price: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          adults?: number | null
          booking_type: string
          check_in_date?: string | null
          check_out_date?: string | null
          children?: number | null
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          notes?: string | null
          package_id?: string | null
          payment_status?: string | null
          provider_id?: string | null
          status?: string | null
          total_price: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          adults?: number | null
          booking_type?: string
          check_in_date?: string | null
          check_out_date?: string | null
          children?: number | null
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          notes?: string | null
          package_id?: string | null
          payment_status?: string | null
          provider_id?: string | null
          status?: string | null
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      external_listings: {
        Row: {
          city: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          listing_type: string
          name: string
          price_indication: string | null
          provider_name: string
          rating_indication: string | null
          redirect_url: string
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          listing_type: string
          name: string
          price_indication?: string | null
          provider_name: string
          rating_indication?: string | null
          redirect_url: string
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          listing_type?: string
          name?: string
          price_indication?: string | null
          provider_name?: string
          rating_indication?: string | null
          redirect_url?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      flights: {
        Row: {
          aircraft_type: string | null
          airline_name: string
          airline_name_ar: string | null
          arrival_time: string
          available_seats: number | null
          class: string | null
          created_at: string | null
          departure_time: string
          destination: string
          destination_ar: string | null
          flight_number: string
          id: string
          origin: string
          origin_ar: string | null
          price: number
          provider_id: string | null
          total_seats: number | null
          updated_at: string | null
        }
        Insert: {
          aircraft_type?: string | null
          airline_name: string
          airline_name_ar?: string | null
          arrival_time: string
          available_seats?: number | null
          class?: string | null
          created_at?: string | null
          departure_time: string
          destination: string
          destination_ar?: string | null
          flight_number: string
          id?: string
          origin: string
          origin_ar?: string | null
          price: number
          provider_id?: string | null
          total_seats?: number | null
          updated_at?: string | null
        }
        Update: {
          aircraft_type?: string | null
          airline_name?: string
          airline_name_ar?: string | null
          arrival_time?: string
          available_seats?: number | null
          class?: string | null
          created_at?: string | null
          departure_time?: string
          destination?: string
          destination_ar?: string | null
          flight_number?: string
          id?: string
          origin?: string
          origin_ar?: string | null
          price?: number
          provider_id?: string | null
          total_seats?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flights_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_amenities: {
        Row: {
          created_at: string | null
          hotel_id: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_amenities_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_images: {
        Row: {
          created_at: string | null
          hotel_id: string | null
          id: string
          image_url: string
          is_primary: boolean | null
        }
        Insert: {
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          image_url: string
          is_primary?: boolean | null
        }
        Update: {
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "hotel_images_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          address: string
          address_ar: string | null
          city: string
          city_ar: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          distance_to_haram: string | null
          id: string
          name: string
          name_ar: string | null
          price_per_night: number
          provider_id: string | null
          rating: number | null
          thumbnail: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          address_ar?: string | null
          city: string
          city_ar?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          distance_to_haram?: string | null
          id?: string
          name: string
          name_ar?: string | null
          price_per_night: number
          provider_id?: string | null
          rating?: number | null
          thumbnail?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          address_ar?: string | null
          city?: string
          city_ar?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          distance_to_haram?: string | null
          id?: string
          name?: string
          name_ar?: string | null
          price_per_night?: number
          provider_id?: string | null
          rating?: number | null
          thumbnail?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotels_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      package_images: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          is_primary: boolean | null
          package_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          package_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          package_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_images_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          city: string | null
          city_ar: string | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          duration_days: number
          end_date: string | null
          id: string
          includes_flight: boolean | null
          includes_hotel: boolean | null
          includes_transport: boolean | null
          name: string
          name_ar: string | null
          price: number
          provider_id: string | null
          start_date: string | null
          thumbnail: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          city_ar?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          duration_days: number
          end_date?: string | null
          id?: string
          includes_flight?: boolean | null
          includes_hotel?: boolean | null
          includes_transport?: boolean | null
          name: string
          name_ar?: string | null
          price: number
          provider_id?: string | null
          start_date?: string | null
          thumbnail?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          city_ar?: string | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          duration_days?: number
          end_date?: string | null
          id?: string
          includes_flight?: boolean | null
          includes_hotel?: boolean | null
          includes_transport?: boolean | null
          name?: string
          name_ar?: string | null
          price?: number
          provider_id?: string | null
          start_date?: string | null
          thumbnail?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packages_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          preferred_language: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          preferred_language?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          preferred_language?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      providers: {
        Row: {
          company_address: string | null
          company_name: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          company_address?: string | null
          company_name: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          company_address?: string | null
          company_name?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          hotel_id: string | null
          id: string
          package_id: string | null
          rating: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          package_id?: string | null
          rating: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          hotel_id?: string | null
          id?: string
          package_id?: string | null
          rating?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      transport_options: {
        Row: {
          arrival_time: string | null
          available_seats: number | null
          capacity: number | null
          created_at: string | null
          departure_time: string | null
          description: string | null
          description_ar: string | null
          duration_hours: number | null
          from_city: string
          from_city_ar: string | null
          id: string
          name: string
          name_ar: string | null
          price: number
          provider_id: string | null
          thumbnail: string | null
          to_city: string
          to_city_ar: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          arrival_time?: string | null
          available_seats?: number | null
          capacity?: number | null
          created_at?: string | null
          departure_time?: string | null
          description?: string | null
          description_ar?: string | null
          duration_hours?: number | null
          from_city: string
          from_city_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
          price: number
          provider_id?: string | null
          thumbnail?: string | null
          to_city: string
          to_city_ar?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          arrival_time?: string | null
          available_seats?: number | null
          capacity?: number | null
          created_at?: string | null
          departure_time?: string | null
          description?: string | null
          description_ar?: string | null
          duration_hours?: number | null
          from_city?: string
          from_city_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
          price?: number
          provider_id?: string | null
          thumbnail?: string | null
          to_city?: string
          to_city_ar?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transport_options_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
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
          role: Database["public"]["Enums"]["app_role"]
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
      get_admin_dashboard_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_users: number
          total_bookings: number
          total_revenue: number
          total_hotels: number
          total_packages: number
          pending_bookings: number
        }[]
      }
      get_customer_dashboard_stats: {
        Args: { customer_id_arg: string }
        Returns: {
          total_bookings: number
          upcoming_bookings: number
          total_spent: number
          favorite_city: string
        }[]
      }
      get_provider_dashboard_stats: {
        Args: { provider_id_arg: string }
        Returns: {
          total_bookings: number
          pending_bookings: number
          total_revenue: number
          active_listings: number
        }[]
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "provider" | "user"
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
      app_role: ["admin", "provider", "user"],
    },
  },
} as const
