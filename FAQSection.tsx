
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("cookie-consent", "dismissed");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
      <Card className="bg-white border shadow-lg">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">
                We use cookies
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                We use cookies to enhance your experience and analyze site traffic. 
                By continuing to use our site, you consent to our use of cookies.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={handleAccept}
                  size="sm"
                  className="text-xs"
                >
                  Accept All
                </Button>
                <Link href="/cookie-policy">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
