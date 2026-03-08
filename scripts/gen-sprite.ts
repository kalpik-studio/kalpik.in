import crypto from "node:crypto";
import { existsSync, type Dirent } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

const arg = process.argv[2];
const shouldForceBuild = arg ? ["-f", "--force"].includes(arg) : false;

const svgIconsDirPath = path.resolve("svg");
const srcDir = path.resolve("src");
const iconsConstantPath = path.join(srcDir, "icons.ts");

const allFiles = await fs.readdir(svgIconsDirPath, { withFileTypes: true });
const svgFiles = allFiles.filter((entry) => entry.isFile());
const ids = svgFiles.map((file) => file.name.replace(".svg", ""));
const symbols = await Promise.all(svgFiles.map(generateSymbolFromFile));

const filename = `sprite-${createHash()}.svg`;
const outDir = path.resolve("build");
const filePath = path.join(outDir, filename);

try {
  if (shouldForceBuild) {
    throw new Error("Skipping check");
  }

  await fs.readFile(filePath, { encoding: "utf8" });
  console.info("✅ Icons sprite exists:", filename);
  process.exit(0);
} catch {
  console.info("Generating icon-sprite...");

  // Remove old sprites
  if (existsSync(outDir)) {
    await fs.rm(outDir, { recursive: true, force: true });
  }
  await fs.mkdir(outDir, { recursive: true });
}

await fs.writeFile(
  iconsConstantPath,
  `export const spriteFilename = "${filename}";

export enum IconName {
  ${ids.map((id) => `${getIconEnumNameFromId(id)} = "${id}"`).join(",\n  ")},
}
`,
  { encoding: "utf8" },
);

await fs.writeFile(
  path.join(filePath),
  `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">
  <defs>
    ${symbols.join("\n\t")}
  </defs>
</svg>`,
  { encoding: "utf8" },
);

console.info("✅ Icons sprite generated:", filename);

// // Helpers

function getIconEnumNameFromId(id: string) {
  return id.replace(/-/g, "_").toUpperCase();
}

async function generateSymbolFromFile(file: Dirent) {
  const filePath = path.join(file.parentPath, file.name);
  const id = file.name.replace(".svg", "");
  const contents = await fs.readFile(filePath, { encoding: "utf8" });
  const symbol = contents
    .replace(/<svg/, `<symbol id="${id}"`)
    .replace(/<\/svg>/, "</symbol>")
    .replace('xmlns="http://www.w3.org/2000/svg"', "")
    .replace(/width="\d+"/, "")
    .replace(/height="\d+"/, "")
    .replace(/\s+/g, " ")
    .replace(/\n/g, "");

  return symbol;
}

function createHash() {
  return crypto
    .createHash("sha256")
    .update(ids.join(""))
    .digest("hex")
    .slice(0, 12);
}
