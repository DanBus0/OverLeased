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

// Helper to normalize and validate mileage input
function validateMileage(mileageInput: string | undefined): number {
  const normalized = String(mileageInput || "0").replace(/,/g, "").trim();
  const mileageValue = Number(normalized);
  
  if (!Number.isFinite(mileageValue)) {
    throw new Error(`Invalid mileage value: ${mileageInput}`);
  }
  
  if (mileageValue < 0) {
    throw new Error(`Mileage cannot be negative: ${mileageValue}`);
  }
  
  if (!Number.isInteger(mileageValue)) {
    throw new Error(`Mileage must be a whole number: ${mileageValue}`);
  }
  
  return mileageValue;
}

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
  
  // Update Supabase record to mark payment as succeeded
  if (metadata.product === "lease_exit_guide") {
    const leaseReviewId = metadata.leaseReviewId;
    let recordUpdated = false;

    // Try to update existing record by ID if available
    if (leaseReviewId) {
      try {
        const { data: updateData, error: updateError } = await supabaseAdmin
          .from("lease_review_leads")
          .update({
            payment_status: "paid",
            payment_intent_id: paymentIntent.id,
            amount_paid: paymentIntent.amount,
            updated_at: new Date().toISOString(),
          })
          .eq("id", leaseReviewId)
          .select();

        if (updateError) {
          console.error("[Webhook] Failed to update lease review lead by ID:", updateError);
        } else if (updateData && updateData.length > 0) {
          console.log("[Webhook] Updated lease review lead payment status by ID");
          recordUpdated = true;
        } else {
          console.log("[Webhook] No record found with ID:", leaseReviewId);
        }
      } catch (updateError) {
        console.error("[Webhook] Exception updating lease review lead:", updateError);
      }
    }

    // If no record was updated (ID missing or record doesn't exist), insert new record
    if (!recordUpdated) {
      console.log("[Webhook] Creating new lease_review_leads record from metadata");
      try {
        const { error: insertError } = await supabaseAdmin
          .from("lease_review_leads")
          .insert({
            id: leaseReviewId || undefined, // Use provided ID if available, otherwise let DB generate
            email: metadata.email,
            firstname: metadata.firstName,
            customer_goal: metadata.customerGoal,
            year: metadata.year,
            make: metadata.make,
            model: metadata.model,
            trim: metadata.trim,
            vehicle_condition: metadata.vehicleCondition,
            current_mileage: parseInt(metadata.mileage?.replace(/,/g, '') || '0'),
            zip_code: metadata.zipCode,
            payment_status: "paid",
            payment_intent_id: paymentIntent.id,
            amount_paid: paymentIntent.amount,
          });

        if (insertError) {
          // Handle duplicate payment_intent_id (race condition)
          if (insertError.code === "23505" && insertError.message.includes("payment_intent_id")) {
            console.log("[Webhook] Record already created by concurrent webhook (idempotent)");
          } else {
            console.error("[Webhook] Failed to insert lease review lead:", insertError);
          }
        } else {
          console.log("[Webhook] Lease review lead created successfully from metadata");
        }
      } catch (insertError) {
        console.error("[Webhook] Exception inserting lease review lead:", insertError);
      }
    }

    // Send order notification email to support@overleased.com
    try {
      const { sendSupportNotification } = await import("@/services/brevoService");
      await sendSupportNotification({
        email: metadata.email,
        firstName: metadata.firstName,
        customerGoal: metadata.customerGoal,
        vehicle: {
          year: metadata.year,
          make: metadata.make,
          model: metadata.model,
          trim: metadata.trim,
          condition: metadata.vehicleCondition,
          mileage: metadata.mileage,
        },
        amount: paymentIntent.amount,
        paymentIntentId: paymentIntent.id,
      });
      console.log("[Webhook] Order notification email sent to support@overleased.com");
    } catch (emailError) {
      console.error("[Webhook] Failed to send order notification email:", emailError);
      // Don't throw - email failure shouldn't block webhook
    }

  } else if (metadata.product === "dealer_coordination") {
    const dealerCoordinationId = metadata.dealerCoordinationId;
    let recordUpdated = false;

    // Try to update existing record by ID if available
    if (dealerCoordinationId) {
      try {
        const { data: updateData, error: updateError } = await supabaseAdmin
          .from("dealer_coordination_leads")
          .update({
            payment_status: "paid",
            payment_intent_id: paymentIntent.id,
            amount_paid: paymentIntent.amount,
            updated_at: new Date().toISOString(),
          })
          .eq("id", dealerCoordinationId)
          .select();

        if (updateError) {
          console.error("[Webhook] Failed to update dealer coordination lead by ID:", updateError);
        } else if (updateData && updateData.length > 0) {
          console.log("[Webhook] Updated dealer coordination lead payment status by ID");
          recordUpdated = true;
        } else {
          console.log("[Webhook] No record found with ID:", dealerCoordinationId);
        }
      } catch (updateError) {
        console.error("[Webhook] Exception updating dealer coordination lead:", updateError);
      }
    }

    // If no record was updated, try to find by payment_intent_id or insert new
    if (!recordUpdated) {
      const { data: existing } = await supabaseAdmin
        .from("dealer_coordination_leads")
        .select("id")
        .eq("payment_intent_id", paymentIntent.id)
        .maybeSingle();

      if (existing) {
        // Update existing record found by payment_intent_id
        const { error: updateError } = await supabaseAdmin
          .from("dealer_coordination_leads")
          .update({
            payment_status: "paid",
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (updateError) {
          console.error("[Webhook] Failed to update dealer coordination lead by payment_intent_id:", updateError);
        } else {
          console.log("[Webhook] Updated dealer coordination lead by payment_intent_id");
        }
      } else {
        // Create new record (legacy fallback for old flow)
        const { error: dbError } = await supabaseAdmin
          .from("dealer_coordination_leads")
          .insert({
            id: dealerCoordinationId || undefined,
            first_name: metadata.firstName || "",
            last_name: metadata.lastName || "",
            email: metadata.email,
            phone: metadata.phone || "",
            payment_status: "paid",
            payment_intent_id: paymentIntent.id,
            amount_paid: paymentIntent.amount,
          });

        if (dbError) {
          if (dbError.code === "23505" && dbError.message.includes("payment_intent_id")) {
            console.log("[Webhook] Record already created by concurrent webhook (idempotent)");
          } else {
            console.error("[Webhook] Failed to save dealer coordination lead:", dbError);
          }
        } else {
          console.log("[Webhook] Dealer coordination lead saved successfully (legacy fallback)");
        }
      }
    }

    // Send order notification email to support@overleased.com
    try {
      const { sendDealerCoordinationSupportNotification } = await import("@/services/brevoService");
      await sendDealerCoordinationSupportNotification({
        email: metadata.email,
        firstName: metadata.firstName,
        lastName: metadata.lastName,
        phone: metadata.phone,
        amount: paymentIntent.amount,
        paymentIntentId: paymentIntent.id,
      });
      console.log("[Webhook] Dealer coordination order notification email sent to support@overleased.com");
    } catch (emailError) {
      console.error("[Webhook] Failed to send dealer coordination order notification email:", emailError);
      // Don't throw - email failure shouldn't block webhook
    }
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

    // STAGE 1: Idempotency check
    console.log("Dealer coordination: Starting idempotency check", {
      paymentIntentId: paymentIntent.id,
    });

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

    console.log("Dealer coordination: Idempotency check passed - proceeding with insert", {
      paymentIntentId: paymentIntent.id,
    });

    // STAGE 2: Database insert
    console.log("Dealer coordination: Starting database insert", {
      paymentIntentId: paymentIntent.id,
    });

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
      // Handle race condition: if unique constraint violation on payment_intent_id,
      // another webhook already inserted this record - treat as idempotent success
      if (dbError.code === "23505" && dbError.message.includes("payment_intent_id")) {
        console.log("Dealer coordination: Race condition detected - record already inserted by concurrent webhook (idempotent)", {
          paymentIntentId: paymentIntent.id,
        });
        return;
      }
      
      console.error("Dealer coordination failed: Database insert error", {
        paymentIntentId: paymentIntent.id,
        error: dbError,
      });
      throw new Error(`Database save failed: ${dbError.message}`);
    }

    console.log("Dealer coordination lead saved successfully", {
      paymentIntentId: paymentIntent.id,
    });

    // STAGE 3: Send confirmation emails
    console.log("Dealer coordination: Starting email sending", {
      paymentIntentId: paymentIntent.id,
      emailEndpoint: `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-dealer-coordination-emails`,
    });

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
        const errorText = await emailResponse.text().catch(() => "Unable to read response");
        console.error("Dealer coordination: Email API returned error", {
          paymentIntentId: paymentIntent.id,
          status: emailResponse.status,
          statusText: emailResponse.statusText,
          errorBody: errorText,
        });
      } else {
        console.log("Dealer coordination emails sent successfully", {
          paymentIntentId: paymentIntent.id,
        });
      }
    } catch (emailError: any) {
      console.error("Dealer coordination: Email fetch exception", {
        paymentIntentId: paymentIntent.id,
        error: emailError.message,
        stack: emailError.stack,
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

    // STAGE 1: Idempotency check
    console.log("Lease report: Starting idempotency check", {
      paymentIntentId: paymentIntent.id,
    });

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

    console.log("Lease report: Idempotency check passed - proceeding with insert", {
      paymentIntentId: paymentIntent.id,
    });

    // STAGE 2: Database insert
    console.log("Lease report: Starting database insert", {
      paymentIntentId: paymentIntent.id,
    });

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
        current_mileage: validateMileage(metadata.vehicleMileage),
        zip_code: metadata.zipCode,
        payment_intent_id: paymentIntent.id,
        payment_status: "paid",
        amount_paid: paymentIntent.amount,
      });

    if (dbError) {
      // Handle race condition: if unique constraint violation on payment_intent_id,
      // another webhook already inserted this record - treat as idempotent success
      if (dbError.code === "23505" && dbError.message.includes("payment_intent_id")) {
        console.log("Lease report: Race condition detected - record already inserted by concurrent webhook (idempotent)", {
          paymentIntentId: paymentIntent.id,
        });
        return;
      }
      
      console.error("Lease report failed: Database insert error", {
        paymentIntentId: paymentIntent.id,
        error: dbError,
      });
      throw new Error(`Database save failed: ${dbError.message}`);
    }

    console.log("Lease report lead saved successfully", {
      paymentIntentId: paymentIntent.id,
    });

    // STAGE 3: Send confirmation emails
    console.log("Lease report: Starting email sending", {
      paymentIntentId: paymentIntent.id,
      emailEndpoint: `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-confirmation-emails`,
    });

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
        const errorText = await emailResponse.text().catch(() => "Unable to read response");
        console.error("Lease report: Email API returned error", {
          paymentIntentId: paymentIntent.id,
          status: emailResponse.status,
          statusText: emailResponse.statusText,
          errorBody: errorText,
        });
      } else {
        console.log("Lease report emails sent successfully", {
          paymentIntentId: paymentIntent.id,
        });
      }
    } catch (emailError: any) {
      console.error("Lease report: Email fetch exception", {
        paymentIntentId: paymentIntent.id,
        error: emailError.message,
        stack: emailError.stack,
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