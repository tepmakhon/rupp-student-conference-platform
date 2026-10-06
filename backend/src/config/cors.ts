import "./env.js";
export const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:3000")
  .split(",").map((origin) => origin.trim()).filter(Boolean);
