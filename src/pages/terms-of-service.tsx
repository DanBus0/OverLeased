import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  const router = useRouter();

  useEffect(() => {
    // Multiple approaches to ensure scroll to top
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    scrollToTop();

    // Scroll after a short delay to handle any layout shifts
    const timeoutId = setTimeout(scrollToTop, 100);

    // Listen for route changes
    const handleRouteChange = () => {
      scrollToTop();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      clearTimeout(timeoutId);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Terms of Service | OverLeased</title>
        <meta name="description" content="Read OverLeased's terms of service to understand your rights and responsibilities when using our early lease termination information service and dealer connection platform." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.overleased.com/terms-of-service" />
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Terms of Service | OverLeased" />
        <meta property="og:description" content="Read OverLeased's terms of service to understand your rights and responsibilities when using our early lease termination information service and dealer connection platform." />
        <meta property="og:url" content="https://www.overleased.com/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverLeased" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | OverLeased" />
        <meta name="twitter:description" content="Read OverLeased's terms of service to understand your rights and responsibilities when using our early lease termination information service and dealer connection platform." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 rounded-lg p-2">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">OverLeased</span>
              </Link>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
              <p className="text-blue-100 mt-2">Last updated: October 2025</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By accessing and using OverLeased's website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
                  </p>
                  <p>
                    These Terms of Service constitute a legally binding agreement between you and OverLeased. Your use of our services signifies your acceptance of these terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    OverLeased is a marketing and sourcing service that provides information to help consumers end their car lease early. We connect users with dealerships that may be interested in purchasing leased vehicles. Our services include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Information about options for ending your car lease early</li>
                    <li>Connection with pre-screened automotive dealerships</li>
                    <li>Educational resources about lease termination and automotive markets</li>
                    <li>Guidance and support throughout the information gathering process</li>
                  </ul>
                  
                  <p>
                    OverLeased may request purchase offers from authorized dealerships and present them to users for review. OverLeased does not negotiate or guarantee such offers and all transactions occur directly between the user and dealership.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <p className="text-blue-900 font-semibold mb-2">IMPORTANT DISCLAIMER:</p>
                    <p className="text-blue-800 text-sm mb-2">
                      OverLeased is NOT a dealer, broker, lender, or lessor. We do not:
                    </p>
                    <ul className="list-disc pl-6 text-blue-800 text-sm space-y-1">
                      <li>Negotiate vehicle sales or lease transactions</li>
                      <li>Execute vehicle purchases or lease payoffs</li>
                      <li>Act as a licensed automotive broker</li>
                      <li>Handle financial transactions between parties</li>
                      <li>Make any guarantees about offers or outcomes</li>
                    </ul>
                    <p className="text-blue-800 text-sm mt-2">
                      We are strictly a marketing and sourcing service that connects consumers with dealerships and provides information only.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities and Consent</h2>
                <div className="space-y-4 text-gray-700">
                  <p>As a user of our service, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and truthful information about your vehicle and lease</li>
                    <li>Maintain the confidentiality of any account credentials</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Not interfere with or disrupt our services or servers</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Respect the intellectual property rights of OverLeased and third parties</li>
                  </ul>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Consent to Share Information (DDPA Compliance)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      By submitting the form on our website and checking the consent box, you explicitly authorize OverLeased to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                      <li>Review your vehicle and lease information</li>
                      <li>Share your information with dealerships and service providers</li>
                      <li>Contact you via phone, email, or text message</li>
                      <li>Process your data as described in our Privacy Policy</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Accuracy and Use</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    While we strive to provide accurate information about early lease termination options, all information is provided for informational purposes only and should not be considered as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guaranteed offers or final valuations</li>
                    <li>Financial advice or recommendations</li>
                    <li>Legal counsel regarding your lease obligations</li>
                    <li>Binding commitments from any dealership</li>
                  </ul>
                  <p>
                    You acknowledge that any information provided through our service is subject to verification and may vary based on vehicle condition, market conditions, dealer interest, and other factors.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Dealerships</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    OverLeased acts as an intermediary to connect users with dealerships. We do not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Guarantee that any dealer will make an offer on your vehicle</li>
                    <li>Control the terms, timing, or conditions of any offers made</li>
                    <li>Participate in negotiations between you and dealerships</li>
                    <li>Handle or process any financial transactions</li>
                    <li>Take responsibility for dealer actions or representations</li>
                  </ul>
                  <p>
                    All transactions, negotiations, and agreements are between you and the dealer directly. OverLeased is not a party to these transactions and bears no responsibility for their outcome.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. No Broker Relationship</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    You expressly acknowledge and agree that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>OverLeased does not hold a broker's license</li>
                    <li>OverLeased does not act as your agent, representative, or broker</li>
                    <li>No broker-client relationship exists between you and OverLeased</li>
                    <li>OverLeased provides marketing and information services only</li>
                    <li>You are responsible for your own decisions and transactions</li>
                  </ul>
                  <p>
                    We encourage you to consult with qualified professionals (attorneys, financial advisors, CPAs) regarding any lease termination decisions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, OverLeased shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of our services, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Financial losses related to lease decisions or transactions</li>
                    <li>Inaccurate information or data</li>
                    <li>Dealer performance, non-performance, or lack of interest</li>
                    <li>Service interruptions or technical issues</li>
                    <li>Loss of data, time, or business opportunities</li>
                    <li>Any damages arising from third-party actions or omissions</li>
                  </ul>
                  <p className="font-semibold mt-4">
                    OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED $100.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Warranties of merchantability or fitness for a particular purpose</li>
                    <li>Warranties regarding accuracy, completeness, or reliability</li>
                    <li>Warranties of uninterrupted or error-free service</li>
                    <li>Warranties regarding dealer interest or offers</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    All content, features, and functionality on our website, including but not limited to text, graphics, logos, images, software, and service marks, are the exclusive property of OverLeased and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    You may not copy, modify, distribute, sell, or lease any part of our services without our express written permission.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Privacy and Data Protection</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Your privacy is important to us. Please review our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>, which governs your use of our services and explains how we collect, use, and protect your personal information.
                  </p>
                  <p>
                    By using our services, you consent to the data practices described in our Privacy Policy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Indemnification</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    You agree to indemnify, defend, and hold harmless OverLeased, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your use or misuse of our services</li>
                    <li>Your violation of these Terms of Service</li>
                    <li>Your violation of any rights of another party</li>
                    <li>Your transactions or interactions with dealerships</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                  </p>
                  <p>
                    Upon termination, your right to use our services will immediately cease, but the provisions that by their nature should survive termination shall survive, including but not limited to disclaimers, limitations of liability, and indemnification.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will make reasonable efforts to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    Your continued use of our services after any changes constitutes acceptance of the new Terms. If you do not agree to the new Terms, you must stop using our services.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law and Dispute Resolution</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the United States and the State of Pennsylvania, without regard to conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from or relating to these Terms or our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except that you may assert claims in small claims court if your claims qualify.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Severability</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Entire Agreement</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    These Terms, along with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and OverLeased regarding the use of our services and supersede any prior agreements or understandings.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Contact Information</h2>
                <div className="space-y-4 text-gray-700">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> support@overleased.com</p>
                    <p><strong>Phone:</strong> (484) 702-9539</p>
                    <p><strong>Website:</strong> www.overleased.com</p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
