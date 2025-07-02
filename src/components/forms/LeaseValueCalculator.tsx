import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Removed Select imports as they are unused
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calculator, Car, Mail, User, /* MapPin removed */ Gauge, Calendar, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";
import { leaseInquiryService, type LeaseInquiry } from "@/services/leaseInquiryService";
import { openaiService } from "@/services/openaiService";
// import { emailService } from "@/services/emailService"; // Removed unused import
import { useToast } from "@/hooks/use-toast";
import { contactService } from "@/services/contactService";

// Removed US_STATES constant as it's unused

const leaseValueSchema = z.object({
  email: z.string().min(1, "Required").email("Please enter a valid email address"),
  firstName: z.string().min(1, "Required"),
  make: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  trim: z.string().optional(),
  year: z.string()
    .min(1, "Required")
    .refine((val) => {
      if (val.length === 0) return false;
      const num = parseInt(val);
      if (isNaN(num)) return false;
      return num >= 1990 && num <= new Date().getFullYear() + 1;
    }, `Please enter a year between 1990 and ${new Date().getFullYear() + 1}`)
    .transform((val) => {
      const num = parseInt(val);
      return isNaN(num) ? 0 : num;
    }),
  licensePlate: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  currentMileage: z.string().min(1, "Required").transform((val) => {
    const num = parseInt(val.replace(/,/g, ""));
    if (isNaN(num)) return 0;
    if (num < 0) throw new Error("Please enter a valid mileage");
    return num;
  }),
  annualMileageAllowance: z.string().min(1, "Required").transform((val) => {
    const num = parseInt(val.replace(/,/g, ""));
    if (isNaN(num)) return 0;
    if (num < 1) throw new Error("Please enter a valid mileage allowance");
    return num;
  }),
  monthsRemaining: z.string().min(1, "Required").transform((val) => {
    const num = parseInt(val);
    if (isNaN(num)) return 0;
    if (num < 1) throw new Error("Please enter a valid number of months");
    return num;
  }),
  leaseTerm: z.string().min(1, "Required").transform((val) => {
    const num = parseInt(val);
    if (isNaN(num)) return 0;
    if (num < 1) throw new Error("Please enter a valid lease term");
    return num;
  }),
});

type LeaseValueData = z.infer<typeof leaseValueSchema>;

interface LeaseValueResult {
  estimatedEquity: number;
  marketValue: number;
  payoffAmount: number;
  msrp?: number;
  residualValue?: number;
  isPositiveEquity: boolean;
  dealerInterest: "High" | "Medium" | "Low";
  nextSteps: string[];
}

