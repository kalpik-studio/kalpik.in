import { useState } from "react";
import { Link, type LinkProps } from "react-router";
import { Viewport } from "~/constants/viewport";
import { useViewportContext } from "~/contexts/viewport-context";
import { useScrollToTopButtonArea } from "~/hooks/useScrollToTopButtonArea.tsx";
import { cn, cva, type VariantProps } from "~/utils/cn";
import type { LinkTo } from "~/utils/remix";
import { Button, ButtonLink } from "./Button";
import { Icon, IconName } from "./Icon";
import { CardDescription, CardTitle } from "./ui/card";

export type MainViewProps = VariantProps<typeof mainViewVariants> & {
  title: React.ReactNode;
  caption?: string;
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  footer?: React.ReactNode;
  headerSuffix?: React.ReactNode;
  aside?: React.ReactNode;
  backLink?: boolean | LinkProps["to"];
  defaultFiltersExpanded?: boolean;
  iconName?: IconName;
};

const mainViewVariants = cva("flex-1", {
  variants: {
    layout: {
      default: "paper overflow-hidden",
      overflow: "paper overflow-auto",
      tabular: "paper-0 overflow-auto",
      dashboard: "paper-4 overflow-y-auto h-full flex-col-8",
      bare: "",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

export function MainView({
  title,
  actions,
  children,
  className,
  footer,
  headerSuffix,
  backLink,
  caption,
  filters,
  aside,
  defaultFiltersExpanded,
  layout,
  mainClassName: mainCN,
  iconName,
}: MainViewProps): React.ReactNode {
  const { contentRef, buttonAreaElement } = useScrollToTopButtonArea();

  const headerElement = title ? (
    <MainHeader
      actions={actions}
      filters={filters}
      title={title}
      backLink={backLink}
      caption={caption}
      suffix={headerSuffix}
      defaultFiltersExpanded={defaultFiltersExpanded}
      iconName={iconName}
    />
  ) : null;

  const footerElement = footer ? (
    <footer
      className={cn(
        "paper flex-row-2 flex-middle-between min-h-[52px] px-4 py-1",
      )}
    >
      {footer}
    </footer>
  ) : null;

  const mainClassName = cn(
    "MainView print",
    "flex-col-2 relative max-h-screen-1 overflow-hidden @container",
    mainCN,
  );

  const mainContentElement = (
    <div className={mainViewVariants({ layout, className })} ref={contentRef}>
      {children}
    </div>
  );

  if (aside) {
    return (
      <div className="flex-row-2 max-h-screen-1 overflow-hidden">
        <main className={cn(mainClassName, "h-full flex-1")}>
          {buttonAreaElement}
          {headerElement}
          {mainContentElement}
          {footerElement}
        </main>
        {aside}
      </div>
    );
  }

  return (
    <main className={mainClassName}>
      {buttonAreaElement}
      {headerElement}
      {mainContentElement}
      {footerElement}
    </main>
  );
}

function MainHeader({
  actions,
  filters,
  defaultFiltersExpanded,
  ...rest
}: {
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  defaultFiltersExpanded?: boolean;
} & MainHeaderTitleProps) {
  const viewport = useViewportContext();
  const isMobile = viewport <= Viewport.MOBILE;
  const [filtersExpanded, setFiltersExpanded] = useState(
    defaultFiltersExpanded ?? !isMobile,
  );

  return (
    <>
      <header
        className={cn(
          "relative print paper min-h-14 py-2 px-4",
          "flex flex-wrap flex-middle-between gap-x-4 gap-y-2",
        )}
      >
        <MainHeaderTitle {...rest} />

        <div className="flex flex-wrap flex-middle-end gap-2 print:hidden">
          {actions}

          {filters ? (
            <Button
              variant="secondary"
              size={"icon"}
              onClick={() => setFiltersExpanded((val) => !val)}
              title={filtersExpanded ? "Hide filters" : "Show filters"}
            >
              <Icon
                name={filtersExpanded ? IconName.FILTER_X : IconName.FILTER}
              />
            </Button>
          ) : null}
        </div>
      </header>

      {filters && filtersExpanded ? (
        <div
          className={cn(
            "relative paper flex flex-wrap flex-middle-between gap-x-4 gap-y-2 print:hidden",
          )}
        >
          {filters}
        </div>
      ) : null}
    </>
  );
}

type MainHeaderTitleProps = {
  title: React.ReactNode;
  caption?: string;
  suffix?: React.ReactNode;
  backLink?: boolean | LinkProps["to"];
  iconName?: IconName;
};

function MainHeaderTitle({
  backLink,
  caption,
  title,
  suffix,
  iconName,
}: MainHeaderTitleProps) {
  const link: LinkTo | undefined = backLink
    ? typeof backLink === "boolean"
      ? ".."
      : backLink
    : iconName
      ? "."
      : undefined;

  return (
    <div className="flex flex-middle-start gap-4 text-xl font-medium min-h-10 items-start">
      {link ? (
        <ButtonLink
          to={link}
          variant="ghost"
          title={backLink ? "Go back" : "Refresh"}
          size={"icon"}
        >
          <Icon name={backLink ? IconName.CHEVRON_LEFT : iconName!} />
        </ButtonLink>
      ) : null}

      <div className="flex flex-col justify-center">
        {caption ? (
          <CardDescription className="font-bold uppercase">
            {caption}
          </CardDescription>
        ) : null}
        <CardTitle className="truncate">
          <Link to=".">{title}</Link>
        </CardTitle>
      </div>

      {suffix ? <div className="flex items-center gap-2">{suffix}</div> : null}
    </div>
  );
}
