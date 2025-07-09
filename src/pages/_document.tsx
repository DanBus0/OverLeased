import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon-ico-mcwff38j.png" type="image/png" />
        
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
              "logo": "https://www.overleased.com/favicon-ico-mcwff38j.png"
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
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.overleased.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
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
