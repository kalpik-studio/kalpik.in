// react-router.config.ts

import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  future: { unstable_optimizeDeps: true },
  ssr: true,
} satisfies Config;
