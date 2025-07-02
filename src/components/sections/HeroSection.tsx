import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, TrendingUp, Shield, Clock } from "lucide-react";

export default function HeroSection() {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById("calculator");
    calculatorSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    howItWorksSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Car className="h-4 w-4 mr-2" />
            Trusted by Car Lessees Across the U.S.
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Turn Your Car Lease Into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 block">
              Cash Today
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
            Discover if you have positive equity in your car lease and sell it back to dealerships.
            <br />
            Get an instant valuation and we'll connect with verified dealers ready to buy your lease.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={scrollToCalculator}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-6 h-auto"
            >
              Check Your Lease Value
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToHowItWorks}
              className="bg-transparent border-blue-300 text-blue-100 hover:bg-blue-800/20 text-lg px-8 py-6 h-auto"
            >
              How It Works
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Valuation</h3>
              <p className="text-blue-100">Calculate your lease equity in under one minute with our tool</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="bg-emerald-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Dealers</h3>
              <p className="text-blue-100">We'll connect with trusted dealerships in your area</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Maximum Price</h3>
              <p className="text-blue-100">We'll secure the best possible price for your car</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
