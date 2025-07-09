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
        <meta name="description" content="Learn how OverLeased collects, uses, and protects your personal information when you use our car lease equity calculator and dealer matching service." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.overleased.com/privacy-policy" />
        <link rel="icon" href="/favicon.ico" />
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
              <p className="text-blue-100 mt-2">Last updated: December 2024</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    At OverLeased, we collect information you provide directly to us, such as when you use our lease equity calculator, contact us, or communicate with our team.
                  </p>
                  <h3 className="text-lg font-medium text-gray-900">Personal Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and email address</li>
                    <li>Vehicle information (make, model, year, trim, license plate, state)</li>
                    <li>Lease details (current mileage, annual mileage allowance, months remaining, lease term)</li>
                    <li>Communication preferences and correspondence with us</li>
                  </ul>
                  <h3 className="text-lg font-medium text-gray-900">Automatically Collected Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
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
                    <li>Calculate your lease equity and provide market valuations</li>
                    <li>Connect you with verified dealers interested in purchasing your lease</li>
                    <li>Communicate with you about our services and your inquiries</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations and protect our rights</li>
                    <li>Send you relevant updates and promotional materials (with your consent)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We may share your information in the following circumstances:</p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <h4 className="text-md font-semibold text-blue-900 mb-2">Your Consent</h4>
                    <p className="text-blue-800 text-sm">
                      By clicking "Check Your Lease Value", you explicitly give OverLeased permission to share your information with trusted third parties, which may include the sale of data as described in this Privacy Policy.
                    </p>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900">With Verified Dealers:</h3>
                  <p>
                    We share relevant vehicle and contact information with pre-screened dealers who may be interested in purchasing your lease. This is essential to our service.
                  </p>
                  <h3 className="text-lg font-medium text-gray-900">Service Providers and Third Parties:</h3>
                  <p>
                    We work with third-party service providers who assist us in operating our website, conducting business, and serving our users. When you use our lease value calculator service, you consent to sharing your information with these trusted partners.
                  </p>
                  <h3 className="text-lg font-medium text-gray-900">Legal Requirements:</h3>
                  <p>
                    We may disclose information when required by law or to protect our rights, property, or safety, or that of our users or others.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
                <div className="space-y-4 text-gray-700">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access, update, or delete your personal information</li>
                    <li>Opt out of promotional communications</li>
                    <li>Request information about how we use your data</li>
                    <li>File a complaint with relevant data protection authorities</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at support@overleased.com or (484) 702-9539.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We use cookies and similar technologies to enhance your experience, analyze website traffic, and for marketing purposes. You can control cookie settings through your browser preferences.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Privacy Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
                <div className="space-y-4 text-gray-700">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
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
