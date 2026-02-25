import { parseCookieByKey } from "@innbell/router/utils";

const cookieName = "innbell-mobile-app";

export function detectMobileAppFromRequest(
  request: Request,
): [boolean, string] {
  const headers = new Headers();
  headers.set("Set-Cookie", `${cookieName}=true`);

  // From URL
  const url = new URL(request.url);
  if (url.searchParams.get("mapp") === "true") {
    return [true, createCookie(true)];
  }

  // From Cookie
  const cookie = request.headers.get("Cookie");
  const pwa = !!parseCookieByKey<boolean>(cookie, cookieName);

  return [pwa, createCookie(pwa)];
}

function createCookie(pwa: boolean): string {
  return `${cookieName}=${pwa ? "true" : "false"}; path=/`;
}
