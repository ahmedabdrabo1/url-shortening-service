import { rateLimit } from "express-rate-limit";

export const createRateLimiter = (
  limit: number,
  windowMs: number,
  message: string,
) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      message,
    },
  });

export const createShortenLimiter = createRateLimiter(
  20,
  15 * 60 * 1000,
  "Too many URL creation requests. Please try again later.",
);

export const redirectLimiter = createRateLimiter(
  100,
  60 * 1000,
  "Too many redirect requests. Please try again later.",
);
