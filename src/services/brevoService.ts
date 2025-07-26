
import { supabase } from "@/integrations/supabase/client";

export interface BrevoContactData {
  email: string;
  first_name: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
}

export interface BrevoResponse {
  success: boolean;
  message: string;
  brevo_response?: unknown;
  error?: string;
  details?: unknown;
}

export const brevoService = {
  async addContactToBrevo(contactData: BrevoContactData): Promise<BrevoResponse> {
    try {
      console.log("Calling Brevo Edge Function with ", contactData);
      
      const { data, error } = await supabase.functions.invoke("add-to-brevo", {
        body: contactData
      });

      if (error) {
        console.error("Error calling Brevo Edge Function:", error);
        throw new Error(`Failed to call Brevo service: ${error.message}`);
      }

      console.log("Brevo Edge Function response:", data);
      return data as BrevoResponse;

    } catch (error) {
      console.error("Error in brevoService.addContactToBrevo:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Failed to add contact to Brevo: ${errorMessage}`,
        error: "Failed to add contact to Brevo",
        details: errorMessage,
      };
    }
  }
};

export default brevoService;
