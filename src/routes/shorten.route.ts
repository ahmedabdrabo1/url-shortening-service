import express from "express";

import {
  createShorten,
  getShorten,
  deleteShorten,
} from "../controllers/shorten.controller.js";

import {
  createShortenSchema,
  shortCodeParamsSchema,
} from "../schemas/shorten.schema.js";

import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router.route("/").post(validate(createShortenSchema), createShorten);

router
  .route("/:shortCode")
  .get(validate(shortCodeParamsSchema, "params"), getShorten)
  .delete(validate(shortCodeParamsSchema, "params"), deleteShorten);

export default router;
