// Simple in-memory rate limiting for production
// For production scale, consider using Redis or a dedicated service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests = new Map<string, RateLimitEntry>();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 100) {
    this.windowMs = windowMs; // 15 minutes default
    this.maxRequests = maxRequests; // 100 requests per window
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      return false;
    }

    entry.count++;
    return true;
  }

  getRemainingRequests(identifier: string): number {
    const entry = this.requests.get(identifier);
    if (!entry || Date.now() > entry.resetTime) {
      return this.maxRequests;
    }
    return Math.max(0, this.maxRequests - entry.count);
  }

  getResetTime(identifier: string): number {
    const entry = this.requests.get(identifier);
    if (!entry || Date.now() > entry.resetTime) {
      return Date.now() + this.windowMs;
    }
    return entry.resetTime;
  }

  // Clean up expired entries periodically
  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

// Different rate limits for different endpoints
export const authRateLimit = new RateLimiter(15 * 60 * 1000, 5); // 5 auth attempts per 15 minutes
export const apiRateLimit = new RateLimiter(15 * 60 * 1000, 100); // 100 API calls per 15 minutes
export const insightsRateLimit = new RateLimiter(60 * 1000, 10); // 10 insights requests per minute

// Cleanup expired entries every hour
if (typeof window === 'undefined') {
  setInterval(() => {
    authRateLimit.cleanup();
    apiRateLimit.cleanup();
    insightsRateLimit.cleanup();
  }, 60 * 60 * 1000);
}

export function getClientIdentifier(request: Request): string {
  // In production, you might want to use a more sophisticated identifier
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}