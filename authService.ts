import type { NextApiRequest, NextApiResponse } from "next";
import { sendGetStartedNotificationEmail } from "@/services/brevoService";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData: GetStartedFormData = req.body;

    // Validate required fields
    if (!formData.firstName || !formData.customerGoal || !formData.year || 
        !formData.make || !formData.model || !formData.trim || 
        !formData.vehicleCondition || !formData.mileage || 
        !formData.zipCode || !formData.email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Send notification to support
    await sendGetStartedNotificationEmail(formData);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending get-started notification:", error);
    res.status(500).json({ 
      error: "Failed to send notification",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}