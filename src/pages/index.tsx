import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FAQSection from "@/components/sections/FAQSection";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>OverLeased | End Your Car Lease Early</title>
        <meta name="description" content="End your car lease early and get cash with OverLeased. Skip lease-end fees and penalties. Get instant offers from trusted dealers for your leased vehicle today." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="OverLeased | End Your Car Lease Early" />
        <meta property="og:description" content="End your car lease early and get cash with OverLeased. Skip lease-end fees and penalties. Get instant offers from trusted dealers for your leased vehicle today." />
        <meta property="og:image" content="https://www.overleased.com/social-preview.jpg" />
        <meta property="og:url" content="https://www.overleased.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverLeased" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OverLeased | End Your Car Lease Early" />
        <meta name="twitter:description" content="End your car lease early and get cash with OverLeased. Skip lease-end fees and penalties. Get instant offers from trusted dealers for your leased vehicle today." />
        <meta name="twitter:image" content="https://www.overleased.com/social-preview.jpg" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OverLeased" />
        <meta name="keywords" content="end car lease early, car lease early termination, lease buyout, sell leased car, lease exit, early lease termination, lease transfer, car lease deals, automotive finance, lease assumption, lease takeover, lease return alternatives, car lease selling, lease vehicle selling, lease exit strategy, lease termination help, lease return service, lease buyout service, car lease cash, lease cash offers, dealer lease offers, lease vehicle cash, lease selling platform, lease marketplace, lease trading, lease swapping, lease assumption marketplace, lease trading platform, lease exit platform, lease return platform, lease buyout platform, lease selling service, lease transfer service, lease assumption service, lease marketplace platform, lease exit solutions, lease termination solutions, lease return solutions, lease buyout solutions" />
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
                  "name": "How can I end my car lease early?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can end your car lease early by selling your leased vehicle to a dealer who will pay off your lease balance. If your car is worth more than what you owe, you can receive cash for the difference and avoid lease-end penalties."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the benefits of ending my lease early?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ending your lease early can help you avoid excess mileage fees, wear and tear charges, and disposition fees. You may also capture positive value if your car is worth more than the lease payoff amount."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there any cost to use OverLeased?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, our service is completely free for consumers. We're compensated by participating dealers when successful transactions occur. You'll never pay any fees to get offers for your leased vehicle."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to end my lease early?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most transactions complete within 3-7 business days. After submitting your vehicle information, interested dealers typically respond within 24-48 hours. Once you accept an offer, the inspection and paperwork process usually takes 2-3 days."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if my lease has excess mileage or wear and tear?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Excess mileage and wear issues are factored into dealer offers. While they may reduce the value, you might still come out ahead compared to paying lease-end penalties. Dealers will provide final offers after inspection."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I end my lease early if I still owe money on it?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, this is very common. The dealer will pay off your remaining lease balance directly to the leasing company. If your car is worth more than what you owe, you receive the difference in cash."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are the dealers on your platform trustworthy?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All dealers in our network are licensed, insured, and pre-screened. We verify their credentials, check their reputation, and monitor transaction quality. We only work with established dealerships with proven track records."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What happens to my lease agreement when I sell?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The dealer assumes your lease obligations and pays off the leasing company directly. You're released from all future lease responsibilities once the transaction is complete. The dealer handles all paperwork with the leasing company."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I negotiate the dealer offers?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, dealer offers are starting points for negotiation. Factors like vehicle condition, local demand, and timing can influence the final price. We work hard to receive the maximum price for your car."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if I change my mind after getting offers?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You're under no obligation to accept any offers. You can decline all offers and keep your lease, or wait for better market conditions. There's no commitment until you sign a purchase agreement with a dealer."
                  }
                }
              ]
            })
          }}
        />
      </Head>
      <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden">
        <Header />
        
        <main className="w-full pt-16">
          <HeroSection />
          
          <HowItWorksSection />
          
          <FAQSection />
          
          {/* CTA Section after FAQ */}
          <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  Get Started Now
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                  Don't stay in a lease that you don't want. OverLeased is here to help.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link
                    href="/get-started"
                    scroll
                    onClick={() => {
                      try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                    }}
                  >
                    See My Early Lease Options
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
