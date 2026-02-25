import * as path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { visualizer } from "rollup-plugin-visualizer";
import type { PluginOption } from "vite";
import { defineConfig } from "vitest/config";
import { viteManualChunks } from "@innbell/config/vite";

const port = 5001;

const getPlugins = (isBuild: boolean): PluginOption[] => {
  const isStorybook = process.argv[1]?.includes("storybook");
  const { VITEST, E2E, CI } = process.env;

  if (VITEST || isStorybook) return [];

  if (E2E || CI) return [reactRouter()];
  if (isBuild) {
    return [reactRouter(), visualizer({ emitFile: true }) as PluginOption];
  }
  return [reactRouter()];
};

export default defineConfig(({ command }) => ({
  build: { rollupOptions: { output: { manualChunks: viteManualChunks } } },
  plugins: getPlugins(command === "build"),
  resolve: {
    alias: { "~": path.resolve(__dirname, "./src") },
  },
  server: { port },
  test: {
    setupFiles: ["dotenv/config"],
    exclude: [
      "**/e2e/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,cypress,build,eslint,prettier}.config.*",
    ],
  },
}));
