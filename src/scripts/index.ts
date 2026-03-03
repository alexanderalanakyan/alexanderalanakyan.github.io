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
    const requestUrl = new URL(req.url || "/", "http://localhost");
    const urlPath = requestUrl.pathname === "/" ? "/data/www/index.html" : requestUrl.pathname;
    const normalized = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
    const relativePath = normalized.replace(/^[/\\]+/, "");
    const filePath = path.join(publicDir, relativePath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        fs.readFile(path.join(publicDir, "data/www/404.html"), (err404, data404) => {
          if (err404) {
            res.end("<p>404 Not Found</p>");
          } else {
          res.end(data404);
          }});
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": contentTypes[ext] ?? "application/octet-stream",
      });
      res.end(data);
    });
  })
  .listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });
