import { createContext, useContext } from "react";
import { Breakpoint, Viewport } from "@innbell/constants/viewport";
import { useWindowInnerWidth } from "@innbell/hooks/window-resize.ts";

const viewportContext = createContext<Viewport | undefined>(undefined);

export function useViewportContext(): Viewport {
  const value = useContext(viewportContext);
  if (value === undefined)
    throw new Error(
      "useViewportContext must be used within a ViewportProvider",
    );

  return value;
}

export function ViewportProvider({
  children,
  isMobile,
}: {
  children: React.ReactNode;
  isMobile?: boolean;
}) {
  const windowWidth = useWindowInnerWidth(isMobile ? 500 : 1000);
  const viewport = calcViewportFromWidth(windowWidth);

  return (
    <viewportContext.Provider value={viewport}>
      {children}
    </viewportContext.Provider>
  );
}

function calcViewportFromWidth(windowWidth: number): Viewport {
  if (windowWidth < Breakpoint.xxs) return Viewport.SMALL_MOBILE;
  if (windowWidth < Breakpoint.xs) return Viewport.MOBILE;
  if (windowWidth < Breakpoint.sm) return Viewport.SMALL_TABLET;
  if (windowWidth < Breakpoint.md) return Viewport.LARGE_TABLET;
  if (windowWidth < Breakpoint.lg) return Viewport.DESKTOP;
  if (windowWidth < Breakpoint.xl) return Viewport.LARGE_DESKTOP;
  return Viewport.TV;
}
