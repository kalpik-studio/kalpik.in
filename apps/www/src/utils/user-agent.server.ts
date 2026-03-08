import { UAParser } from "ua-parser-js";

export function checkIsMobileDeviceByRequest(
  request: Request,
): boolean | undefined {
  const results = parseUserAgentFromRequest(request);
  if (!results) return undefined;

  return results.isMobile;
}

export function checkIsAppleDeviceByRequest(
  request: Request,
): boolean | undefined {
  return parseUserAgentFromRequest(request)?.isApple ?? false;
}

export function getDeviceIdFromRequest(request: Request): string | undefined {
  const results = parseUserAgentFromRequest(request);
  if (!results) return undefined;

  return [results.device, results.browser].filter(Boolean).join("-");
}

export type ParsedUserAgent = {
  browser: string;
  engine: string;
  device: string;
  os: string;
  deviceType: DeviceType;
  isMobile: boolean;
  isApple: boolean;
};

export function parseUserAgentFromRequest(
  request: Request,
): ParsedUserAgent | null {
  const headers = new Headers(request.headers);
  const userAgent =
    headers.get("User-Agent") || headers.get("user-agent") || "";
  if (!userAgent) return null;

  const parser = new UAParser(userAgent);
  const { browser, device, engine, os } = parser.getResult();
  const fallback = "unknown";

  return {
    browser:
      [browser.name, browser.version].filter(Boolean).join(" ") || fallback,
    engine: [engine.name, engine.version].filter(Boolean).join(" ") || fallback,
    device: [device.vendor, device.model].filter(Boolean).join(" ") || fallback,
    os: [os.name, os.version].filter(Boolean).join(" ") || fallback,
    deviceType: (device.type || "desktop") as DeviceType,
    isMobile: device.type === "mobile",
    isApple: device.vendor?.includes("Apple") ?? false,
  };
}

type DeviceType =
  | "console"
  | "mobile"
  | "tablet"
  | "smarttv"
  | "wearable"
  | "embedded"
  | "desktop";
