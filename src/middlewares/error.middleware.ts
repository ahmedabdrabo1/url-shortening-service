import type { ErrorRequestHandler } from "express";
import { ErrorApp } from "./errorApp.middleware.js";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
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
