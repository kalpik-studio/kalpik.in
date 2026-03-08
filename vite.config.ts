import * as path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type PluginOption } from "vite";

const getPlugins = (isBuild: boolean): PluginOption[] => {
  if (isBuild) {
    return [reactRouter(), visualizer({ emitFile: true }) as PluginOption];
  }
  return [reactRouter()];
};

export default defineConfig(({ command }) => ({
  plugins: getPlugins(command === "build"),
  resolve: {
    alias: { "~": path.resolve(__dirname, "./src") },
  },
}));
