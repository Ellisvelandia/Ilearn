import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimiter } from '@/lib/middleware/rate-limiter'
import { RATE_LIMITS } from '@/lib/config/rate-limits'

export async function middleware(request: NextRequest) {
  // Check if this is an API route that should be rate limited
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Determine the rate limit type based on the route
    let limitType: keyof typeof RATE_LIMITS = 'DEFAULT'
    
    if (request.nextUrl.pathname.startsWith('/api/auth/')) {
      limitType = 'AUTH'
    } else if (request.nextUrl.pathname.startsWith('/api/ai/')) {
      limitType = 'AI_GENERATION'
    } else if (request.nextUrl.pathname.startsWith('/api/upload/')) {
      limitType = 'UPLOAD'
    }
    
    // Apply rate limiting
    const limiterResponse = rateLimiter(request, limitType)
    if (limiterResponse) {
      // Return early if rate limited
      return limiterResponse
    }
  }
  
  // Continue with normal middleware processing
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Add cache control headers for static assets
  if (request.nextUrl.pathname.match(/\.(jpe?g|png|gif|svg|webp|css|js)$/)) {
    res.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  return res
}

// Specify which routes should be protected
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 