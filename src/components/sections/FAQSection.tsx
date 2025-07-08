import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is lease equity and how do I know if I have it?",
      answer: "Lease equity is the difference between your vehicle's current market value and what you owe on the lease (remaining payments + residual value). You have positive equity when your car is worth more than what you owe. This often happens when market values rise or you've driven fewer miles than expected."
    },
    {
      question: "How accurate are your lease equity calculations?",
      answer: "Our calculations use real-time market data from multiple sources including auction results, dealer transactions, and market analytics. While estimates may vary by ±10%, they provide a reliable baseline for understanding your lease position. Final offers from dealers will depend on vehicle condition and local market factors."
    },
    {
      question: "Is there any cost to use OverLeased?",
      answer: "No, our service is completely free for consumers. We're compensated by participating dealers when successful transactions occur. You'll never pay any fees to calculate your equity or receive dealer offers."
    },
    {
      question: "How long does the process take from calculation to cash?",
      answer: "Most transactions complete within 3-7 business days. After calculating your equity, interested dealers typically respond within 24-48 hours. Once you accept an offer, the inspection and paperwork process usually takes 2-3 days."
    },
    {
      question: "What if my lease has excess mileage or wear and tear?",
      answer: "Excess mileage and wear issues are factored into dealer offers. While they may reduce your equity, you might still come out ahead compared to paying lease-end penalties. Our calculator helps estimate these costs, and dealers will provide final offers after inspection."
    },
    {
      question: "Can I sell my lease if I still owe money on it?",
      answer: "Yes, this is very common. The dealer will pay off your remaining lease balance and any positive equity goes to you. If you have negative equity, you'd need to pay the difference, but this might still be better than lease-end penalties."
    },
    {
      question: "Are the dealers on your platform trustworthy?",
      answer: "All dealers in our network are licensed, insured, and pre-screened. We verify their credentials, check their reputation, and monitor transaction quality. We only work with established dealerships with proven track records."
    },
    {
      question: "What happens to my lease agreement when I sell?",
      answer: "The dealer assumes your lease obligations and pays off the leasing company directly. You're released from all future lease responsibilities once the transaction is complete. The dealer handles all paperwork with the leasing company."
    },
    {
      question: "Can I negotiate the dealer offers?",
      answer: "Yes, dealer offers are starting points for negotiation. Factors like vehicle condition, local demand, and timing can influence the final price. We work hard to receive the maximum price for your car."
    },
    {
      question: "What if I change my mind after getting offers?",
      answer: "You're under no obligation to accept any offers. You can decline all offers and keep your lease, or wait for better market conditions. There's no commitment until you sign a purchase agreement with a dealer."
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <Badge variant="secondary" className="mb-4 md:mb-6 bg-blue-100 text-blue-800">
            <HelpCircle className="h-4 w-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            Everything You Need to Know About Lease Equity
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2 leading-relaxed">
            Get answers to the most common questions about selling your car lease and working with our platform.
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-white border-b border-gray-100 p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl lg:text-3xl text-center text-gray-900 px-2">
              Common Questions About Lease Equity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-8">
            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-3 md:px-6">
                  <AccordionTrigger className="text-left font-semibold text-base md:text-lg text-gray-900 hover:text-blue-600 py-3 md:py-4 leading-tight">
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
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            Still Have Questions?
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto px-2 leading-relaxed">
            Our lease equity specialists are here to help. Get personalized answers about your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <div className="text-center p-3 md:p-0">
              <div className="text-base md:text-lg lg:text-xl font-semibold text-gray-900">📞 Call Us</div>
              <div className="text-blue-600 font-medium text-sm md:text-base lg:text-lg">(484) 702-9539</div>
            </div>
            <div className="text-center p-3 md:p-0">
              <div className="text-base md:text-lg lg:text-xl font-semibold text-gray-900">✉️ Email</div>
              <div className="text-blue-600 font-medium text-sm md:text-base lg:text-lg break-words">support@overleased.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