export default function LeaseValueCalculator() {
  const [calculationResult, setCalculationResult] = React.useState<LeaseValueResult | null>(null);
  const [isCalculated, setIsCalculated] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [savedInquiry, setSavedInquiry] = React.useState<LeaseInquiry | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [currentMileageDisplay, setCurrentMileageDisplay] = React.useState("");
  const [annualMileageDisplay, setAnnualMileageDisplay] = React.useState("");
  const [isContactConfirmed, setIsContactConfirmed] = React.useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LeaseValueData>({
    resolver: zodResolver(leaseValueSchema),
  });

  const watchedValues = watch();

  // Helper function to determine if field should have blue background
  const getFieldClassName = (fieldName: keyof LeaseValueData, baseClassName: string = "") => {
    const hasValue = watchedValues[fieldName] && String(watchedValues[fieldName]).trim() !== "";
    const shouldShowBlue = isSubmitting || hasValue;
    const blueClass = shouldShowBlue ? "bg-blue-50" : "";
    
    return `${baseClassName} ${blueClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-gray-300`.trim();
  };

  // Helper function for mileage fields that use display state
  const getMileageFieldClassName = (displayValue: string, baseClassName: string = "") => {
    const hasValue = displayValue && displayValue.trim() !== "";
    const shouldShowBlue = isSubmitting || hasValue;
    const blueClass = shouldShowBlue ? "bg-blue-50" : "";
    
    return `${baseClassName} ${blueClass} placeholder:text-gray-300`.trim();
  };

  // Helper function to format numbers with commas
  const formatNumberWithCommas = (value: string): string => {
    const numericValue = value.replace(/,/g, "");
    if (numericValue === "") return "";
    const number = parseInt(numericValue);
    if (isNaN(number)) return "";
    return number.toLocaleString();
  };

  // Helper function to parse formatted number back to number - REMOVED as unused
  // const parseFormattedNumber = (value: string): number => {
  //   const numericValue = value.replace(/,/g, "");
  //   const parsed = parseInt(numericValue);
  //   return isNaN(parsed) ? 0 : parsed;
  // };

  // Handle current mileage input
  const handleCurrentMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    setCurrentMileageDisplay(formatted);
    // Don't use setValue here, let the register handle it
  };

  // Handle annual mileage input
  const handleAnnualMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    setAnnualMileageDisplay(formatted);
    // Don't use setValue here, let the register handle it
  };

  const calculateLeaseValue = async (data: LeaseValueData): Promise<LeaseValueResult> => {
    console.log("🚀 Starting lease calculation with ", data);
    
    try {
      console.log("📡 Attempting live market calculation...");
      const analysis = await openaiService.calculateLeaseEquity({
        make: data.make,
        model: data.model,
        year: data.year,
        trim: data.trim,
        licensePlate: data.licensePlate,
        state: data.state,
        currentMileage: data.currentMileage,
        annualMileageAllowance: data.annualMileageAllowance,
        monthsRemaining: data.monthsRemaining,
        leaseTerm: data.leaseTerm,
      });

      // Type guard to check for success response
      if (!('error' in analysis)) {
        console.log("✅ OpenAI calculation successful! Results:", analysis);
        return {
          estimatedEquity: analysis.estimatedEquity,
          marketValue: analysis.estimatedMarketValue,
          payoffAmount: analysis.estimatedPayoffAmount,
          msrp: analysis.estimatedRetailPrice,
          residualValue: analysis.estimatedResidualValue,
          isPositiveEquity: analysis.isPositiveEquity,
          dealerInterest: analysis.dealerInterest,
          nextSteps: analysis.nextSteps
        };
      }

      // If it's an error, throw to trigger the catch block with the fallback logic
      throw new Error(analysis.message || 'API returned error');

    } catch (error) {
      console.error("❌ Live calculation failed, using fallback estimate:", error);
      toast({
        title: "Using Estimated Data",
        description: "We couldn't get live market data, so your results are based on a standard estimate.",
        variant: "default",
      });
      console.log("🔄 Switching to fallback calculation method...");
      
      // Enhanced fallback calculation
      const monthsElapsed = data.leaseTerm - data.monthsRemaining;
      let estimatedMarketValue = 30000;
      
      // Adjust for mileage and depreciation
      const expectedMileage = data.annualMileageAllowance * (monthsElapsed / 12);
      const mileageDifference = data.currentMileage - expectedMileage;
      estimatedMarketValue -= Math.max(0, mileageDifference * 0.15);
      estimatedMarketValue *= Math.pow(0.85, monthsElapsed / 12);
      
      const estimatedMSRP = estimatedMarketValue / Math.pow(0.85, monthsElapsed / 12) * 1.2;
      const estimatedResidualValue = estimatedMSRP * 0.57;
      const estimatedPayoff = ((estimatedMSRP - estimatedResidualValue) / data.leaseTerm * data.monthsRemaining) + estimatedResidualValue;
      const estimatedEquity = estimatedMarketValue - estimatedPayoff;
      const isPositiveEquity = estimatedEquity > 0;
      
      let dealerInterest: "High" | "Medium" | "Low" = "Low";
      if (estimatedEquity > 3000) dealerInterest = "High";
      else if (estimatedEquity > 1000) dealerInterest = "Medium";
      
      const nextSteps = isPositiveEquity 
        ? [
            "Connect with verified dealers in your area",
            "Get competitive offers for your lease",
            "Schedule vehicle inspection",
            "Complete the transaction and get paid"
          ]
        : [
            "Consider keeping your lease until maturity",
            "Explore lease transfer options",
            "Review early termination costs",
            "Consult with our specialists for alternatives"
          ];

      const fallbackResult = {
        estimatedEquity: Math.round(estimatedEquity),
        marketValue: Math.round(estimatedMarketValue),
        payoffAmount: Math.round(estimatedPayoff),
        msrp: Math.round(estimatedMSRP),
        residualValue: Math.round(estimatedResidualValue),
        isPositiveEquity,
        dealerInterest,
        nextSteps,
      };

      console.log("🔧 Fallback calculation completed:", fallbackResult);
      return fallbackResult;
    }
  };

  const onSubmit = async (data: LeaseValueData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setIsContactConfirmed(false); // Reset contact confirmation when new submission starts
    
    try {
      const inquiryData: LeaseInquiry = {
        email: data.email,
        first_name: data.firstName,
        license_plate: data.licensePlate,
        vehicle_state: data.state,
        current_mileage: data.currentMileage,
        annual_mileage_allowance: data.annualMileageAllowance,
        months_remaining: data.monthsRemaining,
        lease_term: data.leaseTerm,
      };

      const savedInquiry = await leaseInquiryService.createInquiry(inquiryData);
      setSavedInquiry(savedInquiry);

      const result = await calculateLeaseValue(data);
      setCalculationResult(result);

      if (savedInquiry.id) {
        await leaseInquiryService.updateInquiryWithResults(savedInquiry.id, {
          estimated_equity: result.estimatedEquity,
          market_value: result.marketValue,
          payoff_amount: result.payoffAmount,
          is_positive_equity: result.isPositiveEquity,
          dealer_interest: result.dealerInterest,
        });
      }

      setIsCalculated(true);

      // Enhanced scroll behavior that doesn't cause refresh
      scrollToResults();

    } catch (error) {
      console.error("Calculation error:", error);
      setSubmitError("There was an error processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add explicit form submit handler to prevent page refresh
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Explicitly prevent default form submission
    e.stopPropagation(); // Add this to ensure the event doesn't bubble up
    handleSubmit(onSubmit)(e);
  };

  const resetCalculator = () => {
    // Prevent any potential page refresh during reset
    setCalculationResult(null);
    setIsCalculated(false);
    setSavedInquiry(null);
    setSubmitError(null);
    setCurrentMileageDisplay("");
    setAnnualMileageDisplay("");
    setIsContactConfirmed(false);
    reset(); // This only resets form fields, no page refresh
  };

  // Enhanced scroll behavior that doesn't cause page refresh
  const scrollToResults = () => {
    setTimeout(() => {
      const analysisTitle = document.getElementById('analysis-title');
      if (analysisTitle) {
        analysisTitle.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  return (
    <section id="calculator" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            Free Instant Analysis
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Check Your Lease Value
          </h2>
          
          {/* FREE CALLOUT - Near calculator */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">🎯</span>
              <h3 className="text-lg font-bold text-green-800">Completely Free Service</h3>
            </div>
            <p className="text-sm text-green-700 font-medium whitespace-nowrap">
              There are no out-of-pocket costs for our service. You could potentially make thousands of dollars with zero risk.
            </p>
          </div>
          
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate of your lease equity and connect with dealers ready to make offers.
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calculator className="h-6 w-6" />
              Lease Value Calculator
            </CardTitle>
            <CardDescription className="text-blue-100">
              Enter your lease details below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {submitError && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {submitError}
                </AlertDescription>
              </Alert>
            )}

            {savedInquiry && !calculationResult && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Calculating your lease equity...
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-8" noValidate>
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className={getFieldClassName("firstName", "placeholder:text-gray-300")}
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className={getFieldClassName("email", "pl-10 placeholder:text-gray-300")}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Car className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Vehicle Information</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Top row: Make, Model, Trim */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="make" className="text-sm font-medium text-gray-700">
                        Make *
                      </Label>
                      <Input
                        id="make"
                        placeholder="Toyota"
                        className={getFieldClassName("make", "placeholder:text-gray-300")}
                        {...register("make")}
                      />
                      {errors.make && (
                        <p className="text-sm text-red-500">{errors.make.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model" className="text-sm font-medium text-gray-700">
                        Model *
                      </Label>
                      <Input
                        id="model"
                        placeholder="Camry"
                        className={getFieldClassName("model", "placeholder:text-gray-300")}
                        {...register("model")}
                      />
                      {errors.model && (
                        <p className="text-sm text-red-500">{errors.model.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="trim" className="text-sm font-medium text-gray-700">
                        Trim
                      </Label>
                      <Input
                        id="trim"
                        placeholder="SE"
                        className={getFieldClassName("trim", "placeholder:text-gray-300")}
                        {...register("trim")}
                      />
                      {errors.trim && (
                        <p className="text-sm text-red-500">{errors.trim.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Bottom row: License Plate Number, Vehicle State, Year */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="licensePlate" className="text-sm font-medium text-gray-700">
                        License Plate Number *
                      </Label>
                      <Input
                        id="licensePlate"
                        placeholder="ABC123"
                        className={getFieldClassName("licensePlate", "placeholder:text-gray-300")}
                        {...register("licensePlate")}
                      />
                      {errors.licensePlate && (
                        <p className="text-sm text-red-500">{errors.licensePlate.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                        Vehicle State *
                      </Label>
                      <Input
                        id="state"
                        placeholder="PA"
                        className={getFieldClassName("state", "placeholder:text-gray-300")}
                        {...register("state")}
                      />
                      {errors.state && (
                        <p className="text-sm text-red-500">{errors.state.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                        Year *
                      </Label>
                      <Input
                        id="year"
                        type="text"
                        placeholder="2022"
                        className={getFieldClassName("year")}
                        {...register("year")}
                      />
                      {errors.year && (
                        <p className="text-sm text-red-500">{errors.year.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Gauge className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Lease Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentMileage" className="text-sm font-medium text-gray-700">
                      Current Mileage *
                    </Label>
                    <Input
                      id="currentMileage"
                      type="text"
                      placeholder="25,000"
                      value={currentMileageDisplay}
                      onChange={handleCurrentMileageChange}
                      className={getMileageFieldClassName(currentMileageDisplay, "placeholder:text-gray-300")}
                      {...register("currentMileage", {
                        onChange: (e) => {
                          const formatted = formatNumberWithCommas(e.target.value);
                          setCurrentMileageDisplay(formatted);
                        }
                      })}
                    />
                    {errors.currentMileage && (
                      <p className="text-sm text-red-500">{errors.currentMileage.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="annualMileageAllowance" className="text-sm font-medium text-gray-700">
                      Annual Mileage Allowance *
                    </Label>
                    <Input
                      id="annualMileageAllowance"
                      type="text"
                      placeholder="12,000"
                      value={annualMileageDisplay}
                      onChange={handleAnnualMileageChange}
                      className={getMileageFieldClassName(annualMileageDisplay, "placeholder:text-gray-300")}
                      {...register("annualMileageAllowance", {
                        onChange: (e) => {
                          const formatted = formatNumberWithCommas(e.target.value);
                          setAnnualMileageDisplay(formatted);
                        }
                      })}
                    />
                    {errors.annualMileageAllowance && (
                      <p className="text-sm text-red-500">{errors.annualMileageAllowance.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="leaseTerm" className="text-sm font-medium text-gray-700">
                      Lease Term (Months) *
                    </Label>
                    <Input
                      id="leaseTerm"
                      type="text"
                      placeholder="36"
                      min="1"
                      className={getFieldClassName("leaseTerm")}
                      {...register("leaseTerm")}
                    />
                    {errors.leaseTerm && (
                      <p className="text-sm text-red-500">{errors.leaseTerm.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthsRemaining" className="text-sm font-medium text-gray-700">
                      Months Remaining on Lease *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="monthsRemaining"
                        type="text"
                        placeholder="18"
                        min="1"
                        className={getFieldClassName("monthsRemaining", "pl-10")}
                        {...register("monthsRemaining")}
                      />
                    </div>
                    {errors.monthsRemaining && (
                      <p className="text-sm text-red-500">{errors.monthsRemaining.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg py-6"
                  onClick={(e) => {
                    // Additional prevention of page refresh
                    e.preventDefault();
                    handleFormSubmit(e);
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {savedInquiry ? "Calculating Your Equity..." : "Saving Your Information..."}
                    </>
                  ) : (
                    <>
                      Check Your Lease Value
                      <Calculator className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                {isCalculated && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={(e) => {
                      e.preventDefault(); // Prevent any potential page refresh
                      resetCalculator();
                    }} 
                    className="px-6"
                  >
                    Reset
                  </Button>
                )}
              </div>
              
              {/* Disclaimer text */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500 italic max-w-[600px] mx-auto leading-tight">
                  By clicking "Check Your Lease Value", I give OverLeased permission to share my information with trusted third parties, which may include the sale of data as described in the Privacy Policy.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {calculationResult && (
          <Card className="mt-8 shadow-xl border-0">
            <CardHeader id="analysis-title" className={`${calculationResult.isPositiveEquity ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' : 'bg-gradient-to-r from-orange-600 to-orange-700'} text-white rounded-t-lg`}>
              <CardTitle className="flex items-center gap-2 text-2xl">
                {calculationResult.isPositiveEquity ? (
                  <TrendingUp className="h-6 w-6" />
                ) : (
                  <TrendingDown className="h-6 w-6" />
                )}
                Your Lease Equity Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Alert className={`mb-8 ${calculationResult.isPositiveEquity ? 'border-emerald-200 bg-emerald-50' : 'border-orange-200 bg-orange-50'}`}>
                <AlertCircle className={`h-4 w-4 ${calculationResult.isPositiveEquity ? 'text-emerald-600' : 'text-orange-600'}`} />
                <AlertDescription className={`${calculationResult.isPositiveEquity ? 'text-emerald-800' : 'text-orange-800'} font-medium`}>
                  {calculationResult.isPositiveEquity ? (
                    <>🎉 Great news! You have <strong>${calculationResult.estimatedEquity.toLocaleString()}</strong> in positive equity!</>
                  ) : (
                    <>You currently have <strong>${Math.abs(calculationResult.estimatedEquity).toLocaleString()}</strong> in negative equity.</>
                  )}
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${calculationResult.marketValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-800 font-medium">Estimated Market Value</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-gray-600 mb-2">
                    ${calculationResult.payoffAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-800 font-medium">Estimated Payoff Amount</div>
                </div>
                <div className={`text-center p-6 rounded-lg border-2 ${calculationResult.isPositiveEquity ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'}`}>
                  <div className={`text-3xl font-bold mb-2 ${calculationResult.isPositiveEquity ? 'text-emerald-600' : 'text-orange-600'}`}>
                    {calculationResult.isPositiveEquity ? '+' : '-'}${Math.abs(calculationResult.estimatedEquity).toLocaleString()}
                  </div>
                  <div className={`text-sm font-medium ${calculationResult.isPositiveEquity ? 'text-emerald-800' : 'text-orange-800'}`}>
                    Your Lease Equity
                  </div>
                </div>
              </div>

              {/* Detailed Calculation Breakdown */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Calculation Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Current Market Value:</span>
                      <span className="text-sm font-bold text-blue-600">
                        ${calculationResult.marketValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Lease Payoff Amount:</span>
                      <span className="text-sm font-bold text-gray-900">
                        ${calculationResult.payoffAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Your Equity:</span>
                      <span className={`text-sm font-bold ${calculationResult.isPositiveEquity ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {calculationResult.isPositiveEquity ? '+' : '-'}${Math.abs(calculationResult.estimatedEquity).toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="text-xs text-gray-500 bg-white p-3 rounded border">
                        <strong>Formula:</strong> Market Value - Lease Payoff Amount = Your Equity
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Retail Price:</span>
                      <span className="text-sm font-bold text-gray-900">
                        ${calculationResult.msrp?.toLocaleString() || '0'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Residual Value:</span>
                      <span className="text-sm font-bold text-gray-900">
                        ${calculationResult.residualValue ? calculationResult.residualValue.toLocaleString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Disclaimer moved inside the gray area */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    * Results may slightly vary due to market data updates.
                  </p>
                </div>
              </div>

              <div className="text-center mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Dealer Interest Level</h4>
                <div className="flex justify-center items-center gap-3 mb-4">
                  <Badge 
                    variant="secondary" 
                    className={`px-3 py-1 ${
                      calculationResult.dealerInterest === 'High' ? 'bg-emerald-100 text-emerald-800' :
                      calculationResult.dealerInterest === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {calculationResult.dealerInterest} Interest
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  {calculationResult.dealerInterest === 'High' && "Multiple dealers are likely interested in your lease!"}
                  {calculationResult.dealerInterest === 'Medium' && "Some dealers may be interested in your car."}
                  {calculationResult.dealerInterest === 'Low' && "Limited dealer interest, but options are still available."}
                </p>
              </div>

              {/* Contact Us Section - Different messages based on dealer interest */}
              <div className={`mt-8 p-6 rounded-lg text-white text-center ${
                calculationResult.dealerInterest === 'Low' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700'
              }`}>
                <h4 className="text-xl font-bold mb-2">
                  {calculationResult.dealerInterest === 'Low' 
                    ? "Let's Discuss Your Options" 
                    : "Ready to Get Started?"
                  }
                </h4>
                <p className="text-blue-100 mb-4">
                  {calculationResult.dealerInterest === 'Low' 
                    ? "While dealer interest may be limited, OverLeased can still help you explore your options and find the best solution for your lease situation."
                    : "Click below and OverLeased will contact you to secure an offer with verified dealers in your area."
                  }
                </p>
                <Button 
                  className={`${
                    isContactConfirmed 
                      ? "bg-green-500 text-white cursor-not-allowed opacity-75 hover:bg-green-500" 
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                  disabled={isContactConfirmed}
                  onClick={async (e) => {
                    e.preventDefault(); // Prevent page refresh
                    e.stopPropagation(); // Stop event bubbling
                    
                    if (isContactConfirmed) return; // Prevent action if already confirmed
                    
                    try {
                      console.log('Contact Me button clicked - starting backend flow');
                      
                      // Check if we have the required data
                      if (!watchedValues.firstName || !watchedValues.email) {
                        console.error('Missing required contact information');
                        toast({
                          title: "Missing Information",
                          description: "Please ensure your name and email are filled in.",
                          variant: "destructive",
                        });
                        return;
                      }

                      console.log('Sending contact request via contactService...');
                      
                      // Prepare formatted data for HTML email template
                      const formData = {
                        name: watchedValues.firstName,
                        email: watchedValues.email,
                        vehicle: `${watchedValues.year} ${watchedValues.make} ${watchedValues.model} ${watchedValues.trim || ''}`.trim(),
                        licensePlate: watchedValues.licensePlate || '',
                        state: watchedValues.state || '',
                        currentMileage: watchedValues.currentMileage?.toLocaleString() || '',
                        annualMileage: watchedValues.annualMileageAllowance?.toLocaleString() || '',
                        leaseTerm: `${watchedValues.leaseTerm} months`,
                        monthsRemaining: `${watchedValues.monthsRemaining} months`,
                        marketValue: `$${calculationResult.marketValue.toLocaleString()}`,
                        payoffAmount: `$${calculationResult.payoffAmount.toLocaleString()}`,
                        equity: `${calculationResult.isPositiveEquity ? '+' : '-'}$${Math.abs(calculationResult.estimatedEquity).toLocaleString()}`,
                        dealerInterest: calculationResult.dealerInterest
                      };
                      
                      // Use the new lease calculation email method
                      await contactService.submitLeaseCalculationRequest(formData);

                      console.log('Contact request sent successfully');
                      setIsContactConfirmed(true); // Set button to confirmed state
                      toast({
                        title: "Thanks! Your message was sent.",
                        description: "We'll be in touch with you shortly.",
                        variant: "default",
                      });
                    } catch (error) {
                      console.error('Error in contact flow:', error);
                      toast({
                        title: "Error Sending Message",
                        description: "There was a problem sending your request. Please try again.",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  {isContactConfirmed ? "Confirmed" : "Contact Me"}
                </Button>
              </div>

              {/* Remove the inquiry saved message section entirely */}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
