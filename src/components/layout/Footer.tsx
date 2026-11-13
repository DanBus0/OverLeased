import React from "react";
import Link from "next/link";
import { Car } from "lucide-react";

export default function Footer() {
  const trackGetStartedClick = (location: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "get_started_click", {
        location: location
      });
      console.log(`[GA4] get_started_click fired with location: ${location}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">OverLeased</span>
            </Link>
            <p className="text-sm text-gray-400">
              Get your personalized lease exit guide and make informed decisions about your leased vehicle.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/get-started" 
                  className="hover:text-blue-400 transition-colors"
                  onClick={() => {
                    trackGetStartedClick("footer");
                    try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                  }}
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/payoff-lookup" className="hover:text-blue-400 transition-colors">
                  Payoff Lookup
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" scroll className="hover:text-blue-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faq" scroll className="hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-blue-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@overleased.com" className="hover:text-blue-400 transition-colors">
                  support@overleased.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} OverLeased. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
