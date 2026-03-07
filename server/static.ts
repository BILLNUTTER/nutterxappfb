import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* recreate __dirname for ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  // If no frontend build exists, skip static serving
  if (!fs.existsSync(distPath)) {
    console.log("⚠️ No frontend build found. Skipping static file serving.");
    return;
  }

  app.use(express.static(distPath));

  // SPA fallback
  app.use("/*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
