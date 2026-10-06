import { describe, expect, it, vi } from "vitest";
import express from "express";
import request from "supertest";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { errorMiddleware } from "../src/middlewares/error.middleware.js";
import { AppError } from "../src/utils/AppError.js";
import { validateIdParam } from "../src/middlewares/id.middleware.js";

const app = express();
app.use(express.json());
app.param("id", validateIdParam);
app.get("/resource/:id", (_req, res) => res.json({ success: true }));
app.post("/json", (_req, res) => res.json({ success: true }));
app.get("/failure/:kind", async (req) => {
  if (req.params.kind === "validation") z.object({ name: z.string() }).parse({ name: 42 });
  if (req.params.kind === "forbidden") throw new AppError("Not authorized", 403);
  if (["P2002", "P2003", "P2025", "P2034"].includes(String(req.params.kind))) {
    throw new Prisma.PrismaClientKnownRequestError("Sensitive query details", { code: String(req.params.kind), clientVersion: "6.19.0" });
  }
  throw new Error("Sensitive internal details");
});
app.use(errorMiddleware);

describe("uniform API errors", () => {
  it.each([["P2002", 409], ["P2003", 409], ["P2025", 404], ["P2034", 409]])("maps %s without exposing database details", async (kind, status) => {
    const response = await request(app).get(`/failure/${kind}`);
    expect(response.status).toBe(status); expect(response.body.success).toBe(false); expect(response.text).not.toContain("Sensitive");
  });
  it("maps validation and permission errors", async () => {
    expect((await request(app).get("/failure/validation")).status).toBe(400);
    expect((await request(app).get("/failure/forbidden")).status).toBe(403);
  });
  it("rejects malformed JSON and invalid IDs", async () => {
    expect((await request(app).post("/json").set("Content-Type", "application/json").send("{invalid")).status).toBe(400);
    for (const id of ["abc", "0", "-1", "1.5", "9223372036854775808"]) expect((await request(app).get(`/resource/${id}`)).status).toBe(400);
  });
  it("hides unexpected internal failures", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const response = await request(app).get("/failure/unexpected");
      expect(response.status).toBe(500); expect(response.body).toEqual({ success: false, message: "Internal Server Error" });
    } finally { log.mockRestore(); }
  });
});
