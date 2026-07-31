import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Car, CheckCircle, Lock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const DEALER_COORDINATION_PRICE = 60; // $60 in dollars
const DEALER_COORDINATION_AMOUNT = DEALER_COORDINATION_PRICE * 100; // Convert to cents

interface DealerCoordinationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consentGiven: boolean;
}

function DealerCoordinationCheckoutForm({ formData, clientSecret }: { formData: DealerCoordinationFormData; clientSecret: string }) {
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
          return_url: `${window.location.origin}/dealer-coordination-confirmation`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred during payment");
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Save to Supabase database (idempotent check)
        try {
          const { data: existing } = await supabase
            .from("dealer_coordination_leads")
            .select("id")
            .eq("payment_intent_id", paymentIntent.id)
            .maybeSingle();

          if (!existing) {
            const { error: dbError } = await supabase
              .from("dealer_coordination_leads")
              .insert({
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                payment_status: "succeeded",
                payment_intent_id: paymentIntent.id,
                amount_paid: DEALER_COORDINATION_AMOUNT,
              });

            if (dbError) {
              console.error("Failed to save to database:", dbError);
              // Don't block the user flow if database save fails
            } else {
              console.log("Successfully saved dealer coordination lead");
            }
          } else {
            console.log("Payment already recorded (webhook processed first)");
          }
        } catch (dbErr) {
          console.error("Database error:", dbErr);
        }

        // Send confirmation emails after successful payment (webhook will also send, but emails are idempotent)
        try {
          await fetch("/api/send-dealer-coordination-emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              amount: DEALER_COORDINATION_AMOUNT,
              paymentIntentId: paymentIntent.id,
            }),
          });
          console.log("Confirmation emails sent successfully");
        } catch (emailError) {
          console.error("Failed to send confirmation emails:", emailError);
          // Don't block redirect if emails fail
        }

        sessionStorage.removeItem("dealerCoordinationFormData");
        router.push("/dealer-coordination-confirmation");
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
            Pay ${DEALER_COORDINATION_PRICE} Securely
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Lock className="h-4 w-4" />
        <span>Secured by Stripe • Your information is encrypted</span>
      </div>
    </form>
  );
}

export default function DealerCoordinationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<"form" | "payment">("form");
  const [formData, setFormData] = useState<DealerCoordinationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consentGiven: false,
  });
  const [clientSecret, setClientSecret] = useState("");
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [error, setError] = useState("");

  // Page-specific scroll to top (backup to global handler)
  useEffect(() => {
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    forceScrollToTop();

    // Multiple timing strategies
    requestAnimationFrame(() => {
      forceScrollToTop();
      requestAnimationFrame(forceScrollToTop);
    });

    setTimeout(forceScrollToTop, 0);
    setTimeout(forceScrollToTop, 100);
  }, []);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, consentGiven: checked }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.consentGiven) {
      setError("You must authorize OverLeased to share your information with dealerships.");
      return false;
    }

    setError("");
    return true;
  };

  const handleContinueToPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoadingPayment(true);
    setError("");

    try {
      // Send notification to support about the form submission
      try {
        await fetch("/api/send-dealer-coordination-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          }),
        });
        console.log("Form submission notification sent to support");
      } catch (notifError) {
        console.error("Failed to send form submission notification:", notifError);
        // Don't block payment flow if notification fails
      }

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: DEALER_COORDINATION_AMOUNT,
          metadata: {
            serviceType: "dealer-coordination",
            firstName: formData.firstName,
            lastName: formData.lastName,
            customerEmail: formData.email,
            phone: formData.phone,
          },
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setIsLoadingPayment(false);
      } else {
        setClientSecret(data.clientSecret);
        sessionStorage.setItem("dealerCoordinationFormData", JSON.stringify(formData));
        setCurrentStep("payment");
        setIsLoadingPayment(false);
      }
    } catch (err: any) {
      setError("Failed to initialize payment. Please try again.");
      setIsLoadingPayment(false);
    }
  };

  const handleBackToForm = () => {
    setCurrentStep("form");
    setError("");
  };

  const stripeOptions = clientSecret ? {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#2563eb",
      },
    },
    loader: "auto" as const,
  } : null;

  return (
    <>
      <Head>
        <title>Dealer Coordination Service | OverLeased</title>
        <meta name="description" content="Let OverLeased handle dealership outreach and coordinate vehicle appraisal appointments for you." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 rounded-lg p-2">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">OverLeased</span>
              </Link>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            {currentStep === "form" ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Let OverLeased Handle the Dealership Outreach
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We'll identify appropriate dealerships, contact them about purchasing your leased vehicle, and help coordinate appraisal appointments.
                  </p>
                </div>

                <Card className="mb-8">
                  <CardHeader className="bg-blue-50 border-b border-blue-200">
                    <CardTitle className="text-xl text-gray-900">What's Included</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Identify appropriate same-brand dealerships in your area</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Contact dealership representatives</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Explain that you are looking to sell your leased vehicle back to a dealership</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Coordinate available appraisal appointment times</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Help you understand and compare dealership offers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Email support throughout the process</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Alert className="mb-8 border-amber-200 bg-amber-50">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <AlertDescription className="text-gray-700">
                    <p className="font-semibold text-gray-900 mb-2">Important Notice</p>
                    <p className="mb-2">The Dealer Coordination Service is separate from the $39 Personalized Lease Exit Guide.</p>
                    <p>OverLeased does not purchase vehicles, negotiate dealership pricing, provide financing, or guarantee that a dealership will purchase the vehicle or make a specific offer.</p>
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                    <CardTitle className="text-2xl text-gray-900">Your Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {error && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-5 w-5" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleContinueToPayment} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Smith"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="(555) 123-4567"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-start gap-3 mb-4">
                          <Checkbox
                            id="consent"
                            checked={formData.consentGiven}
                            onCheckedChange={handleConsentChange}
                            className="mt-1"
                          />
                          <Label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                            I authorize OverLeased to share the information I provide with appropriate dealerships for the purpose of requesting interest and coordinating vehicle-appraisal appointments. *
                          </Label>
                        </div>

                        <div className="flex items-start gap-3 mb-6">
                          <Checkbox
                            id="terms"
                            required
                            className="mt-1"
                          />
                          <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                            By purchasing, I agree to the OverLeased <Link href="/terms-of-service" target="_blank" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</Link>. *
                          </Label>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">One-Time Service Fee:</span>
                            <span className="text-2xl font-bold text-blue-600">${DEALER_COORDINATION_PRICE}</span>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoadingPayment}
                          className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
                        >
                          {isLoadingPayment ? "Loading..." : "Purchase Dealer Coordination"}
                        </Button>

                        <p className="text-sm text-gray-600 text-center mt-4">
                          Dealership offers are determined independently after the dealership inspects the vehicle.
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleBackToForm}
                  className="mb-6"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Form
                </Button>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Service Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Dealer Coordination Service</h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3">What's Included:</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Identify appropriate same-brand dealerships</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Contact dealership representatives</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Coordinate vehicle appraisal appointments</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Help understand and compare dealership offers</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>Email support throughout the process</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total</span>
                          <span className="text-blue-600">${DEALER_COORDINATION_PRICE}.00</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          One-time payment • No subscriptions • No hidden fees
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {stripeOptions && clientSecret ? (
                        <Elements stripe={stripePromise} options={stripeOptions}>
                          <DealerCoordinationCheckoutForm formData={formData} clientSecret={clientSecret} />
                        </Elements>
                      ) : (
                        <Alert>
                          <AlertDescription>Unable to initialize payment. Please try again.</AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}