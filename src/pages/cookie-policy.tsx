import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CookiePolicyPage() {
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
        <title>Cookie Policy | OverLeased</title>
        <meta name="description" content="Learn about how OverLeased uses cookies to enhance your experience on our Personalized Lease Exit Guide service." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.overleased.com/cookie-policy" />
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Cookie Policy | OverLeased" />
        <meta property="og:description" content="Learn about how OverLeased uses cookies to enhance your experience on our Personalized Lease Exit Guide service." />
        <meta property="og:url" content="https://www.overleased.com/cookie-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OverLeased" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Cookie Policy | OverLeased" />
        <meta name="twitter:description" content="Learn about how OverLeased uses cookies to enhance your experience on our Personalized Lease Exit Guide service." />
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
              <CardTitle className="text-3xl font-bold">Cookie Policy</CardTitle>
              <p className="text-blue-100 mt-2">Last updated: July 2026</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    This Cookie Policy explains how OverLeased uses cookies and similar tracking technologies on our website. By using our Personalized Lease Exit Guide service, you consent to our use of cookies as described in this policy.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <p className="text-blue-900 font-semibold mb-2">About OverLeased:</p>
                    <p className="text-blue-800 text-sm">
                      OverLeased provides a $39 Personalized Lease Exit Guide that includes a complimentary Payoff Review. We also offer an optional, separately purchased Dealer Coordination Service. We are NOT a dealer, broker, lender, or lessor.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. What Are Cookies</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide better user experiences, and provide information to website owners.
                  </p>
                  <p>
                    OverLeased uses cookies to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Enhance your browsing experience on our website</li>
                    <li>Analyze website traffic and user behavior</li>
                    <li>Remember your preferences and form submissions</li>
                    <li>Process payments for the Lease Exit Guide and optional services</li>
                    <li>Improve our marketing and advertising efforts</li>
                    <li>Provide personalized content and information</li>
                  </ul>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                    <p className="text-yellow-900 font-semibold mb-2">Important:</p>
                    <p className="text-yellow-800 text-sm">
                      Information submitted for the Lease Exit Guide is used solely to prepare and deliver your guide and complimentary Payoff Review. OverLeased will NOT share your personal or vehicle information with dealerships unless you separately request and consent to the optional Dealer Coordination Service.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Essential Cookies (Strictly Necessary)</h3>
                    <p>
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions. The website cannot function properly without these cookies.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Session management and security</li>
                      <li>Form data retention for Lease Exit Guide purchase</li>
                      <li>Payment processing through Stripe</li>
                      <li>User authentication (if applicable)</li>
                      <li>Load balancing and performance optimization</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Legal Basis:</strong> These cookies are necessary for the legitimate interests of operating our website and providing our Lease Exit Guide service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Cookies</h3>
                    <p>
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance, user experience, and the quality of our Lease Exit Guide service.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Google Analytics - Page view tracking and user behavior analysis</li>
                      <li>Form completion rates and submission tracking</li>
                      <li>Navigation patterns and popular content identification</li>
                      <li>Performance monitoring and error tracking</li>
                      <li>Traffic source analysis (how users find our service)</li>
                      <li>Conversion tracking for successful guide purchases</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Functional Cookies</h3>
                    <p>
                      These cookies enable enhanced functionality and personalization. They help us remember your preferences and provide a more customized experience when you return to our website.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>User preferences and settings</li>
                      <li>Previously submitted vehicle information (for guide preparation)</li>
                      <li>Language and regional settings</li>
                      <li>Customized content based on your lease situation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Marketing and Advertising Cookies</h3>
                    <p>
                      These cookies are used to track visitors across websites and deliver relevant advertising. They help us understand which marketing efforts are most effective in reaching consumers interested in ending their lease early.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Google Ads - Advertising targeting and conversion tracking</li>
                      <li>Facebook Pixel - Social media advertising and analytics</li>
                      <li>LinkedIn Insight Tag - Professional network advertising</li>
                      <li>Remarketing campaigns to users who have visited our site</li>
                      <li>Conversion tracking for Lease Exit Guide purchases</li>
                      <li>Attribution tracking for marketing performance</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Note:</strong> Marketing cookies help us reach potential customers but do NOT result in sharing your personal information with dealerships. Such sharing only occurs if you separately purchase the optional Dealer Coordination Service.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Some cookies on our website are placed by third-party services that help us operate our Lease Exit Guide service and website. We work with reputable partners who comply with data protection regulations.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                    <h4 className="font-semibold text-gray-900 mb-2">Third-Party Services We Use:</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google Analytics:</strong> Website analytics and performance monitoring to improve our service</li>
                      <li><strong>Google Ads:</strong> Advertising and remarketing to reach users interested in ending their lease</li>
                      <li><strong>Facebook Pixel:</strong> Social media advertising and analytics for targeted marketing</li>
                      <li><strong>LinkedIn Insight Tag:</strong> Professional network advertising</li>
                      <li><strong>Stripe:</strong> Secure payment processing for guide purchases</li>
                      <li><strong>Email Service Providers:</strong> For communication about your Lease Exit Guide delivery</li>
                    </ul>
                  </div>
                  <p className="font-medium mt-4">
                    Important: These third-party services support our website operations and marketing. They do NOT receive your personal or vehicle information for dealership sharing purposes unless you separately request and consent to the optional Dealer Coordination Service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. How Long Do Cookies Last</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Cookies can be either "session" or "persistent" cookies:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser. Used primarily for essential website functions and security.</li>
                    <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them. Used for analytics, preferences, and marketing purposes.</li>
                  </ul>
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cookie Duration:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Essential cookies: Session duration or up to 24 hours</li>
                      <li>Analytics cookies: Up to 2 years</li>
                      <li>Functional cookies: Up to 1 year</li>
                      <li>Marketing cookies: Up to 2 years</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Managing Your Cookie Preferences</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences through several methods:
                  </p>
                  <h3 className="text-lg font-medium text-gray-900 mt-4">Browser Settings:</h3>
                  <p>
                    Most web browsers allow you to control cookies through their settings preferences. You can set your browser to refuse cookies or to alert you when cookies are being sent. Instructions for popular browsers:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                    <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-4">Third-Party Opt-Out Links:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                    <li><strong>Google Ads:</strong> <a href="https://adssettings.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></li>
                    <li><strong>Facebook:</strong> <a href="https://www.facebook.com/settings?tab=ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
                    <li><strong>Network Advertising Initiative:</strong> <a href="http://www.networkadvertising.org/choices/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">NAI Opt-Out Tool</a></li>
                    <li><strong>Digital Advertising Alliance:</strong> <a href="http://www.aboutads.info/choices/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">DAA Opt-Out Tool</a></li>
                  </ul>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                    <p className="text-yellow-900 font-semibold mb-2">Important Note:</p>
                    <p className="text-yellow-800 text-sm">
                      Disabling certain cookies may affect the functionality of our website and limit our ability to process your Lease Exit Guide purchase or deliver your personalized guide. Essential cookies cannot be disabled as they are necessary for the website to function.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookie Consent and DPPA Compliance</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By continuing to use our website and purchasing the Lease Exit Guide, you consent to our use of cookies as described in this policy. Your cookie consent authorizes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The use of cookies to track your interaction with our website</li>
                    <li>Collection of analytics data to improve our service</li>
                    <li>Use of marketing cookies for targeted advertising</li>
                    <li>Processing your information to prepare and deliver your Lease Exit Guide</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <h4 className="text-blue-900 font-semibold mb-2">Dealer Coordination Service - Separate Consent Required:</h4>
                    <p className="text-blue-800 text-sm">
                      If you separately request and purchase the optional Dealer Coordination Service, you will be asked for explicit consent under the Driver's Privacy Protection Act (DPPA) to share your vehicle and personal information with dealerships. This is a separate authorization from cookie consent and is only required if you choose to use that optional service.
                    </p>
                  </div>
                  <p className="mt-4">
                    You can withdraw your cookie consent at any time by adjusting your browser settings, using opt-out tools, or contacting us directly at support@overleased.com.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Do Not Track Signals</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Some browsers have a "Do Not Track" feature that signals to websites that you do not want your online activities tracked. Currently, there is no industry standard for how to respond to Do Not Track signals. At this time, our website does not respond to Do Not Track signals.
                  </p>
                  <p>
                    However, you can still control cookies through your browser settings and the opt-out tools mentioned above.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Updates to This Cookie Policy</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. We will notify you of any material changes by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Posting the updated Cookie Policy on this page</li>
                    <li>Updating the "Last updated" date at the top of this policy</li>
                    <li>Displaying a notice on our website (for significant changes)</li>
                  </ul>
                  <p>
                    Your continued use of our website after any changes constitutes acceptance of the updated Cookie Policy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. More Information</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    For more information about how we collect, use, and protect your personal information, please review our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> and <Link href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
                <div className="space-y-4 text-gray-700">
                  <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> support@overleased.com</p>
                    <p><strong>Website:</strong> www.overleased.com</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    We are committed to addressing your concerns and helping you understand your rights regarding cookies and data privacy.
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