import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { createUrlWithUniqueShortCode } from "../utils/generateShortCode.js";

export const createShorten = async (_req: Request, res: Response) => {
  const { url } = res.locals.validatedBody;

  const data = await createUrlWithUniqueShortCode(url);

  res.status(201).json({
    message: "Short URL created successfully",
    data,
  });
};
