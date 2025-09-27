import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

async function sendBrevoEmail(brevoApiKey: string, emailData: any, retryCount = 0): Promise<any> {
  const maxRetries = 2;
  
  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.text();
      let parsedError;
      
      try {
        parsedError = JSON.parse(errorData);
      } catch {
        parsedError = { message: errorData };
      }

      // Check if it's an IP restriction error
      if (brevoResponse.status === 401 && parsedError.message?.includes("unrecognised IP address")) {
        throw new Error(`BREVO_IP_RESTRICTION: ${parsedError.message}`);
      }

      throw new Error(`Brevo API error: ${brevoResponse.status} - ${errorData}`);
    }

    return await brevoResponse.json();
  } catch (error) {
    // Retry logic for certain errors (not IP restrictions)
    if (retryCount < maxRetries && !error.message.includes("BREVO_IP_RESTRICTION")) {
      console.log(`Retrying Brevo request (attempt ${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return sendBrevoEmail(brevoApiKey, emailData, retryCount + 1);
    }
    throw error;
  }
}

async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const inquiryData = await req.json();
    
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    
    if (!brevoApiKey) {
      throw new Error("BREVO_API_KEY is not configured in Edge Function secrets");
    }

    const emailSubject = "New Lease Inquiry from OverLeased";
    const emailContent = `
<h2>New Lease Inquiry Submission</h2>
<p><strong>Name:</strong> ${inquiryData.first_name}</p>
<p><strong>Email:</strong> ${inquiryData.email}</p>
<p><strong>License Plate:</strong> ${inquiryData.license_plate}</p>
<p><strong>Current Mileage:</strong> ${inquiryData.current_mileage?.toLocaleString() || 'Not provided'}</p>
<p><strong>ZIP Code:</strong> ${inquiryData.zip_code}</p>
<p><strong>Vehicle Condition:</strong> ${inquiryData.vehicle_condition}</p>
<p><strong>Submitted:</strong> ${new Date(inquiryData.created_at).toLocaleString()}</p>
    `.trim();

    const emailData = {
      sender: {
        name: "OverLeased Website",
        email: "noreply@overleased.com"
      },
      to: [
        {
          email: "support@overleased.com",
          name: "OverLeased Support"
        }
      ],
      subject: emailSubject,
      htmlContent: emailContent,
    };

    // Send email via Brevo with improved error handling
    await sendBrevoEmail(brevoApiKey, emailData);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Email notification sent successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in send-lease-inquiry-notification:", error);
    
    let errorMessage = "Failed to send email notification";
    let errorCode = "error";
    let statusCode = 500;

    // Provide specific error messages for common issues
    if (error.message.includes("BREVO_IP_RESTRICTION")) {
      errorMessage = "Brevo IP restriction error";
      errorCode = "ip_restriction";
      statusCode = 403;
    } else if (error.message.includes("BREVO_API_KEY is not configured")) {
      errorMessage = "Email service configuration error";
      errorCode = "config_error";
      statusCode = 503;
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage, 
      details: {
        message: error.message,
        code: errorCode,
        timestamp: new Date().toISOString()
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: statusCode,
    });
  }
}

serve(handler);