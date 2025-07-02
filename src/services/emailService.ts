import type { FunctionsError } from "@supabase/supabase-js";

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

// Define a more specific type for the expected data from a successful function call
interface SendEmailFunctionSuccessData {
  status?: string; // Example: "success" or "failed"
  message?: string; // Example: "Email sent successfully"
  messageId?: string; // Example: ID from the email provider
  // If the function can return other dynamic properties, we can allow them:
  [key: string]: unknown; // Allows other properties but prefers known ones
}

// Define the return type for the emailService.sendEmail method
interface EmailServiceResponse {
  success: boolean;
  data?: SendEmailFunctionSuccessData | null;
  error?: FunctionsError | Error | null;
  message?: string;
}

export const emailService = {
  async sendEmail(data: EmailData): Promise<EmailServiceResponse> {
    try {
      // Add more detailed logging for debugging
      console.log('Attempting to send email via Supabase function...');
      console.log('Email data:', { to: data.to, subject: data.subject });
      
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request to send-email function timed out after 15 seconds.')), 15000);
      });

      const payload = {
        to: data.to,
        subject: data.subject,
        html: data.body
      };

      console.log('Calling function URL directly:', 'https://nbxdfscgwnpqxigocgck.supabase.co/functions/v1/send-email');
      console.log('Payload:', payload);

      const fetchPromise = fetch('https://nbxdfscgwnpqxigocgck.supabase.co/functions/v1/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
        },
        body: JSON.stringify(payload)
      });

      console.log('Making HTTP request to Supabase function...');
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      console.log('HTTP response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP request failed:', response.status, errorText);
        return { 
          success: false, 
          error: new Error(`HTTP ${response.status}: ${errorText}`), 
          message: `Request failed with status ${response.status}` 
        };
      }

      const result = await response.json();
      console.log('Function response:', result);
      
      console.log('Email sent successfully via Supabase function');
      return { success: true, data: result, message: "Email request processed successfully by function." };

    } catch (error: unknown) { 
      // Enhanced error logging
      console.error('Critical error in emailService.sendEmail:', error);
      
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        // Check for specific network errors
        if (error.message.includes('Failed to fetch')) {
          console.error('Network fetch failed - this usually means the Supabase function is not deployed or accessible');
          return { 
            success: false, 
            error: error, 
            message: 'Unable to connect to email service. The function may not be deployed.' 
          };
        }
        
        if (error.message.includes('timeout')) {
          return { 
            success: false, 
            error: error, 
            message: 'Request timed out. Please try again.' 
          };
        }

        if (error.message.includes('Function not found')) {
          console.error('Supabase function "send-email" not found - it may not be deployed');
          return { 
            success: false, 
            error: error, 
            message: 'Email function not found. Please check if the function is deployed.' 
          };
        }
      }
      
      let errorMessage = 'Failed to send email due to an unexpected error.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return { success: false, error: error instanceof Error ? error : new Error(String(error)), message: errorMessage };
    }
  }
};

export default emailService;
