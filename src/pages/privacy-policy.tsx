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
        <title>Privacy Policy | OverLeased</title>
        <meta name="description" content="Privacy Policy for OverLeased - Learn how we collect, use, and protect your personal information when using our early lease termination information services." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.overleased.com/privacy-policy" />
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Privacy Policy | OverLeased" />
        <meta property="og:description" content="Privacy Policy for OverLeased - Learn how we collect, use, and protect your personal information when using our early lease termination information services." />
        <meta property="og:url" content="https://www.overleased.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverLeased" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | OverLeased" />
        <meta name="twitter:description" content="Privacy Policy for OverLeased - Learn how we collect, use, and protect your personal information when using our early lease termination information services." />
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
              <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
              <p className="text-blue-100 mt-2">Last updated: October 2025</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    At OverLeased, we collect information you provide directly to us when you use our early lease termination information service, submit inquiries through our form, contact us, or communicate with our team.
                  </p>
                  <h3 className="text-lg font-medium text-gray-900">Personal Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, and phone number</li>
                    <li>Vehicle information (year, make, model, trim, VIN, license plate, state)</li>
                    <li>Lease details (current mileage, annual mileage allowance, months remaining, lease term, monthly payment)</li>
                    <li>Lease payoff information when available</li>
                    <li>Communication preferences and correspondence with us</li>
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide information about options for ending your car lease early</li>
                    <li>Connect you with dealerships that may be interested in purchasing your leased vehicle</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Communicate with you about our services and relevant updates</li>
                    <li>Improve our website, services, and user experience</li>
                    <li>Comply with legal obligations and protect our rights</li>
                    <li>Send you marketing communications (with your consent)</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <p className="text-blue-900 font-semibold mb-2">Important Note About Our Services:</p>
                    <p className="text-blue-800 text-sm">
                      OverLeased is a marketing and sourcing service that provides information to help consumers end their car lease early. We are NOT a dealer, broker, lender, or lessor. We do not negotiate deals, execute vehicle sales, or handle lease payoffs directly. We connect consumers with dealerships and provide information only.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We may share your information in the following circumstances:</p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <h4 className="text-md font-semibold text-blue-900 mb-2">Your Consent (DDPA Compliance)</h4>
                    <p className="text-blue-800 text-sm mb-2">
                      By submitting the form on our website and checking the consent box, you explicitly authorize OverLeased to:
                    </p>
                    <ul className="list-disc pl-6 text-blue-800 text-sm space-y-1">
                      <li>Review your vehicle and lease information</li>
                      <li>Share your information with dealerships and third-party service providers</li>
                      <li>Contact you via phone, email, or text message regarding your inquiry</li>
                    </ul>
                    <p className="text-blue-800 text-sm mt-2">
                      This consent includes the potential sale or transfer of your data to trusted partners as described in this Privacy Policy.
                    </p>
                    <p className="text-blue-800 text-sm mt-2">
                      We record your consent and submission timestamp to maintain an audit trail for compliance.
                    </p>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900">With Dealerships:</h3>
                  <p>
                    We share relevant vehicle and contact information with pre-screened dealerships who may be interested in purchasing your leased vehicle. This is a core part of our marketing and sourcing service. We do not control what offers, if any, dealerships may make.
                  </p>
                  <h3 className="text-lg font-medium text-gray-900">Service Providers and Business Partners:</h3>
                  <p>
                    We work with third-party service providers who assist us in operating our website, conducting our business, analyzing data, and serving our users. These partners may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Email service providers (Brevo/Sendinblue)</li>
                    <li>Analytics providers (Google Analytics)</li>
                    <li>Hosting and infrastructure providers</li>
                    <li>Marketing and advertising partners</li>
                  </ul>
                  <p className="mt-2">
                    Advertising partners may use cookies and similar technologies to deliver ads and measure their effectiveness. These partners do not receive personal identifiers such as names or VINs.
                  </p>
                  <h3 className="text-lg font-medium text-gray-900">Legal Requirements:</h3>
                  <p>
                    We may disclose information when required by law, court order, or government request, or to protect our rights, property, safety, or that of our users or others.
                  </p>
                  <h3 className="text-lg font-medium text-gray-900">Business Transfers:</h3>
                  <p>
                    If OverLeased is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Offer Process & Dealership Contact</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Once you provide your lease and vehicle information and explicitly consent to proceed, OverLeased may:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request and collect purchase offers from authorized dealerships in your region</li>
                    <li>Share your vehicle and contact information with those dealerships solely for the purpose of generating such offers</li>
                    <li>Present those offers to you for review and selection</li>
                    <li>With your approval, coordinate the drop-off appointment with the chosen dealership</li>
                  </ul>
                  <p className="mt-4">
                    OverLeased remains an independent marketing and introduction platform and does not buy, sell, negotiate, or execute vehicle sales, lease payoffs, or title transfers. Each dealership sets its own purchase offers and terms independently. OverLeased does not influence or guarantee these offers and all final transactions occur directly between you and the dealership.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Secure data transmission using encryption (SSL/TLS)</li>
                    <li>Access controls and authentication requirements</li>
                    <li>Regular security assessments and updates</li>
                    <li>Secure data storage with reputable providers</li>
                  </ul>
                  <p>
                    However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                <div className="space-y-4 text-gray-700">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                    <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
                    <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw your consent for data processing where consent is the legal basis</li>
                    <li><strong>Complain:</strong> File a complaint with relevant data protection authorities</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at <strong>support@overleased.com</strong> or <strong>(484) 702-9539</strong>.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Please note that opting out of communications or requesting deletion may limit our ability to provide you with information about lease termination options or connect you with dealerships.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We use cookies and similar technologies to enhance your experience, analyze website traffic, understand user behavior, and for marketing purposes. You can control cookie settings through your browser preferences.
                  </p>
                  <p>
                    We use Google Analytics, Google Ads, and similar technologies to measure marketing effectiveness and deliver relevant advertising. For more details, see our <Link href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</Link>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining retention periods, we consider:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The nature and sensitivity of the information</li>
                    <li>The purposes for which we process the information</li>
                    <li>Legal and regulatory requirements</li>
                    <li>Whether you have an active inquiry or relationship with us</li>
                  </ul>
                  <p className="mt-4">
                    We also maintain a record of your consent and the version of this Privacy Policy you accepted to ensure compliance and transparency.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our website may contain links to third-party websites, including dealership websites and other service providers. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Posting the updated Privacy Policy on this page</li>
                    <li>Updating the "Last updated" date at the top of this policy</li>
                    <li>Sending you an email notification (for significant changes)</li>
                  </ul>
                  <p>
                    Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
                <div className="space-y-4 text-gray-700">
                  <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
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
