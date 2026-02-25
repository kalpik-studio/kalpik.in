import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  core: { disableTelemetry: true },
  framework: "@storybook/react-vite",
  // staticDirs: ["../public"],
  stories: ["../Welcome.mdx", "../src/**/*.stories.@(ts|tsx)"],
  typescript: { reactDocgen: "react-docgen-typescript" },
};
export default config;
