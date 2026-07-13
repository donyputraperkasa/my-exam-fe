import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Batas ini adalah alarm maintainability, bukan target untuk memadatkan JSX.
// File boleh lebih panjang dari aturan lama (120), tetapi tetap perlu dipecah
// ketika melewati 200 baris atau menangani lebih dari satu tanggung jawab besar.
const MAX_LINES = 200;
const TARGET_DIR = "src";
const EXTENSIONS = new Set([".ts", ".tsx", ".css"]);

function getExtension(fileName) {
  const index = fileName.lastIndexOf(".");
  return index === -1 ? "" : fileName.slice(index);
}

function collectFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      return collectFiles(path);
    }

    return EXTENSIONS.has(getExtension(entry.name)) ? [path] : [];
  });
}

const longFiles = collectFiles(TARGET_DIR)
  .map((file) => ({
    file,
    lines: readFileSync(file, "utf8").split("\n").length,
  }))
  .filter(({ lines }) => lines > MAX_LINES);

if (longFiles.length > 0) {
  console.error(`Files must be ${MAX_LINES} lines or fewer:`);
  longFiles.forEach(({ file, lines }) => {
    console.error(`- ${file}: ${lines} lines`);
  });
  process.exit(1);
}

console.log(`All source files are ${MAX_LINES} lines or fewer.`);
