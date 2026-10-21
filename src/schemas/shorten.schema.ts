import { z } from "zod";

export const createShortenSchema = z.object({
  url: z.url({ protocol: /^https?$/ }).trim(),
});