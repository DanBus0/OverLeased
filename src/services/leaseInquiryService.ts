import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export interface LeaseInquiry {
  id: string;
  email: string;
  first_name: string;
  license_plate: string;
  current_mileage: number;
  zip_code?: string;
  vehicle_condition?: string;
  created_at: string;
  updated_at: string;
}

export const leaseInquiryService = {
  async createLeaseInquiry(inquiry: {
    first_name: string;
    email: string;
    license_plate: string;
    current_mileage: number;
    zip_code?: string;
    vehicle_condition?: string;
  }) {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .insert([inquiry])
      .select()
      .single();

    if (error) throw error;
    return data as LeaseInquiry;
  },

  async getLeaseInquiries() {
    const { data, error } = await supabase
      .from('lease_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as LeaseInquiry[];
  }
};
