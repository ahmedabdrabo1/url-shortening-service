import "dotenv/config";
import express from "express";

import shortenRouter from "./routes/shorten.route.js";
import redirectRouter from "./routes/redirect.routes.js";

import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json({ limit: "10kb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "URL Shortening Service API is running",
  });
});

// Create, read, update, delete, and stats
app.use("/shorten", shortenRouter);

// Redirect short URLs
app.use("/", redirectRouter);

// Handle requests to unknown routes
app.use(notFound);

// Handle errors from middleware and routes
app.use(errorHandler);

export default app;
