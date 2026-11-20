import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, ArrowRight, Car, CheckCircle, ShieldCheck, Clock, DollarSign, X, ZoomIn } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { supabase } from "@/integrations/supabase/client";

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    customerGoal: "",
    year: "",
    make: "",
    model: "",
    trim: "",
    vehicleCondition: "",
    mileage: "",
    zipCode: "",
    email: "",
    website: "", // Honeypot field - should remain empty
  });
  const step2FormRef = useRef<HTMLFormElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [formStartTracked, setFormStartTracked] = useState(false);
  const [leaseReviewId, setLeaseReviewId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const shouldScrollToTop = sessionStorage.getItem("forceScrollTopOnGetStarted");
      if (shouldScrollToTop === "1") {
        setTimeout(() => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 0);
        
        setTimeout(() => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, 50);
        
        sessionStorage.removeItem("forceScrollTopOnGetStarted");
      }

      // Load existing leaseReviewId if user refreshed or came back
      const savedId = sessionStorage.getItem("leaseReviewId");
      if (savedId) {
        setLeaseReviewId(savedId);
      }
    } catch (error) {
      // Silent fail for sessionStorage
    }
  }, []);

  const trackFormStart = () => {
    if (!formStartTracked && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "form_start", {});
      console.log("[GA4] form_start event fired");
      setFormStartTracked(true);
    }
  };

  const formatNumberWithCommas = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumberFromCommas = (value: string) => {
    return value.replace(/,/g, "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    trackFormStart();
    const { name, value } = e.target;
    
    if (name === "mileage") {
      const formattedValue = formatNumberWithCommas(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    trackFormStart();
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.customerGoal || !formData.year || !formData.make || !formData.model || !formData.trim || !formData.vehicleCondition || !formData.mileage || !formData.zipCode || !formData.email) {
      setError("Please fill in all required fields.");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleContinueToStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    if (!validateStep1()) {
      return;
    }

    // Honeypot validation - if filled, it's a bot
    if (formData.website) {
      setError("Invalid submission detected.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    // Generate UUID client-side
    const recordId = crypto.randomUUID();
    setLeaseReviewId(recordId);
    sessionStorage.setItem("leaseReviewId", recordId);

    // Try to save to Supabase but don't block user flow if it fails
    try {
      const { error: dbError } = await supabase
        .from("lease_review_leads")
        .insert({
          id: recordId, // Use client-generated UUID
          email: formData.email,
          firstname: formData.firstName,
          customer_goal: formData.customerGoal,
          year: formData.year,
          make: formData.make,
          model: formData.model,
          trim: formData.trim,
          vehicle_condition: formData.vehicleCondition,
          current_mileage: parseInt(parseNumberFromCommas(formData.mileage)),
          zip_code: formData.zipCode,
          payment_status: "pending",
        });

      if (dbError) {
        console.error("Failed to save to Supabase (non-blocking):", dbError);
        // Don't stop user flow - they can still proceed with sessionStorage data
      } else {
        // Fire GA4 form_submit event only on successful save
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "form_submit", {});
          console.log("[GA4] form_submit event fired");
        }
      }
    } catch (err) {
      console.error("Error saving to Supabase (non-blocking):", err);
      // Don't stop user flow
    }
    
    // Send notification to support (non-blocking)
    fetch("/api/send-get-started-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch(err => {
      console.error("Failed to send notification:", err);
    });
    
    // Always proceed to Step 2
    setCurrentStep(2);
    
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        setTimeout(() => {
          if (step2FormRef.current) {
            const formTop = step2FormRef.current.getBoundingClientRect().top + window.pageYOffset;
            const targetScroll = Math.max(0, formTop - 120);
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }
          // Re-enable button after navigation completes
          setIsSubmitting(false);
        }, 150);
      }, 50);
    });
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setError("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitToLocalStorage = () => {
    try {
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem("leaseInquiries") || "[]");
      existingSubmissions.push(submissionData);
      localStorage.setItem("leaseInquiries", JSON.stringify(existingSubmissions));
      
      console.log('Successfully stored in localStorage:', submissionData);
      return { success: true };
    } catch (err) {
      console.error('Error storing in localStorage:', err);
      return { success: false, error: err };
    }
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    setError("");
    setIsSubmitting(true);
    
    try {
      // Save form data and leaseReviewId to sessionStorage for checkout page
      sessionStorage.setItem("leaseFormData", JSON.stringify(formData));
      if (leaseReviewId) {
        sessionStorage.setItem("leaseReviewId", leaseReviewId);
      }
      
      // Fire GA4 begin_checkout event for Lease Exit Guide
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "begin_checkout", {
          value: 39,
          currency: "USD",
          items: [{
            item_id: "lease_exit_guide",
            item_name: "Personalized Lease Exit Guide",
            price: 39
          }]
        });
        console.log("[GA4] begin_checkout event fired for Lease Exit Guide");
      }

      // Redirect to checkout page
      window.location.href = "/checkout";
    } catch (err) {
      console.error('Error saving form data:', err);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Get Started | OverLeased - Your Personalized Lease Exit Guide</title>
        <meta name="description" content="Get your personalized lease exit guide. Know exactly what your lease is worth and all your options for just $39." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.overleased.com/get-started" />
      </Head>
      
      <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden">
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
        
        <main className="w-full pt-12 sm:pt-16 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 p-6 sm:p-8 rounded-2xl shadow-sm">
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base font-medium text-gray-700">
                          Step {currentStep} of 2
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                          style={{ width: `${(currentStep / 2) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <CardTitle className="text-xl sm:text-2xl md:text-[1.75rem] text-gray-900 text-center">
                      {currentStep === 1 ? (
                        <>Get Your Personalized Lease Exit Guide</>
                      ) : (
                        <>Complete Your Purchase</>
                      )}
                    </CardTitle>
                    <p className="text-[0.8125rem] sm:text-sm md:text-base text-gray-600 text-center px-2">
                      {currentStep === 1 ? (
                        <>Tell us about your leased vehicle to get started</>
                      ) : (
                        <>Secure your detailed guide</>
                      )}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    {error && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-700">{error}</span>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <form onSubmit={handleContinueToStep2} className="space-y-6">
                        {/* First Line: First Name, Email Address, What's Your Goal */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                              First Name *
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              type="text"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="e.g., John"
                              className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                formData.firstName ? 'bg-blue-50' : 'bg-white'
                              }`}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your@email.com"
                              className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                formData.email ? 'bg-blue-50' : 'bg-white'
                              }`}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="customerGoal" className="text-sm font-medium text-gray-700">
                              What's Your Goal? *
                            </Label>
                            <Select 
                              value={formData.customerGoal} 
                              onValueChange={(value) => handleSelectChange("customerGoal", value)}
                              required
                            >
                              <SelectTrigger 
                                id="customerGoal"
                                className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                                  formData.customerGoal 
                                    ? 'bg-blue-50' 
                                    : 'bg-white [&>span]:text-[0.6875rem] sm:[&>span]:text-sm [&>span]:text-gray-400 sm:[&>span]:text-gray-500'
                                }`}
                              >
                                <SelectValue placeholder="Select your goal" />
                              </SelectTrigger>
                              <SelectContent className="font-sans">
                                <SelectItem value="no-longer-need" className="text-[0.8125rem] sm:text-base">No Longer Need A Vehicle</SelectItem>
                                <SelectItem value="different-vehicle" className="text-[0.8125rem] sm:text-base">Want A Different Vehicle</SelectItem>
                                <SelectItem value="keep-current" className="text-[0.8125rem] sm:text-base">Want To Keep Current Vehicle</SelectItem>
                                <SelectItem value="lower-cost" className="text-[0.8125rem] sm:text-base">Lower Monthly Cost</SelectItem>
                                <SelectItem value="not-sure" className="text-[0.8125rem] sm:text-base">Not Sure</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Second Line: Year, Make, Model, Trim */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                              Year *
                            </Label>
                            <Input
                              id="year"
                              name="year"
                              type="text"
                              required
                              value={formData.year}
                              onChange={handleInputChange}
                              placeholder="e.g., 2022"
                              maxLength={4}
                              className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                formData.year ? 'bg-blue-50' : 'bg-white'
                              }`}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="make" className="text-sm font-medium text-gray-700">
                              Make *
                            </Label>
                            <Input
                              id="make"
                              name="make"
                              type="text"
                              required
                              value={formData.make}
                              onChange={handleInputChange}
                              placeholder="e.g., Toyota"
                              className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                formData.make ? 'bg-blue-50' : 'bg-white'
                              }`}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="model" className="text-sm font-medium text-gray-700">
                              Model *
                            </Label>
                            <Input
                              id="model"
                              name="model"
                              type="text"
                              required
                              value={formData.model}
                              onChange={handleInputChange}
                              placeholder="e.g., Camry"
                              className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                formData.model ? 'bg-blue-50' : 'bg-white'
                              }`}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="trim" className="text-sm font-medium text-gray-700">
                              Trim *
                            </Label>
                            <Input
                              id="trim"
                              name="trim"
                              type="text"
                              required
                              value={formData.trim}
                              onChange={handleInputChange}
                              placeholder="e.g., SE or I'm not sure"
                              className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                formData.trim ? 'bg-blue-50' : 'bg-white'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Third Line: Vehicle Condition, Current Mileage, Zip Code */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="vehicleCondition" className="text-sm font-medium text-gray-700">
                              Vehicle Condition *
                            </Label>
                            <Select 
                              value={formData.vehicleCondition} 
                              onValueChange={(value) => handleSelectChange("vehicleCondition", value)}
                              required
                            >
                              <SelectTrigger 
                                id="vehicleCondition"
                                className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                                  formData.vehicleCondition 
                                    ? 'bg-blue-50' 
                                    : 'bg-white [&>span]:text-[0.6875rem] sm:[&>span]:text-sm [&>span]:text-gray-400 sm:[&>span]:text-gray-500'
                                }`}
                              >
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                              <SelectContent className="font-sans">
                                <SelectItem value="excellent" className="text-[0.8125rem] sm:text-base">Excellent</SelectItem>
                                <SelectItem value="good" className="text-[0.8125rem] sm:text-base">Good</SelectItem>
                                <SelectItem value="fair" className="text-[0.8125rem] sm:text-base">Fair</SelectItem>
                                <SelectItem value="poor" className="text-[0.8125rem] sm:text-base">Poor</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="mileage" className="text-sm font-medium text-gray-700">
                              Current Mileage *
                            </Label>
                            <Input
                              id="mileage"
                              name="mileage"
                              type="text"
                              required
                              value={formData.mileage}
                              onChange={handleInputChange}
                              placeholder="e.g., 25,000"
                              className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                formData.mileage ? 'bg-blue-50' : 'bg-white'
                              }`}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                              ZIP Code *
                            </Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              type="text"
                              required
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              placeholder="e.g., 90210"
                              maxLength={5}
                              className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                formData.zipCode ? 'bg-blue-50' : 'bg-white'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Honeypot field - hidden from users and keyboard navigation, catches bots */}
                        <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                          <Label htmlFor="website">Website (leave blank)</Label>
                          <Input
                            id="website"
                            name="website"
                            type="text"
                            value={formData.website}
                            onChange={handleInputChange}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base sm:text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Processing..." : (
                            <>
                              Continue
                              <ArrowRight className="h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}

                    {currentStep === 2 && (
                      <form ref={step2FormRef} onSubmit={handlePurchase} className="space-y-6">
                        {/* Order Summary */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
                          <h3 className="text-base md:text-lg font-bold text-gray-900">Your Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-semibold text-gray-900">{formData.firstName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Goal:</span>
                              <span className="font-semibold text-gray-900">
                                {formData.customerGoal === "no-longer-need" && "No Longer Need A Vehicle"}
                                {formData.customerGoal === "different-vehicle" && "Want A Different Vehicle"}
                                {formData.customerGoal === "keep-current" && "Want To Keep Current Vehicle"}
                                {formData.customerGoal === "lower-cost" && "Lower Monthly Cost"}
                                {formData.customerGoal === "not-sure" && "Not Sure"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vehicle:</span>
                              <span className="font-semibold text-gray-900">{formData.year} {formData.make} {formData.model}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Trim:</span>
                              <span className="font-semibold text-gray-900">{formData.trim}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Condition:</span>
                              <span className="font-semibold text-gray-900 capitalize">{formData.vehicleCondition}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Mileage:</span>
                              <span className="font-semibold text-gray-900">{formData.mileage} miles</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Location:</span>
                              <span className="font-semibold text-gray-900">ZIP {formData.zipCode}</span>
                            </div>
                          </div>
                        </div>

                        {/* Callout */}
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                          <p className="text-lg font-bold text-blue-900">
                            We'll Show You How to End Your Lease Early
                          </p>
                        </div>

                        {/* What You'll Receive */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-gray-900">What You'll Receive</h3>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-gray-900">Your Vehicle's Estimated Market Value</p>
                                <p className="text-sm text-gray-600">An estimate based on your vehicle, mileage, condition, and location.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-gray-900">Five Lease-Exit Methods</p>
                                <p className="text-sm text-gray-600">Dealer sell-back, trade-in, buyout, transfer, and formal early termination—explained step by step.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-gray-900">Scripts, Worksheets and Action Steps</p>
                                <p className="text-sm text-gray-600">Know who to call, what to ask, which numbers to compare, and what to do next.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-gray-900">Personalized Starting Point</p>
                                <p className="text-sm text-gray-600">An initial direction based on your vehicle and stated goal.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-gray-900">Complimentary Payoff Review</p>
                                <p className="text-sm text-gray-600">Send us your dealer payoff after receiving the guide (instructions included) and we'll calculate your estimated equity.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Preview Your Personalized Reports Section */}
                        <div className="space-y-6 pt-6 border-t border-gray-200">
                          <div className="text-center space-y-2">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">See What You'll Receive</h3>
                            <p className="text-sm text-gray-600">Click any image to view it larger</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {/* Personalized Lease Exit Guide */}
                            <div 
                              className="group relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
                              onClick={() => setLightboxImage('/01-personalized-guide.png')}
                            >
                              <div className="relative aspect-[8.5/11] bg-gray-50">
                                <Image 
                                  src="/01-personalized-guide.png"
                                  alt="Personalized Lease Exit Guide Preview"
                                  fill
                                  className="object-contain p-2"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center">
                                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                              <div className="p-4 text-center border-t border-gray-200">
                                <p className="text-sm font-semibold text-gray-900">Personalized Lease Exit Guide</p>
                                <p className="text-xs text-gray-600 mt-1">Step-by-step instructions for your situation</p>
                              </div>
                            </div>

                            {/* Equity Examples */}
                            <div 
                              className="group relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
                              onClick={() => setLightboxImage('/ChatGPT_Image_Aug_3_2026_01_00_32_PM.png')}
                            >
                              <div className="relative aspect-[8.5/11] bg-gray-50">
                                <Image 
                                  src="/ChatGPT_Image_Aug_3_2026_01_00_32_PM.png"
                                  alt="Equity Examples Preview"
                                  fill
                                  className="object-contain p-2"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center">
                                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                              <div className="p-4 text-center border-t border-gray-200">
                                <p className="text-sm font-semibold text-gray-900">Equity Examples</p>
                                <p className="text-xs text-gray-600 mt-1">Real scenarios showing positive and negative equity</p>
                              </div>
                            </div>

                            {/* Personalized Payoff Review */}
                            <div 
                              className="group relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
                              onClick={() => setLightboxImage('/04-personalized-payoff-review.png')}
                            >
                              <div className="relative aspect-[8.5/11] bg-gray-50">
                                <Image 
                                  src="/04-personalized-payoff-review.png"
                                  alt="Personalized Payoff Review Preview"
                                  fill
                                  className="object-contain p-2"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center">
                                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                              <div className="p-4 text-center border-t border-gray-200">
                                <p className="text-sm font-semibold text-gray-900">Personalized Payoff Review</p>
                                <p className="text-xs text-gray-600 mt-1">Your exact equity calculation and next steps</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full h-12 sm:h-14 sm:flex-[2] sm:order-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              "Processing..."
                            ) : (
                              <>
                                Buy My Guide — $39
                              </>
                            )}
                          </Button>

                          <Button 
                            type="button"
                            onClick={handleBackToStep1}
                            variant="ghost"
                            className="w-full h-12 sm:h-14 sm:flex-1 sm:order-1 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          >
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Back
                          </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="text-center space-y-2 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-gray-500">Secure SSL encrypted payment</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Your information is protected and will never be sold or shared
                          </p>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-black/95 border-0">
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          {lightboxImage && (
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={lightboxImage}
                alt="Report Preview"
                fill
                className="object-contain"
                sizes="95vw"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}