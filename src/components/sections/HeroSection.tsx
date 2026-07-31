import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, HelpCircle, DollarSign, Clock, ChevronDown, Check, ShieldCheck, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HeroSection() {
  const faqItems = [
    {
      icon: FileText,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      question: "What's in the Guide?",
      answer: "Your personalized guide includes all available lease exit strategies with clear cost breakdowns and a final recommendation that fits your specific situation."
    },
    {
      icon: Shield,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      question: "Why Do I Need This?",
      answer: "Know exactly where you stand before making decisions to exit your lease. Avoid costly mistakes and identify opportunities to save money. We lay out every option you have and the benefits of each option when it comes to ending your lease early."
    },
    {
      icon: Clock,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      question: "How Long Does It Take?",
      answer: "You'll receive your detailed PDF guide within 24-48 hours via email."
    },
    {
      icon: DollarSign,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      question: "How Much Does It Cost?",
      answer: "Just $39 for your complete personalized lease-exit analysis."
    }
  ];

  return (
    <section className="relative bg-sky-50 overflow-hidden">
      <div className="w-full">
        <div className="text-center pt-16">
          {/* UNIFIED BOX - Desktop & Tablet */}
          <div className="hidden md:block">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6">
              <div className="space-y-8">
                {/* Tablet title */}
                <h1 className="text-[2.75rem] lg:text-6xl font-bold mb-0 leading-tight block lg:hidden text-slate-900">
                  <span className="block">End Your Car Lease Early</span>
                  <span className="flex items-center justify-center gap-3 text-slate-700 -mt-1 text-[2.25rem] font-normal">
                    <div className="flex-shrink-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                      <ArrowRight className="h-4 w-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span>Understand Your Lease Options</span>
                  </span>
                </h1>
                
                {/* Desktop title */}
                <h1 className="text-[4rem] font-bold leading-tight hidden lg:block text-slate-900 mb-0">
                  <span className="block">End Your Car Lease Early</span>
                  <span className="flex items-center justify-center gap-3 text-slate-700 -mt-1 text-[2.75rem] font-normal">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                      <ArrowRight className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
                    </div>
                    <span>Understand Your Lease Exit Options</span>
                  </span>
                </h1>
                
                {/* CTA Section */}
                <div className="mt-8 flex justify-center">
                  <div className="bg-white rounded-2xl shadow-lg border border-blue-400/60 p-7 max-w-2xl w-full ring-1 ring-blue-200/50 hover:border-blue-500/70 hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-5">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                        Get A Personalized Lease Exit Guide
                      </h2>
                      <p className="text-sm md:text-base text-slate-600">
                        Understand your lease-exit options and determine what to do next.
                      </p>
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
                        Get My Personalized Guide — $39
                        <FileText className="ml-2.5 h-4 w-4 md:h-5 md:w-5" />
                      </Link>
                    </div>
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
                                {item.answer}
                              </p>
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

          {/* UNIFIED BOX - Mobile Only */}
          <div className="md:hidden">
            <div className="mx-auto max-w-lg px-4 pb-6 pt-4">
              <div className="space-y-6">
                {/* Hero Title - Mobile */}
                <h1 className="text-[2.5rem] sm:text-[3rem] font-bold leading-[1.1] sm:leading-tight text-slate-900">
                  <span className="block">End Your Car</span>
                  <span className="block">Lease Early</span>
                </h1>
                
                {/* Badge - Mobile */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                      <ArrowRight className="h-3 w-3 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-[0.9375rem] font-semibold text-blue-900 whitespace-nowrap">
                      Understand Your Lease Exit Options
                    </span>
                  </div>
                </div>
                
                {/* CTA Section - Mobile */}
                <div className="mt-2">
                  <div className="bg-white rounded-2xl shadow-lg border border-blue-400/60 p-6 ring-1 ring-blue-200/50 hover:border-blue-500/70 hover:shadow-xl transition-all duration-300 w-full">
                    <div className="text-center mb-5">
                      <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                        Get a Personalized<br />Lease Exit Guide
                      </h2>
                      <p className="text-[0.9375rem] text-slate-600 leading-relaxed">
                        Understand your lease-exit options and determine what to do next.
                      </p>
                    </div>
                    <div className="flex justify-center mb-4">
                      <Link
                        href="/get-started"
                        prefetch={true}
                        scroll
                        onClick={() => {
                          try { sessionStorage.setItem("forceScrollTopOnGetStarted", "1"); } catch {}
                        }}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-[0.875rem] px-5 py-2.5 shadow-lg transition-colors duration-200 font-bold rounded-xl border-0 w-full max-w-[280px] whitespace-nowrap"
                      >
                        Get My Personalized Guide — $39
                        <FileText className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* FAQ Section - Now inside the same box */}
                <div className="mt-4">
                  {/* FAQ Heading */}
                  <div className="text-center mb-5">
                    <div className="inline-block relative">
                      <h2 className="text-lg font-bold text-gray-900 mb-2">
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
                          <AccordionTrigger className="hover:no-underline px-6 pt-6 pb-3 [&>svg]:hidden">
                            <div className="flex flex-col items-center text-center w-full gap-2.5">
                              <div className={`${item.iconBg} rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                <IconComponent className={`h-6 w-6 ${item.iconColor}`} />
                              </div>
                              
                              <h3 className="text-[0.9375rem] font-bold text-slate-900 leading-tight">
                                {item.question}
                              </h3>
                              
                              <div className="flex items-center gap-1.5">
                                <span className="text-[0.8125rem] text-blue-600 font-semibold">Learn More</span>
                                <ChevronDown className="h-3.5 w-3.5 text-blue-600" />
                              </div>
                            </div>
                          </AccordionTrigger>
                          
                          <AccordionContent className="px-6 pb-6 pt-3">
                            <p className="text-[0.8125rem] text-slate-700 leading-[1.6] text-center font-medium">
                              {item.question === "How Much Does It Cost?" ? (
                                <>Just $39 for your complete personalized <span className="whitespace-nowrap">lease-exit analysis.</span></>
                              ) : (
                                item.answer
                              )}
                            </p>
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
      </div>
    </section>
  );
}