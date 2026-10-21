import { describe, expect, it } from "@jest/globals";
import express from "express";
import request from "supertest";

import { createRateLimiter } from "../src/middlewares/rateLimit.middleware.js";

describe("Rate limiting", () => {
  it("should return 429 when the request limit is exceeded", async () => {
    const app = express();

    app.use(
      createRateLimiter(
        2,
        60_000,
        "Too many requests. Please try again later.",
      ),
    );

    app.get("/test", (_req, res) => {
      res.status(200).json({ message: "OK" });
    });

    const firstResponse = await request(app).get("/test");
    const secondResponse = await request(app).get("/test");
    const thirdResponse = await request(app).get("/test");

    expect(firstResponse.status).toBe(200);
    expect(secondResponse.status).toBe(200);

    expect(thirdResponse.status).toBe(429);
    expect(thirdResponse.body).toEqual({
      message: "Too many requests. Please try again later.",
    });
  });
});
