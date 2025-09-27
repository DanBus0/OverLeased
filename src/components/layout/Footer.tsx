import React from "react";
import { Car, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 rounded-lg p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">OverLeased</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
              <span className="inline-block">Helping drivers end their car leases early</span> <span className="inline-block">with no fees or penalties.</span>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/get-started" scroll className="text-gray-300 hover:text-white transition-colors text-sm md:text-base block">Check My Lease Options</Link></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base block">How It Works</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base block">FAQ</a></li>
              <li><Link href="/payoff-lookup" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base block">Payoff Lookup</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a 
                  href="tel:+14847029539" 
                  className="hover:text-white transition-colors cursor-pointer text-sm md:text-base whitespace-nowrap"
                >
                  (484) 702-9539
                </a>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <a 
                  href="mailto:support@overleased.com" 
                  className="hover:text-white transition-colors cursor-pointer text-sm md:text-base break-all"
                >
                  support@overleased.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © 2025 OverLeased. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 text-xs md:text-sm text-gray-400 text-center">
              <Link href="/privacy-policy" className="hover:text-white transition-colors whitespace-nowrap">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors whitespace-nowrap">Terms of Service</Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors whitespace-nowrap">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
