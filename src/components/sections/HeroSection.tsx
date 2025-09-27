import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Search, Shield, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    howItWorksSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-12 md:py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          {/* Mobile title with specific line breaks - slightly smaller to prevent hanging */}
          <h1 className="text-[2.75rem] sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-[1.1] px-2 block md:hidden">
            <span className="block">End Your Car</span>
            <span className="block">Lease Early</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 block">
              No Fees or Penalties
            </span>
          </h1>
          
          {/* Tablet title - optimized for tablet breakpoint */}
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2 hidden md:block lg:hidden">
            <span className="block">End Your Car Lease Early</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 block">
              No Fees or Penalties
            </span>
          </h1>
          
          {/* Desktop title - unchanged */}
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2 hidden lg:block">
            End Your Car Lease Early
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 block">
              No Fees or Penalties
            </span>
          </h1>
          
          {/* Subtitle with better mobile text sizing to prevent hanging words */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
            <span className="block sm:inline">Tired of monthly payments or just ready for </span>
            <span className="block sm:inline">something new? OverLeased can help.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12 px-2">
            <Link href="/get-started">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm sm:text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto w-full sm:w-auto"
              >
                Check My Lease Options
                <Search className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToHowItWorks}
              className="bg-transparent border-blue-300 text-blue-100 hover:bg-blue-800/20 text-sm sm:text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto"
            >
              How It Works
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="bg-blue-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-blue-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Quick Process</h3>
              <p className="text-sm md:text-base text-blue-100 leading-relaxed">
                <span className="block">End your lease in less than a</span>
                <span className="block">week with our service</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="bg-emerald-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-emerald-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Trusted Dealers</h3>
              <p className="text-sm md:text-base text-blue-100 leading-relaxed">
                <span className="block sm:inline">OverLeased only works with</span>
                <span className="block sm:inline"> authorized brand dealerships</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="bg-purple-500/20 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-300" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Exit Early</h3>
              <p className="text-sm md:text-base text-blue-100 leading-relaxed">
                <span className="block">Turn an early lease ending into a</span>
                <span className="block">clear financial advantage</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
