import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { supabase } from "@/integrations/supabase/client";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia" as any,
});

// Use service role client for webhook operations (server-side only)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Disable body parsing to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read raw body
async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      return res.status(400).json({ error: "No signature provided" });
    }

    // Verify webhook signature
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;

      case "charge.refunded":
        await handleRefund(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error("Webhook handler error:", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const metadata = paymentIntent.metadata;
  const serviceType = metadata.serviceType;
  const amount = paymentIntent.amount;

  // Validate metadata exists
  if (!metadata || Object.keys(metadata).length === 0) {
    console.error("Payment failed: Empty metadata", {
      paymentIntentId: paymentIntent.id,
      amount: amount,
    });
    throw new Error("PaymentIntent missing metadata - cannot route payment");
  }

  // Validate service type exists
  if (!serviceType) {
    console.error("Payment failed: Missing serviceType", {
      paymentIntentId: paymentIntent.id,
      metadataKeys: Object.keys(metadata),
    });
    throw new Error("Missing serviceType in payment metadata");
  }

  // Route based on service type and validate amount
  if (serviceType === "dealer-coordination") {
    if (amount !== 6000) {
      console.error("Payment failed: Amount mismatch for dealer-coordination", {
        expected: 6000,
        received: amount,
      });
      throw new Error("Payment amount does not match service type");
    }
    await handleDealerCoordinationSuccess(paymentIntent);
  } else if (serviceType === "lease-exit-guide") {
    if (amount !== 3900) {
      console.error("Payment failed: Amount mismatch for lease-exit-guide", {
        expected: 3900,
        received: amount,
      });
      throw new Error("Payment amount does not match service type");
    }
    await handleLeaseReportSuccess(paymentIntent);
  } else {
    console.error("Payment failed: Unknown service type", {
      serviceType: serviceType,
      paymentIntentId: paymentIntent.id,
    });
    throw new Error("Unknown service type");
  }
}

async function handleDealerCoordinationSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const metadata = paymentIntent.metadata;
    const firstName = metadata.firstName;
    const lastName = metadata.lastName;
    const customerEmail = metadata.customerEmail;
    const phone = metadata.phone;
    
    // Validate required fields
    if (!firstName || !lastName || !customerEmail || !phone) {
      console.error("Dealer coordination failed: Missing required metadata", {
        paymentIntentId: paymentIntent.id,
        hasFirstName: !!firstName,
        hasLastName: !!lastName,
        hasEmail: !!customerEmail,
        hasPhone: !!phone,
      });
      throw new Error("Missing required customer information in metadata");
    }

    // Check if already processed (idempotency)
    const { data: existing, error: checkError } = await supabaseAdmin
      .from("dealer_coordination_leads")
      .select("id")
      .eq("payment_intent_id", paymentIntent.id)
      .maybeSingle();
      
    if (checkError) {
      console.error("Dealer coordination failed: Database check error", {
        paymentIntentId: paymentIntent.id,
        error: checkError,
      });
      throw new Error(`Idempotency check failed: ${checkError.message}`);
    }

    if (existing) {
      console.log("Dealer coordination already processed (idempotent)", {
        paymentIntentId: paymentIntent.id,
      });
      return;
    }

    // Save to database
    const { error: dbError } = await supabaseAdmin
      .from("dealer_coordination_leads")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: customerEmail,
        phone: phone,
        payment_status: "succeeded",
        payment_intent_id: paymentIntent.id,
        amount_paid: paymentIntent.amount,
      });

    if (dbError) {
      console.error("Dealer coordination failed: Database insert error", {
        paymentIntentId: paymentIntent.id,
        error: dbError,
      });
      throw new Error(`Database save failed: ${dbError.message}`);
    }

    console.log("Dealer coordination lead saved", {
      paymentIntentId: paymentIntent.id,
    });

    // Send confirmation emails
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-dealer-coordination-emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: customerEmail,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          amount: paymentIntent.amount,
          paymentIntentId: paymentIntent.id,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Dealer coordination: Email sending failed", {
          paymentIntentId: paymentIntent.id,
          status: emailResponse.status,
        });
      } else {
        console.log("Dealer coordination emails sent", {
          paymentIntentId: paymentIntent.id,
        });
      }
    } catch (emailError: any) {
      console.error("Dealer coordination: Email exception", {
        paymentIntentId: paymentIntent.id,
        error: emailError.message,
      });
      // Don't throw - email failure shouldn't block webhook processing
    }
    
  } catch (handlerError: any) {
    console.error("Dealer coordination handler error", {
      paymentIntentId: paymentIntent.id,
      error: handlerError.message,
      stack: handlerError.stack,
    });
    throw handlerError;
  }
}

