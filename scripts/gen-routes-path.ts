import fs from "node:fs";
import path from "node:path";

const rootDirPath = import.meta.resolve("..").replace("file:", "");
const routesFilePath = path.join(rootDirPath, "src", "routes-manifest.ts");

const fileContents = [`// Generated file. Do not edit manually.`];

const dirPath = path.join(rootDirPath, "src", "routes");
const routes = fs
  .readdirSync(dirPath, { withFileTypes: true })
  .map((file) => (file.isFile() ? file.name.replace(/\.tsx?/, "") : file.name))
  .filter((id) => !/\$|\[/.test(id) && !id.startsWith("."))
  .map((id) => {
    const parts = id.split(".").filter((part) => !part.startsWith("_"));
    return "/" + parts.join("/").replace(/_/g, "");
  });

const enumName = `WwwRoute`;
const nameSet = new Set();

const content = `
export enum ${enumName} {
  ${routes
    .map((route) => {
      const name = generateNameFromPath(route, "/");
      if (nameSet.has(name)) return undefined;

      nameSet.add(name);
      return `${name} = "${route}"`;
    })
    .filter(Boolean)
    .join(",\n  ")},
}`;

fileContents.push(content);

fs.writeFileSync(routesFilePath, fileContents.join("\n"), "utf8");

// Helpers

function generateNameFromPath(path: string, starts: string) {
  if (path === starts) return "ROOT";
  return path
    .replace(starts === "/" ? "/" : starts + "/", "")
    .replace(/\/|-/g, "_")
    .toUpperCase();
}
