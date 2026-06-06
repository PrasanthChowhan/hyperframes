import { Context } from "hono";
import { readFileSync, existsSync, statSync } from "node:fs";
import { extname } from "node:path";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".aac": "audio/aac",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
};

/**
 * Animaker v2 specific middleware for HyperFrames engine.
 * Decodes Vite-style /@fs/ absolute paths to securely serve "Reference in Place" media
 * without requiring files to be physically copied into the project directory.
 */
export async function animakerFsMiddleware(c: Context, next: () => Promise<void>) {
  if (c.req.path.startsWith("/@fs/")) {
    const rawPath = c.req.path.substring(5);
    const filePath = decodeURIComponent(rawPath);
    
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      return c.text("Not found", 404);
    }
    
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const content = readFileSync(filePath);
    
    return new Response(content, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  }
  
  await next();
}
