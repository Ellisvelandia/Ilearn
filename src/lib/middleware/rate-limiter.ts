import { NextRequest, NextResponse } from 'next/server'
import { RATE_LIMITS } from '../config/rate-limits'

// In-memory store for rate limiting (in production, use Redis or similar)
const ipRequests = new Map<string, { count: number, timestamp: number }>()

export function rateLimiter(
  req: NextRequest,
  limitType: keyof typeof RATE_LIMITS = 'DEFAULT'
) {
  // Get IP from headers or connection
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(/, /)[0] : 'unknown'
  const currentTime = Date.now()
  const rateLimit = RATE_LIMITS[limitType]
  
  // Clean up old entries to prevent memory leaks
  if (currentTime % 60000 < 1000) { // Clean every minute
    for (const [storedIp, data] of ipRequests.entries()) {
      if (currentTime - data.timestamp > rateLimit.windowMs) {
        ipRequests.delete(storedIp)
      }
    }
  }
  
  const requestData = ipRequests.get(ip) || { count: 0, timestamp: currentTime }
  
  // Reset if outside window
  if (currentTime - requestData.timestamp > rateLimit.windowMs) {
    requestData.count = 1
    requestData.timestamp = currentTime
  } else {
    requestData.count++
  }
  
  ipRequests.set(ip, requestData)
  
  // Apply rate limiting
  if (requestData.count > rateLimit.max) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later' },
      { status: 429, headers: {
        'Retry-After': Math.ceil((requestData.timestamp + rateLimit.windowMs - currentTime) / 1000).toString()
      }}
    )
  }
  
  return null // Continue to the handler
} 