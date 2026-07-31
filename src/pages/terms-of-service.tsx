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
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    const timeoutId = setTimeout(scrollToTop, 100);

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
        <meta name="description" content="Read OverLeased's terms of service to understand your rights and responsibilities when purchasing our Personalized Lease Exit Guide and using our services." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.overleased.com/terms-of-service" />
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
        
        <meta property="og:title" content="Terms of Service | OverLeased" />
        <meta property="og:description" content="Read OverLeased's terms of service to understand your rights and responsibilities when purchasing our Personalized Lease Exit Guide and using our services." />
        <meta property="og:url" content="https://www.overleased.com/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverLeased" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | OverLeased" />
        <meta name="twitter:description" content="Read OverLeased's terms of service to understand your rights and responsibilities when purchasing our Personalized Lease Exit Guide and using our services." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
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

        <main className="max-w-4xl mx-auto px-4 py-12">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
              <p className="text-blue-100 mt-2">Last updated: July 2026</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By accessing and using OverLeased's website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
                  </p>
                  <p>
                    These Terms of Service constitute a legally binding agreement between you ("Customer," "you," or "your") and OverLeased ("Company," "we," "us," or "our"). Your use of our services signifies your acceptance of these terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    OverLeased provides the following services:
                  </p>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-4">A. Personalized Lease Exit Guide ($39)</h3>
                  <p>
                    A comprehensive digital report that analyzes your specific lease situation and provides personalized information about your options for ending your car lease early. The report includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>A vehicle-specific estimated dealer trade-in value and preliminary lease-exit analysis, followed by a complimentary estimated-equity review after you provide the dealer payoff amount</li>
                    <li>Explanation of available exit strategies</li>
                    <li>Step-by-step guidance for your specific situation</li>
                    <li>Educational information about lease termination processes</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900 mt-4">B. Complimentary Payoff Review (Free)</h3>
                  <p>
                    An included follow-up review to help you understand your dealer payoff information and estimated equity.
                  </p>

                  <h3 className="text-lg font-medium text-gray-900 mt-4">C. Optional Dealer Coordination Service (Separate Purchase)</h3>
                  <p>
                    An optional add-on service that connects you with appropriate authorized dealerships in your geographic area that may be interested in purchasing your leased vehicle. This service is purchased separately and requires explicit consent for dealership sharing.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <p className="text-blue-900 font-semibold mb-2">IMPORTANT DISCLAIMER:</p>
                    <p className="text-blue-800 text-sm mb-2">
                      OverLeased is an informational service provider. We are NOT:
                    </p>
                    <ul className="list-disc pl-6 text-blue-800 text-sm space-y-1">
                      <li>A licensed automotive dealer, broker, lender, or lessor</li>
                      <li>A financial advisor or legal counsel</li>
                      <li>A party to any vehicle transaction or lease agreement</li>
                      <li>Responsible for negotiating deals or executing transactions</li>
                    </ul>
                    <p className="text-blue-800 text-sm mt-2">
                      We provide information and guidance only. All decisions regarding your lease remain your responsibility.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Purchase Terms - Lease Exit Guide</h2>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-lg font-medium text-gray-900">A. Price and Payment</h3>
                  <p>
                    The Personalized Lease Exit Guide is offered at a one-time price of <strong>$39.00</strong> (USD). Payment is processed securely through Stripe, our payment processor. You agree to provide accurate payment information and authorize us to charge the stated amount.
                  </p>

                  <h3 className="text-lg font-medium text-gray-900">B. Required Information</h3>
                  <p>
                    To purchase and receive your Lease Exit Guide, you must provide the customer, vehicle, mileage, condition, location, and payment information requested during checkout. OverLeased may request additional lease or vehicle information when necessary to prepare the guide.
                  </p>
                  <p className="mt-2">
                    You represent and warrant that all information provided is accurate and truthful to the best of your knowledge.
                  </p>

                  <h3 className="text-lg font-medium text-gray-900">C. Delivery Timeframe</h3>
                  <p>
                    Your Personalized Lease Exit Guide will be delivered digitally to your email address within <strong>24-48 hours</strong> of payment confirmation. Delivery times may be extended during high-volume periods or if additional verification is required.
                  </p>

                  <h3 className="text-lg font-medium text-gray-900">D. Digital Delivery</h3>
                  <p>
                    The Lease Exit Guide is delivered as a digital PDF document via email. By purchasing, you acknowledge that:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You have the ability to receive and view PDF documents</li>
                    <li>You will check your spam/junk folders if the email is not received</li>
                    <li>You are responsible for saving and storing your report</li>
                    <li>We may retain a copy of your report for customer service purposes</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Refund and Cancellation Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Due to the immediate nature of digital information products and the custom analysis performed for each customer:
                  </p>
                  
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="font-semibold text-amber-900 mb-2">Standard Policy:</p>
                    <p className="text-amber-800 text-sm">
                      <strong>All sales are final once your Lease Exit Guide has been delivered.</strong> Once the report is generated and sent to your email, the service has been rendered and no refund can be issued.
                    </p>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mt-4">Exceptions:</h3>
                  <p>
                    A refund may be issued in the following limited circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Technical Failure:</strong> If we are unable to deliver your report due to technical issues on our end (not email delivery problems)</li>
                    <li><strong>Service Not Rendered:</strong> If we determine we cannot provide the service for your specific situation and notify you before delivery</li>
                    <li><strong>Duplicate Charge:</strong> If you were charged multiple times for the same purchase due to a processing error</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900 mt-4">Refund Requests:</h3>
                  <p>
                    To request a refund under the above exceptions, contact us at <strong>support@overleased.com</strong> within <strong>7 days</strong> of purchase with:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your order confirmation number</li>
                    <li>Detailed explanation of the issue</li>
                    <li>Any supporting documentation</li>
                  </ul>
                  <p className="mt-2">
                    Approved refunds will be processed within 10 business days to the original payment method.
                  </p>

                  <p className="text-sm text-gray-600 mt-4">
                    Note: Dissatisfaction with the information provided, change of mind, or finding alternative solutions are not valid grounds for refund once the report has been delivered.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Complimentary Payoff Review</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our free Payoff Review service is provided on a best-effort basis. By using this service, you acknowledge that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The review is informational and educational only</li>
                    <li>Response times may vary based on volume</li>
                    <li>We may decline to review payoff information or documents that are incomplete or illegible</li>
                    <li>This service does not create any obligation or liability on our part</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Optional Dealer Coordination Service</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    The Dealer Coordination Service is available as a separate, optional purchase. This service:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Requires separate payment and explicit consent</li>
                    <li>Involves sharing your information with dealerships (as detailed in our Privacy Policy)</li>
                    <li>Does not guarantee any specific outcomes or offers</li>
                    <li>Is subject to its own terms provided at the time of purchase</li>
                  </ul>
                  <p>
                    If you purchase the Dealer Coordination Service, you acknowledge that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We act only as an intermediary to connect you with dealerships</li>
                    <li>All offers and negotiations occur directly between you and the dealer</li>
                    <li>We are not responsible for dealer actions, offers, or lack thereof</li>
                    <li>Dealerships make independent decisions about whether to make offers</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Nature of Information - Estimates and Disclaimers</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    All information provided in our services, including the Lease Exit Guide, is based on:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Information you provide to us</li>
                    <li>Publicly available data and market information</li>
                    <li>General industry knowledge and trends</li>
                    <li>Historical patterns and typical scenarios</li>
                  </ul>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mt-4">
                    <p className="font-semibold text-gray-900 mb-2">Important Acknowledgments:</p>
                    <p className="text-gray-700 text-sm mb-2">
                      You acknowledge and agree that all valuations, equity calculations, and options presented are <strong>estimates</strong>, not guaranteed outcomes or binding offers. Actual results may vary based on:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                      <li>Actual vehicle condition (we do not inspect your vehicle)</li>
                      <li>Current market conditions and demand</li>
                      <li>Geographic location and local market factors</li>
                      <li>Timing and availability of buyers or dealers</li>
                      <li>Accuracy and completeness of information you provided</li>
                      <li>Changes in lease terms or payoff amounts</li>
                    </ul>
                  </div>

                  <p className="mt-4">
                    Our information should not be considered as:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Financial advice or recommendations tailored to your specific financial situation</li>
                    <li>Legal counsel regarding your lease obligations or rights</li>
                    <li>Tax advice (consult a tax professional)</li>
                    <li>Guaranteed offers or binding commitments from any party</li>
                    <li>A substitute for professional consultation with attorneys, CPAs, or financial advisors</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Payment Processing</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    All payments are processed securely through Stripe, Inc., a third-party payment processor. By making a purchase, you agree to Stripe's Terms of Service and Privacy Policy.
                  </p>
                  <p>
                    We do not store your credit card information. All payment data is handled directly by Stripe using industry-standard security measures.
                  </p>
                  <p>
                    You are responsible for any fees charged by your financial institution related to the transaction.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. User Responsibilities</h2>
                <div className="space-y-4 text-gray-700">
                  <p>As a user of our services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and truthful information about your vehicle and lease</li>
                    <li>Review all provided information carefully and verify its accuracy</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Not share your report with third parties for commercial purposes</li>
                    <li>Not attempt to reverse engineer, copy, or resell our reports or analysis methods</li>
                    <li>Comply with all applicable laws and your lease agreement terms</li>
                    <li>Make your own independent decisions regarding your lease</li>
                    <li>Consult with appropriate professionals (attorneys, CPAs, financial advisors) before making significant financial decisions</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. No Broker or Agent Relationship</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    You expressly acknowledge and agree that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>OverLeased does not hold an automotive broker's license</li>
                    <li>OverLeased does not act as your agent, representative, fiduciary, or broker</li>
                    <li>No broker-client, agent-principal, or advisory relationship exists between you and OverLeased</li>
                    <li>OverLeased provides informational services only and does not represent your interests in any transaction</li>
                    <li>You are responsible for your own decisions and any consequences thereof</li>
                  </ul>
                  <p>
                    If the Dealer Coordination Service is purchased separately, OverLeased acts solely as an intermediary to facilitate introductions. We do not negotiate on your behalf or represent either party's interests.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, OverLeased, its officers, directors, employees, contractors, and agents shall not be liable for any direct, indirect, incidental, special, consequential, punitive, or exemplary damages resulting from your use of our services, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Financial losses related to lease decisions or vehicle transactions</li>
                    <li>Inaccurate or incomplete information or estimates</li>
                    <li>Market changes or unforeseen circumstances</li>
                    <li>Differences between estimated and actual values or outcomes</li>
                    <li>Actions or inactions of third parties (dealers, lessors, buyers)</li>
                    <li>Service interruptions, delays, or technical issues</li>
                    <li>Loss of data, time, or business opportunities</li>
                    <li>Any damages arising from reliance on information provided</li>
                  </ul>
                  <p className="font-semibold mt-4">
                    OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SPECIFIC SERVICE GIVING RISE TO THE CLAIM.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Some jurisdictions do not allow the exclusion or limitation of certain damages. In such jurisdictions, our liability is limited to the maximum extent permitted by law.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Disclaimer of Warranties</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                    <li>Warranties regarding accuracy, completeness, reliability, or currency of information</li>
                    <li>Warranties of uninterrupted, timely, secure, or error-free service</li>
                    <li>Warranties regarding outcomes, results, or financial benefits</li>
                    <li>Warranties that information will meet your specific needs or expectations</li>
                  </ul>
                  <p className="mt-4">
                    We make no warranty that the information provided will result in any particular outcome, savings, or benefit. Market conditions, lease terms, and individual circumstances vary significantly and are beyond our control.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Intellectual Property</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    All content, features, methodologies, and functionality on our website and in our reports, including but not limited to text, graphics, logos, analysis methods, algorithms, software, and proprietary information, are the exclusive property of OverLeased and are protected by copyright, trademark, trade secret, and other intellectual property laws.
                  </p>
                  <p>
                    Your purchase of a Lease Exit Guide grants you a personal, non-exclusive, non-transferable license to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>View and use the report for your personal decision-making</li>
                    <li>Share with your immediate family or personal advisors (attorney, CPA, financial advisor)</li>
                  </ul>
                  <p>
                    You may NOT:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Copy, modify, distribute, sell, or lease any part of our services or reports</li>
                    <li>Reverse engineer or attempt to extract our analysis methods or algorithms</li>
                    <li>Use the information for commercial purposes</li>
                    <li>Publicly share or post the full report or substantial portions thereof</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Privacy and Data Protection</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Your privacy is important to us. Please review our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>, which explains how we collect, use, and protect your personal information.
                  </p>
                  <p>
                    By using our services, you consent to the data practices described in our Privacy Policy, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Collection of information necessary to provide the services</li>
                    <li>Use of information solely for report preparation and delivery (unless you separately consent to the Dealer Coordination Service)</li>
                    <li>Storage of your information for business and legal compliance purposes</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Indemnification</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    You agree to indemnify, defend, and hold harmless OverLeased, its officers, directors, employees, contractors, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your use or misuse of our services</li>
                    <li>Your violation of these Terms of Service</li>
                    <li>Your violation of any rights of another party</li>
                    <li>Your breach of your lease agreement or applicable laws</li>
                    <li>Inaccurate or false information you provided</li>
                    <li>Decisions you made based on information from our services</li>
                    <li>Your transactions or interactions with third parties (dealers, buyers, etc.)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Termination</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                  </p>
                  <p>
                    Upon termination:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your right to use our services will immediately cease</li>
                    <li>You must cease all use of any materials or information obtained from our services</li>
                    <li>Provisions that by their nature should survive termination shall survive, including disclaimers, limitations of liability, indemnification, and dispute resolution terms</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    Note: Termination does not entitle you to a refund if you have already received your Lease Exit Guide.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Changes to Terms</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We reserve the right to modify or replace these Terms at any time at our sole discretion. Material changes will be communicated by:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Updating the "Last updated" date at the top of this page</li>
                    <li>Posting a notice on our website</li>
                    <li>Sending an email to registered users (for significant changes)</li>
                  </ul>
                  <p>
                    Your continued use of our services after any changes constitutes acceptance of the new Terms. If you do not agree to the new Terms, you must stop using our services.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Changes to pricing or service offerings will be clearly communicated and will not affect purchases already completed.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Governing Law and Dispute Resolution</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania and the United States, without regard to conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from or relating to these Terms or our services shall be resolved as follows:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Informal Resolution:</strong> Contact us at support@overleased.com to attempt to resolve the dispute informally</li>
                    <li><strong>Small Claims Court:</strong> You may assert claims in small claims court if your claims qualify and remain in such court</li>
                    <li><strong>Arbitration:</strong> All other disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association</li>
                  </ul>
                  <p>
                    You agree to waive any right to a jury trial or to participate in a class action lawsuit or class-wide arbitration.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">19. Severability and Waiver</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
                  </p>
                  <p>
                    Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">20. Entire Agreement</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    These Terms, along with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and OverLeased regarding the use of our services and supersede any prior agreements, communications, or understandings, whether written or oral.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">21. Contact Information</h2>
                <div className="space-y-4 text-gray-700">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> support@overleased.com</p>
                    <p><strong>Website:</strong> www.overleased.com</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    We aim to respond to all inquiries within 2 business days.
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}