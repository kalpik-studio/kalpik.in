import { useCallback, useState } from "react";
import { Link, NavLink } from "react-router";
import type { LinkTo } from "react-router/types";
import { Viewport } from "~/constants/viewport";
import { useViewportContext } from "~/contexts/viewport";
import { useSafeLayoutEffect } from "~/hooks/useSafeLayoutEffect.ts";
import { cn } from "~/utils/cn";
import { Button } from "./Button";
import { Icon, IconName } from "./Icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export type NavPanelItem = {
  label: string;
  disabled?: boolean;
} & ({ to: LinkTo; iconName: IconName } | { children: NavPanelItem[] });

export type NavPanelProps = {
  nav: NavPanelItem[];
  title: string;
  defaultCollapsed?: boolean | null;
  logoutLink?: string;
  cookieName: string;
};

export function NavPanel({
  nav,
  title,
  defaultCollapsed,
  logoutLink,
  cookieName,
}: NavPanelProps): React.JSX.Element {
  const { collapsed, toggleCollapsed } = useResizableNavPanel(
    !!defaultCollapsed,
    cookieName,
  );
  const allPrimaryLabels = nav.map((item) => item.label);

  return (
    <aside
      className={cn(
        "relative h-full min-w-14 print:hidden max-h-screen-1",
        "grid grid-rows-[max-content_1fr_max-content] gap-2",
        "transition-[width]",
        collapsed ? "w-14" : "w-screen-1 sm:w-56",
      )}
    >
      <NavHeader title={title} collapsed={collapsed} />

      <nav className={cn("paper h-full overflow-y-auto px-2 py-4")}>
        <Accordion
          type="multiple"
          defaultValue={allPrimaryLabels}
          className="flex-col-1"
        >
          {nav.map((item) => (
            <NavItem key={item.label} {...item} collapsed={collapsed} />
          ))}
        </Accordion>
      </nav>

      <NavFooter
        collapsed={collapsed}
        logoutLink={logoutLink}
        toggleCollapsed={toggleCollapsed}
      />
    </aside>
  );
}

function useResizableNavPanel(defaultCollapsed: boolean, cookieName: string) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const viewport = useViewportContext();
  const isMobile = viewport <= Viewport.SMALL_TABLET;

  useSafeLayoutEffect(() => {
    if (isMobile) {
      setCollapsed(true);
      onCollapseChange(cookieName, true);
    }
  }, [isMobile, cookieName]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((val) => {
      const newVal = !val;
      onCollapseChange(cookieName, newVal);
      return newVal;
    });
  }, [cookieName]);

  return { collapsed, toggleCollapsed } as const;
}

function onCollapseChange(name: string, collapsed: boolean) {
  // TODO: https://developer.mozilla.org/en-US/docs/Web/API/CookieStore#browser_compatibility
  // eslint-disable-next-line no-document-cookie
  document.cookie = `${name}=${JSON.stringify(collapsed)}`;
}

function NavHeader({
  title,
  collapsed,
}: {
  title: string;
  collapsed: boolean;
}) {
  return (
    <header
      className={cn(
        "paper flex-row-4 flex-middle-start",
        "min-h-14 text-xl font-bold text-accent-foreground",
        collapsed ? "px-0" : "px-4",
      )}
    >
      <Link
        to="."
        className={cn(
          "flex-row-2 w-full select-none items-end",
          collapsed ? "justify-center" : "justify-start",
        )}
        title={`InnBell ${title}`}
      >
        <Icon name={IconName.INNBELL} size={"xl"} label="InnBell" />
        <div className={cn("flex flex-col", collapsed ? "hidden" : "relative")}>
          {/* <p className="text-xs leading-none text-accent-accent3 dark:text-accent-accent2">
            BETA
          </p> */}
          <h1 className="relative text-2xl leading-none">{title}</h1>
        </div>
      </Link>
    </header>
  );
}

function NavFooter({
  logoutLink,
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  logoutLink?: string;
  toggleCollapsed: () => void;
}) {
  return (
    <footer
      className={cn(
        "paper min-h-[52px] items-center p-1",
        collapsed
          ? "flex-col-2 justify-center"
          : "grid grid-cols-[1fr_max-content] gap-2",
      )}
    >
      {logoutLink && !collapsed ? (
        <NavItem
          to={logoutLink}
          iconName={IconName.LOGOUT}
          label="Logout"
          collapsed={collapsed}
          reloadDocument
        />
      ) : null}
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={toggleCollapsed}
        title={collapsed ? "Expand menu" : "Collapse menu"}
        className="col-start-2"
      >
        <Icon
          name={collapsed ? IconName.CHEVRON_RIGHT : IconName.CHEVRON_LEFT}
        />
      </Button>
    </footer>
  );
}

function NavItem({
  collapsed,
  reloadDocument,
  ...item
}: NavPanelItem & {
  collapsed: boolean;
  reloadDocument?: boolean;
}): React.ReactNode {
  if ("children" in item) {
    return (
      <AccordionItem
        key={item.label}
        value={item.label}
        className="border-b-0 border-t"
      >
        <AccordionTrigger
          className={cn(
            "hover:no-underline px-2",
            item.disabled ? "opacity-50" : "",
          )}
          title={`Toggle panel for ${item.label}`}
        >
          <span
            className={
              collapsed
                ? "sr-only"
                : "font-semibold leading-none tracking-tight"
            }
          >
            {item.label}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="flex-col-1">
            {item.children.map((subItem) => (
              <li key={subItem.label}>
                <NavItem
                  disabled={item.disabled}
                  {...subItem}
                  collapsed={collapsed}
                />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    );
  }

  const { to, label, iconName, disabled } = item;
  if (disabled) {
    return (
      <div
        className={cn(
          "block w-full rounded-sm p-2 opacity-50",
          "grid items-center gap-2 border border-transparent cursor-not-allowed",
          collapsed ? "justify-center" : "grid-cols-[1.5rem_1fr] justify-start",
        )}
      >
        <Icon name={iconName} />
        <span
          hidden={collapsed}
          className="truncate whitespace-nowrap text-base"
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      title={label}
      reloadDocument={reloadDocument}
      className={({ isActive }) =>
        cn(
          "block w-full rounded-sm p-2 hover:bg-secondary",
          "grid items-center gap-2 border border-transparent",
          collapsed ? "justify-center" : "grid-cols-[1.5rem_1fr] justify-start",
          isActive &&
            "font-bold border-border bg-accent text-accent-foreground",
        )
      }
    >
      <Icon name={iconName} />
      <span hidden={collapsed} className="truncate whitespace-nowrap text-base">
        {label}
      </span>
    </NavLink>
  );
}
