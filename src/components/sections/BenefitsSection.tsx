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
      stats: "Average equity captured: $3,200",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Clock,
      title: "Save Time & Hassle",
      description: "Skip the complicated process of buying out your lease. We connect directly with interested dealers and manage the entire process from start to finish.",
      stats: "Process completed in 5-7 days",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "All transactions are handled through verified dealerships with proper licensing and insurance.",
      stats: "100% secure transactions",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: TrendingUp,
      title: "Market-Based Pricing",
      description: "Our valuations use real-time market data to ensure you get fair market value for your lease equity.",
      stats: "Updated pricing every 24 hours",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Our team of lease specialists guides you through every step of the process.",
      stats: "100% customer satisfaction",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: CheckCircle,
      title: "No Obligations",
      description: "Get your equity calculation and dealer offers with no commitment. You decide if and when to sell.",
      stats: "Free equity analysis",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            Why OverLeased
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Benefits of Using Our Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't let positive lease equity go to waste. Our platform helps you maximize the value 
            of your lease while providing a secure, hassle-free experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 border-gray-100 hover:border-gray-200">
                <CardHeader className="pb-4">
                  <div className={`${benefit.bgColor} rounded-lg w-16 h-16 flex items-center justify-center mb-4`}>
                    <Icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {benefit.description}
                  </p>
                  <Badge variant="secondary" className={`${benefit.bgColor} ${benefit.color} border-0`}>
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
