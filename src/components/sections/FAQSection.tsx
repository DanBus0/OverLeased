import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      question: "What's included in the guide?",
      answer: "Your personalized guide includes: lease payoff information from your lender, estimated market value, calculated equity position (positive or negative), all available exit options with associated costs, our expert recommendation for your specific situation, and a clear breakdown of the financial implications of each option."
    },
    {
      question: "Is this just for drivers who want to end their lease early?",
      answer: "No. While many customers use our guide to explore early exit options, it's also valuable if you're approaching lease-end and want to understand whether buying out your lease makes financial sense, or if you're considering trading in your leased vehicle for a new one."
    },
    {
      question: "How long does it take to get my guide?",
      answer: "Guides are delivered within 24-48 hours via email."
    },
    {
      question: "What if I have negative equity?",
      answer: "We'll show you exactly how much negative equity you have and explain all your options, including strategies to minimize costs. Many drivers with negative equity still have viable paths forward - our guide helps you understand them clearly."
    },
    {
      question: "Will this affect my credit score or lease?",
      answer: "No. Getting a guide has zero impact on your credit score or current lease agreement. We're simply providing you with information - you decide what to do with it."
    },
    {
      question: "Is my information kept private?",
      answer: "Yes. We use your information solely to generate your guide. We never sell your data to third parties."
    },
    {
      question: "What happens after I get my guide?",
      answer: "You'll have all the information you need to make an informed decision. There's no obligation to take any action. Some customers proceed with an exit option, others decide to keep their lease - it's entirely up to you."
    },
    {
      question: "Can I use this guide when negotiating with a dealer?",
      answer: "Absolutely. Your guide gives you the exact numbers you need to negotiate confidently with dealers. You'll know your vehicle's true value and your lease position, preventing dealers from lowballing you or hiding costs."
    }
  ];

  return (
    <section id="faq" className="scroll-mt-24 pt-8 md:pt-12 pb-16 md:pb-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-5">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-5 md:p-8">
            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4 md:px-6">
                  <AccordionTrigger className="text-left font-semibold text-[0.9375rem] sm:text-base md:text-lg text-gray-900 hover:text-blue-600 py-4 leading-tight">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[0.875rem] md:text-base text-gray-600 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-10 md:mt-12 bg-blue-50 rounded-2xl p-6 md:p-8 text-center border border-blue-200">
          <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 px-2">
            Still Have Questions?
          </h3>
          <p className="text-[0.9375rem] md:text-base text-gray-600 mb-5 md:mb-6 max-w-2xl mx-auto px-2 leading-relaxed">
            Our team is here to help and will respond within one business day.
          </p>
          <div className="flex justify-center">
            <div className="text-center p-3 md:p-0">
              <div className="text-[1.0625rem] md:text-lg lg:text-xl font-semibold text-gray-900 mb-1">✉️ Email</div>
              <a href="mailto:support@overleased.com" className="text-blue-600 hover:text-blue-800 font-medium text-[0.9375rem] md:text-base lg:text-lg break-words transition-colors">
                support@overleased.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}