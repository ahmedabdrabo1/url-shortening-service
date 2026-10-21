import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { ErrorApp } from "./errorApp.middleware.js";

type ValidationSource = "body" | "params";

const validate = (
  schema: ZodType,
  source: ValidationSource = "body",
): RequestHandler => {
  return (req, res, next) => {
    const input = source === "body" ? req.body : req.params;
    const result = schema.safeParse(input);

    if (!result.success) {
      return next(
        new ErrorApp(
          result.error.issues.map((issue) => issue.message).join(", "),
          400,
        ),
      );
    }

    if (source === "body") {
      res.locals.validatedBody = result.data;
    } else {
      res.locals.validatedParams = result.data;
    }

    next();
  };
};

export default validate;
