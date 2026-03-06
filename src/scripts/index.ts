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
    const url = req.url || "/";
    const filePath = path.join(publicDir, url === "/" ? "www/index.html" : url);
    const ext = path.extname(filePath);
    const contentType = contentTypes[ext] || "application/octet-stream";
    const data = fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
        fs.readFile(path.join(publicDir, "www/404.html"), (err404, data404) => {
          if (err404) {
            res.end("<h1>404 Not Found</h1>");
          } else {
            res.end(data404);
          }
        });
      } else {
        res.writeHead(200, { "content-type": contentType });
        res.end(data);
      }
    });
  })
  .listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });
