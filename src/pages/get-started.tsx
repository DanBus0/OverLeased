import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Car, Clock, Shield, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Info, UserCheck } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showLicensePlateInfo, setShowLicensePlateInfo] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    firstName: "",
    email: "",
    licensePlate: "",
    mileage: "",
    zipCode: "",
    vehicleCondition: "",
    consentGiven: false
  });
  const step2FormRef = useRef<HTMLFormElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

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
    } catch (error) {
    }
  }, []);

  const formatNumberWithCommas = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumberFromCommas = (value: string) => {
    return value.replace(/,/g, "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      vehicleCondition: value
    }));
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      consentGiven: checked
    }));
  };

  const validateStep1 = () => {
    if (!formData.make || !formData.model || !formData.vehicleCondition || !formData.zipCode) {
      setError("Please fill in all required fields.");
      return false;
    }
    setError("");
    return true;
  };

  const handleContinueToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
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
          }, 150);
        }, 50);
      });
    }
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setError("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitToSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('lease_inquiries')
        .insert([
          {
            make: formData.make,
            model: formData.model,
            first_name: formData.firstName,
            email: formData.email,
            license_plate: formData.licensePlate || null,
            current_mileage: parseInt(parseNumberFromCommas(formData.mileage)),
            zip_code: formData.zipCode,
            vehicle_condition: formData.vehicleCondition
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Successfully submitted to Supabase:', data);

      if (data && data[0]) {
        try {
          console.log('Calling Next.js email notification API...');
          
          const emailResponse = await fetch('/api/send-lease-notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              make: formData.make,
              model: formData.model,
              email: formData.email,
              first_name: formData.firstName,
              license_plate: formData.licensePlate,
              current_mileage: parseInt(parseNumberFromCommas(formData.mileage)),
              zip_code: formData.zipCode,
              vehicle_condition: formData.vehicleCondition,
              created_at: data[0].created_at
            }),
          });

          const emailResult = await emailResponse.json();

          if (!emailResponse.ok) {
            console.error('Email notification error:', emailResult);
            
            if (emailResult.code === 'ip_restriction') {
              console.warn('Email notification failed due to IP restriction - this is a known issue and will be resolved by the admin');
            } else if (emailResult.code === 'config_error') {
              console.warn('Email notification failed due to configuration issue - admin needs to check settings');
            } else {
              console.error('Unexpected email notification error:', emailResult);
            }
          } else {
            console.log('Email notification sent successfully:', emailResult);
          }
        } catch (emailErr) {
          console.error('Error calling email notification API:', emailErr);
          
          if (emailErr && typeof emailErr === 'object') {
            const errorMessage = emailErr.message || JSON.stringify(emailErr);
            
            if (errorMessage.includes('Brevo IP restriction') || errorMessage.includes('ip_restriction')) {
              console.warn('Email notification blocked by Brevo IP restrictions - using Next.js API route should resolve this');
            } else if (errorMessage.includes('config_error')) {
              console.warn('Email service configuration error - admin needs to check Brevo API key');
            }
          }
        }
      }

      return { success: true, data };
    } catch (err) {
      console.error('Error submitting to Supabase:', err);
      return { success: false, error: err };
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!formData.firstName || !formData.email || !formData.mileage) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.consentGiven) {
      setError("Please provide consent to review your lease information.");
      setIsSubmitting(false);
      return;
    }

    try {
      const supabaseResult = await submitToSupabase();
      
      if (supabaseResult.success) {
        console.log('Form successfully submitted to Supabase');
        window.location.href = "/lease-review-submitted";
      } else {
        console.log('Supabase submission failed, using localStorage fallback');
        const localStorageResult = submitToLocalStorage();
        
        if (localStorageResult.success) {
          window.location.href = "/lease-review-submitted";
        } else {
          throw new Error('Both Supabase and localStorage submissions failed');
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>Thank You | OverLeased - End Your Car Lease Early</title>
          <meta name="description" content="Thank you for your submission. We'll be in touch soon with offers to help you end your car lease early." />
          <meta name="robots" content="noindex" />
        </Head>
        <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden">
          <main className="w-full pt-24 pb-16">
            <div className="max-w-2xl mx-auto px-4">
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Thanks — Your Lease Review Is In Progress
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
                    We've received your details and are reviewing your lease information.
                    <br />
                    <br />
                    Within the next business day, we'll email you personalized next steps — including how to confirm your dealer lease payoff amount and connecting with authorized dealerships near you.
                  </p>
                  
                  <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-[0.6875rem] leading-tight tracking-wide sm:text-base sm:leading-normal sm:tracking-normal">Step 1: Details received</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-500 text-[0.6875rem] leading-tight tracking-wide sm:text-base sm:leading-normal sm:tracking-normal">Step 2: Verify lease payoff amount</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-500 text-[0.6875rem] leading-tight tracking-wide sm:text-base sm:leading-normal sm:tracking-normal">Step 3: Receive dealer offers</p>
                        <p className="text-[0.625rem] sm:text-xs text-gray-500 mt-1 italic">We'll never contact a dealership without your explicit permission.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      onClick={() => window.location.href = "/"}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Return to Homepage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
          
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Get Started | End Your Car Lease Early - OverLeased</title>
        <meta name="description" content="Start the process to end your car lease early. Get cash offers from verified dealers and avoid lease-end penalties." />
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
        
        <main className="w-full pt-16 pb-16">
          <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
              </div>

              <div className="max-w-3xl mx-auto">
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
                        End Your Lease Early —<br className="sm:hidden" /> Check If You Qualify
                      </CardTitle>
                      <p className="text-[0.8125rem] sm:text-sm md:text-base text-gray-600 text-center px-2">
                        Submit your details and we'll email you<br className="sm:hidden" /> within 24 hours with next steps.
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mt-2">
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
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="vehicleCondition" className="text-sm font-medium text-gray-700">
                                Vehicle Condition *
                              </Label>
                              <select
                                id="vehicleCondition"
                                name="vehicleCondition"
                                required
                                value={formData.vehicleCondition}
                                onChange={(e) => handleSelectChange(e.target.value)}
                                className={`h-12 w-full rounded-md border border-input px-3 py-2 text-[0.75rem] sm:text-[0.9375rem] ring-offset-background focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                                  formData.vehicleCondition 
                                    ? 'bg-blue-50 text-gray-900' 
                                    : 'bg-white text-gray-400 sm:text-gray-500'
                                }`}
                                style={{
                                  color: formData.vehicleCondition ? '#111827' : '#9ca3af'
                                }}
                              >
                                <option value="" disabled hidden className="text-gray-400 sm:text-gray-500">Select condition</option>
                                <option value="bad" className="text-gray-900">Bad</option>
                                <option value="average" className="text-gray-900">Average</option>
                                <option value="good" className="text-gray-900">Good</option>
                                <option value="excellent" className="text-gray-900">Excellent</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                                Zip Code *
                              </Label>
                              <Input
                                id="zipCode"
                                name="zipCode"
                                type="text"
                                required
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                placeholder="e.g., 90210"
                                className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                  formData.zipCode ? 'bg-blue-50' : 'bg-white'
                                }`}
                              />
                            </div>
                          </div>

                          <Button 
                            type="submit"
                            className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base sm:text-lg font-semibold flex items-center justify-center gap-2"
                          >
                            Continue
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </form>
                      )}

                      {currentStep === 2 && (
                        <form ref={step2FormRef} onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <div className="flex items-center gap-1">
                                <Label htmlFor="licensePlate" className="text-sm font-medium text-gray-700">
                                  License Plate Number <span className="text-gray-500 font-normal">(optional)</span>
                                </Label>
                                <button 
                                  type="button" 
                                  onClick={() => setShowLicensePlateInfo(!showLicensePlateInfo)}
                                  className="inline-flex items-center justify-center touch-manipulation p-1 rounded-full hover:bg-gray-100 active:bg-blue-100 transition-colors"
                                  aria-label="License plate information"
                                >
                                  <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                </button>
                              </div>
                              <Input
                                id="licensePlate"
                                name="licensePlate"
                                type="text"
                                value={formData.licensePlate}
                                onChange={handleInputChange}
                                placeholder="e.g., ABC1234"
                                className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                  formData.licensePlate ? 'bg-blue-50' : 'bg-white'
                                }`}
                              />
                              {showLicensePlateInfo && (
                                <div className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-2 mt-1">
                                  We use plate information for lease payoff calculations. We never share vehicle details without your explicit consent.
                                </div>
                              )}
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
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                placeholder="Enter your email"
                                className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                  formData.email ? 'bg-blue-50' : 'bg-white'
                                }`}
                              />
                            </div>

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
                                placeholder="Enter your first name"
                                className={`h-12 text-[0.8125rem] sm:text-base focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-[0.6875rem] sm:placeholder:text-sm placeholder:text-gray-400 sm:placeholder:text-gray-500 ${
                                  formData.firstName ? 'bg-blue-50' : 'bg-white'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="pt-2 space-y-4">
                            <div className="flex items-start gap-1.5 p-2 bg-gray-50 rounded-lg border border-gray-200">
                              <Checkbox
                                id="consent"
                                checked={formData.consentGiven}
                                onCheckedChange={handleConsentChange}
                                className="mt-0.5 flex-shrink-0"
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor="consent"
                                  className="text-[11px] sm:text-xs text-gray-700 leading-[1.5] cursor-pointer block"
                                >
                                  <span className="font-semibold">Consent to Review Your <br className="sm:hidden" />Vehicle Information</span>
                                  <br />
                                  <span className="text-gray-600 block mt-1">
                                    By submitting, you authorize OverLeased to review your lease information to determine your options for ending your lease. You understand that OverLeased is not a dealer, broker, lender, or lessor and does not negotiate or execute any vehicle sale or lease payoff.
                                  </span>
                                </Label>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                              <Button 
                                type="button"
                                onClick={handleBackToStep1}
                                variant="ghost"
                                className="w-full h-9 sm:h-12 md:h-14 sm:flex-1 text-xs sm:text-base md:text-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 order-2 sm:order-1"
                              >
                                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2" />
                                Back
                              </Button>

                              <Button 
                                type="submit" 
                                disabled={isSubmitting || !formData.consentGiven}
                                className="w-full h-12 sm:h-14 sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                              >
                                {isSubmitting ? "Submitting..." : "Check If You Qualify"}
                              </Button>
                            </div>
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
    </>
  );
}