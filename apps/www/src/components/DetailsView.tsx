import { Link } from "react-router";
import type { LinkTo } from "react-router/types";
import { useScrollToTopButtonArea } from "~/hooks/useScrollToTopButtonArea.tsx";
import { cn } from "~/utils/cn";
import { CloseButton } from "./Button";

export type DetailsViewProps = {
  className?: string;
  caption?: string;
  title: React.ReactNode;
  previewImageUrl?: string;
  actions?: React.ReactNode[];
  closeLink?: LinkTo;
  children: React.ReactNode;
  footer?: React.ReactNode;
  mainClassName?: string;
  overrideMain?: boolean;
  autoFocus?: boolean;
};

export function DetailsView({
  className,
  caption,
  title,
  previewImageUrl,
  actions,
  closeLink,
  children,
  footer,
  mainClassName,
  overrideMain,
  autoFocus,
}: DetailsViewProps) {
  const { contentRef, buttonAreaElement } = useScrollToTopButtonArea();

  return (
    <aside
      className={cn(
        "paper-0 print flex flex-col @container absolute inset-0 z-[1] md:relative md:w-2/3 lg:w-1/2 2xl:w-1/3 rounded",
        className,
      )}
    >
      {buttonAreaElement}

      <header
        className={cn(
          "flex-row-2 flex-middle-between flex-wrap bg-background",
          "border-b py-1 pl-4 pr-2 text-secondary-foreground",
        )}
      >
        <div className="flex-row-4 flex-middle-start flex-1">
          {previewImageUrl ? (
            <img
              src={previewImageUrl}
              alt="logo"
              className="h-12 w-12 object-contain"
            />
          ) : null}
          <div>
            {caption ? (
              <p className="text-sm font-medium uppercase text-muted-foreground">
                {caption}
              </p>
            ) : null}
            <h3 className="text-xl text-primary">
              <Link to="." autoFocus={autoFocus}>
                {title}
              </Link>
            </h3>
          </div>
        </div>

        {actions ? (
          <div className="flex-row-2 flex-middle-start">{actions}</div>
        ) : null}

        <CloseButton to={closeLink} />
      </header>

      {overrideMain ? (
        children
      ) : (
        <main
          className={cn(
            "flex-col-4 h-full flex-1 overflow-y-auto p-4 print:overflow-visible",
            mainClassName,
          )}
          ref={contentRef}
        >
          {children}
        </main>
      )}

      {footer ? (
        <footer className="paper flex-row-2 flex-middle-between">
          {footer}
        </footer>
      ) : null}
    </aside>
  );
}
