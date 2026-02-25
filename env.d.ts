/// <reference types="@react-router/node" />
/// <reference types="vite/client" />
/// <reference types="vitest" />

import "@total-typescript/ts-reset";

import type { CustomParameters } from "./.storybook/parameters";

declare module "@storybook/types" {
  interface Parameters extends CustomParameters {}
}
