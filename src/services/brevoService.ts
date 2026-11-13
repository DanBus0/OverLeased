import { supabase } from "@/integrations/supabase/client";
import axios from "axios";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = "https://api.brevo.com/v3";

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

export interface SendEmailParams {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  sender?: { email: string; name: string };
}

export const sendEmail = async (params: SendEmailParams) => {
  if (!BREVO_API_KEY) {
    console.error("Brevo API key is missing");
    throw new Error("Brevo API key is not configured");
  }

  console.log("=== BREVO EMAIL DEBUG ===");
  console.log("API Key present:", !!BREVO_API_KEY);
  console.log("API Key length:", BREVO_API_KEY?.length);
  console.log("API Key prefix:", BREVO_API_KEY?.substring(0, 15) + "...");
  console.log("Sending email via Brevo to:", params.to.map(t => t.email).join(", "));
  console.log("Email sender:", params.sender || { email: "support@overleased.com", name: "OverLeased" });
  console.log("Email subject:", params.subject);

  try {
    const response = await axios.post(
      `${BREVO_API_URL}/smtp/email`,
      {
        sender: params.sender || {
          email: "support@overleased.com",
          name: "OverLeased",
        },
        to: params.to,
        subject: params.subject,
        htmlContent: params.htmlContent,
      },
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("=== BREVO API ERROR ===");
    console.error("Error message:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Status text:", error.response?.statusText);
    console.error("Brevo error details:", JSON.stringify(error.response?.data, null, 2));
    console.error("Request config:", {
      url: `${BREVO_API_URL}/smtp/email`,
      recipient: params.to.map(t => t.email).join(", "),
      sender: params.sender || { email: "support@overleased.com", name: "OverLeased" },
    });
    throw error;
  }
};

export interface PurchaseConfirmationParams {
  email: string;
  vehicle: {
    year: string;
    make: string;
    model: string;
    trim?: string;
    condition?: string;
    mileage: string;
  };
  amount: number;
  paymentIntentId: string;
}

export interface SupportNotificationParams extends PurchaseConfirmationParams {
  firstName?: string;
  customerGoal?: string;
}

export const sendPurchaseConfirmation = async (params: PurchaseConfirmationParams) => {
  const { email, vehicle, amount, paymentIntentId } = params;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OverLeased Guide is On Its Way!</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; line-height: 1.6;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; text-align: center;">
                    ✓ Purchase Confirmed!
                  </h1>
                  <p style="margin: 12px 0 0; color: #e0e7ff; font-size: 16px; text-align: center;">
                    Your personalized lease exit guide is being prepared
                  </p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  
                  <!-- Greeting -->
                  <p style="margin: 0 0 24px; color: #334155; font-size: 16px;">
                    Thank you for your purchase! We've successfully received your payment and will deliver your comprehensive lease exit guide within <strong>24-48 hours</strong>.
                  </p>
                  
                  <!-- Vehicle Info Card -->
                  <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; border-radius: 8px; padding: 20px; margin: 24px 0;">
                    <h2 style="margin: 0 0 16px; color: #1e293b; font-size: 18px; font-weight: 600;">Vehicle Information</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 40%;">Vehicle:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${vehicle.year} ${vehicle.make} ${vehicle.model}</td>
                      </tr>
                      ${vehicle.trim ? `
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Trim:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${vehicle.trim}</td>
                      </tr>
                      ` : ''}
                      ${vehicle.condition ? `
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Condition:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600; text-transform: capitalize;">${vehicle.condition}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Current Mileage:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${vehicle.mileage} miles</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Guide Email:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Amount Paid:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">$${(amount / 100).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Transaction ID:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 400; font-family: 'Courier New', monospace; font-size: 13px;">${paymentIntentId}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <!-- What's Included -->
                  <div style="margin: 32px 0;">
                    <h2 style="margin: 0 0 16px; color: #1e293b; font-size: 18px; font-weight: 600;">What You'll Receive</h2>
                    <ul style="margin: 0; padding: 0 0 0 20px; color: #334155; font-size: 15px;">
                      <li style="margin-bottom: 12px;"><strong>Your Vehicle's Estimated Market Value</strong> – An estimate based on your vehicle, mileage, condition, and location.</li>
                      <li style="margin-bottom: 12px;"><strong>Five Lease-Exit Methods</strong> – Dealer sell-back, trade-in, buyout, transfer, and formal early termination—explained step by step.</li>
                      <li style="margin-bottom: 12px;"><strong>Scripts, Worksheets and Action Steps</strong> – Know who to call, what to ask, which numbers to compare, and what to do next.</li>
                      <li style="margin-bottom: 12px;"><strong>Personalized Starting Point</strong> – An initial direction based on your vehicle and stated goal.</li>
                      <li style="margin-bottom: 12px;"><strong>Complimentary Payoff Review</strong> – Send us your dealer payoff after receiving the guide (instructions included) and we'll calculate your estimated equity.</li>
                    </ul>
                  </div>
                  
                  <!-- Next Steps -->
                  <div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 24px 0;">
                    <h3 style="margin: 0 0 12px; color: #92400e; font-size: 16px; font-weight: 600;">📋 What Happens Next</h3>
                    <ol style="margin: 0; padding: 0 0 0 20px; color: #78350f; font-size: 14px;">
                      <li style="margin-bottom: 8px;">Our team will analyze your vehicle's lease situation</li>
                      <li style="margin-bottom: 8px;">We'll calculate your equity position and all exit options</li>
                      <li style="margin-bottom: 8px;">Your comprehensive guide will be sent to <strong>${email}</strong> within 24-48 hours</li>
                      <li style="margin-bottom: 8px;">Check your spam/junk folder if you don't see it in your inbox</li>
                    </ol>
                  </div>
                  
                  <!-- Support -->
                  <div style="margin: 32px 0 0; padding: 24px 0 0; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 8px; color: #334155; font-size: 14px;">
                      <strong>Questions or concerns?</strong>
                    </p>
                    <p style="margin: 0; color: #64748b; font-size: 14px;">
                      Contact us at <a href="mailto:support@overleased.com" style="color: #2563eb; text-decoration: none;">support@overleased.com</a>
                    </p>
                  </div>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 40px; background-color: #f8fafc; border-radius: 0 0 12px 12px; text-align: center;">
                  <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">
                    © 2026 OverLeased. All rights reserved.
                  </p>
                  <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                    This email was sent to ${email}
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  console.log("Sending purchase confirmation to customer:", email);
  return sendEmail({
    to: [{ email, name: "Customer" }],
    subject: "✓ Your OverLeased Guide is On Its Way! (Delivered in 24-48 Hours)",
    htmlContent,
    sender: {
      email: "support@overleased.com",
      name: "OverLeased",
    },
  });
};

/**
 * Send order notification to support@overleased.com for Lease Exit Guide purchase
 */
export async function sendSupportNotification(data: {
  email: string;
  firstName: string;
  customerGoal: string;
  vehicle: {
    year: string;
    make: string;
    model: string;
    trim: string;
    condition: string;
    mileage: string;
  };
  amount: number;
  paymentIntentId: string;
}): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("BREVO_API_KEY not configured");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "OverLeased System",
          email: "noreply@overleased.com",
        },
        to: [
          {
            email: "support@overleased.com",
            name: "OverLeased Support",
          },
        ],
        subject: `New Lease Exit Guide Order - ${data.firstName}`,
        htmlContent: `
          <h2>New Lease Exit Guide Purchase</h2>
          <p><strong>Customer:</strong> ${data.firstName}<br>
          <strong>Email:</strong> ${data.email}<br>
          <strong>Goal:</strong> ${data.customerGoal}</p>
          
          <h3>Vehicle Details:</h3>
          <p><strong>Year:</strong> ${data.vehicle.year}<br>
          <strong>Make:</strong> ${data.vehicle.make}<br>
          <strong>Model:</strong> ${data.vehicle.model}<br>
          <strong>Trim:</strong> ${data.vehicle.trim}<br>
          <strong>Condition:</strong> ${data.vehicle.condition}<br>
          <strong>Mileage:</strong> ${data.vehicle.mileage}</p>
          
          <h3>Payment Details:</h3>
          <p><strong>Amount:</strong> $${(data.amount / 100).toFixed(2)}<br>
          <strong>Payment Intent ID:</strong> ${data.paymentIntentId}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo API error:", errorText);
      return { success: false, error: `Brevo API error: ${response.status}` };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send support notification:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Send order notification to support@overleased.com for Dealer Coordination purchase
 */
export async function sendDealerCoordinationSupportNotification(data: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  amount: number;
  paymentIntentId: string;
}): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("BREVO_API_KEY not configured");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "OverLeased System",
          email: "noreply@overleased.com",
        },
        to: [
          {
            email: "support@overleased.com",
            name: "OverLeased Support",
          },
        ],
        subject: `New Dealer Coordination Order - ${data.firstName} ${data.lastName}`,
        htmlContent: `
          <h2>New Dealer Coordination Service Purchase</h2>
          <p><strong>Customer:</strong> ${data.firstName} ${data.lastName}<br>
          <strong>Email:</strong> ${data.email}<br>
          <strong>Phone:</strong> ${data.phone}</p>
          
          <h3>Payment Details:</h3>
          <p><strong>Amount:</strong> $${(data.amount / 100).toFixed(2)}<br>
          <strong>Payment Intent ID:</strong> ${data.paymentIntentId}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo API error:", errorText);
      return { success: false, error: `Brevo API error: ${response.status}` };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send dealer coordination support notification:", error);
    return { success: false, error: error.message };
  }
}

interface GetStartedFormData {
  firstName: string;
  customerGoal: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  vehicleCondition: string;
  mileage: string;
  zipCode: string;
  email: string;
}

export const sendGetStartedNotificationEmail = async (formData: GetStartedFormData) => {
  const submissionTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "long"
  });

  // Convert customerGoal value to readable text
  const goalText = {
    "no-longer-need": "No Longer Need A Vehicle",
    "different-vehicle": "Want A Different Vehicle",
    "keep-current": "Want To Keep Current Vehicle",
    "lower-cost": "Lower Monthly Cost",
    "not-sure": "Not Sure"
  }[formData.customerGoal] || formData.customerGoal;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Get Started Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
              <!-- Header -->
              <tr>
                <td style="padding: 30px 40px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; text-align: center;">
                    New Get Started Form Submission
                  </h1>
                  <p style="margin: 8px 0 0; color: #bfdbfe; font-size: 14px; text-align: center;">
                    A customer has completed the vehicle information form
                  </p>
                </td>
              </tr>

              <!-- Customer Information -->
              <tr>
                <td style="padding: 32px 40px 16px;">
                  <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 18px; font-weight: 600;">
                    Customer Details
                  </h2>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">First Name</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.firstName}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">Customer Goal</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${goalText}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0;">
                        <span style="color: #6b7280; font-size: 14px;">Email</span>
                      </td>
                      <td style="padding: 12px 0; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.email}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Vehicle Information -->
              <tr>
                <td style="padding: 16px 40px 32px;">
                  <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 18px; font-weight: 600;">
                    Vehicle Details
                  </h2>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">Year</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.year}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">Make</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.make}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">Model</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.model}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">Trim</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.trim}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">Condition</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600; text-transform: capitalize;">${formData.vehicleCondition}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">Mileage</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.mileage} miles</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0;">
                        <span style="color: #6b7280; font-size: 14px;">ZIP Code</span>
                      </td>
                      <td style="padding: 12px 0; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.zipCode}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Submission Time -->
              <tr>
                <td style="padding: 0 40px 32px;">
                  <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                      Submitted At
                    </p>
                    <p style="margin: 8px 0 0; color: #111827; font-size: 14px; font-weight: 600;">
                      ${submissionTime}
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                    This is an automated notification from OverLeased
                  </p>
                </td>
              </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  console.log("Sending get-started notification to support");
  return sendEmail({
    to: [{ email: "support@overleased.com", name: "OverLeased Support" }],
    subject: `New Form Submission: ${formData.firstName} - ${formData.year} ${formData.make} ${formData.model}`,
    htmlContent,
    sender: {
      email: "support@overleased.com",
      name: "OverLeased",
    },
  });
};

export interface DealerCoordinationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const sendDealerCoordinationRequestNotification = async (formData: DealerCoordinationFormData) => {
  const submissionTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "long"
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Dealer Coordination Request</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
              <tr>
                <td style="padding: 30px 40px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; text-align: center;">
                    New Dealer Coordination Request
                  </h1>
                  <p style="margin: 8px 0 0; color: #bfdbfe; font-size: 14px; text-align: center;">
                    A customer has submitted their information (before payment)
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding: 32px 40px;">
                  <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 18px; font-weight: 600;">
                    Customer Information
                  </h2>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">Name</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.firstName} ${formData.lastName}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        <span style="color: #6b7280; font-size: 14px;">Email</span>
                      </td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.email}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0;">
                        <span style="color: #6b7280; font-size: 14px;">Phone</span>
                      </td>
                      <td style="padding: 12px 0; text-align: right;">
                        <span style="color: #111827; font-size: 14px; font-weight: 600;">${formData.phone}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 40px 32px;">
                  <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
                      ⚠️ Note: Customer has NOT completed payment yet. This is just a form submission notification.
                    </p>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 40px 32px;">
                  <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                      Submitted At
                    </p>
                    <p style="margin: 8px 0 0; color: #111827; font-size: 14px; font-weight: 600;">
                      ${submissionTime}
                    </p>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                    This is an automated notification from OverLeased
                  </p>
                </td>
              </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  console.log("Sending dealer coordination request notification to support");
  return sendEmail({
    to: [{ email: "support@overleased.com", name: "OverLeased Support" }],
    subject: `Dealer Coordination Request: ${formData.firstName} ${formData.lastName}`,
    htmlContent,
    sender: {
      email: "support@overleased.com",
      name: "OverLeased",
    },
  });
};

export const sendDealerCoordinationConfirmation = async (params: { email: string; firstName: string; lastName: string; phone: string; amount: number; paymentIntentId: string }) => {
  const { email, firstName, lastName, phone, amount, paymentIntentId } = params;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dealer Coordination Service Confirmed</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; line-height: 1.6;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              
              <tr>
                <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; text-align: center;">
                    ✓ Request Received!
                  </h1>
                  <p style="margin: 12px 0 0; color: #e0e7ff; font-size: 16px; text-align: center;">
                    Your Dealer Coordination Service is confirmed
                  </p>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 40px;">
                  
                  <p style="margin: 0 0 24px; color: #334155; font-size: 16px;">
                    Hi ${firstName},
                  </p>
                  
                  <p style="margin: 0 0 24px; color: #334155; font-size: 16px;">
                    Thank you for purchasing the Dealer Coordination Service. We've received your request and will begin working on identifying appropriate dealerships and coordinating appraisal appointments for you.
                  </p>
                  
                  <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; border-radius: 8px; padding: 20px; margin: 24px 0;">
                    <h2 style="margin: 0 0 16px; color: #1e293b; font-size: 18px; font-weight: 600;">Service Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 40%;">Service:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">Dealer Coordination</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Name:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${firstName} ${lastName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${phone}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Amount Paid:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">$${(amount / 100).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Transaction ID:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 400; font-family: 'Courier New', monospace; font-size: 13px;">${paymentIntentId}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 24px 0;">
                    <h3 style="margin: 0 0 12px; color: #92400e; font-size: 16px; font-weight: 600;">📋 What Happens Next</h3>
                    <ol style="margin: 0; padding: 0 0 0 20px; color: #78350f; font-size: 14px;">
                      <li style="margin-bottom: 8px;">We'll review your information and identify appropriate same-brand dealerships in your area</li>
                      <li style="margin-bottom: 8px;">Our team will contact dealership representatives about your leased vehicle</li>
                      <li style="margin-bottom: 8px;">We'll coordinate available appraisal appointment times</li>
                      <li style="margin-bottom: 8px;">You'll receive updates via email at <strong>${email}</strong></li>
                      <li style="margin-bottom: 8px;">We'll help you understand and compare any offers you receive</li>
                    </ol>
                  </div>
                  
                  <div style="margin: 32px 0 0; padding: 24px 0 0; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 8px; color: #334155; font-size: 14px;">
                      <strong>Questions or concerns?</strong>
                    </p>
                    <p style="margin: 0; color: #64748b; font-size: 14px;">
                      Contact us at <a href="mailto:support@overleased.com" style="color: #2563eb; text-decoration: none;">support@overleased.com</a>
                    </p>
                  </div>
                  
                </td>
              </tr>
              
              <tr>
                <td style="padding: 24px 40px; background-color: #f8fafc; border-radius: 0 0 12px 12px; text-align: center;">
                  <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">
                    © 2026 OverLeased. All rights reserved.
                  </p>
                  <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                    This email was sent to ${email}
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  console.log("Sending dealer coordination confirmation to customer:", email);
  return sendEmail({
    to: [{ email, name: `${firstName} ${lastName}` }],
    subject: "✓ Your Dealer Coordination Request Has Been Received",
    htmlContent,
    sender: {
      email: "support@overleased.com",
      name: "OverLeased",
    },
  });
};

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
