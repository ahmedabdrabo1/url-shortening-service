import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";

describe("GET /", () => {
  it("should return the API health message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "URL Shortening Service API is running",
    });
  });
});

describe("Error handling", () => {
  it("should return 404 JSON for an unknown route", async () => {
    const response = await request(app).get("/unknown-route/extra");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Route GET /unknown-route/extra not found",
    });
  });

  it("should return 400 JSON for malformed JSON", async () => {
    const response = await request(app)
      .post("/shorten")
      .set("Content-Type", "application/json")
      .send('{"url":');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid JSON body",
    });
  });

  it("should return 413 when the request body is too large", async () => {
    const response = await request(app)
      .post("/shorten")
      .set("Content-Type", "application/json")
      .send({
        url: `https://example.com/${"a".repeat(11_000)}`,
      });

    expect(response.status).toBe(413);
    expect(response.body).toEqual({
      message: "Request body too large",
    });
  });
});
