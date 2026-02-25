import * as React from "react";
import { Link, useLocation } from "@innbell/router";
import { cn } from "@innbell/utils/cn";
import { Icon, IconName } from "../Icon";
import { buttonVariants, type ButtonUIProps } from "./button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonUIProps, "size"> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  size = "icon",
  isActive,
  disabled,
  to,
  ...props
}: PaginationLinkProps) => {
  const location = useLocation();
  return (
    <PaginationItem className={disabled ? "opacity-50" : ""}>
      <Link
        to={disabled ? location : to}
        aria-disabled={disabled}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          buttonVariants({
            variant: isActive ? "secondary" : "ghost",
            size,
            className,
          }),
          isActive ? "font-bold" : "",
          disabled ? "cursor-not-allowed" : "",
        )}
        {...props}
      >
        {props.children}
      </Link>
    </PaginationItem>
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    size="icon"
    className={className}
    {...props}
    title="Go to first page"
  >
    <Icon name={IconName.CHEVRONS_LEFT} />
  </PaginationLink>
);
PaginationFirst.displayName = "PaginationFirst";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="icon"
    className={className}
    {...props}
    title="Go to previous page"
  >
    <Icon name={IconName.CHEVRON_LEFT} />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to last page"
    size="icon"
    className={className}
    {...props}
    title="Go to last page"
  >
    <Icon name={IconName.CHEVRONS_LEFT} className="rotate-180" />
  </PaginationLink>
);
PaginationLast.displayName = "PaginationLast";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="icon"
    className={className}
    {...props}
    title="Go to next page"
  >
    <Icon name={IconName.CHEVRON_RIGHT} />
  </PaginationLink>
);

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-9 w-9 items-center justify-center opacity-50",
      className,
    )}
    {...props}
  >
    <Icon name={IconName.ELLIPSIS} />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  PaginationNext,
  PaginationEllipsis,
};
