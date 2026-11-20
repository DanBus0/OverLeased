import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/get-started");
  }, [router]);

  const trackGetStartedClick = (location: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "get_started_click", {
        location: location
      });
      console.log(`[GA4] get_started_click fired with location: ${location}`);
    }
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>OverLeased | Get Your Personalized Lease-Exit Guide</title>
        <meta name="description" content="Know exactly what your lease is worth and all your exit options. Get a detailed personalized guide for $39 — your numbers, your options, clearly explained." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
        
        {/* Aggressive preloading for /get-started page */}
        <link rel="prefetch" href="/get-started" />
        <link rel="preload" href="/get-started" as="document" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="OverLeased | Get Your Personalized Lease-Exit Guide" />
        <meta property="og:description" content="Know exactly what your lease is worth and all your exit options. Get a detailed personalized guide for $39 — your numbers, your options, clearly explained." />
        <meta property="og:image" content="https://www.overleased.com/social-preview.jpg" />
        <meta property="og:url" content="https://www.overleased.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverLeased" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OverLeased | Get Your Personalized Lease-Exit Guide" />
        <meta name="twitter:description" content="Know exactly what your lease is worth and all your exit options. Get a detailed personalized guide for $39 — your numbers, your options, clearly explained." />
        <meta name="twitter:image" content="https://www.overleased.com/social-preview.jpg" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OverLeased" />
        <meta name="keywords" content="lease exit guide, lease equity calculator, end car lease early, lease buyout analysis, car lease value, lease termination options, lease trade in value, lease transfer guide, car lease analysis, lease exit strategy, vehicle lease guide, lease equity guide, car lease evaluation, lease termination cost, lease buyout cost, early lease exit, lease exit options, car lease worth, lease payoff guide" />
        <link rel="canonical" href="https://www.overleased.com" />
        
        {/* FAQ Schema - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What exactly do I get in the guide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Your personalized lease-exit guide includes: step-by-step instructions for getting your lease payoff amount from your finance company, current vehicle market value analysis, equity position calculation (positive or negative), detailed breakdown of all exit options (buyout, early termination, transfer, trade-in), cost analysis for each option, and our expert recommendation for your specific situation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to receive my guide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most guides are delivered within 24 hours of purchase. In many cases, you'll receive your guide within just a few hours. We'll email it to you as a detailed PDF that you can save, print, or share as needed."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does the guide cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The complete personalized lease-exit guide costs $39. This includes your exact lease payoff, vehicle market value, equity analysis, all exit options with cost breakdowns, and expert recommendations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if my lease has negative equity?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Even with negative equity, you have options. We'll show you the true cost of each path forward, help you understand if waiting makes sense, and identify any strategies to minimize losses. Knowledge is power, even when the news isn't perfect."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will this affect my credit or lease agreement?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely not. Requesting this guide has zero impact on your credit score or lease agreement. We're simply gathering information and providing analysis — you're under no obligation to take any action based on what you learn."
                  }
                }
              ]
            })
          }}
        />
      </Head>
      <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden">
        {/* Hidden prefetch link */}
        <Link href="/get-started" prefetch={true} className="hidden" aria-hidden="true" tabIndex={-1} />
        
        <Header />
        
        <main className="min-h-screen bg-white">
          <HeroSection />
          
          <HowItWorksSection trackGetStartedClick={trackGetStartedClick} />
          
          <FAQSection />
          
          {/* CTA Section after FAQ */}
          <section className="py-10 md:py-16 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-5 md:mb-6">
                  Get Your Guide Now
                </h2>
                <p className="text-[1rem] md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
                  Stop guessing about your lease situation.
                </p>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-[0.9375rem] md:text-base px-7 py-3.5 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    href="/get-started"
                    scroll
                    onClick={() => {
                      trackGetStartedClick("bottom_cta");
                      try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                    }}
                  >
                    Get Your Lease Exit Guide
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}