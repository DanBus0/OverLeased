import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Clock, Users, DollarSign, CheckCircle } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Capture Hidden Value",
      description: "Many lessees don't realize they have thousands in positive equity. We help you discover and capture this value.",
      mobileDescription: "Discover thousands in positive equity.",
      stats: "Average equity captured: $3,200",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Clock,
      title: "Save Time & Hassle",
      description: "Skip the complicated process of buying out your lease. We connect directly with interested dealers and manage the entire process.",
      mobileDescription: "Skip the buyout process.",
      stats: "Process completed in 5-7 days",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "All transactions are handled through verified dealerships with proper licensing and insurance.",
      mobileDescription: "Secure verified transactions.",
      stats: "100% secure transactions",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: TrendingUp,
      title: "Market-Based Pricing",
      description: "Our valuations use real-time market data to ensure you get fair market value for your lease equity.",
      mobileDescription: "Real-time market pricing.",
      stats: "Updated pricing every 24 hours",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Our team of lease specialists guides you through every step of the process.",
      mobileDescription: "Expert guidance available.",
      stats: "100% customer satisfaction",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: CheckCircle,
      title: "Completely Free Service",
      description: "Get your equity calculation and dealer offers with no commitment. You decide when to sell.",
      mobileDescription: "Free. No commitment.",
      stats: "Free equity analysis",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4 md:mb-6 bg-blue-100 text-blue-800">
            Why OverLeased
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            Benefits of Using Our Service
          </h2>
          <p className="text-base md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed">
            Don't let positive lease equity go to waste. Our platform helps you maximize the value 
            of your lease while providing a secure, hassle-free experience.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden space-y-4 px-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg max-w-full border border-gray-200">
                <div className={`${benefit.bgColor} rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <div className="flex-1 min-w-0 max-w-full">
                  <h3 className="text-base font-bold text-gray-900 mb-2 break-words leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 break-words overflow-wrap-anywhere leading-relaxed">
                    {benefit.mobileDescription}
                  </p>
                  <Badge variant="secondary" className={`${benefit.bgColor} ${benefit.color} border-0 text-xs px-2 py-1`}>
                    {benefit.stats}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 border-gray-100 hover:border-gray-200 h-full flex flex-col">
                <CardHeader className="pb-4 md:pb-6">
                  <div className={`${benefit.bgColor} rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 md:mb-6`}>
                    <Icon className={`h-8 w-8 md:h-10 md:w-10 ${benefit.color}`} />
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between px-6 pb-6">
                  <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed flex-grow">
                    {benefit.description}
                  </p>
                  <Badge variant="secondary" className={`${benefit.bgColor} ${benefit.color} border-0 text-sm md:text-base px-3 py-2 self-start`}>
                    {benefit.stats}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
