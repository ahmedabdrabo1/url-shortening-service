
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import crypto from "node:crypto";

export const createShorten = async (_req: Request, res: Response) => {
  const { url } = res.locals.validatedBody;

  const data = await prisma.url.create({
    data: {
      url,
      shortCode: crypto.randomBytes(3).toString("hex"),
    },
  });

  res.status(201).json({
    message: "Short URL created successfully",
    data,
  });
};
