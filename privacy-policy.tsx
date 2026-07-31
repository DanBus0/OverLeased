import type { NextApiRequest, NextApiResponse } from "next";
import { sendPurchaseConfirmation, sendSupportNotification } from "@/services/brevoService";
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

  const { email, vehicle, amount, paymentIntentId, firstName, customerGoal } = req.body;

  if (!email || !vehicle || !amount || !paymentIntentId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const results = {
    customerEmail: { success: false, error: null as string | null },
    supportEmail: { success: false, error: null as string | null },
  };

  // Send customer confirmation email
  try {
    console.log("API Route: Sending customer confirmation email to:", email);
    await sendPurchaseConfirmation({
      email,
      vehicle,
      amount,
      paymentIntentId,
    });
    results.customerEmail.success = true;
    console.log("API Route: Customer confirmation email sent successfully");
  } catch (error: any) {
    console.error("API Route: Failed to send customer confirmation:", error);
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      brevoError: error.response?.data,
    };
    console.error("API Route: Full customer email error details:", errorDetails);
    results.customerEmail.error = JSON.stringify(errorDetails);
  }

  // Send support notification email
  try {
    console.log("API Route: Sending support notification email");
    await sendSupportNotification({
      email,
      vehicle,
      amount,
      paymentIntentId,
      firstName,
      customerGoal,
    });
    results.supportEmail.success = true;
    console.log("API Route: Support notification email sent successfully");
  } catch (error: any) {
    console.error("API Route: Failed to send support notification:", error);
    results.supportEmail.error = error.message || "Unknown error";
  }

  // Return success if at least one email was sent, otherwise return error
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