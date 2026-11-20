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

  const { payment_intent } = req.query;

  if (!payment_intent || typeof payment_intent !== "string") {
    return res.status(400).json({ error: "Missing payment_intent parameter" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    
    return res.status(200).json({
      paymentStatus: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error verifying payment status:", error);
    return res.status(500).json({ error: "Failed to verify payment status" });
  }
}