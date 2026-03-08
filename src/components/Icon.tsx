import { forwardRef } from "react";
import { IconName, spriteFilename } from "~/icons/icons";
import { cn, cva, type VariantProps } from "~/utils/cn";

export { IconName };

export type IconProps = React.ComponentProps<"svg"> &
  VariantProps<typeof iconVariants> & {
    name: IconName;
    label?: string;
  };

const iconVariants = cva("", {
  variants: {
    size: {
      default: "h-[1.25em] w-[1.25em]",
      sm: "h-[1em] w-[1em]",
      lg: "h-[1.5em] w-[1.5em]",
      xl: "h-[2em] w-[2em]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, className, size, label, ...props },
  ref,
) {
  const icon = (
    <svg
      ref={ref}
      className={cn(iconVariants({ size }), className)}
      {...props}
      aria-hidden
    >
      <use xlinkHref={`/${spriteFilename}#${name}`} />
    </svg>
  );

  if (!label) return icon;

  return (
    <div className="inline-block">
      {icon}
      <span className="sr-only">{label}</span>
    </div>
  );
});
