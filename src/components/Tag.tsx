import { Link } from "react-router";
import { cn, cva, type VariantProps } from "~/utils/cn";
import type { LinkTo } from "~/utils/remix";

const tagVariants = cva("h-max w-max border flex items-center gap-2", {
  variants: {
    variant: {
      default: "",
      info: "text-info-foreground bg-info border-info-border",
      error: "text-error-foreground bg-error border-error-border",
      success: "text-success-foreground bg-success border-success-border",
      accent: "text-accent-accent1 bg-accent-accent2 border-accent-accent3",
      deprecated: "opacity-50",
    },
    disabled: {
      true: "select-none",
      false: "cursor-pointer select-text",
    },
    shape: {
      default: "px-2 rounded",
      chip: "rounded-full px-4 py-1",
    },
  },
  defaultVariants: {
    variant: "default",
    disabled: true,
    shape: "default",
  },
  compoundVariants: [
    {
      variant: "default",
      disabled: false,
      className: "hover:bg-muted hover:border-muted-foreground",
    },
    { variant: "info", disabled: false, className: "hover:bg-info-border" },
    { variant: "error", disabled: false, className: "hover:bg-error-border" },
    {
      variant: "success",
      disabled: false,
      className: "hover:bg-success-border",
    },
    {
      variant: "accent",
      disabled: false,
      className: "hover:brightness-[0.8]",
    },
  ],
});

export type TagShape = VariantProps<typeof tagVariants>["shape"];
export type TagVariant = VariantProps<typeof tagVariants>["variant"];
export type TagProps = {
  children: React.ReactNode;
  to?: LinkTo;
  variant?: TagVariant;
  className?: string;
  title?: string;
  shape?: TagShape;
};

export function Tag({
  children,
  to,
  variant,
  className,
  title,
  shape,
}: TagProps) {
  if (!to || variant === "deprecated") {
    return (
      <span
        className={tagVariants({ variant, shape, disabled: true, className })}
        title={title}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      className={tagVariants({ variant, shape, disabled: false, className })}
      to={to}
      onClick={(e) => {
        e.stopPropagation();
      }}
      title={title}
    >
      {children}
    </Link>
  );
}

export function TagGroup({
  tags = [],
  limit = 3,
  className,
  variant,
  shape,
  children,
}: {
  tags: TagProps[] | string[] | undefined;
  limit?: number;
  className?: string;
  variant?: TagVariant;
  shape?: TagShape;
  children?: React.ReactNode;
}): JSX.Element | null {
  if (!tags?.length) return null;

  const renderedTags = limit ? tags.slice(0, limit) : tags;
  const overflow = limit && tags.length > limit;

  const group = (
    <ul className={cn("flex flex-wrap items-center gap-1", className)}>
      {renderedTags.map((tag, i) => (
        <li key={i}>
          {typeof tag === "string" ? (
            <Tag variant={variant} shape={shape}>
              {tag.trim()}
            </Tag>
          ) : (
            <Tag variant={variant} shape={shape} {...tag} />
          )}
        </li>
      ))}
      {children}
    </ul>
  );

  if (!overflow) return group;

  return (
    <div className={cn("flex items-end gap-1", className)}>
      {group}
      {overflow && <span>...</span>}
    </div>
  );
}
