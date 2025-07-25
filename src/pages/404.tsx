import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | OverLeased</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist. Return to OverLeased to check your car lease equity and get cash offers from verified dealers." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <p className="text-lg text-gray-600">Sorry, we couldn't find the page you requested. This page may have been moved, deleted, or never existed.</p>
          <Button asChild>
            <Link href="/">
              Return to home page
            </Link>
          </Button>
        </div>
      </main>
    </>
  )
}
