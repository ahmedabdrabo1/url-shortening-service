import "dotenv/config";
import express from "express";
import shortenRouter from "./routes/shorten.route.js";


import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "URL Shortening Service API is running",
  });
});

app.use("/shorten", shortenRouter);

app.use(errorHandler)

export default app;
