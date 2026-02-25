import { parseCookieByKey } from "@innbell/router/utils";

const cookieName = "innbell-pwa";

export function detectPwaFromRequest(request: Request): [boolean, string] {
  const headers = new Headers();
  headers.set("Set-Cookie", `${cookieName}=true`);

  // From URL
  const url = new URL(request.url);
  if (url.searchParams.get("source") === "pwa") {
    return [true, createPwaCookie(true)];
  }

  // From Cookie
  const cookie = request.headers.get("Cookie");
  const pwa = !!parseCookieByKey<boolean>(cookie, cookieName);

  return [pwa, createPwaCookie(pwa)];
}

function createPwaCookie(pwa: boolean): string {
  return `${cookieName}=${pwa ? "true" : "false"}; path=/`;
}
