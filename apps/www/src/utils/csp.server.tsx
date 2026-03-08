/**
 * @module content-security-policy-builder
 * @see https://raw.githubusercontent.com/helmetjs/content-security-policy-builder/v2.2.0/index.ts
 */

import { useNonceContext } from "~/contexts/nonce-context";

type PolicyBuilderDirectivesName =
  | "default-src"
  | "script-src"
  | "style-src"
  | "img-src"
  | "connect-src"
  | "font-src"
  | "object-src"
  | "media-src"
  | "frame-src"
  | "sandbox"
  | "report-uri"
  | "child-src"
  | "form-action"
  | "frame-ancestors"
  | "plugin-types"
  | "base-uri"
  | "report-to"
  | "worker-src"
  | "manifest-src"
  | "prefetch-src"
  | "navigate-to"
  | "upgrade-insecure-requests"
  | "block-all-mixed-content";
// | (string & {}); // eslint-disable-line typescript-eslint(ban-types)

type PolicyBuilderDirectivesValue =
  | "*"
  | "'none'"
  | "'self'"
  | "'unsafe-inline'"
  | "data:"
  | "https:"
  | "'unsafe-eval'"
  | "'strict-dynamic'"
  | "'unsafe-hashes'"
  | `'sha256-${string}'`
  | `'nonce-${string}'`
  | (string & {}); // eslint-disable-line typescript-eslint(ban-types);

type PolicyBuilderDirectives = Readonly<
  Partial<
    Record<
      PolicyBuilderDirectivesName,
      | Array<PolicyBuilderDirectivesValue | boolean>
      | PolicyBuilderDirectivesValue
      | boolean
    >
  >
>;

export function cspBuilder(directives: PolicyBuilderDirectives): string {
  const namesSeen = new Set<string>();

  const result: string[] = [];

  for (let [originalName, value] of Object.entries(directives)) {
    const name = originalName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

    if (namesSeen.has(name)) {
      throw new Error(`${originalName} is specified more than once`);
    }
    namesSeen.add(name);

    if (Array.isArray(value)) {
      value = value.join(" ");
    } else if (value === true) {
      value = "";
    }

    if (value) {
      result.push(`${name} ${value}`);
    } else if (value !== false) {
      result.push(name);
    }
  }

  return result.join("; ");
}

interface CSPMetaTagProps {
  directives?: PolicyBuilderDirectives;
}

export function CSPMetaTag({ directives }: CSPMetaTagProps) {
  const nonce = useNonceContext();
  const NODE_ENV =
    // @ts-ignore window.ENV may be not defined
    (typeof window === "undefined" ? process.env : window["ENV"])["NODE_ENV"];

  const defaultDirectives: PolicyBuilderDirectives = {
    "default-src": ["'self'", "innbell.com", "*.innbell.com"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      `nonce-${nonce}`,
      "*.googletagmanager.com",
      "challenges.cloudflare.com",
    ],
    "style-src": ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
    "img-src": ["*", "data:", "blob:"],
    "connect-src": [
      "'self'",
      "*.innbell.com",
      "*.googletagmanager.com",
      "*.analytics.google.com",
      "*.google-analytics.com",
    ],
    "font-src": ["'self'", "fonts.gstatic.com", "data:"],
    "frame-src": [
      "'self'",
      "https:",
      NODE_ENV === "development" ? "http:" : false,
    ],
  } as const;

  return (
    <meta
      httpEquiv="Content-Security-Policy"
      content={cspBuilder({ ...defaultDirectives, ...directives })}
      suppressHydrationWarning
    />
  );
}

// content="Content-Security-Policy: default-src 'self' innbell.com *.innbell.com;
// script-src 'self' 'unsafe-inline' *.googletagmanager.com; img-src *"
