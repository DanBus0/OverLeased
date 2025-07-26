import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon-mcwi6wvl.ico" type="image/x-icon" />
        
        {/* Google Analytics 4 */}
        <script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-QCKWZ9DN08"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QCKWZ9DN08');
            `,
          }}
        />
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OverLeased",
              "url": "https://www.overleased.com",
              "logo": "https://www.overleased.com/favicon-mcwi6wvl.ico",
              "description": "OverLeased helps car lessees discover lease equity and get cash offers from dealers. Professional automotive lease equity evaluation service.",
              "sameAs": [
                "https://www.overleased.com"
              ],
              "serviceType": "Automotive Lease Services",
              "areaServed": "United States",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Lease Equity Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Lease Equity Calculator",
                      "description": "Calculate your car lease equity and get real dealer offers"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Lease Buyout Service",
                      "description": "Get cash offers from dealers for your leased vehicle"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Lease Transfer Alternative",
                      "description": "Professional alternative to lease transfer and lease assumption services"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Structured Data - Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.overleased.com",
              "name": "OverLeased",
              "alternateName": ["Over Leased", "OverLeased.com"],
              "description": "Discover lease equity and get cash for your leased car. Professional automotive lease equity evaluation and dealer cash offer service.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.overleased.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "WebApplication",
                "name": "Lease Equity Calculator",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "description": "Calculate your car lease equity and get real dealer offers instantly"
              }
            })
          }}
        />
        
        {/* Structured Data - Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Car Lease Equity Evaluation",
              "provider": {
                "@type": "Organization",
                "name": "OverLeased"
              },
              "description": "Professional car lease equity evaluation service. Get cash from your leased vehicle with expert dealer network and instant equity calculations.",
              "serviceType": "Automotive Finance Service",
              "areaServed": "United States",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Lease Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Lease Equity Calculator",
                      "description": "Free lease equity calculation tool"
                    },
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                ]
              }
            })
          }}
        />
        
        {/* 
          CRITICAL: DO NOT REMOVE THIS SCRIPT
          The Softgen AI monitoring script is essential for core app functionality.
          The application will not function without it.
        */}
        <script 
          src="https://cdn.softgen.ai/script.js" 
          async 
          data-softgen-monitoring="true"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
