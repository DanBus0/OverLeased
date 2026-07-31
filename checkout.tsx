import { RateLimiterMemory } from 'rate-limiter-flexible';
import type { NextApiRequest, NextApiResponse } from 'next';

// Create rate limiter: 5 requests per 60 seconds per IP
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

// Stricter rate limiter for payment endpoints: 3 requests per 120 seconds per IP
const paymentRateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 120,
});

export async function applyRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  strict = false
): Promise<boolean> {
  const limiter = strict ? paymentRateLimiter : rateLimiter;
  
  // Get client IP
  const ip = (
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.socket.remoteAddress ||
    'unknown'
  ).toString().split(',')[0].trim();

  try {
    await limiter.consume(ip);
    return true;
  } catch (rejRes: any) {
    const retryAfter = Math.round(rejRes.msBeforeNext / 1000) || 60;
    res.setHeader('Retry-After', String(retryAfter));
    res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfter,
    });
    return false;
  }
}