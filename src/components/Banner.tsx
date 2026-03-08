import { m } from "framer-motion";
import { cva, type VariantProps } from "~/utils/cn";

export type BannerProps = {
  children: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const bannerVariants = cva(
  "flex items-center justify-between border-b px-2 py-1",
  {
    variants: {
      theme: {
        default: "bg-accent text-accent-foreground border-accent",
        www: "bg-black/80 text-accent-accent2 border-black absolute left-0 right-0 top-0 h-10",
      },
    },
    defaultVariants: {
      theme: "default",
    },
  },
);

export function Banner({
  children,
  className,
  prefix,
  suffix,
  theme,
  style,
}: BannerProps & VariantProps<typeof bannerVariants>): React.ReactNode {
  return (
    <m.div
      layout
      role="banner"
      transition={{ duration: 0.3 }}
      className={bannerVariants({ className, theme })}
      style={style}
    >
      {prefix}

      <div className="flex-1 text-center opacity-90 inline-block">
        {children}
      </div>

      {suffix}
    </m.div>
  );
}