async function handleLeaseReportSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const metadata = paymentIntent.metadata;
    const firstName = metadata.firstName;
    const customerEmail = metadata.customerEmail;
    const customerGoal = metadata.customerGoal;

    // Validate required fields
    if (!firstName || !customerEmail || !customerGoal) {
      console.error("Lease report failed: Missing required metadata", {
        paymentIntentId: paymentIntent.id,
        hasFirstName: !!firstName,
        hasEmail: !!customerEmail,
        hasGoal: !!customerGoal,
      });
      throw new Error("Missing required customer information in metadata");
    }

    // Check if already processed (idempotency)
    const { data: existing, error: checkError } = await supabaseAdmin
      .from("lease_review_leads")
      .select("id")
      .eq("payment_intent_id", paymentIntent.id)
      .maybeSingle();

    if (checkError) {
      console.error("Lease report failed: Database check error", {
        paymentIntentId: paymentIntent.id,
        error: checkError,
      });
      throw new Error(`Idempotency check failed: ${checkError.message}`);
    }

    if (existing) {
      console.log("Lease report already processed (idempotent)", {
        paymentIntentId: paymentIntent.id,
      });
      return;
    }

    // Save to database
    const { error: dbError } = await supabaseAdmin
      .from("lease_review_leads")
      .insert({
        firstname: firstName,
        customer_goal: customerGoal,
        email: customerEmail,
        year: metadata.vehicleYear,
        make: metadata.vehicleMake,
        model: metadata.vehicleModel,
        trim: metadata.vehicleTrim,
        vehicle_condition: metadata.vehicleCondition,
        current_mileage: parseInt(metadata.vehicleMileage || "0"),
        zip_code: metadata.zipCode,
        payment_intent_id: paymentIntent.id,
        payment_status: "paid",
        amount_paid: paymentIntent.amount,
      });

    if (dbError) {
      console.error("Lease report failed: Database insert error", {
        paymentIntentId: paymentIntent.id,
        error: dbError,
      });
      throw new Error(`Database save failed: ${dbError.message}`);
    }

    console.log("Lease report lead saved", {
      paymentIntentId: paymentIntent.id,
    });

    // Send confirmation emails
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-confirmation-emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: customerEmail,
          firstName: firstName,
          customerGoal: customerGoal,
          vehicle: {
            year: metadata.vehicleYear,
            make: metadata.vehicleMake,
            model: metadata.vehicleModel,
            trim: metadata.vehicleTrim,
            condition: metadata.vehicleCondition,
            mileage: metadata.vehicleMileage,
          },
          amount: paymentIntent.amount,
          paymentIntentId: paymentIntent.id,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Lease report: Email sending failed", {
          paymentIntentId: paymentIntent.id,
          status: emailResponse.status,
        });
      } else {
        console.log("Lease report emails sent", {
          paymentIntentId: paymentIntent.id,
        });
      }
    } catch (emailError: any) {
      console.error("Lease report: Email exception", {
        paymentIntentId: paymentIntent.id,
        error: emailError.message,
      });
      // Don't throw - email failure shouldn't block webhook processing
    }

  } catch (handlerError: any) {
    console.error("Lease report handler error", {
      paymentIntentId: paymentIntent.id,
      error: handlerError.message,
      stack: handlerError.stack,
    });
    throw handlerError;
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  console.log("Processing payment_intent.payment_failed:", paymentIntent.id);

  const metadata = paymentIntent.metadata;
  const serviceType = metadata.serviceType;

  if (serviceType === "dealer-coordination") {
    // Check if record exists
    const { data: existing } = await supabaseAdmin
      .from("dealer_coordination_leads")
      .select("id")
      .eq("payment_intent_id", paymentIntent.id)
      .single();

    if (existing) {
      // Update status to failed
      await supabaseAdmin
        .from("dealer_coordination_leads")
        .update({ payment_status: "failed" })
        .eq("payment_intent_id", paymentIntent.id);
    }
  } else {
    // Check if record exists
    const { data: existing } = await supabaseAdmin
      .from("lease_review_leads")
      .select("id")
      .eq("payment_intent_id", paymentIntent.id)
      .single();

    if (existing) {
      // Update status to failed
      await supabaseAdmin
        .from("lease_review_leads")
        .update({ payment_status: "failed" })
        .eq("payment_intent_id", paymentIntent.id);
    }
  }

  console.log(`Payment failure recorded for ${paymentIntent.id}`);
}

async function handleRefund(charge: Stripe.Charge) {
  console.log("Processing charge.refunded:", charge.id);

  const paymentIntentId = charge.payment_intent as string;

  if (!paymentIntentId) {
    console.log("No payment intent associated with charge");
    return;
  }

  // Try to update dealer coordination leads
  const { data: dealerLead } = await supabaseAdmin
    .from("dealer_coordination_leads")
    .select("id")
    .eq("payment_intent_id", paymentIntentId)
    .single();

  if (dealerLead) {
    await supabaseAdmin
      .from("dealer_coordination_leads")
      .update({ payment_status: "refunded" })
      .eq("payment_intent_id", paymentIntentId);
    console.log(`Dealer coordination refund recorded for ${paymentIntentId}`);
    return;
  }

  // Try to update lease review leads
  const { data: leaseLead } = await supabaseAdmin
    .from("lease_review_leads")
    .select("id")
    .eq("payment_intent_id", paymentIntentId)
    .single();

  if (leaseLead) {
    await supabaseAdmin
      .from("lease_review_leads")
      .update({ payment_status: "refunded" })
      .eq("payment_intent_id", paymentIntentId);
    console.log(`Lease report refund recorded for ${paymentIntentId}`);
  }
}