const { exec } = require("node:child_process");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..");

function runTsc() {
  exec("npx tsc", (err) => {
    if (err) {
      console.error("tsc failed:", err.message);
      process.exit(1);
    } else {
      console.log(`✓ built typescript successfully`);
    }
  });
}

function copyDir() {
  try {
    fs.rmSync("./dist/", { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  } catch (err) {
    console.log("Error:", err);
  }

  fs.readdirSync(dir).forEach((s) => {
    if (s !== "scripts") {
      const src = path.join(dir, s);
      const dest = path.join("./dist", s);
      fs.cpSync(src, dest, { recursive: true });
      console.log(`✓ copied ${s}`);
    }
  });
}

function build() {
  copyDir();
  runTsc();
}

build();