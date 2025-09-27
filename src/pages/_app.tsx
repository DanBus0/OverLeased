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
      const scrollNow = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      requestAnimationFrame(scrollNow);
      setTimeout(scrollNow, 0);
      setTimeout(scrollNow, 50);
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
      const scrollNow = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      requestAnimationFrame(scrollNow);
      setTimeout(scrollNow, 0);
      setTimeout(scrollNow, 50);
    };

    const onLinkClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      // Set a flag so the get-started page knows to force top on arrival
      if (url.pathname === "/get-started") {
        try {
          sessionStorage.setItem("forceScrollTopOnGetStarted", "1");
        } catch {}
      }

      if (url.pathname === "/get-started" && router.pathname === "/get-started") {
        e.preventDefault();
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
