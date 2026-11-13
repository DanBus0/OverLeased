import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.query;

  if (!session_id || typeof session_id !== "string") {
    return res.status(400).json({ error: "Missing session_id parameter" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    return res.status(200).json({
      paymentStatus: session.payment_status,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error verifying payment status:", error);
    return res.status(500).json({ error: "Failed to verify payment status" });
  }
}