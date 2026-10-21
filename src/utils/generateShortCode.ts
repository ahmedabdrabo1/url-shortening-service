import crypto from "node:crypto";
import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { ErrorApp } from "../middlewares/errorApp.middleware.js";

const generateShortCode = (): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return Array.from(
    { length: 6 },
    () => chars[crypto.randomInt(chars.length)],
  ).join("");
};

export const createUrlWithUniqueShortCode = async (url: string) => {
  const maxAttempts = 4;

  for (let i = 0; i < maxAttempts; i++) {
    const shortCode = generateShortCode();

    try {
      return await prisma.url.create({
        data: {
          url,
          shortCode,
        },
      });
    } catch (error: unknown) {
      const isUniqueConstraintError =
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002";

      if (!isUniqueConstraintError) {
        throw error;
      }
    }
  }

  throw new ErrorApp(
    "Failed to generate a unique short code after multiple attempts",
    500,
  );
};
