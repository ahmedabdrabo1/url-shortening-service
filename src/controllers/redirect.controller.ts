import type { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { ErrorApp } from "../middlewares/errorApp.middleware.js";

export const redirectShorten = async (_req: Request, res: Response) => {
  const { shortCode } = res.locals.validatedParams as {
    shortCode: string;
  };

  try {
    const data = await prisma.url.update({
      where: {
        shortCode,
      },
      data: {
        accessCount: {
          increment: 1,
        },
      },
      select: {
        url: true,
      },
    });

    return res.redirect(302, data.url);
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new ErrorApp("Short URL not found", 404);
    }

    throw error;
  }
};
