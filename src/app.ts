
import "dotenv/config";
import express from "express";

import shortenRouter from "./routes/shorten.route.js";
import redirectRouter from "./routes/redirect.routes.js";

import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "URL Shortening Service API is running",
  });
});

// Create, read, update, delete, and stats
app.use("/shorten", shortenRouter);

// Redirect short URLs
app.use("/", redirectRouter);

// Must be registered after the routes
app.use(errorHandler);

export default app;
