import React from "react";
import { Button } from "@/components/ui/button";
import { Car, Phone, Mail } from "lucide-react";

export default function Header() {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById("calculator");
    calculatorSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-2">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">OverLeased</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="text-black hover:text-blue-600 font-medium transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("benefits")}
              className="text-black hover:text-blue-600 font-medium transition-colors"
            >
              Benefits
            </button>
            <button 
              onClick={() => scrollToSection("calculator")}
              className="text-black hover:text-blue-600 font-medium transition-colors"
            >
              Calculator
            </button>
            <button 
              onClick={() => scrollToSection("faq")}
              className="text-black hover:text-blue-600 font-medium transition-colors"
            >
              FAQ
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 text-sm text-black">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>(484) 702-9539</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:support@overleased.com" 
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  support@overleased.com
                </a>
              </div>
            </div>
            <Button onClick={scrollToCalculator} className="bg-blue-600 hover:bg-blue-700">
              Check Lease Value
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
