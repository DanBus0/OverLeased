import { NextApiRequest, NextApiResponse } from 'next';

function toTitleCase(value: unknown): string {
  const s = typeof value === "string" ? value : String(value || "");
  return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function formatTimestamp(dateString?: string): string {
  const date = dateString ? new Date(dateString) : new Date();
  
  // Format: "October 6, 2025 at 5:50 PM EST"
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
    timeZoneName: 'short'
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const inquiryData = req.body;
    const vehicleConditionDisplay = toTitleCase(inquiryData.vehicle_condition);
    
    const brevoApiKey = process.env.BREVO_API_KEY;
    
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not configured");
      return res.status(503).json({ 
        error: "Email service configuration error",
        code: "config_error" 
      });
    }

    // Use current time if created_at is not provided
    const timestamp = formatTimestamp(inquiryData.created_at);

    const emailSubject = "New Lease Inquiry from OverLeased";
    const emailContent = `
<h2>New Lease Inquiry Submission</h2>
<p><strong>Name:</strong> ${inquiryData.first_name}</p>
<p><strong>Email:</strong> ${inquiryData.email}</p>
<p><strong>Vehicle Make:</strong> ${inquiryData.make || 'Not provided'}</p>
<p><strong>Vehicle Model:</strong> ${inquiryData.model || 'Not provided'}</p>
<p><strong>License Plate:</strong> ${inquiryData.license_plate}</p>
<p><strong>Current Mileage:</strong> ${inquiryData.current_mileage?.toLocaleString() || 'Not provided'}</p>
<p><strong>ZIP Code:</strong> ${inquiryData.zip_code}</p>
<p><strong>Vehicle Condition:</strong> ${vehicleConditionDisplay}</p>
<p><strong>Submitted:</strong> ${timestamp}</p>
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

    // Send email via Brevo
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

      console.error("Brevo API error:", brevoResponse.status, parsedError);

      // Check if it's an IP restriction error
      if (brevoResponse.status === 401 && parsedError.message?.includes("unrecognised IP address")) {
        return res.status(403).json({
          error: "Brevo IP restriction error",
          details: {
            message: parsedError.message,
            code: "ip_restriction"
          }
        });
      }

      return res.status(500).json({
        error: "Failed to send email notification",
        details: {
          message: `Brevo API error: ${brevoResponse.status} - ${errorData}`,
          code: "brevo_error"
        }
      });
    }

    const brevoResult = await brevoResponse.json();
    console.log("Email sent successfully via Brevo:", brevoResult);

    return res.status(200).json({ 
      success: true, 
      message: "Email notification sent successfully",
      data: brevoResult
    });

  } catch (error) {
    console.error("Error in send-lease-notification API:", error);
    
    return res.status(500).json({ 
      error: "Failed to send email notification", 
      details: {
        message: error.message,
        code: "server_error"
      }
    });
  }
}
