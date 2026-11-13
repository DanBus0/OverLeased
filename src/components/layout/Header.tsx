import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const trackGetStartedClick = (location: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "get_started_click", {
        location: location
      });
      console.log(`[GA4] get_started_click fired with location: ${location}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-2">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">OverLeased</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link href="/#how-it-works" scroll className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                How It Works
              </Link>
              <Link href="/#faq" scroll className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                FAQ
              </Link>
              <Link href="/payoff-lookup" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Payoff Lookup
              </Link>
            </nav>
            <Button 
              asChild 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link 
                href="/get-started" 
                scroll
                onClick={() => {
                  trackGetStartedClick("nav");
                  try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                }}
              >
                Get Started
              </Link>
            </Button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-4">
            <Link 
              href="/#how-it-works" 
              scroll 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/#faq" 
              scroll 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/payoff-lookup" 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Payoff Lookup
            </Link>
            <Button 
              asChild 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link 
                href="/get-started" 
                scroll
                onClick={() => {
                  trackGetStartedClick("nav");
                  setMobileMenuOpen(false);
                  try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                }}
              >
                Get Started
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
