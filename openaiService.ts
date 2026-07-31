import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Car, Mail } from "lucide-react";

export default function DealerCoordinationConfirmationPage() {
  const router = useRouter();

  // Page-specific scroll to top (backup to global handler)
  useEffect(() => {
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    forceScrollToTop();

    // Multiple timing strategies
    requestAnimationFrame(() => {
      forceScrollToTop();
      requestAnimationFrame(forceScrollToTop);
    });

    setTimeout(forceScrollToTop, 0);
    setTimeout(forceScrollToTop, 100);
  }, []);

  return (
    <>
      <Head>
        <title>Request Received | OverLeased Dealer Coordination</title>
        <meta name="description" content="Your dealer coordination request has been received. We'll contact you soon." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 rounded-lg p-2">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">OverLeased</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-green-50 border-b border-green-200 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Your Dealer Coordination Request Has Been Received
                </h1>
              </CardHeader>
              <CardContent className="pt-8 pb-8">
                <div className="space-y-6 text-center">
                  <p className="text-lg text-gray-700">
                    Thank you for purchasing the OverLeased Dealer Coordination Service. 
                    We'll review your information and contact you with the next steps.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">What Happens Next</h3>
                    </div>
                    <ul className="text-left space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">1.</span>
                        <span>We'll review your vehicle information and identify appropriate dealerships in your area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">2.</span>
                        <span>We'll contact dealership representatives on your behalf</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">3.</span>
                        <span>We'll coordinate available appraisal appointment times and notify you</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">4.</span>
                        <span>We'll provide support throughout the process via email</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-700 mb-2">Questions?</p>
                    <a 
                      href="mailto:support@overleased.com" 
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      support@overleased.com
                    </a>
                  </div>

                  <div className="pt-6">
                    <Link href="/">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Return to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}