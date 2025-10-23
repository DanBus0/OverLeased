import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, HelpCircle, DollarSign, Handshake, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HeroSection() {
  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    howItWorksSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFAQ = () => {
    const faqSection = document.getElementById("faq-section");
    faqSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faqItems = [
    {
      icon: HelpCircle,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-300",
      question: "Can I end my lease early?",
      answer: "Yes, at any time by connecting with authorized dealers who purchase your vehicle and handle the payoff.",
      tabletAnswer: (
        <>
          Yes, at any time by connecting with authorized dealers who purchase your vehicle and handle the
          <br className="hidden md:block lg:hidden" />
          lease payoff.
        </>
      ),
      disclaimer: null
    },
    {
      icon: DollarSign,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-300",
      question: "Will I owe money?",
      answer: "In most cases you'll actually make money. The dealer will pay you market price which often is more than your remaining lease balance.",
      tabletAnswer: (
        <>
          In most cases you'll actually make money. The dealer will pay you market price which often is more than your remaining
          <br className="hidden md:block lg:hidden" />
          lease balance.
        </>
      ),
      disclaimer: "*Based upon lease review and subject to dealer offers"
    },
    {
      icon: Handshake,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-300",
      question: "Do dealers really buy leases?",
      answer: "Yes, dealers purchase leased vehicles regularly. It's not advertised because dealers make less if you end your lease early.",
      mobileAnswer: (
        <>
          Yes, dealers purchase leased vehicles regularly.
          <br className="block sm:hidden" />
          It's not advertised because dealers make less
          <br className="block sm:hidden" />
          if you end your lease early.
        </>
      ),
      tabletAnswer: (
        <>
          Yes, dealers purchase leased vehicles regularly. It's not advertised because dealers make less if you end your
          <br className="hidden md:block lg:hidden" />
          lease early.
        </>
      ),
      disclaimer: null
    },
    {
      icon: Clock,
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-300",
      question: "How long does it take?",
      answer: "Most early lease terminations complete within 3-7 business days.",
      mobileAnswer: (
        <>
          Most early lease terminations complete
          <br className="block sm:hidden" />
          within 3-7 business days.
        </>
      ),
      tabletAnswer: (
        <>
          Most early lease terminations complete within 3-7 business
          <br className="hidden md:block lg:hidden" />
          days.
        </>
      ),
      disclaimer: null
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-6 md:pt-10 pb-12 md:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          {/* Trust Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg">
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <span className="text-[0.625rem] md:text-xs font-medium text-white/80 tracking-wide">
                Trusted by Drivers Across the U.S.
              </span>
            </div>
          </div>

          {/* Mobile title with specific line breaks - lighter font weight */}
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-[1.15] px-2 block md:hidden">
            <span className="block text-[2.75rem] sm:text-[3.25rem] font-semibold">End Your Car</span>
            <span className="block text-[2.75rem] sm:text-[3.25rem] font-semibold">Lease Early</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 block text-[1.95rem] sm:text-[2.75rem] font-semibold mt-1 leading-[1.15] pb-2">
              We'll Handle the Entire Process for You
            </span>
          </h1>
          
          {/* Tablet title - lighter font weight for better cohesion, smaller subtitle to fit on one line */}
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-[1.15] px-2 hidden md:block lg:hidden">
            <span className="block text-[3.5rem] font-semibold">End Your Car Lease Early</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-[2.5rem] font-semibold mt-1 leading-[1.15] pb-2">
              We'll Handle the Entire Process for You
            </span>
          </h1>
          
          {/* Desktop title - lighter font weight for refined appearance */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-[1.15] px-2 hidden lg:block">
            <span className="block text-[4rem] font-semibold">End Your Car Lease Early</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 block text-[3.5rem] font-semibold mt-1 leading-[1.15] pb-2">
              We'll Handle the Entire Process for You
            </span>
          </h1>
          
          {/* Subtitle with better mobile text sizing to prevent hanging words */}
          <p className="text-[0.8125rem] sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
            <span className="hidden sm:inline">Tell us about your lease and we'll review your options for ending it early <br className="hidden lg:inline" />with authorized dealerships — no penalties, hidden fees or buyout required.</span>
            <span className="block sm:hidden">
              Tell us about your lease and we'll review your options
              <br />
              for ending it early with authorized dealerships —
              <br />
              no penalties, hidden fees or buyout required.
            </span>
          </p>
          
          {/* CTA Section */}
          <div className="relative py-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2 px-2">
                <Link href="/get-started" scroll>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm sm:text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto w-full sm:w-auto shadow-lg"
                    onClick={() => {
                      try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                    }}
                  >
                    Get My Lease Reviewed
                    <Search className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={scrollToHowItWorks}
                  className="bg-transparent border-blue-300 text-blue-100 hover:bg-blue-800/20 text-sm sm:text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto"
                >
                  How It Works
                </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-0 px-2">
              <span className="text-xs sm:text-sm text-blue-200/90 font-medium">
                Free for drivers
              </span>
              <span className="text-blue-300/70 text-base sm:text-lg font-black">•</span>
              <span className="text-xs sm:text-sm text-blue-200/90 font-medium">
                Authorized dealers only
              </span>
              <span className="text-blue-300/70 text-base sm:text-lg font-black">•</span>
              <span className="text-xs sm:text-sm text-blue-200/90 font-medium">
                We reply within 24 hours
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative">
          <Accordion type="single" collapsible className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
              {faqItems.map((item, index) => {
                const IconComponent = item.icon;
                
                return (
                  <AccordionItem 
                    key={index}
                    value={`faq-${index}`}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/30 transition-all duration-300 rounded-lg shadow-lg"
                  >
                    <AccordionTrigger className="hover:no-underline px-5 md:px-6 pt-5 md:pt-6 pb-3 [&[data-state=open]>div>svg]:rotate-180">
                      <div className="flex flex-col items-center text-center w-full gap-3">
                        <div className={`${item.iconBg} rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`h-6 w-6 md:h-7 md:w-7 ${item.iconColor}`} />
                        </div>
                        
                        <h3 className="text-sm md:text-base font-semibold text-white leading-tight">
                          {item.question}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-blue-300 font-medium">Learn More</span>
                          <ChevronDown className="h-5 w-5 text-blue-300 transition-transform duration-200" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                      <p className="text-[0.75rem] sm:text-sm md:text-base text-blue-100 leading-relaxed text-center">
                        <span className="block sm:hidden">{item.mobileAnswer || item.answer}</span>
                        <span className="hidden sm:block md:hidden">{item.answer}</span>
                        <span className="hidden md:block lg:hidden">{item.tabletAnswer || item.answer}</span>
                        <span className="hidden lg:block">{item.answer}</span>
                      </p>
                      {item.disclaimer && (
                        <p className="text-[0.625rem] sm:text-xs md:text-sm text-blue-200/80 leading-relaxed text-center mt-2 italic">
                          {item.disclaimer}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
