import "dotenv/config";
import app from "./app.js";
import express from "express";
import path from "path";

// Serve uploaded files
app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`
====================================
🚀 Server running successfully
🌐 URL: http://localhost:${PORT}
====================================
`);
});