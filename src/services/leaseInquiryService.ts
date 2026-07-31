import { supabase } from "@/integrations/supabase/client";

export interface LeaseInquiry {
  email: string;
  year: string;
  make: string;
  model: string;
  current_mileage: number;
  zip_code: string;
  payment_status?: string;
  payment_intent_id?: string;
  amount_paid?: number;
}

export const saveLeaseInquiry = async (inquiry: LeaseInquiry) => {
  const { data, error } = await supabase
    .from("lease_review_leads")
    .insert([inquiry])
    .select();

  if (error) {
    console.error("Error saving lease inquiry:", error);
    throw error;
  }

  return data;
};