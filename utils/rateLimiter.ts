import { Middleware } from "@oak/oak";

interface ClientData {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, ClientData>();

export const rateLimiter: Middleware = async (ctx, next) => {
  const ip = ctx.request.ip;
  const currentTime = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const limit = 100;

  // Let's say this IP already has stored data
  // rateLimitMap already contains:
  // "1.1.1.1" → { count: 5, resetTime: 1705000000000 }

  const clientData = rateLimitMap.get("1.1.1.1") || {
    count: 0,
    resetTime: currentTime + windowMs,
  };
  // Since IP exists, clientData becomes the EXISTING object
  // clientData = { count: 5, resetTime: 1705000000000 }

  // Now we can compare because we got the existing resetTime
  if (currentTime > clientData.resetTime) {
    clientData.count = 0;
    clientData.resetTime = currentTime + windowMs;
  }

  if (clientData.count >= limit) {
    ctx.response.status = 429;
    throw new Error("Rate limit exceeded");
  }

  clientData.count++;
  rateLimitMap.set(ip, clientData);

  await next();
};
