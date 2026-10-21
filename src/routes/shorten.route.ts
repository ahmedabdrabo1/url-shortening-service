import express from "express";

import {
  createShorten,
  getShorten,
  updateShorten,
  deleteShorten,
  getShortenStats,
} from "../controllers/shorten.controller.js";

import {
  createShortenSchema,
  updateShortenSchema,
  shortCodeParamsSchema,
} from "../schemas/shorten.schema.js";

import validate from "../middlewares/validate.middleware.js";

import { createShortenLimiter } from "../middlewares/rateLimit.middleware.js"

const router = express.Router();

router
  .route("/")
  .post(createShortenLimiter, validate(createShortenSchema), createShorten);

router
  .route("/:shortCode/stats")
  .get(validate(shortCodeParamsSchema, "params"), getShortenStats);

router
  .route("/:shortCode")
  .get(validate(shortCodeParamsSchema, "params"), getShorten)
  .put(
    validate(shortCodeParamsSchema, "params"),
    validate(updateShortenSchema),
    updateShorten,
  )
  .delete(validate(shortCodeParamsSchema, "params"), deleteShorten);

export default router;
