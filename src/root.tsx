import "./tailwind.css";

import { domAnimation, LazyMotion } from "framer-motion";
import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import env, { clientEnv } from "~/constants/env.server";
import { useNonceContext } from "~/contexts/nonce-context";
import { ViewportProvider } from "~/contexts/viewport-context";
import { cn } from "~/utils/cn";
import { CSPMetaTag } from "~/utils/csp";
import { commitCsrfToken } from "~/utils/csrf.server";
import { checkIsMobileDeviceByRequest } from "~/utils/user-agent.server";
import type { Route } from "./+types/root";
import { GTM } from "./components/GTM";
import { LinkedInInsight } from "./components/LinkedInInsight";
import { PublicFooter } from "./components/PublicFooter";

export { RootErrorBoundary as ErrorBoundary } from "./root-error-boundary";

export async function loader({ request }: Route.LoaderArgs) {
  const isMobile = checkIsMobileDeviceByRequest(request);
  const [csrfToken, csrfCookieHeader] = await commitCsrfToken(request.headers);

  const headers = new Headers();
  if (csrfCookieHeader) {
    headers.append("set-cookie", csrfCookieHeader);
  }

  const gtmTrackingId =
    env.NODE_ENV === "production" &&
    new URL(request.url).host.includes("kalpik.in")
      ? ""
      : undefined;
  const linkedinPartnerId =
    env.NODE_ENV === "production" &&
    new URL(request.url).host.includes("kalpik.in")
      ? ""
      : undefined;

  const banner: string = "";
  // const banner: string = "The InnBell App is going live on October 11, 2024.";

  return data(
    {
      banner,
      csrfToken,
      isMobile,
      ENV: clientEnv,
      gtmTrackingId,
      linkedinPartnerId,
    },
    { headers },
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { csrfToken, isMobile } = loaderData;

  return (
    <AuthenticityTokenProvider token={csrfToken}>
      <ViewportProvider isMobile={isMobile}>
        <LazyMotion features={domAnimation} strict>
          {/* <PublicHeader banner={banner} /> */}
          <Outlet />
          <PublicFooter />
        </LazyMotion>
      </ViewportProvider>
    </AuthenticityTokenProvider>
  );
}

const ldJsonList = [
  {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Kalpik",
    url: "https://kalpik.in/",
    potentialAction: {
      "@type": "SearchAction",
      target: "{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const nonce = useNonceContext();

  const viewportContent =
    "width=device-width, initial-scale=1, viewport-fit=cover";
  const ENV = loaderData?.ENV;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="application-name" content="Kalpik" />
        <meta name="viewport" content={viewportContent} />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content={"#000000"}
          media="(prefers-color-scheme: dark)"
        />
        <meta name="short-name" content="Kalpik" />
        <meta name="apple-mobile-web-app-title" content="Kalpik" />
        <CSPMetaTag />

        <Meta />
        <Links />

        <title>Kalpik</title>
        {ldJsonList.map((ldJson, index) => (
          <script
            type="application/ld+json"
            key={index}
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
            nonce={nonce}
            suppressHydrationWarning
          />
        ))}
      </head>
      <body
        className={cn(
          "min-h-dvh scroll-smooth",
          "bg-white font-poppins text-black",
        )}
      >
        {/* children will be the root App Component, ErrorBoundary, or HydrateFallback */}
        {children}
        <Scripts nonce={nonce} />
        <ScrollRestoration nonce={nonce} />
        <script
          nonce={nonce}
          suppressHydrationWarning
          /* eslint-disable-next-line - no-danger */
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${ENV ? JSON.stringify(ENV) : "{}"};`,
          }}
        />

        <GTM gtmTrackingId={loaderData?.gtmTrackingId} />
        <LinkedInInsight linkedinPartnerId={loaderData?.linkedinPartnerId} />
      </body>
    </html>
  );
}

export const links: Route.LinksFunction = () => {
  return [
    // Favicons
    { rel: "shortcut icon", href: "/favicon/favicon.ico" },
    { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon/favicon-96x96.png",
      sizes: "96x96",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      href: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
    { rel: "manifest", href: "/favicon/site.webmanifest" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap",
    },
  ];
};
