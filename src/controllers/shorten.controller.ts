import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { createUrlWithUniqueShortCode } from "../utils/generateShortCode.js";
import { ErrorApp } from "../middlewares/errorApp.middleware.js";

export const createShorten = async (_req: Request, res: Response) => {
  const { url } = res.locals.validatedBody as { url: string };

  const data = await createUrlWithUniqueShortCode(url);

  res.status(201).json({
    message: "Short URL created successfully",
    data,
  });
};

export const getShorten = async (_req: Request, res: Response) => {
  const { shortCode } = res.locals.validatedParams as {
    shortCode: string;
  };

  const data = await prisma.url.findUnique({
    where: {
      shortCode,
    },
  });

  if (!data) {
    throw new ErrorApp("Short URL not found", 404);
  }

  res.status(200).json({
    data,
  });
};

export const deleteShorten = async (_req: Request, res: Response) => {
  const { shortCode } = res.locals.validatedParams as {
    shortCode: string;
  };

  const data = await prisma.url.findUnique({
    where: {
      shortCode,
    },
  });

  if (!data) {
    throw new ErrorApp("Short URL not found", 404);
  }

  await prisma.url.delete({
    where: {
      shortCode,
    },
  });

  res.status(200).json({
    message: "Short URL deleted successfully",
  });
};
