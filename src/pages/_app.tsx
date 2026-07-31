import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Global scroll restoration - force scroll to top on all route changes
  useEffect(() => {
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const handleRouteChangeStart = () => {
      forceScrollToTop();
    };

    const handleRouteChangeComplete = () => {
      // Multiple timing strategies to ensure scroll happens after render
      forceScrollToTop();
      
      requestAnimationFrame(() => {
        forceScrollToTop();
        
        // Double RAF for better timing after paint
        requestAnimationFrame(() => {
          forceScrollToTop();
        });
      });
      
      // Backup with setTimeout
      setTimeout(forceScrollToTop, 0);
      setTimeout(forceScrollToTop, 50);
      setTimeout(forceScrollToTop, 100);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QCKWZ9DN08"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QCKWZ9DN08');
        `}
      </Script>
      
      <Component {...pageProps} />
    </>
  );
}