import type { LoaderFunctionArgs } from "react-router";
import env from "@innbell/constants/env";
import { throwRedirect } from "@innbell/utils/response";
import { genAdminRoute, genAppRoute } from "./routes";

export function handleRedirects({ request }: LoaderFunctionArgs): null {
  const { pathname, search } = new URL(request.url);

  if (pathname.startsWith("/_/") || pathname.startsWith("/api/files")) {
    return throwRedirect(`${env.PB_BASE_URL}${pathname}${search}`);
  }

  const appPathname = "/app";
  if (pathname.toLowerCase().startsWith(appPathname)) {
    const newPathname = pathname.replace(appPathname, "");
    const redirectUrl = genAppRoute() + `${newPathname}${search}`;
    return throwRedirect(redirectUrl, { status: 301 });
  }

  const adminPathname = "/admin";
  if (pathname.toLowerCase().startsWith(adminPathname)) {
    const newPathname = pathname.replace(adminPathname, "");
    const redirectUrl = genAdminRoute() + `${newPathname}${search}`;
    return throwRedirect(redirectUrl, { status: 301 });
  }

  return null;
}
