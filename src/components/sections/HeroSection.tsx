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
      answer: "Yes, at any time by connecting with authorized dealers who purchase your vehicle and handle the payoff. There are no penalties, hidden fees or buyout required.",
      tabletAnswer: (
        <>
          Yes, at any time by connecting with authorized dealers who purchase your vehicle and handle the
          <br className="hidden md:block lg:hidden" />
          payoff. There are no penalties, hidden fees or buyout required.
        </>
      ),
      disclaimer: null
    },
    {
      icon: DollarSign,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      question: "Will I Owe Money?",
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
    <section className="relative bg-slate-50 pt-8 md:pt-12 pb-12 md:pb-16 px-4">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          {/* Trust Indicator */}
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-4 md:py-2 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
              <div className="w-0.5 h-0.5 md:w-1.5 md:h-1.5 bg-blue-500 rounded-full"></div>
              <span className="text-[0.625rem] md:text-xs font-semibold text-blue-900 tracking-wide">
                Trusted By Drivers Nationwide
              </span>
            </div>
          </div>

          {/* Mobile title */}
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2 block md:hidden text-slate-900">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2 hidden md:block lg:hidden text-slate-900">
            <span className="block">End Your Car Lease Early</span>
            <span className="block text-blue-600 mt-2 text-3xl font-medium">
              We'll Handle the Entire Process for You
            </span>
          </h1>
          
          {/* Desktop title */}
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2 hidden lg:block text-slate-900">
            <span className="block">End Your Car Lease Early</span>
            <span className="block text-blue-600 mt-2 text-4xl font-medium">
              We'll Handle the Entire Process for You
            </span>
          </h1>
        </div>

        {/* FAQ Section */}
        <div className="relative mb-8 md:mb-10">
          <Accordion type="single" collapsible className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
              {faqItems.map((item, index) => {
                const IconComponent = item.icon;
                
                return (
                  <AccordionItem 
                    key={index}
                    value={`faq-${index}`}
                    className="bg-white border-2 border-slate-200 text-slate-900 hover:border-blue-300 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline px-4 pt-5 pb-4 md:px-6 md:pt-7 md:pb-5 [&>svg]:hidden">
                      <div className="flex flex-col items-center text-center w-full gap-3 md:gap-4">
                        <div className={`${item.iconBg} rounded-xl w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <IconComponent className={`h-6 w-6 md:h-8 md:w-8 lg:h-9 lg:w-9 ${item.iconColor}`} />
                        </div>
                        
                        <h3 className="text-sm md:text-base lg:text-lg font-bold text-slate-900 leading-tight">
                          {item.question}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm text-blue-600 font-semibold">Learn More</span>
                          <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-4 pb-5 pt-0 md:px-6 md:pb-7">
                      <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed text-center font-medium">
                        <span className="block sm:hidden">{item.mobileAnswer || item.answer}</span>
                        <span className="hidden sm:block md:hidden">{item.answer}</span>
                        <span className="hidden md:block lg:hidden">{item.tabletAnswer || item.answer}</span>
                        <span className="hidden lg:block">{item.answer}</span>
                      </p>
                      {item.disclaimer && (
                        <p className="text-[0.6875rem] md:text-xs lg:text-sm text-slate-500 leading-relaxed text-center mt-3 md:mt-4 italic font-medium">
                          {item.disclaimer}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </div>

        {/* CTA Section - Now below FAQ cards */}
        <div className="relative">
          <div className="flex justify-center px-2">
            <div className="w-full sm:w-auto md:w-full md:max-w-xl lg:max-w-2xl">
              <div className="bg-white rounded-2xl shadow-md border-2 border-slate-200 p-6 md:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    Ready to End Your Lease?
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 font-medium">
                    Get your free lease review and <br className="block sm:hidden" />discover your options.
                  </p>
                </div>
                <Link href="/get-started" scroll className="flex justify-center">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg px-8 md:px-10 py-3 md:py-3.5 h-auto shadow-sm hover:shadow-md transition-all duration-300 font-semibold rounded-xl border-2 border-blue-700"
                    onClick={() => {
                      try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                    }}
                  >
                    Get a Free Lease Review
                    <Search className="ml-2.5 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-xs md:text-sm text-slate-500 text-center mt-4 font-medium">
                  No commitment • Takes less than a minute • Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
