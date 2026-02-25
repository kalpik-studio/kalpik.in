import * as React from "react";
import { cn } from "@innbell/utils/cn";
import { Icon, IconName } from "../Icon";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn(
      "flex h-max min-h-16 flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm @container",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardCollapsible = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    summary: React.ReactNode;
    open?: boolean;
    description?: React.ReactNode;
    footer?: React.ReactNode;
  }
>(
  (
    { className, children, summary, open, description, footer, ...props },
    ref,
  ) => (
    <Card ref={ref} {...props}>
      <details open={open} className="group">
        <summary className="marker:hidden marker:content-['']">
          <CardHeader>
            <CardTitle className="flex-row-2 flex-middle-start">
              <Icon
                name={IconName.CHEVRON_RIGHT}
                className="group-open:rotate-90"
              />
              {summary}
            </CardTitle>
            {description ? (
              <CardDescription>{description}</CardDescription>
            ) : null}
          </CardHeader>
        </summary>
        <CardContent className={className}>{children}</CardContent>
      </details>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  ),
);
CardCollapsible.displayName = "CardCollapsible";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn("overflow-y-auto p-6 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <footer
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardCollapsible,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
