import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "How can I end my car lease early?",
      answer: "You can end your car lease early at any time by having OverLeased connect with authorized dealers who will purchase your leased vehicle and handle the lease payoff directly with your leasing company."
    },
    {
      question: "Do you charge drivers anything?",
      answer: "No. Our service is completely free for drivers. We receive compensation from dealers only when they successfully purchase your vehicle. There are no fees or hidden charges for you."
    },
    {
      question: "Are the dealers on your platform trustworthy?",
      answer: "All dealers in our network are licensed, insured, and pre-screened. We verify their credentials, check their reputation, and monitor transaction quality. We only work with established dealerships with proven track records."
    },
    {
      question: "Do I need to pay penalties, get a loan, or buy out my lease?",
      answer: "No - OverLeased's process requires no penalties, no loans, and no cash buyout from you. The dealer handles the entire lease payoff directly with your leasing company, and you walk away free from your lease obligations."
    },
    {
      question: "What if I owe more than the car is worth?",
      answer: "We'll still help you explore your options. Even if your lease payoff exceeds the current market value, dealers may be interested depending on various factors. You have no obligation to accept any offers."
    },
    {
      question: "How long does it take?",
      answer: "Most early lease exits complete within 3-7 business days. After submitting your vehicle information, interested dealers typically respond within 24-48 hours. Once you accept an offer, the inspection and paperwork process usually takes 2-3 days."
    },
    {
      question: "Can I change my mind after getting offers?",
      answer: "You're under no obligation to accept any offers. You can decline all offers and continue with your current lease, or wait and try again later. There's no commitment until you sign an agreement with a dealer."
    },
    {
      question: "What happens to my lease agreement when I sell?",
      answer: "The dealer assumes your lease obligations and pays off the leasing company directly. You're completely released from your lease agreement and all future responsibilities once the transaction is complete. The dealer handles all paperwork with the leasing company."
    },
    {
      question: "Will you contact dealers without my permission?",
      answer: "No. We prioritize your privacy and control throughout the process. After you submit your vehicle information, we'll email you with available options. We only contact dealers after you explicitly reply \"I consent\" to our email."
    },
    {
      question: "Is my information safe?",
      answer: "Yes. Your details are securely processed and only shared with authorized dealerships for your specific brand, never with third parties."
    },
    {
      question: "Is ending my lease early part of a new process?",
      answer: "No, ending your lease early has always been possible—it's simply not widely advertised. Dealerships typically prefer customers complete their full lease terms to maximize revenue opportunities. OverLeased makes this existing option more accessible by connecting you directly with dealers interested in purchasing leased vehicles, giving you control over when to exit your lease."
    },
    {
      question: "What are the benefits of ending my lease early?",
      answer: "Ending your lease early gives you the freedom to exit your current lease commitment whenever you want. Whether you need a different vehicle, want to stop monthly payments, or simply want out of your lease, we make it possible."
    },
    {
      question: "Can I end my lease early if I still owe money on it?",
      answer: "Yes, absolutely. Most people ending their lease early still have remaining payments. The dealer handles the entire lease payoff process with your leasing company, and you're released from all future lease obligations."
    },
    {
      question: "What if my lease has excess mileage or wear and tear?",
      answer: "High mileage and wear issues are factored into dealer offers but don't prevent you from ending your lease early. Dealers will assess your vehicle's condition and provide offers based on its current state and market value."
    }
  ];

  return (
    <section id="faq-section" className="scroll-mt-24 pt-6 md:pt-8 pb-16 md:pb-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <Badge variant="secondary" className="mb-4 md:mb-6 bg-blue-100 text-blue-800 text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2">
            <HelpCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            Everything You Need to Know About Ending Your Lease Early
          </h2>
          <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2 leading-relaxed">
            Get answers to the most common questions about ending your car lease early and working with our platform.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-4 md:p-8">
            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-3 md:px-6">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base md:text-lg text-gray-900 hover:text-blue-600 py-3 md:py-4 leading-tight">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-gray-600 leading-relaxed pb-3 md:pb-4 break-words">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-8 md:mt-12 bg-blue-50 rounded-2xl p-6 md:p-8 text-center border border-blue-200">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            Still Have Questions?
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto px-2 leading-relaxed">
            Our lease specialists are here to help and will respond within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <div className="text-center p-3 md:p-0">
              <div className="text-base md:text-lg lg:text-xl font-semibold text-gray-900">📞 Call Us</div>
              <a href="tel:+14847029539" className="text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base lg:text-lg transition-colors whitespace-nowrap">
                (484) 702-9539
              </a>
            </div>
            <div className="text-center p-3 md:p-0">
              <div className="text-base md:text-lg lg:text-xl font-semibold text-gray-900">✉️ Email</div>
              <a href="mailto:support@overleased.com" className="text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base lg:text-lg break-words transition-colors">
                support@overleased.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
