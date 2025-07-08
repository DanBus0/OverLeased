import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Phone, Mail, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  const scrollToCalculator = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const calculatorSection = document.getElementById("calculator");
      if (calculatorSection) {
        calculatorSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between h-16 w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-2">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">OverLeased</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("how-it-works")} className="text-black hover:text-blue-600 font-medium transition-colors">How It Works</button>
            <button onClick={() => scrollToSection("benefits")} className="text-black hover:text-blue-600 font-medium transition-colors">Benefits</button>
            <button onClick={() => scrollToSection("calculator")} className="text-black hover:text-blue-600 font-medium transition-colors">Calculator</button>
            <button onClick={() => scrollToSection("faq")} className="text-black hover:text-blue-600 font-medium transition-colors">FAQ</button>
          </nav>

          {/* Desktop CTA and Contact */}
          <div className="hidden md:flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 text-sm text-black">
              <div className="flex items-center gap-1"><Phone className="h-4 w-4" /><span>(484) 702-9539</span></div>
              <div className="flex items-center gap-1"><Mail className="h-4 w-4" /><a href="mailto:support@overleased.com" className="hover:text-blue-600 transition-colors cursor-pointer">support@overleased.com</a></div>
            </div>
            <Button onClick={scrollToCalculator} className="bg-blue-600 hover:bg-blue-700">Check Lease Value</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-lg p-2">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">OverLeased</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-grow p-4">
            <nav className="flex flex-col gap-4 mt-4">
              <button 
                onClick={() => scrollToSection("how-it-works")}
                className="text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors w-full text-left py-3 border-b border-gray-100"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection("benefits")}
                className="text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors w-full text-left py-3 border-b border-gray-100"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection("calculator")}
                className="text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors w-full text-left py-3 border-b border-gray-100"
              >
                Calculator
              </button>
              <button 
                onClick={() => scrollToSection("faq")}
                className="text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors w-full text-left py-3 border-b border-gray-100"
              >
                FAQ
              </button>
            </nav>
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <Button onClick={scrollToCalculator} className="w-full bg-blue-600 hover:bg-blue-700 mb-6 py-3">
              Check Lease Value
            </Button>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(484) 702-9539</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:support@overleased.com" 
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  support@overleased.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
