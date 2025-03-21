export const RATE_LIMITS = {
  // General API limits
  DEFAULT: {
    windowMs: 60 * 1000, // 1 minute
    max: 60, // 60 requests per minute
  },
  
  // Auth related limits (login, register)
  AUTH: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // 10 requests per 5 minutes
  },
  
  // Content generation limits
  AI_GENERATION: {
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 requests per minute
  },
  
  // Content upload limits
  UPLOAD: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 20, // 20 requests per 5 minutes
  }
} 