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

    console.log("=== CREATE PAYMENT INTENT REQUEST ===");
    console.log("Amount:", amount);
    console.log("Metadata received:", JSON.stringify(metadata, null, 2));
    console.log("Metadata keys:", Object.keys(metadata || {}));

    // Validate amount (must be exactly $39 or $60)
    if (amount !== 3900 && amount !== 6000) {
      console.error("Invalid amount provided:", amount);
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Validate metadata contains serviceType
    if (!metadata || !metadata.serviceType) {
      console.error("Missing serviceType in metadata");
      console.error("Received metadata:", metadata);
      return res.status(400).json({ error: "Missing service type in metadata" });
    }

    // Ensure metadata is plain object with string values only
    const cleanMetadata: Record<string, string> = {};
    for (const [key, value] of Object.entries(metadata)) {
      cleanMetadata[key] = String(value || "");
    }

    console.log("Clean metadata prepared:", JSON.stringify(cleanMetadata, null, 2));
    console.log("Clean metadata keys:", Object.keys(cleanMetadata));
    console.log("ServiceType value:", cleanMetadata.serviceType);

    // Create PaymentIntent with customer metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: cleanMetadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("=== PAYMENT INTENT CREATED ===");
    console.log("PaymentIntent ID:", paymentIntent.id);
    console.log("Metadata attached to PI:", JSON.stringify(paymentIntent.metadata, null, 2));
    console.log("Metadata keys on PI:", Object.keys(paymentIntent.metadata));
    console.log("ServiceType on PI:", paymentIntent.metadata.serviceType);

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
}