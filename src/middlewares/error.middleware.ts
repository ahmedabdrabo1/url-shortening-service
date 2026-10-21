import type { ErrorRequestHandler } from "express";
import { ErrorApp } from "./errorApp.middleware.js";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ErrorApp) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Handle malformed JSON sent by express.json()
  if (
    err instanceof SyntaxError &&
    "status" in err &&
    err.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json({
      message: "Invalid JSON body",
    });
  }

  // Handle request bodies that exceed the configured size limit
  if (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    err.status === 413
  ) {
    return res.status(413).json({
      message: "Request body too large",
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal Server Error",
  });
};

export default errorHandler;
