import express from "express";

import { redirectShorten } from "../controllers/redirect.controller.js";
import { shortCodeParamsSchema } from "../schemas/shorten.schema.js";
import validate from "../middlewares/validate.middleware.js";

import { redirectLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.get(
  "/:shortCode",
  redirectLimiter,
  validate(shortCodeParamsSchema, "params"),
  redirectShorten,
);

export default router;
