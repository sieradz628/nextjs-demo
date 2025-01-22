import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For now, we'll just let all requests through
  return NextResponse.next()
}

export const config = {
  matcher: ['/products/:path*'],
}
