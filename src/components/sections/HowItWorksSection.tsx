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
      title: "Identify Interested Dealers",
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
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How OverLeased Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes it easy to discover and capture the value in your car lease. 
            From calculation to cash in hand, we guide you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
                )}
                
                <Card className={`relative z-10 ${step.bgColor} ${step.borderColor} border-2 hover:shadow-lg transition-shadow duration-300`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`${step.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="w-fit mx-auto mb-2">
                      Step {step.step}
                    </Badge>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose OverLeased?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We make the process simple, secure, and profitable for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">No Hidden Fees</h4>
                <p className="text-gray-600 text-sm">Our service is completely free for consumers</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-emerald-600 font-bold text-lg">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Verified Dealers</h4>
                <p className="text-gray-600 text-sm">All dealers are pre-screened and verified</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold text-lg">✓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                <p className="text-gray-600 text-sm">Get help from our lease equity specialists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
