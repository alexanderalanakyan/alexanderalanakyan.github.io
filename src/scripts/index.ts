import * as http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";

const publicDir = path.resolve(__dirname, ".."); // dist root after build

const contentTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http
  .createServer((req, res) => {
    console.log(req.url)
  })
  .listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });
