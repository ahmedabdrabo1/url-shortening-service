
import { z } from "zod";

const urlSchema = z
  .string()
  .trim()
  .pipe(
    z.url({
      protocol: /^https?$/,
    }),
  );

export const createShortenSchema = z.object({
  url: urlSchema,
});

export const updateShortenSchema = z.object({
  url: urlSchema,
});

export const shortCodeParamsSchema = z.object({
  shortCode: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9]{6}$/, "Invalid short code"),
});
