import { domAnimation, LazyMotion } from "framer-motion";
import { Outlet, useLoaderData } from "react-router";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { ViewportProvider } from "~/contexts/viewport";
import type { RootBaseLoaderData } from "~/root";
import { TurnstileProvider } from "~/turnstile/context";
import { cn } from "~/utils/cn";
import { NavPanel, type NavPanelItem } from "./NavPanel";

export type LayoutProps = {
  nav: NavPanelItem[];
  title: string;
  logoutLink?: string;
  children?: React.ReactNode;
  cookieName: string;
  className?: string;
};

export function Layout({
  children = <Outlet />,
  className,
  ...props
}: LayoutProps): JSX.Element {
  const { csrfToken, turnstileSiteKey, isMobile, defaultCollapsed } =
    useLoaderData<RootBaseLoaderData>();

  const isNavPanelVisible = props.nav.length > 0;

  return (
    <AuthenticityTokenProvider token={csrfToken}>
      <TurnstileProvider siteKey={turnstileSiteKey}>
        <ViewportProvider isMobile={isMobile}>
          <LazyMotion features={domAnimation} strict>
            <div
              className={cn(
                "grid max-h-screen w-screen gap-2 overflow-hidden p-2 h-screen",
                "print touch-none bg-center bg-cover bg-no-repeat text-foreground relative",
                isNavPanelVisible ? "grid-cols-[max-content_1fr]" : "",

                className,
              )}
              style={{ height: "100dvh" }}
            >
              {isNavPanelVisible ? (
                <NavPanel {...props} defaultCollapsed={defaultCollapsed} />
              ) : null}

              {children}
            </div>
          </LazyMotion>
        </ViewportProvider>
      </TurnstileProvider>
    </AuthenticityTokenProvider>
  );
}
