
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
