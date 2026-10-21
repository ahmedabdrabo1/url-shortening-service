
import express from "express";

import { createShorten } from "../controllers/shorten.controller.js";
import { createShortenSchema } from "../schemas/shorten.schema.js";
import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(validate(createShortenSchema), createShorten);

export default router;
