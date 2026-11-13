import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { applyRateLimit } from "@/lib/rateLimiter";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia" as any,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Apply strict rate limiting for payment endpoints
  const rateLimitPassed = await applyRateLimit(req, res, true);
  if (!rateLimitPassed) {
    return; // Response already sent by rate limiter
  }

  try {
    const { amount, metadata } = req.body;

    // Validate amount (must be exactly $39 or $60)
    if (amount !== 3900 && amount !== 6000) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Validate metadata contains product
    if (!metadata || !metadata.product) {
      return res.status(400).json({ error: "Missing product type in request" });
    }

    // Validate product type
    if (metadata.product !== "lease_exit_guide" && metadata.product !== "dealer_coordination") {
      return res.status(400).json({ error: "Invalid product type" });
    }

    // Ensure metadata is plain object with string values only
    const cleanMetadata: Record<string, string> = {};
    for (const [key, value] of Object.entries(metadata)) {
      cleanMetadata[key] = String(value || "");
    }

    // Create PaymentIntent with customer metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: cleanMetadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
}