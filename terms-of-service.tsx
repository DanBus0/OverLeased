import type { NextApiRequest, NextApiResponse } from "next";
import { sendDealerCoordinationRequestNotification } from "@/services/brevoService";
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

  const { firstName, lastName, email, phone } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("API Route: Sending dealer coordination request notification to support");
    await sendDealerCoordinationRequestNotification({
      firstName,
      lastName,
      email,
      phone,
    });
    console.log("API Route: Dealer coordination request notification sent successfully");
    
    return res.status(200).json({
      success: true,
      message: "Notification sent to support",
    });
  } catch (error: any) {
    console.error("API Route: Failed to send dealer coordination request notification:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send notification",
      details: error.message || "Unknown error",
    });
  }
}