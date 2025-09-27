import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Users, Handshake, CheckCircle, Search } from "lucide-react";
import Link from "next/link";

export default function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: FileText,
      title: "Submit Your Details",
      description: "Fill out our form with your information to get started with ending your lease.",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      step: 2,
      icon: Users,
      title: "Interested Dealers",
      description: "OverLeased connects with same-brand dealerships in your area.",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      step: 3,
      icon: Handshake,
      title: "Agreement",
      description: "OverLeased secures an offer for your car from an interested dealership.",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "End Lease",
      description: "Drop off your car at the dealership and OverLeased will handle the rest.",
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <section className="py-12 md:py-20 pb-6 md:pb-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            How to End Your Car Lease Early
          </h2>
          <p className="text-sm sm:text-base md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed">
            Our streamlined process makes it easy to exit your car lease early. From initial consultation to ending your lease, we guide you every step.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden space-y-6 px-2 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className={`${step.color} rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs px-2 py-1">
                      Step {step.step}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-words">
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
                  <CardHeader className="text-center pb-4 md:pb-6 md:h-[240px] flex flex-col">
                    <div className={`${step.color} rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6 shrink-0`}>
                      <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <div className="md:h-[32px] flex items-center justify-center mb-2 md:mb-3">
                      <Badge variant="secondary" className="w-fit text-sm md:text-base px-3 py-1">
                        Step {step.step}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 md:min-h-[56px]">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-4 md:px-6">
                    <p className="text-gray-700 text-base md:text-base lg:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
              Why Use OverLeased?
            </h3>
            <p className="text-sm sm:text-base md:text-xl lg:text-xl text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 px-2 leading-relaxed">
              <span className="block sm:inline">We make ending your lease early simple </span>
              <span className="block sm:inline">and secure for you.</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
              <div className="text-center p-4 md:p-6">
                <div className="bg-blue-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-blue-600 font-bold text-lg md:text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-xl">No Hidden Fees</h4>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                  Our service is completely free
                </p>
              </div>
              <div className="text-center p-4 md:p-6">
                <div className="bg-emerald-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-emerald-600 font-bold text-lg md:text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-xl">Verified Dealers</h4>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                  All dealers are pre-screened and verified
                </p>
              </div>
              <div className="text-center p-4 md:p-6">
                <div className="bg-purple-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-purple-600 font-bold text-lg md:text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-xl">Expert Support</h4>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                  Get help from our lease specialists
                </p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-12 max-w-5xl mx-auto">
              <div className="bg-blue-50 rounded-xl p-6 md:p-8 border border-blue-200">
                <div className="text-center">
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-4 mx-auto px-2">
                    <span className="block sm:inline">Exclusive Brand </span>
                    <span className="block sm:inline">Partnership Guarantee</span>
                  </h4>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-5xl mx-auto px-2">
                    OverLeased partners exclusively with manufacturer-authorized dealerships for your car's brand. For example, if you drive a Toyota, we'll only work with official Toyota dealerships to end your lease early. This guarantees a seamless, legitimate process handled by the same car brand that issued your lease.
                  </p>
                  <div className="mt-6 md:mt-8 flex justify-center">
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm md:text-base px-4 md:px-6 py-3 md:py-4 h-auto"
                    >
                      <Link
                        href="/get-started"
                        scroll
                        onClick={() => {
                          try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                        }}
                      >
                        <span className="md:hidden">Check My Lease Options</span>
                        <span className="hidden md:inline">Check My Lease Options</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
