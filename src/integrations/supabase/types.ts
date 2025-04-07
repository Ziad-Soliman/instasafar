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
          city: string
          created_at: string | null
          description: string | null
          distance_to_haram: string | null
          id: string
          name: string
          price_per_night: number
          provider_id: string | null
          rating: number | null
          thumbnail: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          description?: string | null
          distance_to_haram?: string | null
          id?: string
          name: string
          price_per_night: number
          provider_id?: string | null
          rating?: number | null
          thumbnail?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          description?: string | null
          distance_to_haram?: string | null
          id?: string
          name?: string
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
          created_at: string | null
          description: string | null
          duration_days: number
          end_date: string | null
          id: string
          includes_flight: boolean | null
          includes_hotel: boolean | null
          includes_transport: boolean | null
          name: string
          price: number
          provider_id: string | null
          start_date: string | null
          thumbnail: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          description?: string | null
          duration_days: number
          end_date?: string | null
          id?: string
          includes_flight?: boolean | null
          includes_hotel?: boolean | null
          includes_transport?: boolean | null
          name: string
          price: number
          provider_id?: string | null
          start_date?: string | null
          thumbnail?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          description?: string | null
          duration_days?: number
          end_date?: string | null
          id?: string
          includes_flight?: boolean | null
          includes_hotel?: boolean | null
          includes_transport?: boolean | null
          name?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
