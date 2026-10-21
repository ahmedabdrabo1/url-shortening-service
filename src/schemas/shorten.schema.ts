import { z } from "zod";

export const createShortenSchema = z.object({
  url: z
    .string()
    .trim()
    .pipe(
      z.url({
        protocol: /^https?$/,
      }),
    ),
});

export const shortCodeParamsSchema = z.object({
  shortCode: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9]{6}$/, "Invalid short code"),
});
