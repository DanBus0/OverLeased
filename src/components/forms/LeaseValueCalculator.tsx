import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calculator, Car, Mail, User, MapPin, Gauge, Calendar, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";
import { leaseInquiryService, type LeaseInquiry } from "@/services/leaseInquiryService";
import { openaiService } from "@/services/openaiService";
import { useToast } from "@/hooks/use-toast";
import { contactService } from "@/services/contactService";

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
  zipCode: z.string().min(1, "Required").refine((val) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(val);
  }, "Please enter a valid zip code (e.g., 12345 or 12345-6789)"),
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

// Local storage keys
const STORAGE_KEYS = {
  FORM_DATA: "overleased_form_data",
  CALCULATION_RESULT: "overleased_calculation_result",
  CALCULATOR_STATE: "overleased_calculator_state",
  MILEAGE_DISPLAY: "overleased_mileage_display"
};

// Helper functions for local storage
function saveToStorage<T>(key: string, data: T) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
}

function loadFromStorage<T>(key: string): T | null {
  try {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    }
  } catch (error) {
    console.warn("Failed to load from localStorage:", error);
  }
  return null;
}

const clearStorage = () => {
  try {
    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
};

export default function LeaseValueCalculator() {
  const [calculationResult, setCalculationResult] = React.useState<LeaseValueResult | null>(null);
  const [isCalculated, setIsCalculated] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [savedInquiry, setSavedInquiry] = React.useState<LeaseInquiry | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [currentMileageDisplay, setCurrentMileageDisplay] = React.useState("");
  const [annualMileageDisplay, setAnnualMileageDisplay] = React.useState("");
  const [isContactConfirmed, setIsContactConfirmed] = React.useState(false);
  const [isContactSubmitting, setIsContactSubmitting] = React.useState(false);
  const [isRestoredFromStorage, setIsRestoredFromStorage] = React.useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<LeaseValueData>({
    resolver: zodResolver(leaseValueSchema),
  });

  const watchedValues = watch();

  // Load saved data on component mount
  React.useEffect(() => {
    const savedFormData = loadFromStorage<LeaseValueData>(STORAGE_KEYS.FORM_DATA);
    const savedResult = loadFromStorage<LeaseValueResult>(STORAGE_KEYS.CALCULATION_RESULT);
    const savedState = loadFromStorage<{ isCalculated: boolean, isContactConfirmed: boolean }>(STORAGE_KEYS.CALCULATOR_STATE);
    const savedMileageDisplay = loadFromStorage<{ currentMileage: string, annualMileage: string }>(STORAGE_KEYS.MILEAGE_DISPLAY);

    let dataRestored = false;
    if (savedFormData) {
      // Restore form data
      Object.keys(savedFormData).forEach(key => {
        if (savedFormData[key as keyof LeaseValueData] !== undefined && savedFormData[key as keyof LeaseValueData] !== null) {
          setValue(key as keyof LeaseValueData, savedFormData[key as keyof LeaseValueData]);
        }
      });
      dataRestored = true;
    }

    if (savedMileageDisplay) {
      setCurrentMileageDisplay(savedMileageDisplay.currentMileage || "");
      setAnnualMileageDisplay(savedMileageDisplay.annualMileage || "");
    }

    if (savedResult) {
      setCalculationResult(savedResult);
      dataRestored = true;
    }

    if (savedState) {
      setIsCalculated(savedState.isCalculated || false);
      setIsContactConfirmed(savedState.isContactConfirmed || false);
    }

    // Signal that restoration process is complete, so saving can begin.
    setIsRestoredFromStorage(true);

    // Show restoration message only if data was actually restored
    if (dataRestored) {
      toast({
        title: "Data Restored",
        description: "Your previous calculation has been restored from your last session.",
        variant: "default",
      });
    }
  }, [setValue, toast]);

  // Save form data whenever it changes
  React.useEffect(() => {
    if (isRestoredFromStorage) {
      const formData = { ...watchedValues };
      // Only save if there's actual data
      const hasData = Object.values(formData).some(value => 
        value !== undefined && value !== null && value !== ""
      );
      
      if (hasData) {
        saveToStorage(STORAGE_KEYS.FORM_DATA, formData);
      }
    }
  }, [watchedValues, isRestoredFromStorage]);

  // Save mileage display values
  React.useEffect(() => {
    if (currentMileageDisplay || annualMileageDisplay) {
      saveToStorage(STORAGE_KEYS.MILEAGE_DISPLAY, {
        currentMileage: currentMileageDisplay,
        annualMileage: annualMileageDisplay
      });
    }
  }, [currentMileageDisplay, annualMileageDisplay]);

  // Save calculation result
  React.useEffect(() => {
    if (calculationResult) {
      saveToStorage(STORAGE_KEYS.CALCULATION_RESULT, calculationResult);
    }
  }, [calculationResult]);

  // Save calculator state
  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.CALCULATOR_STATE, {
      isCalculated,
      isContactConfirmed
    });
  }, [isCalculated, isContactConfirmed]);

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

  // Handle current mileage input
  const handleCurrentMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    setCurrentMileageDisplay(formatted);
  };

  // Handle annual mileage input
  const handleAnnualMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    setAnnualMileageDisplay(formatted);
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
        zipCode: data.zipCode,
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
    setIsContactConfirmed(false);
    
    try {
      const inquiryData: LeaseInquiry = {
        email: data.email,
        first_name: data.firstName,
        license_plate: data.licensePlate,
        vehicle_state: data.state,
        zip_code: data.zipCode,
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
      scrollToResults();

    } catch (error) {
      console.error("Calculation error:", error);
      setSubmitError("There was an error processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCalculator = () => {
    // Clear all stored data
    clearStorage();
    
    // Reset all state
    setCalculationResult(null);
    setIsCalculated(false);
    setSavedInquiry(null);
    setSubmitError(null);
    setCurrentMileageDisplay("");
    setAnnualMileageDisplay("");
    setIsContactConfirmed(false);
    setIsContactSubmitting(false);
    setIsRestoredFromStorage(false);
    reset();

    toast({
      title: "Calculator Reset",
      description: "All data has been cleared and the calculator has been reset.",
      variant: "default",
    });
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
    <section id="calculator" className="py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <Badge variant="secondary" className="mb-4 md:mb-6 bg-blue-100 text-blue-800">
            Free Instant Analysis
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            Check Your Lease Value
          </h2>
          
          {/* FREE CALLOUT - Near calculator */}
          <div className="mb-6 p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
              <span className="text-xl md:text-2xl">🎯</span>
              <h3 className="text-lg md:text-xl font-bold text-green-800">Completely Free Service</h3>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-green-700 font-medium leading-relaxed text-center px-2 break-words overflow-wrap-anywhere">
              <span className="block sm:hidden">No costs. Make thousands with zero risk.</span>
              <span className="hidden sm:block">There are no out-of-pocket costs for our service. You could potentially make thousands of dollars with zero risk.</span>
            </p>
          </div>
          
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed">
            Get an instant estimate of your lease equity and connect with dealers ready to make offers.
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg p-6 md:p-10">
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              <Calculator className="h-5 w-5 md:h-6 md:w-6" />
              Lease Value Calculator
            </CardTitle>
            <CardDescription className="text-blue-100 text-sm md:text-base">
              Enter your lease details below to get started. Your data is automatically saved as you type.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-10">
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:space-y-10" noValidate>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <User className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">Contact Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm md:text-base font-medium text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className={getFieldClassName("firstName", "placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-xs md:text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-4 md:top-4.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className={getFieldClassName("email", "pl-10 placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs md:text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Car className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">Vehicle Information</h3>
                </div>
                
                <div className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="make" className="text-sm md:text-base font-medium text-gray-700">
                        Make *
                      </Label>
                      <Input
                        id="make"
                        placeholder="Toyota"
                        className={getFieldClassName("make", "placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                        {...register("make")}
                      />
                      {errors.make && (
                        <p className="text-xs md:text-sm text-red-500">{errors.make.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model" className="text-sm md:text-base font-medium text-gray-700">
                        Model *
                      </Label>
                      <Input
                        id="model"
                        placeholder="Camry"
                        className={getFieldClassName("model", "placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                        {...register("model")}
                      />
                      {errors.model && (
                        <p className="text-xs md:text-sm text-red-500">{errors.model.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="trim" className="text-sm md:text-base font-medium text-gray-700">
                        Trim
                      </Label>
                      <Input
                        id="trim"
                        placeholder="SE"
                        className={getFieldClassName("trim", "placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                        {...register("trim")}
                      />
                      {errors.trim && (
                        <p className="text-xs md:text-sm text-red-500">{errors.trim.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="licensePlate" className="text-sm md:text-base font-medium text-gray-700">
                        License Plate Number *
                      </Label>
                      <Input
                        id="licensePlate"
                        placeholder="ABC123"
                        className={getFieldClassName("licensePlate", "placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                        {...register("licensePlate")}
                      />
                      {errors.licensePlate && (
                        <p className="text-xs md:text-sm text-red-500">{errors.licensePlate.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm md:text-base font-medium text-gray-700">
                        Vehicle State *
                      </Label>
                      <Input
                        id="state"
                        placeholder="PA"
                        className={getFieldClassName("state", "placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                        {...register("state")}
                      />
                      {errors.state && (
                        <p className="text-xs md:text-sm text-red-500">{errors.state.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-sm md:text-base font-medium text-gray-700">
                        Zip Code *
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-4 md:top-4.5 h-4 w-4 text-gray-400" />
                        <Input
                          id="zipCode"
                          placeholder="12345"
                          className={getFieldClassName("zipCode", "pl-10 placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                          {...register("zipCode")}
                        />
                      </div>
                      {errors.zipCode && (
                        <p className="text-xs md:text-sm text-red-500">{errors.zipCode.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-sm md:text-base font-medium text-gray-700">
                        Year *
                      </Label>
                      <Input
                        id="year"
                        type="text"
                        placeholder="2022"
                        className={getFieldClassName("year", "h-12 md:h-14 text-sm md:text-base")}
                        {...register("year")}
                      />
                      {errors.year && (
                        <p className="text-xs md:text-sm text-red-500">{errors.year.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Gauge className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">Lease Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="currentMileage" className="text-sm md:text-base font-medium text-gray-700">
                      Current Mileage *
                    </Label>
                    <Input
                      id="currentMileage"
                      type="text"
                      placeholder="25,000"
                      value={currentMileageDisplay}
                      onChange={handleCurrentMileageChange}
                      className={getMileageFieldClassName(currentMileageDisplay, "placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                      {...register("currentMileage", {
                        onChange: (e) => {
                          const formatted = formatNumberWithCommas(e.target.value);
                          setCurrentMileageDisplay(formatted);
                        }
                      })}
                    />
                    {errors.currentMileage && (
                      <p className="text-xs md:text-sm text-red-500">{errors.currentMileage.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="annualMileageAllowance" className="text-sm md:text-base font-medium text-gray-700">
                      Annual Mileage Allowance *
                    </Label>
                    <Input
                      id="annualMileageAllowance"
                      type="text"
                      placeholder="12,000"
                      value={annualMileageDisplay}
                      onChange={handleAnnualMileageChange}
                      className={getMileageFieldClassName(annualMileageDisplay, "placeholder:text-gray-300 h-12 md:h-14 text-sm md:text-base")}
                      {...register("annualMileageAllowance", {
                        onChange: (e) => {
                          const formatted = formatNumberWithCommas(e.target.value);
                          setAnnualMileageDisplay(formatted);
                        }
                      })}
                    />
                    {errors.annualMileageAllowance && (
                      <p className="text-xs md:text-sm text-red-500">{errors.annualMileageAllowance.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="leaseTerm" className="text-sm md:text-base font-medium text-gray-700">
                      Lease Term (Months) *
                    </Label>
                    <Input
                      id="leaseTerm"
                      type="text"
                      placeholder="36"
                      min="1"
                      className={getFieldClassName("leaseTerm", "h-12 md:h-14 text-sm md:text-base")}
                      {...register("leaseTerm")}
                    />
                    {errors.leaseTerm && (
                      <p className="text-xs md:text-sm text-red-500">{errors.leaseTerm.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthsRemaining" className="text-sm md:text-base font-medium text-gray-700">
                      Months Remaining on Lease *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-4 md:top-4.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="monthsRemaining"
                        type="text"
                        placeholder="18"
                        min="1"
                        className={getFieldClassName("monthsRemaining", "pl-10 h-12 md:h-14 text-sm md:text-base")}
                        {...register("monthsRemaining")}
                      />
                    </div>
                    {errors.monthsRemaining && (
                      <p className="text-xs md:text-sm text-red-500">{errors.monthsRemaining.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 md:pt-8">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg md:text-xl lg:text-2xl py-5 md:py-7 h-auto font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-white mr-2"></div>
                      {savedInquiry ? "Calculating Your Equity..." : "Saving Your Information..."}
                    </>
                  ) : (
                    <>
                      Check Your Lease Value
                    </>
                  )}
                </Button>
                {isCalculated && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={(e) => {
                      e.preventDefault();
                      resetCalculator();
                    }} 
                    className="px-6 md:px-8 text-sm md:text-base py-5 md:py-7 h-auto"
                  >
                    Reset
                  </Button>
                )}
              </div>
              
              <div className="text-center mt-4 md:mt-6">
                <p className="text-xs md:text-sm text-gray-500 italic max-w-[700px] mx-auto leading-tight px-2">
                  By clicking "Check Your Lease Value", I give OverLeased permission to share my information with trusted third parties, which may include the sale of data as described in the{" "}
                  <a 
                    href="/privacy-policy" 
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>. You may opt out at any time.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {calculationResult && (
          <Card className="mt-10 shadow-xl border-0">
            <CardHeader id="analysis-title" className={`${calculationResult.isPositiveEquity ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' : 'bg-gradient-to-r from-orange-600 to-orange-700'} text-white rounded-t-lg p-6 md:p-10`}>
              <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
                {calculationResult.isPositiveEquity ? (
                  <TrendingUp className="h-6 w-6 md:h-7 md:w-7" />
                ) : (
                  <TrendingDown className="h-6 w-6 md:h-7 md:w-7" />
                )}
                Your Lease Equity Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
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
                <div className="text-center p-4 md:p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                    ${calculationResult.marketValue.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-blue-800 font-medium">Estimated Market Value</div>
                </div>
                <div className="text-center p-4 md:p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-2xl md:text-3xl font-bold text-gray-600 mb-2">
                    ${calculationResult.payoffAmount.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-gray-800 font-medium">Estimated Payoff Amount</div>
                </div>
                <div className={`text-center p-4 md:p-6 rounded-lg border-2 ${calculationResult.isPositiveEquity ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'}`}>
                  <div className={`text-2xl md:text-3xl font-bold mb-2 ${calculationResult.isPositiveEquity ? 'text-emerald-600' : 'text-orange-600'}`}>
                    {calculationResult.isPositiveEquity ? '+' : '-'}${Math.abs(calculationResult.estimatedEquity).toLocaleString()}
                  </div>
                  <div className={`text-xs md:text-sm font-medium ${calculationResult.isPositiveEquity ? 'text-emerald-800' : 'text-orange-800'}`}>
                    Your Lease Equity
                  </div>
                </div>
              </div>

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
                      : isContactSubmitting
                      ? "bg-blue-400 text-white cursor-wait opacity-75"
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  } transition-all duration-200`}
                  disabled={isContactConfirmed || isContactSubmitting}
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (isContactConfirmed || isContactSubmitting) return;
                    
                    setIsContactSubmitting(true);
                    
                    try {
                      console.log('Contact Me button clicked - starting backend flow');
                      
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
                      
                      const formData = {
                        name: watchedValues.firstName,
                        email: watchedValues.email,
                        vehicle: `${watchedValues.year} ${watchedValues.make} ${watchedValues.model} ${watchedValues.trim || ''}`.trim(),
                        licensePlate: watchedValues.licensePlate || '',
                        state: watchedValues.state || '',
                        zipCode: watchedValues.zipCode || '',
                        currentMileage: watchedValues.currentMileage?.toLocaleString() || '',
                        annualMileage: watchedValues.annualMileageAllowance?.toLocaleString() || '',
                        leaseTerm: `${watchedValues.leaseTerm} months`,
                        monthsRemaining: `${watchedValues.monthsRemaining} months`,
                        marketValue: `$${calculationResult.marketValue.toLocaleString()}`,
                        payoffAmount: `$${calculationResult.payoffAmount.toLocaleString()}`,
                        equity: `${calculationResult.isPositiveEquity ? '+' : '-'}$${Math.abs(calculationResult.estimatedEquity).toLocaleString()}`,
                        dealerInterest: calculationResult.dealerInterest
                      };
                      
                      await contactService.submitLeaseCalculationRequest(formData);

                      console.log('Contact request sent successfully');
                      setIsContactConfirmed(true);
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
                    } finally {
                      setIsContactSubmitting(false);
                    }
                  }}
                >
                  {isContactConfirmed ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirmed
                    </>
                  ) : isContactSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    "Contact Me"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
