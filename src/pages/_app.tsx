import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const isGetStarted = (url: string) => {
      const path = url.split("?")[0].split("#")[0];
      return path === "/get-started";
    };

    const ensureScrollTop = () => {
      const scrollNow = () => {
        window.scrollTo(0, 0);
        try {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        } catch {}
      };
      requestAnimationFrame(() => {
        scrollNow();
        requestAnimationFrame(scrollNow);
      });
      setTimeout(scrollNow, 0);
      setTimeout(scrollNow, 50);
      setTimeout(scrollNow, 150);
      setTimeout(scrollNow, 300);
    };

    const handleRouteChangeStart = (url: string) => {
      if (isGetStarted(url)) ensureScrollTop();
    };

    const handleRouteChangeComplete = (url: string) => {
      if (isGetStarted(url)) ensureScrollTop();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  // NEW: Handle clicks on /get-started links when already on /get-started (no route change fires)
  useEffect(() => {
    const ensureScrollTop = () => {
      const scrollNow = () => {
        window.scrollTo(0, 0);
        try {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        } catch {}
      };
      requestAnimationFrame(() => {
        scrollNow();
        requestAnimationFrame(scrollNow);
      });
      setTimeout(scrollNow, 0);
      setTimeout(scrollNow, 50);
      setTimeout(scrollNow, 150);
      setTimeout(scrollNow, 300);
    };

    const onLinkClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Check if it's a /get-started link
      if (href === "/get-started" || href.startsWith("/get-started?") || href.startsWith("/get-started#")) {
        // Set flag for get-started page to read
        try {
          sessionStorage.setItem("forceScrollTopOnGetStarted", "1");
        } catch {}

        // If we're already on get-started page, prevent default and scroll immediately
        if (router.pathname === "/get-started") {
          e.preventDefault();
          ensureScrollTop();
          return;
        }

        // For navigation from other pages, let it proceed but ensure scroll happens
        ensureScrollTop();
      }
    };

    document.addEventListener("click", onLinkClick, true);
    return () => {
      document.removeEventListener("click", onLinkClick, true);
    };
  }, [router.pathname]);

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
