import { m, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Banner } from "@innbell/components/Banner.tsx";
import { Button } from "@innbell/components/Button.tsx";
import { Icon, IconName } from "@innbell/components/Icon.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@innbell/components/ui/dropdown-menu.tsx";
import { Viewport } from "@innbell/constants/viewport";
import { useViewportContext } from "@innbell/contexts/viewport";
import { useWindowInnerHeight } from "@innbell/hooks/window-resize.ts";
import { Link, NavLink } from "@innbell/router";
import type { LinkTo } from "@innbell/router/types";
import { cn } from "@innbell/utils/cn";

const navLinks: {
  label: string;
  to: LinkTo;
}[] = [];

export type PublicHeaderProps = {
  banner?: string;
};

export function PublicHeader({ banner }: PublicHeaderProps) {
  return (
    <header
      // style={{ background }}
      className={cn(
        "relative left-0 right-0 top-0 z-10 backdrop-blur-md bg-black",
        "flex items-center justify-between py-2 font-sans text-white backdrop-blur-md px-8",
      )}
    >
      {banner ? <Banner theme={"www"}>{banner}</Banner> : null}

      <Link to="/" className="lg:h-18 h-16">
        <img src="/images/MarketingLogo.png" alt="InnBell" className="h-full" />
      </Link>
    </header>
  );
}

function NavigationMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        title="Menu"
        aria-label={isOpen ? "Open navigation menu" : "Close navigation menu"}
        asChild
      >
        <Button size={"icon"} variant={"outline"} className="text-foreground">
          <Icon name={isOpen ? IconName.CROSS : IconName.MENU} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navLinks.map(({ label, to }) => (
          <DropdownMenuItem key={label + to.toString()}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  isActive && !to.toString().startsWith("#") ? "font-bold" : "",
                )
              }
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavigationDesktop() {
  return (
    <ul className="flex flex-row items-center gap-4">
      {navLinks.map(({ label, to }) => (
        <li key={label + to.toString()}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              cn(
                "px-2 font-medium hover:underline",
                isActive && !to.toString().startsWith("#")
                  ? "font-bold text-accent-accent2"
                  : "",
              )
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
