import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Search, Handshake, DollarSign } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: Calculator,
      title: "Calculate Your Equity",
      description: "Enter your lease details and get an instant equity calculation using real-time market data.",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      step: 2,
      icon: Search,
      title: "Identify Dealerships",
      description: "We'll connect with verified dealerships in your area who are actively buying leased cars.",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      step: 3,
      icon: Handshake,
      title: "Receive Offers",
      description: "We'll secure offers from dealers and choose the best one that works for your situation.",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      step: 4,
      icon: DollarSign,
      title: "Complete the Sale",
      description: "Finalize the transaction with your chosen dealer and get paid for your positive lease equity.",
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4 md:mb-6 bg-blue-100 text-blue-800">
            Simple Process
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            How OverLeased Works
          </h2>
          <p className="text-base md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed">
            Our streamlined process makes it easy to discover and capture the value in your car lease. 
            From calculation to cash in hand, we guide you every step of the way.
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
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
                )}
                
                <Card className={`relative z-10 ${step.bgColor} ${step.borderColor} border-2 hover:shadow-lg transition-shadow duration-300`}>
                  <CardHeader className="text-center pb-4 md:pb-6">
                    <div className={`${step.color} rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6`}>
                      <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <Badge variant="secondary" className="w-fit mx-auto mb-2 md:mb-3 text-sm md:text-base px-3 py-1">
                      Step {step.step}
                    </Badge>
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">
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
              Why Choose OverLeased?
            </h3>
            <p className="text-base md:text-xl lg:text-xl text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 px-2 leading-relaxed">
              We make the process simple, secure, and profitable for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
              <div className="text-center p-4 md:p-6">
                <div className="bg-blue-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-blue-600 font-bold text-lg md:text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-xl">No Hidden Fees</h4>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">Our service is completely free for consumers</p>
              </div>
              <div className="text-center p-4 md:p-6">
                <div className="bg-emerald-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-emerald-600 font-bold text-lg md:text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-xl">Verified Dealers</h4>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">All dealers are pre-screened and verified</p>
              </div>
              <div className="text-center p-4 md:p-6">
                <div className="bg-purple-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-purple-600 font-bold text-lg md:text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-xl">Expert Support</h4>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">Get help from our lease equity specialists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
