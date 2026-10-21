
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

describe("Redirect API", () => {
  let shortCode: string;

  beforeAll(async () => {
    const data = await prisma.url.create({
      data: {
        url: "https://test.example.com/redirect",
        shortCode: `T${Date.now().toString(36)}`.slice(-6),
      },
    });

    shortCode = data.shortCode;
  });

  afterAll(async () => {
    await prisma.url.deleteMany({
      where: {
        shortCode,
      },
    });
  });

  it("GET /:shortCode - should redirect with 302", async () => {
    const response = await request(app)
      .get(`/${shortCode}`)
      .redirects(0);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(
      "https://test.example.com/redirect",
    );
  });

  it("GET /:shortCode - should increment accessCount", async () => {
    const before = await prisma.url.findUniqueOrThrow({
      where: { shortCode },
    });

    const response = await request(app)
      .get(`/${shortCode}`)
      .redirects(0);

    expect(response.status).toBe(302);

    const after = await prisma.url.findUniqueOrThrow({
      where: { shortCode },
    });

    expect(after.accessCount).toBe(before.accessCount + 1);
  });

  it("GET /:shortCode - should return 404 for missing URL", async () => {
    const response = await request(app)
      .get("/ZZZZZ9")
      .redirects(0);

    expect(response.status).toBe(404);
  });
});
