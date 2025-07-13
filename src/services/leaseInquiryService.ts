import { supabase } from "@/integrations/supabase/client";

export interface LeaseInquiry {
  id?: string;
  email: string;
  first_name: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_trim?: string;
  vehicle_year?: number;
  license_plate: string;
  vehicle_state: string;
  zip_code?: string;
  current_mileage: number;
  annual_mileage_allowance: number;
  months_remaining: number;
  lease_term: number;
  estimated_equity?: number;
  market_value?: number;
  payoff_amount?: number;
  is_positive_equity?: boolean;
  dealer_interest?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LeaseInquiryUpdate {
  estimated_equity?: number;
  market_value?: number;
  payoff_amount?: number;
  is_positive_equity?: boolean;
  dealer_interest?: string;
}

export const leaseInquiryService = {
  async createInquiry(inquiry: LeaseInquiry): Promise<LeaseInquiry> {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .insert([
        {
          email: inquiry.email,
          first_name: inquiry.first_name,
          vehicle_make: inquiry.vehicle_make,
          vehicle_model: inquiry.vehicle_model,
          vehicle_trim: inquiry.vehicle_trim,
          vehicle_year: inquiry.vehicle_year,
          license_plate: inquiry.license_plate,
          vehicle_state: inquiry.vehicle_state,
          zip_code: inquiry.zip_code,
          current_mileage: inquiry.current_mileage,
          annual_mileage_allowance: inquiry.annual_mileage_allowance,
          months_remaining: inquiry.months_remaining,
          lease_term: inquiry.lease_term,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating lease inquiry:', error);
      throw new Error(`Failed to create lease inquiry: ${error.message}`);
    }

    return data;
  },

  async updateInquiryWithResults(id: string, results: LeaseInquiryUpdate): Promise<LeaseInquiry> {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .update({
        estimated_equity: results.estimated_equity,
        market_value: results.market_value,
        payoff_amount: results.payoff_amount,
        is_positive_equity: results.is_positive_equity,
        dealer_interest: results.dealer_interest,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lease inquiry:', error);
      throw new Error(`Failed to update lease inquiry: ${error.message}`);
    }

    return data;
  },

  async getInquiry(id: string): Promise<LeaseInquiry | null> {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching lease inquiry:', error);
      return null;
    }

    return data;
  },

  async getAllInquiries(): Promise<LeaseInquiry[]> {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching lease inquiries:', error);
      throw new Error(`Failed to fetch lease inquiries: ${error.message}`);
    }

    return data || [];
  }
};

export default leaseInquiryService;
