import "./tailwind.css";

import { domAnimation, LazyMotion } from "framer-motion";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import env, { clientEnv } from "@innbell/constants/env";
import { useNonceContext } from "@innbell/contexts/nonce";
import { ViewportProvider } from "@innbell/contexts/viewport";
import { CSPMetaTag } from "@innbell/misc/csp";
import { commitCsrfToken } from "@innbell/misc/csrf";
import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@innbell/router";
import { cn } from "@innbell/utils/cn";
import { checkIsMobileDeviceByRequest } from "@innbell/utils/user-agent";
import type { Route } from "./+types/root";
import { GTM } from "./components/GTM";
import { LinkedInInsight } from "./components/LinkedInInsight";
import { PublicFooter } from "./components/PublicFooter";
import { PublicHeader } from "./components/PublicHeader";

export { ErrorBoundary } from "@innbell/root";

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
      ? "GTM-NGZJNWB7"
      : undefined;
  const linkedinPartnerId =
    env.NODE_ENV === "production" &&
    new URL(request.url).host.includes("kalpik.in")
      ? "6842668"
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
  const { banner, csrfToken, isMobile } = loaderData;

  return (
    <AuthenticityTokenProvider token={csrfToken}>
      <ViewportProvider isMobile={isMobile}>
        <LazyMotion features={domAnimation} strict>
          <PublicHeader banner={banner} />
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
    name: "Innbell",
    url: "https://innbell.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InnBell",
    url: "https://innbell.com/",
    logo: "https://innbell.com/images/MarketingLogo.png",
    sameAs: [
      "https://linkedin.com/company/innbell",
      "https://www.facebook.com/people/InnBell/61556671424730/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "InnBell",
    image: "https://innbell.com/images/MarketingLogo.png",
    "@id": "",
    url: "https://innbell.com/",
    telephone: "1145672128",
    address: {
      "@type": "PostalAddress",
      streetAddress: "314 Ansal Majestic Tower, Vikaspuri",
      addressLocality: "Delhi",
      postalCode: "110018",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday", "Monday", "Tuesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [
      "https://linkedin.com/company/innbell",
      "https://www.facebook.com/people/InnBell/61556671424730/",
    ],
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
        <meta name="application-name" content="InnBell" />
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
        <meta name="short-name" content="InnBell" />
        <CSPMetaTag />

        <Meta />
        <Links />

        <title>InnBell</title>
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
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "icon", type: "image/svg+xml", href: "/favicons/favicon.svg" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "mask-icon",
      href: "/favicons/safari-pinned-tab.svg",
      color: "#7e2a00",
    },
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
