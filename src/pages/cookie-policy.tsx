import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
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
            <p className="text-blue-100 mt-2">Last updated: December 2024</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
                <p>
                  OverLeased uses cookies to enhance your browsing experience, analyze website traffic, and for marketing purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions. The website cannot function properly without these cookies.
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Session management</li>
                    <li>Security features</li>
                    <li>Form data retention</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Cookies</h3>
                  <p>
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Google Analytics</li>
                    <li>Page view tracking</li>
                    <li>User behavior analysis</li>
                    <li>Performance monitoring</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Functional Cookies</h3>
                  <p>
                    These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>User preferences</li>
                    <li>Language settings</li>
                    <li>Customized content</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Marketing Cookies</h3>
                  <p>
                    These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for individual users.
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Advertising targeting</li>
                    <li>Social media integration</li>
                    <li>Remarketing campaigns</li>
                    <li>Conversion tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Third-Party Cookies</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Some cookies on our website are placed by third-party services. We use the following third-party services that may place cookies:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Google Ads:</strong> For advertising and remarketing purposes</li>
                  <li><strong>Facebook Pixel:</strong> For social media advertising and analytics</li>
                  <li><strong>LinkedIn Insight Tag:</strong> For professional network advertising</li>
                </ul>
                <p>
                  These third parties may use cookies to collect information about your online activities across different websites.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How Long Do Cookies Last</h2>
              <div className="space-y-4 text-gray-700">
                <p>Cookies can be either "session" or "persistent" cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them</li>
                </ul>
                <p>
                  Most of our cookies are persistent and will remain on your device for up to 2 years, unless you delete them sooner.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Your Cookie Preferences</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
                </p>
                <h3 className="text-lg font-medium text-gray-900">Browser Settings:</h3>
                <p>
                  Most web browsers allow you to control cookies through their settings preferences. You can set your browser to refuse cookies or to alert you when cookies are being sent.
                </p>
                <h3 className="text-lg font-medium text-gray-900">Opt-Out Links:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                  <li><strong>Google Ads:</strong> <a href="https://adssettings.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></li>
                  <li><strong>Facebook:</strong> <a href="https://www.facebook.com/settings?tab=ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
                </ul>
                <p className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website and your user experience.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookie Consent</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By continuing to use our website, you consent to our use of cookies as described in this policy. When you first visit our website, you may see a cookie banner that allows you to accept or customize your cookie preferences.
                </p>
                <p>
                  You can change your cookie preferences at any time by adjusting your browser settings or contacting us directly.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Updates to This Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you have any questions about our use of cookies, please contact us:</p>
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
  );
}
