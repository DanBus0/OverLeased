import { supabase } from "@/integrations/supabase/client";

export interface LeaseInquiry {
  id?: string;
  email: string;
  first_name: string;
  license_plate: string;
  vehicle_state: string;
  current_mileage: number; // Reverted to number
  annual_mileage_allowance: number; // Reverted to number
  months_remaining: number; // Reverted to number
  lease_term?: number; // Reverted to number and kept optional
  estimated_equity?: number;
  market_value?: number;
  payoff_amount?: number;
  is_positive_equity?: boolean;
  dealer_interest?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LeaseInquiryResult {
  estimatedEquity: number;
  marketValue: number;
  payoffAmount: number;
  isPositiveEquity: boolean;
  dealerInterest: "High" | "Medium" | "Low";
  nextSteps: string[];
}

export const leaseInquiryService = {
  async createInquiry(inquiry: LeaseInquiry): Promise<LeaseInquiry> {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .insert([inquiry])
      .select()
      .single();

    if (error) {
      console.error('Error creating lease inquiry:', error);
      throw new Error('Failed to save lease inquiry');
    }

    return data;
  },

  async updateInquiryWithResults(id: string, results: Partial<LeaseInquiry>): Promise<LeaseInquiry> {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .update({
        ...results,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lease inquiry:', error);
      throw new Error('Failed to update lease inquiry');
    }

    return data;
  },

  async getInquiriesByEmail(email: string): Promise<LeaseInquiry[]> {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching lease inquiries:', error);
      throw new Error('Failed to fetch lease inquiries');
    }

    return data || [];
  },

  async getAllInquiries(): Promise<LeaseInquiry[]> {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all lease inquiries:', error);
      throw new Error('Failed to fetch lease inquiries');
    }

    return data || [];
  }
};

export default leaseInquiryService;
