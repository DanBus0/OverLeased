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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <title>OverLeased - Turn Your Car Lease Into Cash Today</title>
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
