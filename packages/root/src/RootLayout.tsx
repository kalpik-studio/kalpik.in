import { useNonceContext } from "@innbell/contexts/nonce";
import { CSPMetaTag } from "@innbell/misc/csp";
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@innbell/router";
import {
  useLoaderToastEffect,
  useNavigationToastEffect,
  useOfflineToastEffect,
} from "@innbell/toasts/hooks";
import { Toaster } from "@innbell/toasts/toaster";
import { cn } from "@innbell/utils/cn";
import type { RootBaseLoaderData } from "./root-types";

export type RootLayoutProps = {
  children: React.ReactNode;
  themeColorDark?: string;
  themeColorLight?: string;
};

export function RootLayout({
  children,
  themeColorDark = "#000000",
  themeColorLight = "#ffffff",
}: RootLayoutProps) {
  const loaderData = useRouteLoaderData<unknown>("root") as
    | RootBaseLoaderData
    | undefined;
  const nonce = useNonceContext();

  useLoaderToastEffect(loaderData?.toasts);
  useNavigationToastEffect();
  useOfflineToastEffect();

  const viewportContent = loaderData?.pwa
    ? "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
    : "width=device-width, initial-scale=1, viewport-fit=cover";
  const preconnectLink = loaderData?.preconnectLink;
  const env = loaderData?.env;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="application-name" content="InnBell Admin" />
        <meta name="viewport" content={viewportContent} />
        <meta
          name="theme-color"
          content={themeColorLight}
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content={themeColorDark}
          media="(prefers-color-scheme: dark)"
        />
        <CSPMetaTag />
        {preconnectLink ? (
          <link rel="preconnect" href={preconnectLink} />
        ) : null}
        <Meta />
        <Links />
      </head>
      <body
        className={cn(
          "min-h-dvh scroll-smooth font-inter",
          "h-full overflow-hidden bg-background text-foreground",
        )}
      >
        {/* children will be the root App Component, ErrorBoundary, or HydrateFallback */}
        {children}
        <Scripts nonce={nonce} />
        <ScrollRestoration nonce={nonce} />
        <script
          /* eslint-disable-next-line - no-danger */
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${env ? JSON.stringify(env) : "{}"};`,
          }}
          nonce={nonce}
          suppressHydrationWarning
        />
        <Toaster />
      </body>
    </html>
  );
}
