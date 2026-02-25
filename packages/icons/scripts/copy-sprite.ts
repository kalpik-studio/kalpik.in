import { execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { copyFile } from "node:fs/promises";
import path from "node:path";

const spriteBuildDirPath = path.resolve("build");

if (!existsSync(spriteBuildDirPath) || !getSpriteFilename()) {
  execSync("yarn run build");
}

const appsDirPath = path.resolve("../../apps");
const appsWithPublicDir = readdirSync(appsDirPath).filter((appName) =>
  existsSync(path.join(appsDirPath, appName, "public")),
);

for (const appName of appsWithPublicDir) {
  const publicDirPath = path.join(appsDirPath, appName, "public");
  await copySpriteFile(publicDirPath).catch(console.error);

  const clientBuildDirPath = path.join(appsDirPath, appName, "build", "client");
  await copySpriteFile(clientBuildDirPath).catch(console.error);
}

//

async function copySpriteFile(dirPath: string) {
  if (!existsSync(dirPath)) {
    throw new Error("The destination dir does not exists: " + dirPath);
  }

  const spriteFilename = getSpriteFilename();
  if (!spriteFilename) {
    throw new Error("Could not find sprite file.");
  }

  const spriteFilePath = path.join(spriteBuildDirPath, spriteFilename);
  const destFilePath = path.join(dirPath, spriteFilename);

  await copyFile(spriteFilePath, destFilePath);
  console.log(`Copied sprite to '${dirPath}'`);
}

function getSpriteFilename() {
  return readdirSync(spriteBuildDirPath).find((e) => e.includes(".svg"));
}
