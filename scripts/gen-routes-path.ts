import fs from "node:fs";
import path from "node:path";

const rootDirPath = import.meta.resolve("..").replace("file:", "");
const routesFilePath = path.join(
  rootDirPath,
  "packages",
  "router",
  "src",
  "routes.ts",
);

const appDirectories = ["app", "admin", "www"];
const fileContents = [
  `// Generated file. Do not edit manually.

import type { ClientEnv } from "@innbell/constants/env";`,
];

for (const dir of appDirectories) {
  const dirPath = path.join(rootDirPath, "apps", dir, "src", "routes");
  const routes = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .map((file) =>
      file.isFile() ? file.name.replace(/\.tsx?/, "") : file.name,
    )
    .filter((id) => !/\$|\[/.test(id) && !id.startsWith("."))
    .map((id) => {
      const parts = id.split(".").filter((part) => !part.startsWith("_"));
      return "/" + parts.join("/").replace(/_/g, "");
    });

  const enumName = `${toTitleCase(dir)}Route`;
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
}

export function gen${enumName}(
  fn?: ((Route: typeof ${enumName}) => ${enumName}) | ${enumName},
): string {
  const env: ClientEnv =
    // @ts-ignore window.ENV may be not defined
    typeof window === "undefined" ? process.env : window["ENV"];
  if (!fn) return env?._URL_${dir.toUpperCase()} ?? "";
  return \`\${env?._URL_${dir.toUpperCase()}}\${typeof fn === "function" ? fn(${enumName}) : fn}\`;
}`;

  fileContents.push(content);
}

fs.writeFileSync(routesFilePath, fileContents.join("\n"), "utf8");

// Helpers

/** @param {string} path */
function generateNameFromPath(path, starts) {
  if (path === starts) return "ROOT";
  return path
    .replace(starts === "/" ? "/" : starts + "/", "")
    .replace(/\/|-/g, "_")
    .toUpperCase();
}

/** @param {string} str */
function toTitleCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}
