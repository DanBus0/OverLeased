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
      lease_inquiries: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          license_plate: string;
          vehicle_state: string;
          current_mileage: number;
          annual_mileage_allowance: number;
          months_remaining: number;
          lease_term: number | null;
          estimated_equity: number | null;
          market_value: number | null;
          payoff_amount: number | null;
          is_positive_equity: boolean | null;
          dealer_interest: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string; // Default value in DB
          email: string;
          first_name: string;
          license_plate: string;
          vehicle_state: string;
          current_mileage: number;
          annual_mileage_allowance: number;
          months_remaining: number;
          lease_term?: number | null;
          estimated_equity?: number | null;
          market_value?: number | null;
          payoff_amount?: number | null;
          is_positive_equity?: boolean | null;
          dealer_interest?: string | null;
          created_at?: string; // Default value in DB
          updated_at?: string | null; // Default value in DB
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string;
          license_plate?: string;
          vehicle_state?: string;
          current_mileage?: number;
          annual_mileage_allowance?: number;
          months_remaining?: number;
          lease_term?: number | null;
          estimated_equity?: number | null;
          market_value?: number | null;
          payoff_amount?: number | null;
          is_positive_equity?: boolean | null;
          dealer_interest?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      contact_requests: { // Added contact_requests table definition
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          message: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          message: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          message?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// The following types are helper types and should remain as they are
// if they were previously causing issues due to an empty `Database` definition.
// Now that `Database` is populated, these should work correctly.

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
