import type { Request, Response, NextFunction } from "express";
import { ErrorApp } from "./errorApp.middleware.js";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ErrorApp) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal Server Error",
  });
};

export default errorHandler;
