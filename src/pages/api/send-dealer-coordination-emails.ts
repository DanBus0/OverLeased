import type { NextApiRequest, NextApiResponse } from "next";
import { sendDealerCoordinationConfirmation, sendDealerCoordinationSupportNotification } from "@/services/brevoService";
import { applyRateLimit } from "@/lib/rateLimiter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await applyRateLimit(req, res);
  } catch (error) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const { email, firstName, lastName, phone, amount, paymentIntentId } = req.body;

  if (!email || !firstName || !lastName || !phone || !amount || !paymentIntentId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const results = {
    customerEmail: { success: false, error: null as string | null },
    supportEmail: { success: false, error: null as string | null },
  };

  // Send customer confirmation email
  try {
    console.log("API Route: Sending dealer coordination confirmation to customer:", email);
    await sendDealerCoordinationConfirmation({
      email,
      firstName,
      lastName,
      phone,
      amount,
      paymentIntentId,
    });
    results.customerEmail.success = true;
    console.log("API Route: Customer confirmation email sent successfully");
  } catch (error: any) {
    console.error("API Route: Failed to send customer confirmation:", error);
    results.customerEmail.error = error.message || "Unknown error";
  }

  // Send support notification email
  try {
    console.log("API Route: Sending dealer coordination support notification");
    await sendDealerCoordinationSupportNotification({
      email,
      firstName,
      lastName,
      phone,
      amount,
      paymentIntentId,
    });
    results.supportEmail.success = true;
    console.log("API Route: Support notification email sent successfully");
  } catch (error: any) {
    console.error("API Route: Failed to send support notification:", error);
    results.supportEmail.error = error.message || "Unknown error";
  }

  // Return success if at least one email was sent
  if (results.customerEmail.success || results.supportEmail.success) {
    return res.status(200).json({
      success: true,
      results,
      message: "Emails sent",
    });
  } else {
    return res.status(500).json({
      success: false,
      results,
      error: "Failed to send emails",
    });
  }
}