import { defineConfig } from "@playwright/test";
import { baseConfig } from "@innbell/config/playwright";

export default defineConfig(baseConfig(5001));
