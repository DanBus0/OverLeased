import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  if (hostname === 'overleased.com') {
    url.host = 'www.overleased.com';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}