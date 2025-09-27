import React, { useState, useEffect, useLayoutEffect } from "react";
import Head from "next/head";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Clock, Shield, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    licensePlate: "",
    mileage: "",
    zipCode: "",
    vehicleCondition: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Pre-paint scroll to top to avoid any initial offset
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const scrollNow = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      const hasFlag = (() => {
        try {
          return sessionStorage.getItem("forceScrollTopOnGetStarted") === "1";
        } catch {
          return false;
        }
      })();

      requestAnimationFrame(scrollNow);
      setTimeout(scrollNow, 0);
      setTimeout(scrollNow, 50);
      setTimeout(scrollNow, 150);
      setTimeout(scrollNow, 300);

      if (hasFlag) {
        setTimeout(scrollNow, 600);
        setTimeout(scrollNow, 1000);
        try {
          sessionStorage.removeItem("forceScrollTopOnGetStarted");
        } catch {}
      }
    }
  }, []);

  const formatNumberWithCommas = (value: string) => {
    // Remove all non-digits
    const numericValue = value.replace(/\D/g, "");
    
    // Add commas for thousands
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumberFromCommas = (value: string) => {
    // Remove commas and return numeric value
    return value.replace(/,/g, "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "mileage") {
      // Format mileage with commas for display
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

  const submitToSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('lease_inquiries')
        .insert([
          {
            first_name: formData.firstName,
            email: formData.email,
            license_plate: formData.licensePlate,
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

      // Call the email notification Next.js API route instead of Edge Function
      if (data && data[0]) {
        try {
          console.log('Calling Next.js email notification API...');
          
          const emailResponse = await fetch('/api/send-lease-notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            
            // Handle specific error types
            if (emailResult.code === 'ip_restriction') {
              console.warn('Email notification failed due to IP restriction - this is a known issue and will be resolved by the admin');
              // Don't show error to user - the submission was successful
            } else if (emailResult.code === 'config_error') {
              console.warn('Email notification failed due to configuration issue - admin needs to check settings');
              // Don't show error to user - the submission was successful
            } else {
              console.error('Unexpected email notification error:', emailResult);
            }
            
            // Don't fail the whole submission if email fails - the important part (data submission) succeeded
          } else {
            console.log('Email notification sent successfully:', emailResult);
          }
        } catch (emailErr) {
          console.error('Error calling email notification API:', emailErr);
          
          // Parse the error to provide better context
          if (emailErr && typeof emailErr === 'object') {
            const errorMessage = emailErr.message || JSON.stringify(emailErr);
            
            if (errorMessage.includes('Brevo IP restriction') || errorMessage.includes('ip_restriction')) {
              console.warn('Email notification blocked by Brevo IP restrictions - using Next.js API route should resolve this');
            } else if (errorMessage.includes('config_error')) {
              console.warn('Email service configuration error - admin needs to check Brevo API key');
            }
          }
          
          // Don't fail the whole submission if email fails - the submission to database was successful
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

    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.licensePlate || !formData.mileage || !formData.zipCode || !formData.vehicleCondition) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // First try to submit to Supabase
      const supabaseResult = await submitToSupabase();
      
      if (supabaseResult.success) {
        console.log('Form successfully submitted to Supabase');
        setIsSubmitted(true);
      } else {
        // If Supabase fails, fallback to localStorage
        console.log('Supabase submission failed, using localStorage fallback');
        const localStorageResult = submitToLocalStorage();
        
        if (localStorageResult.success) {
          setIsSubmitted(true);
        } else {
          throw new Error('Both Supabase and localStorage submissions failed');
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError("Something went wrong. Please try again.");
    } finally {
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
                <CardContent className="p-8 text-center">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Thank You for Your Submission
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    We will be in touch shortly.
                  </p>
                  
                  <Button 
                    onClick={() => window.location.href = "/"}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Return to Homepage
                  </Button>
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
        {/* Custom Header with Back to Home Button */}
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
        
        <main className="w-full pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4">
              {/* Header Section */}
              <div className="text-center mb-12">
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    <span className="whitespace-nowrap">100% Secure & Free</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    <span className="whitespace-nowrap">End Your Lease In Less Than A Week</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    <span className="whitespace-nowrap">No Commitment Required</span>
                  </div>
                </div>
              </div>

              {/* Form Section - Smaller Width */}
              <div className="max-w-3xl mx-auto">
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                    <CardTitle className="text-xl sm:text-2xl text-gray-900 text-center">
                      Vehicle Information
                    </CardTitle>
                    <p className="text-sm sm:text-base text-gray-600 text-center px-2">
                      Tell us about your leased vehicle to get started:
                    </p>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                          <span className="text-red-700">{error}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className={`h-12 focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-xs placeholder:text-gray-400 sm:placeholder:text-sm sm:placeholder:text-gray-500 ${
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
                            placeholder="Enter your email"
                            className={`h-12 focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-xs placeholder:text-gray-400 sm:placeholder:text-sm sm:placeholder:text-gray-500 ${
                              formData.email ? 'bg-blue-50' : 'bg-white'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="licensePlate" className="text-sm font-medium text-gray-700">
                            License Plate Number *
                          </Label>
                          <Input
                            id="licensePlate"
                            name="licensePlate"
                            type="text"
                            required
                            value={formData.licensePlate}
                            onChange={handleInputChange}
                            placeholder="e.g., ABC1234"
                            className={`h-12 focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-xs placeholder:text-gray-400 sm:placeholder:text-sm sm:placeholder:text-gray-500 ${
                              formData.licensePlate ? 'bg-blue-50' : 'bg-white'
                            }`}
                          />
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
                            className={`h-12 focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-xs placeholder:text-gray-400 sm:placeholder:text-sm sm:placeholder:text-gray-500 ${
                              formData.mileage ? 'bg-blue-50' : 'bg-white'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="vehicleCondition" className="text-sm font-medium text-gray-700">
                            Vehicle Condition *
                          </Label>
                          <Select onValueChange={handleSelectChange} required>
                            <SelectTrigger 
                              className={`h-12 text-gray-900 data-[placeholder]:text-xs sm:data-[placeholder]:text-sm data-[placeholder]:text-gray-400 sm:data-[placeholder]:text-gray-500 focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                                formData.vehicleCondition ? 'bg-blue-50' : 'bg-white'
                              }`}
                            >
                              <SelectValue placeholder="Select vehicle condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bad">Bad</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="excellent">Excellent</SelectItem>
                            </SelectContent>
                          </Select>
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
                            className={`h-12 focus:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-xs placeholder:text-gray-400 sm:placeholder:text-sm sm:placeholder:text-gray-500 ${
                              formData.zipCode ? 'bg-blue-50' : 'bg-white'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-base sm:text-lg font-semibold"
                        >
                          <span className="lg:hidden">Check My Lease Options</span>
                          <span className="hidden lg:inline">Check My Lease Options</span>
                        </Button>

                        <p className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 text-center italic mt-4 px-2">
                          By submitting this form, you agree to be contacted by OverLeased.
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
