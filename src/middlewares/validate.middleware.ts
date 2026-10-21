import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { ErrorApp } from "./errorApp.middleware.js";

const validateSchema = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new ErrorApp(
          result.error.issues[0]?.message ?? "Invalid request body",
          400,
        ),
      );
    }

    res.locals.validatedBody = result.data;

    next();
  };
};

export default validateSchema;
