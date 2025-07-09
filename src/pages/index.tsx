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
