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
        <meta name="description" content="Read OverLeased's terms of service to understand your rights and responsibilities when using our car lease equity platform and dealer network." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.overleased.com/terms-of-service" />
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Terms of Service | OverLeased" />
        <meta property="og:description" content="Read OverLeased's terms of service to understand your rights and responsibilities when using our car lease equity platform and dealer network." />
        <meta property="og:url" content="https://www.overleased.com/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverLeased" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | OverLeased" />
        <meta name="twitter:description" content="Read OverLeased's terms of service to understand your rights and responsibilities when using our car lease equity platform and dealer network." />
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
              <p className="text-blue-100 mt-2">Last updated: December 2024</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By accessing and using OverLeased's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    OverLeased provides a platform that helps consumers determine if they have positive equity in their car lease and connects them with verified dealers who may be interested in purchasing their lease. Our services include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Lease equity calculation and market valuation tools</li>
                    <li>Connection with pre-screened automotive dealers</li>
                    <li>Guidance and support throughout the lease transfer process</li>
                    <li>Educational resources about lease equity and automotive markets</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
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
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Accuracy of Information</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    While we strive to provide accurate lease equity calculations and market valuations, these are estimates based on available market data and should not be considered as guaranteed offers or final valuations. Actual values may vary based on vehicle condition, market conditions, and other factors.
                  </p>
                  <p>
                    You acknowledge that all calculations and estimates provided are for informational purposes only and should not be relied upon as the sole basis for financial decisions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Dealers</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    OverLeased acts as an intermediary to connect users with verified dealers. We do not guarantee that any dealer will make an offer on your vehicle, nor do we control the terms of any offers made. All transactions are between you and the dealer directly.
                  </p>
                  <p>
                    We are not responsible for the actions, representations, or performance of any third-party dealers in our network.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    OverLeased shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of our services, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Financial losses related to lease transactions</li>
                    <li>Inaccurate valuations or calculations</li>
                    <li>Dealer performance or lack thereof</li>
                    <li>Service interruptions or technical issues</li>
                    <li>Loss of data or information</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    All content, features, and functionality on our website, including but not limited to text, graphics, logos, images, and software, are the exclusive property of OverLeased and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    These Terms shall be interpreted and governed by the laws of the United States, without regard to conflict of law provisions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
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
