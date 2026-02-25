import { cn } from "@innbell/utils/cn";

export function InfoBox({
  label,
  children,
  className,
  labelClassName,
  valueClassName,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}) {
  return (
    <dl className={className}>
      <dt
        className={cn(
          "text-sm font-bold uppercase text-muted-foreground",
          labelClassName,
        )}
      >
        {label}
      </dt>
      <dd className={cn("text-foreground", valueClassName)}>{children}</dd>
    </dl>
  );
}
