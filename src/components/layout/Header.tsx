import React from "react";
import { Button } from "@/components/ui/button";
import { Car, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Header() {
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
                Get My Lease Reviewed
              </Link>
            </Button>
          </div>

          {/* Mobile CTA - No hamburger menu */}
          <div className="md:hidden">
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
          </div>
        </div>
      </div>
    </header>
  );
}