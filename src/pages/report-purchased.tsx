import Head from "next/head";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Clock } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { Car } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ReportPurchasedPage() {
  const router = useRouter();
  const [paymentVerified, setPaymentVerified] = useState(false);
  
  useEffect(() => {
    // Wait for router to be ready before accessing query params
    if (!router.isReady) {
      console.log('[GA4 Purchase] Router not ready yet');
      return;
    }

    const sessionId = router.query.session_id as string;
    
    console.log('[GA4 Purchase] Session ID:', sessionId || 'NOT FOUND');
    
    if (!sessionId) {
      console.log('[GA4 Purchase] No session_id in query params');
      return;
    }
    
    // Check if we've already tracked this purchase
    const trackedKey = `ga4_purchase_tracked_${sessionId}`;
    const alreadyTracked = sessionStorage.getItem(trackedKey);
    
    if (alreadyTracked) {
      console.log('[GA4 Purchase] Duplicate prevented - already tracked:', sessionId);
      return;
    }
    
    // Verify payment status with Stripe session
    fetch(`/api/verify-payment-status?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        console.log('[GA4 Purchase] Payment verification response:', data);
        
        if (data.paymentStatus === 'paid') {
          setPaymentVerified(true);
          
          // Fire the GA4 purchase event for Lease Exit Guide
          if (typeof window !== "undefined" && (window as any).gtag) {
            console.log('[GA4 Purchase] Attempting to fire purchase event for:', sessionId);
            
            (window as any).gtag("event", "purchase", {
              transaction_id: sessionId,
              value: 39,
              currency: "USD",
              items: [
                {
                  item_id: "lease_exit_guide",
                  item_name: "Personalized Lease Exit Guide",
                  price: 39,
                  quantity: 1
                }
              ]
            });
            
            console.log('[GA4 Purchase] Event fired successfully');
            
            // Mark this purchase as tracked
            sessionStorage.setItem(trackedKey, "true");
            console.log('[GA4 Purchase] SessionStorage flag written');
          } else {
            console.log('[GA4 Purchase] gtag not available on window object');
          }
        } else {
          console.log('[GA4 Purchase] Payment not verified - status:', data.paymentStatus);
        }
      })
      .catch(err => {
        console.error('[GA4 Purchase] Error verifying payment:', err);
      });
  }, [router.isReady, router.query.session_id]);
  
  return (
    <>
      <Head>
        <title>Thank You | OverLeased - Your Guide is Being Prepared</title>
        <meta name="description" content="Thank you for your purchase! Your personalized lease exit guide is being prepared and will be sent to your email shortly." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 w-full">
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

        <main className="w-full pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
                  Thank You for Your Purchase!
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
                  Your personalized lease exit guide is being prepared by our team.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">What Happens Next?</h3>
                      <p className="text-gray-700 mb-3">
                        Within <strong>24-48 hours</strong>, you'll receive a comprehensive email containing:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Your Vehicle's Estimated Market Value</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Five Lease-Exit Methods</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Scripts, Worksheets and Action Steps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Personalized Starting Point</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Complimentary Payoff Review</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Check Your Spam Folder:</strong> Sometimes our emails end up in spam. 
                      Be sure to check there and mark us as "Not Spam" to ensure you receive all updates.
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <Button 
                    onClick={() => window.location.href = "/"}
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 h-12"
                  >
                    Return to Homepage
                  </Button>
                  <p className="text-sm text-gray-500">
                    Questions? Email us at <a href="mailto:support@overleased.com" className="text-blue-600 hover:underline">support@overleased.com</a>
                  </p>
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