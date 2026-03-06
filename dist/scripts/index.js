"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("node:http"));
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const publicDir = path.resolve(__dirname, ".."); // dist root after build
const contentTypes = {
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
                }
                else {
                    res.end(data404);
                }
            });
        }
        else {
            res.writeHead(200, { "content-type": contentType });
            res.end(data);
        }
    });
})
    .listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});
