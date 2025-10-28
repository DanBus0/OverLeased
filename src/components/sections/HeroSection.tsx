import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, HelpCircle, DollarSign, Handshake, Clock, ChevronDown, CircleCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HeroSection() {
  const scrollToFAQ = () => {
    const faqSection = document.getElementById("faq-section");
    faqSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faqItems = [
    {
      icon: HelpCircle,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      question: "Can I End My Lease Early?",
      answer: "Yes, at any time. We work with same-brand authorized dealers to purchase your vehicle and handle the remaining payoff.",
      tabletAnswer: (
        <>
          Yes, at any time. We work with same-brand authorized dealers who purchase your vehicle and handle the remaining
          <br className="hidden md:block lg:hidden" />
          payoff.
        </>
      ),
      disclaimer: null
    },
    {
      icon: DollarSign,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      question: "Will I Owe Money?",
      answer: "In most cases you'll actually make money. The dealer will pay market price for your car which often is more than your remaining lease balance.",
      tabletAnswer: (
        <>
          In most cases you'll actually make money. The dealer will pay market price for your car which often is more than your
          <br className="hidden md:block lg:hidden" />
          remaining lease balance.
        </>
      ),
      disclaimer: "*Based upon lease review and subject to dealer offers"
    },
    {
      icon: Handshake,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      question: "Do Dealers Buy Leases?",
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
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      question: "How Long Does It Take?",
      answer: "Most early lease exits complete within 3-7 business days. OverLeased manages the process based on your needs.",
      mobileAnswer: (
        <>
          Most early lease exits complete
          <br className="block sm:hidden" />
          within 3-7 business days. OverLeased
          <br className="block sm:hidden" />
          manages the process based on your needs.
        </>
      ),
      tabletAnswer: (
        <>
          Most early lease exits complete within 3-7 business
          <br className="hidden md:block lg:hidden" />
          days. OverLeased manages the process based on your needs.
        </>
      ),
      disclaimer: null
    }
  ];

  return (
    <section className="relative bg-slate-50 pt-4 md:pt-6 pb-12 md:pb-16 px-4">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          {/* Trust Indicator */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-4 md:py-2 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
              <span className="text-[0.625rem] md:text-xs font-semibold text-blue-900 tracking-wide">
                Trusted By Drivers Nationwide
              </span>
            </div>
          </div>

          {/* Mobile title */}
          <h1 className="text-[2.625rem] sm:text-[3.25rem] md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2 block md:hidden text-slate-900">
            <span className="block">End Your Car</span>
            <span className="block">Lease Early</span>
            <span className="block text-blue-600 mt-2 text-2xl sm:text-3xl md:text-3xl font-medium">
              We'll Handle the
            </span>
            <span className="block text-blue-600 text-2xl sm:text-3xl md:text-3xl font-medium">
              Entire Process for You
            </span>
          </h1>
          
          {/* Tablet title */}
          <h1 className="text-[2.75rem] md:text-[3.25rem] lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2 hidden md:block lg:hidden text-slate-900">
            <span className="block">End Your Car Lease Early</span>
            <span className="block text-blue-600 mt-2 text-3xl font-medium">
              We'll Handle the Entire Process for You
            </span>
          </h1>
          
          {/* Desktop title */}
          <h1 className="text-5xl md:text-5xl lg:text-[4rem] font-bold mb-4 md:mb-6 leading-tight px-2 hidden lg:block text-slate-900">
            <span className="block">End Your Car Lease Early</span>
            <span className="block text-blue-600 mt-2 text-4xl font-medium">
              We'll Handle the Entire Process for You
            </span>
          </h1>

          {/* New Callouts Section */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-6 mb-6 md:mb-8 px-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-lg shadow-sm">
              <CircleCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-xs md:text-sm font-medium text-slate-700">No Penalties</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-lg shadow-sm">
              <CircleCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-xs md:text-sm font-medium text-slate-700">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-200 rounded-lg shadow-sm">
              <CircleCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-xs md:text-sm font-medium text-slate-700">No Loans or Cash Buyout</span>
            </div>
          </div>
        </div>

        {/* CTA Section - Completely Rewritten */}
        <div className="relative mb-8 md:mb-10">
          <div className="flex justify-center px-2">
            <div className="w-full sm:w-auto md:w-full md:max-w-xl lg:max-w-2xl">
              <div className="bg-white rounded-2xl shadow-md border-2 border-slate-200 p-6 md:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Ready to End Your Lease?
                  </h2>
                </div>
                <div className="flex justify-center mb-3">
                  <Link
                    href="/get-started"
                    prefetch={true}
                    scroll
                    onClick={() => {
                      try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                    }}
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg px-8 md:px-10 py-3 md:py-4 shadow-lg transition-colors duration-200 font-bold rounded-2xl border-0"
                  >
                    Check If You Qualify
                    <Search className="ml-2.5 h-4 w-4 md:h-5 md:w-5" />
                  </Link>
                </div>
                <p className="text-sm md:text-base text-slate-600 font-medium text-center">
                  Takes less than a minute —<br className="sm:hidden" /> no commitment required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Now below CTA */}
        <div className="relative">
          {/* FAQ Heading - positioned closer to cards */}
          <div className="text-center mb-4 md:mb-5">
            <div className="inline-block relative">
              <h2 className="text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-2">
                Most Common Questions
              </h2>
              <div className="h-0.5 w-28 md:w-32 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto">
              {faqItems.map((item, index) => {
                const IconComponent = item.icon;
                
                return (
                  <AccordionItem 
                    key={index}
                    value={`faq-${index}`}
                    className="bg-white border-2 border-slate-200 text-slate-900 hover:border-blue-300 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline px-4 pt-4 pb-3 md:px-5 md:pt-5 md:pb-3.5 [&>svg]:hidden">
                      <div className="flex flex-col items-center text-center w-full gap-2.5 md:gap-3">
                        <div className={`${item.iconBg} rounded-lg w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <IconComponent className={`h-6 w-6 md:h-7 md:w-7 ${item.iconColor}`} />
                        </div>
                        
                        <h3 className="text-sm md:text-base font-bold text-slate-900 leading-tight">
                          {item.question}
                        </h3>
                        
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs md:text-sm text-blue-600 font-semibold">Learn More</span>
                          <ChevronDown className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-4 pb-4 pt-0 md:px-5 md:pb-5">
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-center font-medium">
                        <span className="block sm:hidden">{item.mobileAnswer || item.answer}</span>
                        <span className="hidden sm:block md:hidden">{item.answer}</span>
                        <span className="hidden md:block lg:hidden">{item.tabletAnswer || item.answer}</span>
                        <span className="hidden lg:block">{item.answer}</span>
                      </p>
                      {item.disclaimer && (
                        <p className="text-[0.6875rem] md:text-xs text-slate-500 leading-relaxed text-center mt-2.5 md:mt-3 italic font-medium">
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