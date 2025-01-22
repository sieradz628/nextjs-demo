import { NextResponse } from 'next/server'

export function middleware() {
  // For now, we'll just let all requests through
  return NextResponse.next()
}

export const config = {
  matcher: ['/products/:path*'],
}
