
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { Car } from "lucide-react";

export default function LeaseReviewSubmittedPage() {
  return (
    <>
      <Head>
        <title>Thank You | OverLeased - End Your Car Lease Early</title>
        <meta name="description" content="Thank you for your submission. We'll be in touch soon with offers to help you end your car lease early." />
        <meta name="robots" content="noindex" />
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
                
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
                  Thanks — Your Lease Review Is In Progress
                </h1>
                
                <p className="text-base sm:text-lg text-gray-600 mb-8 text-center leading-relaxed">
                  We've received your details and are reviewing your lease information.
                  <br />
                  <br />
                  Within the next business day, we'll email you personalized next steps — including how to confirm your dealer lease payoff amount and connecting with authorized dealerships near you.
                </p>
                
                <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-[0.6875rem] leading-tight tracking-wide sm:text-base sm:leading-normal sm:tracking-normal">Step 1: Details received</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-500 text-[0.6875rem] leading-tight tracking-wide sm:text-base sm:leading-normal sm:tracking-normal">Step 2: Verify lease payoff amount</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-500 text-[0.6875rem] leading-tight tracking-wide sm:text-base sm:leading-normal sm:tracking-normal">Step 3: Receive dealer offers</p>
                      <p className="text-[0.625rem] sm:text-xs text-gray-500 mt-1 italic">We'll never contact a dealership without your explicit permission.</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={() => window.location.href = "/"}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Return to Homepage
                  </Button>
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
