import React from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import LeaseValueCalculator from "@/components/forms/LeaseValueCalculator";
import FAQSection from "@/components/sections/FAQSection";

export default function HomePage() {
  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>OverLeased | Sell Your Car Lease for Cash</title>
        <meta name="description" content="Find out if your leased car has equity and get a real buyout offer. OverLeased helps you get paid for your leased car." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="OverLeased | Sell Your Car Lease for Cash" />
        <meta property="og:description" content="Find out if your leased car has equity and get a real buyout offer. OverLeased helps you get paid for your leased car." />
        <meta property="og:image" content="https://overleased.com/social-preview.jpg" />
        <meta property="og:url" content="https://overleased.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverLeased" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OverLeased | Sell Your Car Lease for Cash" />
        <meta name="twitter:description" content="Find out if your leased car has equity and get a real buyout offer. OverLeased helps you get paid for your leased car." />
        <meta name="twitter:image" content="https://overleased.com/social-preview.jpg" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="OverLeased" />
        <meta name="keywords" content="car lease, lease equity, sell lease, car buyout, lease transfer, automotive finance" />
        <link rel="canonical" href="https://overleased.com" />
        
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
                  "name": "What is lease equity and how do I know if I have it?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Lease equity is the difference between your vehicle's current market value and what you owe on the lease (remaining payments + residual value). You have positive equity when your car is worth more than what you owe. This often happens when market values rise or you've driven fewer miles than expected."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate are your lease equity calculations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our calculations use real-time market data from multiple sources including auction results, dealer transactions, and market analytics. While estimates may vary by ±10%, they provide a reliable baseline for understanding your lease position. Final offers from dealers will depend on vehicle condition and local market factors."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there any cost to use OverLeased?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, our service is completely free for consumers. We're compensated by participating dealers when successful transactions occur. You'll never pay any fees to calculate your equity or receive dealer offers."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does the process take from calculation to cash?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most transactions complete within 3-7 business days. After calculating your equity, interested dealers typically respond within 24-48 hours. Once you accept an offer, the inspection and paperwork process usually takes 2-3 days."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if my lease has excess mileage or wear and tear?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Excess mileage and wear issues are factored into dealer offers. While they may reduce your equity, you might still come out ahead compared to paying lease-end penalties. Our calculator helps estimate these costs, and dealers will provide final offers after inspection."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I sell my lease if I still owe money on it?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, this is very common. The dealer will pay off your remaining lease balance and any positive equity goes to you. If you have negative equity, you'd need to pay the difference, but this might still be better than lease-end penalties."
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
          
          <section id="how-it-works">
            <HowItWorksSection />
          </section>
          
          <section id="benefits">
            <BenefitsSection />
          </section>
          
          <section id="calculator">
            <LeaseValueCalculator />
          </section>
          
          <section id="faq">
            <FAQSection />
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
