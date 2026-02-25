import env, { clientEnv } from "@innbell/constants/env";
import { commitCsrfToken } from "@innbell/misc/csrf";
import { detectPwaFromRequest } from "@innbell/pwa/server";
import { reportPageVisit } from "@innbell/reports/actions";
import { AdminRoute } from "@innbell/router/routes";
import { parseCookieByKey } from "@innbell/router/utils";
import { getToastFromRequest } from "@innbell/toasts";
import { mergeToResponseHeaders } from "@innbell/utils/response";
import { checkIsMobileDeviceByRequest } from "@innbell/utils/user-agent";
import type { RootBaseLoaderData } from "./root-types";

export type CommonRootLoaderOptions = {
  authHeaders: Headers;
  cookieName: string;
};

export async function commonRootLoader(
  request: Request,
  { authHeaders, cookieName }: CommonRootLoaderOptions,
): Promise<[Headers, RootBaseLoaderData]> {
  reportPageVisit(request.clone(), [AdminRoute.LOGS]);

  const isMobile = checkIsMobileDeviceByRequest(request);

  const { toast, headers: toastHeaders } = await getToastFromRequest(request);
  const headers = mergeToResponseHeaders(authHeaders, toastHeaders);

  const [csrfToken, csrfCookieHeader] = await commitCsrfToken(request.headers);
  if (csrfCookieHeader) {
    headers.append("set-cookie", csrfCookieHeader);
  }

  const [pwa, pwaCookie] = detectPwaFromRequest(request);
  if (pwaCookie) {
    headers.append("set-cookie", pwaCookie);
  }

  const defaultCollapsed = parseCookieByKey<boolean>(
    request.headers.get("Cookie"),
    cookieName,
  );

  const preconnectLink: string | null = env.PB_BASE_URL
    ? env.PB_BASE_URL + "/api/health"
    : null;

  const commonData: RootBaseLoaderData = {
    isMobile,
    toasts: [toast],
    csrfToken,
    pwa,
    defaultCollapsed,
    preconnectLink,
    env: clientEnv,
    turnstileSiteKey: env.CF_TURNSTILE_SITE_KEY,
  } as const;

  return [headers, commonData] as const;
}
