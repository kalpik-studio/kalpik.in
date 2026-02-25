import type { Preview } from "@storybook/react";
import { routeDecorator } from "./decorator-route";

import "./tailwind.css";

const preview: Preview = {
  decorators: [routeDecorator],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
