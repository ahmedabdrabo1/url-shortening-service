
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

describe("Shorten API", () => {
  let shortCode: string;

  beforeAll(async () => {
    await prisma.url.deleteMany({
      where: {
        url: {
          startsWith: "https://test.example.com/",
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.url.deleteMany({
      where: {
        url: {
          startsWith: "https://test.example.com/",
        },
      },
    });
  });

  it("POST /shorten - should create a short URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({
        url: "https://test.example.com/create",
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.shortCode).toBeDefined();
    expect(response.body.data.url).toBe(
      "https://test.example.com/create",
    );

    shortCode = response.body.data.shortCode;
  });

  it("POST /shorten - should reject an invalid URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({
        url: "not-a-valid-url",
      });

    expect(response.status).toBe(400);
  });

  it("GET /shorten/:shortCode - should return the URL", async () => {
    const response = await request(app).get(
      `/shorten/${shortCode}`,
    );

    expect(response.status).toBe(200);
    expect(response.body.data.shortCode).toBe(shortCode);
    expect(response.body.data.url).toBe(
      "https://test.example.com/create",
    );
  });

  it("GET /shorten/:shortCode - should not increase accessCount", async () => {
    const before = await prisma.url.findUniqueOrThrow({
      where: { shortCode },
    });

    const response = await request(app).get(
      `/shorten/${shortCode}`,
    );

    expect(response.status).toBe(200);

    const after = await prisma.url.findUniqueOrThrow({
      where: { shortCode },
    });

    expect(after.accessCount).toBe(before.accessCount);
  });

  it("GET /shorten/:shortCode - should return 404 for missing URL", async () => {
    const response = await request(app).get(
      "/shorten/ZZZZZ9",
    );

    expect(response.status).toBe(404);
  });

  it("PUT /shorten/:shortCode - should update the URL", async () => {
    const before = await prisma.url.findUniqueOrThrow({
      where: { shortCode },
    });

    const response = await request(app)
      .put(`/shorten/${shortCode}`)
      .send({
        url: "https://test.example.com/updated",
      });

    expect(response.status).toBe(200);

    const after = await prisma.url.findUniqueOrThrow({
      where: { shortCode },
    });

    expect(after.url).toBe(
      "https://test.example.com/updated",
    );
    expect(after.id).toBe(before.id);
    expect(after.shortCode).toBe(before.shortCode);
    expect(after.accessCount).toBe(before.accessCount);
    expect(after.updatedAt.getTime()).toBeGreaterThanOrEqual(
      before.updatedAt.getTime(),
    );
  });

  it("PUT /shorten/:shortCode - should reject an invalid URL", async () => {
    const response = await request(app)
      .put(`/shorten/${shortCode}`)
      .send({
        url: "invalid-url",
      });

    expect(response.status).toBe(400);
  });

  it("PUT /shorten/:shortCode - should return 404 for missing URL", async () => {
    const response = await request(app)
      .put("/shorten/ZZZZZ9")
      .send({
        url: "https://test.example.com/updated",
      });

    expect(response.status).toBe(404);
  });

  it("GET /shorten/:shortCode/stats - should return statistics", async () => {
    const before = await prisma.url.findUniqueOrThrow({
      where: { shortCode },
    });

    const response = await request(app).get(
      `/shorten/${shortCode}/stats`,
    );

    expect(response.status).toBe(200);
    expect(response.body.data.accessCount).toBe(
      before.accessCount,
    );
    expect(response.body.data.shortCode).toBe(shortCode);
  });

  it("DELETE /shorten/:shortCode - should delete the URL", async () => {
    const response = await request(app).delete(
      `/shorten/${shortCode}`,
    );

    expect(response.status).toBe(204);

    const deleted = await prisma.url.findUnique({
      where: { shortCode },
    });

    expect(deleted).toBeNull();
  });

  it("DELETE /shorten/:shortCode - should return 404 for missing URL", async () => {
    const response = await request(app).delete(
      "/shorten/ZZZZZ9",
    );

    expect(response.status).toBe(404);
  });
});
