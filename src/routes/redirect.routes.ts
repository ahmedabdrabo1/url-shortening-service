import express from "express";
import { redirectShorten } from "../controllers/redirect.controller.js";
import { shortCodeParamsSchema } from "../schemas/shorten.schema.js";
import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get(
  "/:shortCode",
  validate(shortCodeParamsSchema, "params"),
  redirectShorten,
);

export default router;