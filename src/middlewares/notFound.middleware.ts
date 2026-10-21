import type { RequestHandler } from "express";

const notFound: RequestHandler = (req, res) => {
  return res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

export default notFound;
