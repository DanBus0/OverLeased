import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calculator, BarChart3, CheckCircle } from "lucide-react";
import Link from "next/link";

interface HowItWorksSectionProps {
  trackGetStartedClick: (location: string) => void;
}

export function HowItWorksSection({ trackGetStartedClick }: HowItWorksSectionProps) {
  const steps = [
    {
      step: 1,
      icon: FileText,
      title: "Enter Your Details",
      subtitle: "",
      description: "Tell us about your leased vehicle—takes less than a minute.",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      step: 2,
      icon: Calculator,
      title: "Vehicle Review",
      subtitle: "",
      description: "We research your vehicle and personalize the guide around your stated goal.",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      step: 3,
      icon: BarChart3,
      title: "Receive Your Guide",
      subtitle: "",
      description: "Get a detailed PDF guide emailed to you within 24-48 hours with all your lease exit options explained clearly.",
      tabletDescription: (
        <>
          Get a detailed PDF guide emailed to you within 24-48 hours with all your lease exit options explained clearly.
        </>
      ),
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "Take the Next Step",
      subtitle: "",
      description: "Use your guide to compare your options and make a more informed decision.",
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 pt-8 md:pt-12 py-12 md:py-20 pb-6 md:pb-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            <span className="hidden sm:inline">How Your Lease Exit Guide Works</span>
            <span className="block sm:hidden">
              How Your Guide
              <br />
              Works
            </span>
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
            Get a complete overview of your lease situation.<br />
            We do the research, you make the informed decision.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden space-y-5 px-2 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="flex items-start gap-4 p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className={`${step.color} rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs px-2.5 py-1">
                      Step {step.step}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {step.title}
                  </h3>
                  {step.subtitle && (
                    <p className="text-sm text-gray-600 italic mb-2">
                      {step.subtitle}
                    </p>
                  )}
                  <p className="text-[0.875rem] text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:items-stretch gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative h-full">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
                )}
                <Card className={`relative z-10 md:h-full md:min-h-[340px] ${step.bgColor} ${step.borderColor} border-2 hover:shadow-lg transition-shadow duration-300 flex flex-col`}>
                  <CardHeader className="text-center pb-0 md:h-[200px] lg:h-[220px] flex flex-col">
                    <div className={`${step.color} rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6 shrink-0`}>
                      <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <div className="md:h-[32px] flex items-center justify-center mb-2 md:mb-3 lg:mb-4">
                      <Badge variant="secondary" className="w-fit text-sm md:text-base px-3 py-1">
                        Step {step.step}
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">
                        {step.title}
                      </CardTitle>
                      {step.subtitle && (
                        <p className="text-xs md:text-sm text-gray-600 italic mt-1">
                          {step.subtitle}
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center px-4 md:px-6 pt-1">
                    <p className="text-gray-700 text-base md:text-base lg:text-lg leading-relaxed">
                      <span className="hidden md:block lg:hidden" aria-hidden="true">{step.tabletDescription || step.description}</span>
                      <span className="block md:hidden lg:block">{step.description}</span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div id="why-overleased" className="mt-12 md:mt-16 bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
              What's Included in the Guide
            </h3>
            <p className="text-[0.9375rem] sm:text-base md:text-xl lg:text-xl text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 px-2 leading-relaxed">
              <span className="hidden sm:inline" aria-hidden="true">Everything you need to understand your lease situation — </span>
              <span className="hidden sm:inline" aria-hidden="true">no confusing jargon, just clear facts and actionable options.</span>
              <span className="block sm:hidden">Everything you need to understand your lease situation — no confusing jargon, just clear facts.</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
              <div className="text-center p-5 md:p-6 md:min-h-[280px] lg:min-h-0 flex flex-col">
                <div className="bg-blue-100 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl md:text-2xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3 text-[1.0625rem] md:text-xl">Vehicle-Specific Analysis</h4>
                <p className="text-gray-600 text-[0.875rem] md:text-base leading-relaxed flex-1">
                  A customized guide based on your vehicle, mileage, condition, location, and stated goal.
                </p>
              </div>

              <div className="text-center p-5 md:p-6 md:min-h-[280px] lg:min-h-0 flex flex-col">
                <div className="bg-emerald-100 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-600 font-bold text-xl md:text-2xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3 text-[1.0625rem] md:text-xl">All Available Options</h4>
                <p className="text-gray-600 text-[0.875rem] md:text-base leading-relaxed flex-1">
                  Dealer sell-back, lease buyout, early termination, lease transfer, dealer trade-in.
                </p>
              </div>

              <div className="text-center p-5 md:p-6 md:min-h-[280px] lg:min-h-0 flex flex-col">
                <div className="bg-purple-100 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-xl md:text-2xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-3 text-[1.0625rem] md:text-xl">Expert Recommendations</h4>
                <p className="text-gray-600 text-[0.875rem] md:text-base leading-relaxed flex-1">
                  Our analysis of the best option for your specific situation, with clear reasoning.
                </p>
              </div>
            </div>

            <div className="mt-8 md:mt-12 max-w-4xl mx-auto bg-blue-50 rounded-xl p-6 md:p-8 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-4 text-xl md:text-2xl text-center">Why Drivers Choose OverLeased</h4>
              <p className="text-gray-700 text-[0.9375rem] md:text-lg leading-relaxed text-center">
                Most drivers are only shown one option at a time—return the vehicle, trade it in, or keep making payments. OverLeased brings the major lease-exit options together in one clear, vehicle-specific guide. You'll receive an estimated dealer trade-in value, practical scripts and calculations, and a complimentary payoff review to help you understand your next step.
              </p>
            </div>

            <div className="mt-6 md:mt-8 flex justify-center">
              <Button 
                asChild
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm md:text-base px-4 md:px-6 py-3 md:py-4 h-auto"
              >
                <Link
                  href="/get-started"
                  scroll
                  onClick={() => {
                    trackGetStartedClick("mid_page");
                    try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                  }}
                >
                  Get Your Guide Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}