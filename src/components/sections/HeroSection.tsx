import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, HelpCircle, DollarSign, Handshake, Clock, ChevronDown, Check, ShieldCheck, ArrowRight } from "lucide-react";
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
      answer: "Yes, at any time. We work with same-brand authorized dealers to purchase your lease and handle the remaining payoff. OverLeased handles this entire process for you.",
      tabletAnswer: (
        <>
          Yes, at any time. We work with same-brand authorized dealers to purchase your lease and handle the remaining payoff.
          <br className="hidden md:block lg:hidden" />
          OverLeased handles this entire process for you.
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
      mobileAnswer: "Yes, dealers purchase leased vehicles regularly. It's not advertised because dealers make less if you end your lease early.",
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
    <section className="relative bg-blue-50/50 pt-6 md:pt-6 pb-3 md:pb-8 px-2 md:px-6">
      <div className="max-w-[96%] md:max-w-[88%] mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          {/* Trust Indicator */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-2 bg-white border-[0.5px] border-slate-300 rounded-lg shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
              <span className="text-[0.6875rem] md:text-xs font-semibold text-blue-900 tracking-wide">
                Trusted By Drivers Nationwide
              </span>
            </div>
          </div>

          {/* UNIFIED BOX - Desktop & Tablet */}
          <div className="hidden md:block">
            <div className="bg-white/95 backdrop-blur-sm border border-slate-100/50 rounded-xl shadow-md py-10 px-8 max-w-[160rem] mx-auto">
              {/* Tablet title */}
              <h1 className="text-[2.75rem] lg:text-6xl font-bold mb-0 leading-tight block lg:hidden text-slate-900">
                <span className="block">End Your Car Lease Early</span>
                <span className="flex items-center justify-center gap-3 text-slate-700 -mt-1 text-[2.25rem] font-normal">
                  <div className="flex-shrink-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <ArrowRight className="h-4 w-4 text-white" strokeWidth={2.5} />
                  </div>
                  <span>No Lease Buyout Required</span>
                </span>
              </h1>
              
              {/* Desktop title */}
              <h1 className="text-[4rem] font-bold leading-tight hidden lg:block text-slate-900 mb-0">
                <span className="block">End Your Car Lease Early</span>
                <span className="flex items-center justify-center gap-3 text-slate-700 -mt-1 text-[2.75rem] font-normal">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <ArrowRight className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
                  </div>
                  <span>No Lease Buyout Required</span>
                </span>
              </h1>

              {/* Desktop Callouts */}
              <div className="flex flex-row justify-center gap-3 mt-6">
                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-50 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-blue-600">
                    <Check className="h-2.5 w-2.5 text-blue-600" strokeWidth={3} />
                  </div>
                  <span className="text-[0.9375rem] font-medium text-slate-900 tracking-tight">No Loans or Financing</span>
                </div>
                
                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-50 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-blue-600">
                    <Check className="h-2.5 w-2.5 text-blue-600" strokeWidth={3} />
                  </div>
                  <span className="text-[0.9375rem] font-medium text-slate-900 tracking-tight">No Penalties</span>
                </div>
                
                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-50 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-blue-600">
                    <Check className="h-2.5 w-2.5 text-blue-600" strokeWidth={3} />
                  </div>
                  <span className="text-[0.9375rem] font-medium text-slate-900 tracking-tight">No Hidden Fees</span>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-8 flex justify-center">
                <div className="bg-white rounded-2xl shadow-lg border border-blue-400/60 p-7 max-w-2xl w-full ring-1 ring-blue-200/50 hover:border-blue-500/70 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-5">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                      Ready to End Your Lease?
                    </h2>
                  </div>
                  <div className="flex justify-center mb-5">
                    <Link
                      href="/get-started"
                      prefetch={true}
                      scroll
                      onClick={() => {
                        try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                      }}
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg px-8 md:px-10 py-3.5 md:py-3 shadow-lg transition-colors duration-200 font-bold rounded-2xl border-0"
                    >
                      Check If You Qualify
                      <Search className="ml-2.5 h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 font-medium text-center">
                    Takes less than a minute — no commitment required.
                  </p>
                </div>
              </div>

              {/* FAQ Section - Now inside the same box */}
              <div className="mt-16">
                {/* FAQ Heading */}
                <div className="text-center mb-6">
                  <div className="inline-block relative">
                    <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                      Most Common Questions
                    </h2>
                    <div className="h-0.5 w-28 md:w-32 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-full mx-auto"></div>
                  </div>
                </div>
                
                <div className="max-w-7xl mx-auto">
                  <Accordion type="single" collapsible className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
                    {faqItems.map((item, index) => {
                      const IconComponent = item.icon;
                      
                      return (
                        <AccordionItem 
                          key={index}
                          value={`faq-${index}`}
                          className="bg-white border-2 border-slate-200 text-slate-900 hover:border-blue-300 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
                        >
                          <AccordionTrigger className="hover:no-underline px-7 pt-7 pb-3 md:px-7 md:pt-7 md:pb-3.5 [&>svg]:hidden">
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
                          
                          <AccordionContent className="px-7 pb-7 pt-4 md:px-7 md:pb-7 md:pt-4">
                            <p className="text-xs md:text-sm text-slate-700 leading-[1.6] text-center font-medium">
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
            </div>
          </div>

          {/* UNIFIED BOX - Mobile */}
          <div className="block md:hidden mt-2.5 mb-6">
            <div className="bg-white/95 backdrop-blur-sm border border-slate-100/50 rounded-xl shadow-md pt-5 px-7 pb-7 max-w-[95%] mx-auto">
              {/* Hero Title - Mobile */}
              <div className="text-center mb-4">
                <h1 className="text-[2.25rem] sm:text-[3rem] font-bold leading-[1.1] sm:leading-tight text-slate-900">
                  <span className="block">End Your Car</span>
                  <span className="block">Lease Early</span>
                </h1>
              </div>
              
              {/* Badge - Mobile */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <ArrowRight className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-[0.875rem] font-semibold text-blue-900 whitespace-nowrap">
                    No Lease Buyout Required
                  </span>
                </div>
              </div>
              
              {/* Callouts List */}
              <div className="flex flex-col items-start gap-2.5 mb-8 pl-4 bg-gray-50/40 border border-gray-300 rounded-lg py-3 px-4 max-w-[240px] mx-auto">
                {/* No Loans or Financing - Blue check mark */}
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-[0.8125rem] text-slate-800">No Loans or Financing</span>
                </div>
                
                {/* No Penalties - Blue check mark */}
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-[0.8125rem] text-slate-800">No Penalties</span>
                </div>
                
                {/* No Hidden Fees - Blue check mark */}
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-[0.8125rem] text-slate-800">No Hidden Fees</span>
                </div>
              </div>

              {/* CTA Section - Mobile */}
              <div className="mb-12">
                <div className="bg-white rounded-2xl shadow-lg border border-blue-400/60 p-5 ring-1 ring-blue-200/50 hover:border-blue-500/70 hover:shadow-xl transition-all duration-300 w-full">
                  <div className="text-center mb-4">
                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                      Ready to End Your Lease?
                    </h2>
                  </div>
                  <div className="flex justify-center mb-4">
                    <Link
                      href="/get-started"
                      prefetch={true}
                      scroll
                      onClick={() => {
                        try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                      }}
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-[15px] px-6 py-3 shadow-lg transition-colors duration-200 font-bold rounded-xl border-0 max-w-[250px] whitespace-nowrap"
                    >
                      Check If You Qualify
                      <Search className="ml-2 h-3.5 w-3.5 flex-shrink-0" />
                    </Link>
                  </div>
                  <p className="text-sm text-slate-600 font-medium text-center max-w-[200px] mx-auto">
                    Takes less than a minute —{" "}
                    <span className="block">no commitment required.</span>
                  </p>
                </div>
              </div>

              {/* FAQ Section - Now inside the same box */}
              <div>
                {/* FAQ Heading */}
                <div className="text-center mb-6">
                  <div className="inline-block relative">
                    <h2 className="text-base font-bold text-gray-900 mb-2">
                      Most Common Questions
                    </h2>
                    <div className="h-0.5 w-28 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-full mx-auto"></div>
                  </div>
                </div>
                
                <Accordion type="single" collapsible className="grid grid-cols-1 gap-3 mb-0">
                  {faqItems.map((item, index) => {
                    const IconComponent = item.icon;
                    
                    return (
                      <AccordionItem 
                        key={index}
                        value={`faq-${index}`}
                        className="bg-white border-2 border-slate-200 text-slate-900 hover:border-blue-300 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
                      >
                        <AccordionTrigger className="hover:no-underline px-7 pt-7 pb-3 [&>svg]:hidden">
                          <div className="flex flex-col items-center text-center w-full gap-2.5">
                            <div className={`${item.iconBg} rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                              <IconComponent className={`h-6 w-6 ${item.iconColor}`} />
                            </div>
                            
                            <h3 className="text-sm font-bold text-slate-900 leading-tight">
                              {item.question}
                            </h3>
                            
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-blue-600 font-semibold">Learn More</span>
                              <ChevronDown className="h-3.5 w-3.5 text-blue-600" />
                            </div>
                          </div>
                        </AccordionTrigger>
                        
                        <AccordionContent className="px-7 pb-7 pt-4">
                          <p className="text-xs text-slate-700 leading-[1.6] text-center font-medium">
                            {item.mobileAnswer || item.answer}
                          </p>
                          {item.disclaimer && (
                            <p className="text-[0.6875rem] text-slate-500 leading-relaxed text-center mt-2.5 italic font-medium">
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
          </div>
        </div>
      </div>
    </section>
  );
}
