import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import LeaseValueCalculator from "@/components/forms/LeaseValueCalculator";
import FAQSection from "@/components/sections/FAQSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <HeroSection />
        
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        
        <section id="benefits">
          <BenefitsSection />
        </section>
        
        <LeaseValueCalculator />
        
        <section id="faq">
          <FAQSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
