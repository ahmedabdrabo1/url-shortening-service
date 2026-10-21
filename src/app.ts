import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "URL Shortening Service API is running",
  });
});

export default app;
