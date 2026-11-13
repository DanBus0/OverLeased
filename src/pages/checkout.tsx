import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ArrowLeft, Lock, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const LEASE_EXIT_GUIDE_AMOUNT = 39; // $39 in dollars

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

interface FormData {
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

function CheckoutForm({ formData, clientSecret }: { formData: FormData; clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/report-purchased`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred during payment");
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        try {
          // Check if already saved (idempotency)
          const { data: existing } = await supabase
            .from("lease_review_leads")
            .select("id")
            .eq("payment_intent_id", paymentIntent.id)
            .maybeSingle();

          if (!existing) {
            const { error: supabaseError } = await supabase
              .from("lease_review_leads")
              .insert([
                {
                  firstname: formData.firstName,
                  customer_goal: formData.customerGoal,
                  email: formData.email,
                  year: formData.year,
                  make: formData.make,
                  model: formData.model,
                  trim: formData.trim,
                  vehicle_condition: formData.vehicleCondition,
                  current_mileage: validateMileage(formData.mileage),
                  zip_code: formData.zipCode,
                  payment_intent_id: paymentIntent.id,
                  payment_status: "paid",
                  amount_paid: 3900,
                },
              ]);

            if (supabaseError) {
              console.error("Error saving to Supabase:", supabaseError);
            } else {
              console.log("Successfully saved to Supabase");
            }
          } else {
            console.log("Payment already recorded (webhook processed first)");
          }

          // Send confirmation emails via server-side API route (also idempotent via webhook)
          try {
            console.log("Calling email API to send confirmation emails...");
            const emailResponse = await fetch("/api/send-confirmation-emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.email,
                firstName: formData.firstName,
                customerGoal: formData.customerGoal,
                vehicle: {
                  year: formData.year,
                  make: formData.make,
                  model: formData.model,
                  trim: formData.trim,
                  condition: formData.vehicleCondition,
                  mileage: formData.mileage,
                },
                amount: 3900,
                paymentIntentId: paymentIntent.id,
              }),
            });

            const emailResult = await emailResponse.json();
            
            console.log("Full email API results:", JSON.stringify(emailResult, null, 2));
            
            if (emailResult.success) {
              console.log("Email API response:", emailResult);
              if (emailResult.results.customerEmail.success) {
                console.log("✅ Customer confirmation email sent successfully");
              } else {
                console.error("❌ Customer confirmation email FAILED:", emailResult.results.customerEmail.error);
                // Try to parse the error if it's a JSON string
                try {
                  const errorDetails = JSON.parse(emailResult.results.customerEmail.error);
                  console.error("🔍 Detailed Brevo Error for Customer Email:", errorDetails);
                } catch (e) {
                  // Error is not JSON, just log as-is
                }
              }
              if (emailResult.results.supportEmail.success) {
                console.log("✅ Support notification email sent successfully");
              } else {
                console.error("❌ Support notification email FAILED:", emailResult.results.supportEmail.error);
              }
            } else {
              console.error("Email API returned error:", emailResult);
            }
          } catch (emailError: any) {
            console.error("Failed to call email API:", {
              error: emailError.message,
              details: emailError,
            });
            // Don't block the flow if email fails - user already paid
          }
        } catch (saveError) {
          console.error("Error saving to database:", saveError);
        }

        try {
          const inquiries = JSON.parse(localStorage.getItem("leaseInquiries") || "[]");
          inquiries.push({
            ...formData,
            paymentIntentId: paymentIntent.id,
            paymentStatus: "paid",
            submittedAt: new Date().toISOString(),
          });
          localStorage.setItem("leaseInquiries", JSON.stringify(inquiries));
        } catch (localError) {
          console.error("Error saving to localStorage:", localError);
        }

        sessionStorage.removeItem("leaseFormData");
        router.push(`/report-purchased?payment_intent=${encodeURIComponent(paymentIntent.id)}`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        options={{
          layout: {
            type: "tabs",
            defaultCollapsed: false,
          },
          wallets: {
            applePay: "auto",
            googlePay: "auto",
          },
        }}
      />

      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
      >
        {isProcessing ? (
          "Processing..."
        ) : (
          <>
            <Lock className="mr-2 h-5 w-5" />
            Pay $39 Securely
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4" />
        <span>Secured by Stripe • Your information is encrypted</span>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        const savedFormData = sessionStorage.getItem("leaseFormData");
        if (!savedFormData) {
          console.error("No form data found");
          router.push("/get-started");
          return;
        }

        const parsedFormData = JSON.parse(savedFormData);
        setFormData(parsedFormData);

        // Get leaseReviewId from sessionStorage
        const leaseReviewId = sessionStorage.getItem("leaseReviewId");

        // Create payment intent
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: LEASE_EXIT_GUIDE_AMOUNT * 100,
            email: parsedFormData.email,
            metadata: {
              product: "lease_exit_guide",
              firstName: parsedFormData.firstName,
              customerGoal: parsedFormData.customerGoal,
              email: parsedFormData.email,
              year: parsedFormData.year,
              make: parsedFormData.make,
              model: parsedFormData.model,
              trim: parsedFormData.trim,
              vehicleCondition: parsedFormData.vehicleCondition,
              mileage: parsedFormData.mileage,
              zipCode: parsedFormData.zipCode,
              leaseReviewId: leaseReviewId || "", // Pass leaseReviewId to Stripe
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setIsLoading(false);
      } catch (err: any) {
        setError("Failed to initialize payment. Please check your Stripe configuration.");
        setIsLoading(false);
      }
    };

    initializeCheckout();
  }, [router]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Checkout - OverLeased</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading secure checkout...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !formData) {
    return (
      <>
        <Head>
          <title>Checkout Error - OverLeased</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-red-600">Checkout Error</CardTitle>
              <CardDescription>{error || "Unable to load checkout"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && error.includes("Stripe") && (
                <Alert>
                  <AlertDescription>
                    <strong>Setup Required:</strong> Stripe API keys need to be configured in your environment variables.
                  </AlertDescription>
                </Alert>
              )}
              <Button onClick={() => router.push("/get-started")} className="w-full">
                Return to Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#2563eb",
      },
    },
    loader: "auto" as const,
  };

  return (
    <>
      <Head>
        <title>Secure Checkout - OverLeased</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 hover:bg-white/50 hidden md:block"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Personalized Lease Exit Guide</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Expert analysis delivered to your email within 24-48 hours
                    </p>

                    <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Vehicle:</span>
                        <span className="font-medium">
                          {formData.year} {formData.make} {formData.model}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current Mileage:</span>
                        <span>{formData.mileage} miles</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Location:</span>
                        <span>ZIP {formData.zipCode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">What You'll Receive:</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">Your Vehicle's Estimated Market Value</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">Five Lease-Exit Methods</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">Scripts, Worksheets and Action Steps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">Personalized Starting Point</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">Complimentary Payoff Review</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-blue-600">$39.00</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      One-time payment • No subscriptions • No hidden fees
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>
                    Complete your secure payment to receive your personalized guide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {clientSecret ? (
                    <Elements stripe={stripePromise} options={options}>
                      <CheckoutForm formData={formData} clientSecret={clientSecret} />
                    </Elements>
                  ) : (
                    <Alert>
                      <AlertDescription>
                        Unable to initialize payment. Please ensure Stripe is properly configured.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mt-4 w-full hover:bg-white/50 md:hidden"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Your guide will be delivered to:</p>
                <p className="font-medium text-foreground">{formData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}