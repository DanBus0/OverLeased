import React from "react";
import { Button } from "@/components/ui/button";
import { Car, Phone, Mail, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

          {/* Desktop Navigation and Contact Info */}
          <div className="hidden md:flex items-center gap-4">
            {/* Navigation Links - Now on the left */}
            <div className="flex items-center gap-2 mr-4">
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                How It Works
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('faq-section')}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                FAQ
              </Button>
            </div>
            
            <div className="hidden lg:flex items-center gap-8 text-sm">
              <div className="flex items-center gap-1 text-gray-700">
                <Phone className="h-4 w-4" />
                <a href="tel:+14847029539" className="hover:text-blue-600 transition-colors cursor-pointer">
                  (484) 702-9539
                </a>
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@overleased.com" className="hover:text-blue-600 transition-colors cursor-pointer">
                  support@overleased.com
                </a>
              </div>
            </div>
            
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link 
                href="/get-started" 
                scroll
                onClick={() => {
                  try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                }}
              >
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button and CTA */}
          <div className="md:hidden flex items-center gap-2">
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-2">
              <Link 
                href="/get-started" 
                scroll
                onClick={() => {
                  try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                }}
              >
                Get Started
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('how-it-works')}
              className="w-full text-left justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              How It Works
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('faq-section')}
              className="w-full text-left justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              FAQ
            </Button>
            <div className="pt-2 border-t border-gray-200 space-y-3 px-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-4 w-4" />
                <a href="tel:+14847029539" className="hover:text-blue-600 transition-colors text-sm">
                  (484) 702-9539
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@overleased.com" className="hover:text-blue-600 transition-colors text-sm">
                  support@overleased.com
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
