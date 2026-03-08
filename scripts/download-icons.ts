import { execSync } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const repo = process.argv[2] || "lucide";
const iconNames = process.argv.slice(3);
const baseUrl =
  repo === "simple"
    ? "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/"
    : "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons";

const svgIconsDirPath = path.resolve("svg");

await Promise.allSettled(iconNames.map(downloadAndSaveIcon));
execSync("yarn run build");
console.log("✅ Icons downloaded");

async function downloadAndSaveIcon(name: string) {
  const filename = `${name}.svg`;
  const url = `${baseUrl}/${filename}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.log(`Icon '${name}' not found in ${repo}.`);
    return;
  }

  const svg = await res.text();
  const filePath = path.join(svgIconsDirPath, filename);

  return await fs.writeFile(filePath, svg, { encoding: "utf-8" });
}
