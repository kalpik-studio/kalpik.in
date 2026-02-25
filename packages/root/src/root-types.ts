import type { ClientEnv } from "@innbell/constants/env";
import type { ToastMessage } from "@innbell/toasts";

export type RootBaseLoaderData = {
  isMobile: boolean | undefined;
  csrfToken: string;
  toasts: (ToastMessage | undefined | null)[];
  pwa: boolean | undefined;
  preconnectLink: string | undefined | null;
  env: ClientEnv;
  defaultCollapsed: boolean | null;
  turnstileSiteKey: string;
};
