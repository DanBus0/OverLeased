import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
        <title>Privacy Policy | OverLeased</title>
        <meta name="description" content="Privacy Policy for OverLeased - Learn how we collect, use, and protect your personal information when using our Personalized Lease Exit Guide and related services." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.overleased.com/privacy-policy" />
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
        
        <meta property="og:title" content="Privacy Policy | OverLeased" />
        <meta property="og:description" content="Privacy Policy for OverLeased - Learn how we collect, use, and protect your personal information when using our Personalized Lease Exit Guide and related services." />
        <meta property="og:url" content="https://www.overleased.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverLeased" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | OverLeased" />
        <meta name="twitter:description" content="Privacy Policy for OverLeased - Learn how we collect, use, and protect your personal information when using our Personalized Lease Exit Guide and related services." />
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
              <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
              <p className="text-blue-100 mt-2">Last updated: July 2026</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Overview of Our Services</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    OverLeased provides three distinct services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personalized Lease Exit Guide ($39):</strong> A comprehensive digital report analyzing your specific lease situation and exit options</li>
                    <li><strong>Complimentary Payoff Review:</strong> An included follow-up review to help you understand your dealer payoff information and estimated equity.</li>
                    <li><strong>Optional Dealer Coordination Service (separate purchase):</strong> An optional add-on service that connects you with dealerships interested in purchasing your leased vehicle</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <p className="text-blue-900 font-semibold mb-2">Important Privacy Distinction:</p>
                    <p className="text-blue-800 text-sm">
                      Information you submit for the Lease Exit Guide or Payoff Review is used ONLY to prepare and deliver those reports. <strong>OverLeased will NOT share your personal or vehicle information with dealerships unless you separately request and consent to the Dealer Coordination Service.</strong>
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-lg font-medium text-gray-900">For Lease Exit Guide Purchase:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and email address</li>
                    <li>Vehicle information (year, make, model, trim, VIN or license plate and state)</li>
                    <li>Lease details (current mileage, annual mileage allowance, months remaining, monthly payment)</li>
                    <li>Payment information (processed securely through Stripe - we do not store card details)</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-900">For Complimentary Payoff Review:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Email address</li>
                    <li>Dealer payoff amount, expiration date, and, if voluntarily provided, a payoff statement or screenshot</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900">For Optional Dealer Coordination Service (if separately requested):</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact information (name, phone number, email)</li>
                    <li>Vehicle and lease information</li>
                    <li>Location/zip code for dealer matching</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900">Automatically Collected Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Device information and browser type</li>
                    <li>IP address and approximate location data</li>
                    <li>Website usage patterns and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-lg font-medium text-gray-900">For Lease Exit Guide Customers:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Prepare and deliver your personalized Lease Exit Guide</li>
                    <li>Process your payment securely through Stripe</li>
                    <li>Send delivery confirmations and customer support</li>
                    <li>Improve our report quality and service</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900">For Payoff Review Users:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Review your dealer payoff information and provide guidance</li>
                    <li>Send the review results and recommendations</li>
                    <li>Provide customer support</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900">For Dealer Coordination Service Customers (when separately requested):</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Share relevant information with appropriate authorized dealerships</li>
                    <li>Facilitate dealer contact and coordination</li>
                    <li>Assist with scheduling and logistics</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900">General Business Operations:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respond to inquiries and provide customer support</li>
                    <li>Improve our website, services, and user experience</li>
                    <li>Comply with legal obligations and protect our rights</li>
                    <li>Send marketing communications (with your consent, which you may withdraw)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
                    <h4 className="text-md font-semibold text-amber-900 mb-2">Critical Privacy Protection:</h4>
                    <p className="text-amber-800 text-sm">
                      <strong>Your information submitted for the Lease Exit Guide or Payoff Review will NOT be shared with dealerships or third parties for marketing purposes.</strong> Dealership sharing occurs ONLY if you separately purchase and consent to the Dealer Coordination Service.
                    </p>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900">Service Providers (Necessary for Service Delivery):</h3>
                  <p>
                    We share information with trusted service providers who assist in delivering our services:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li><strong>Stripe:</strong> Secure payment processing (they receive only information necessary for transaction processing)</li>
                    <li><strong>Brevo (Sendinblue):</strong> Email delivery for reports and communications</li>
                    <li><strong>Supabase:</strong> Secure data storage and database management</li>
                    <li><strong>Vercel:</strong> Website hosting and performance</li>
                    <li><strong>Google Analytics:</strong> Website usage analysis (anonymized data only)</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    These providers are contractually obligated to protect your information and use it only for specified purposes.
                  </p>

                  <h3 className="text-lg font-medium text-gray-900">With Dealerships (Only for Dealer Coordination Service):</h3>
                  <p>
                    If you separately purchase the Dealer Coordination Service and provide explicit consent, we will share relevant vehicle and contact information with appropriate authorized dealerships in your geographic area who may be interested in purchasing your leased vehicle. This sharing is limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Dealerships in your geographic area</li>
                    <li>Information necessary for vehicle evaluation and offer generation</li>
                    <li>Only after you have explicitly consented to this specific service</li>
                  </ul>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mt-4">
                    <h4 className="text-md font-semibold text-gray-900 mb-2">Legal Note - DPPA Compliance:</h4>
                    <p className="text-gray-700 text-sm">
                      When you consent to the Dealer Coordination Service, you authorize OverLeased to share your vehicle and personal information with dealerships in compliance with the Driver's Privacy Protection Act (DPPA) and other applicable vehicle privacy laws. We maintain records of your consent and the timestamp of your authorization.
                    </p>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900">Legal Requirements:</h3>
                  <p>
                    We may disclose information when required by law, court order, or government request, or to protect our rights, property, safety, or that of our users or others.
                  </p>

                  <h3 className="text-lg font-medium text-gray-900">Business Transfers:</h3>
                  <p>
                    If OverLeased is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on our website of any such change.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Secure data transmission using encryption (SSL/TLS)</li>
                    <li>Payment processing through PCI-compliant Stripe infrastructure</li>
                    <li>Access controls and authentication requirements</li>
                    <li>Regular security assessments and updates</li>
                    <li>Secure data storage with enterprise-grade providers (Supabase)</li>
                    <li>Limited employee access to personal information on a need-to-know basis</li>
                  </ul>
                  <p>
                    However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                <div className="space-y-4 text-gray-700">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations and legitimate business needs)</li>
                    <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time via the unsubscribe link in emails</li>
                    <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                    <li><strong>Object to Processing:</strong> Object to certain types of data processing</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw your consent for optional services (note: this does not affect the lawfulness of processing based on consent before withdrawal)</li>
                    <li><strong>Complain:</strong> File a complaint with relevant data protection authorities</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at <strong>support@overleased.com</strong>.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Note: Certain information is necessary to deliver the services you purchased (such as the Lease Exit Guide). Deleting this information may prevent us from fulfilling our contractual obligations to you.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We use cookies and similar technologies to enhance your experience, analyze website traffic, understand user behavior, and for marketing purposes. Types of cookies we use:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (Google Analytics)</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertising and measure campaign effectiveness</li>
                  </ul>
                  <p>
                    You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect website functionality.
                  </p>
                  <p>
                    For more details, see our <Link href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</Link>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We retain your personal information for different periods depending on the purpose:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Lease Exit Guide purchases:</strong> Retained for up to 7 years for tax, accounting, and legal compliance purposes</li>
                    <li><strong>Payoff Review submissions:</strong> Retained for up to 2 years or until you request deletion</li>
                    <li><strong>Dealer Coordination Service records:</strong> Retained for up to 3 years after service completion</li>
                    <li><strong>Marketing communications:</strong> Until you unsubscribe or request deletion</li>
                    <li><strong>Website analytics:</strong> Anonymized data retained indefinitely for improvement purposes</li>
                  </ul>
                  <p className="mt-4">
                    When determining retention periods, we consider the nature and sensitivity of the information, applicable legal requirements, and legitimate business needs.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our website may contain links to third-party websites, including payment processors, dealership websites, and resource providers. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without appropriate consent, we will take steps to delete that information promptly.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. California Privacy Rights</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Right to know what personal information we collect, use, and share</li>
                    <li>Right to delete personal information (subject to exceptions)</li>
                    <li>Right to opt-out of the sale of personal information (note: we do not sell personal information from Lease Exit Guide or Payoff Review customers)</li>
                    <li>Right to non-discrimination for exercising your privacy rights</li>
                  </ul>
                  <p>
                    To exercise these rights, contact us at support@overleased.com with "California Privacy Request" in the subject line.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Posting the updated Privacy Policy on this page</li>
                    <li>Updating the "Last updated" date at the top of this policy</li>
                    <li>Sending you an email notification for significant changes that affect your rights</li>
                  </ul>
                  <p>
                    Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
                <div className="space-y-4 text-gray-700">
                  <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> support@overleased.com</p>
                    <p><strong>Website:</strong> www.overleased.com</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    We aim to respond to all privacy-related inquiries within 30 days.
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