import { Icon, type IconName } from "@innbell/components/Icon.tsx";
import { Link } from "@innbell/router";
import type { LinkTo } from "@innbell/router/types";
import { cn } from "@innbell/utils/cn";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3 list-none",
        className,
      )}
    >
      {children}
    </ul>
  );
};

export type BentoGridItemProps = {
  className?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: IconName;
  children?: React.ReactNode;
  index?: number;
  to?: LinkTo;
  style?: React.CSSProperties;
};

export const BentoGridItem = ({
  className,
  title,
  description,
  children,
  icon,
  index,
  to,
  style,
}: BentoGridItemProps) => {
  const Container = to ? Link : "li";

  return (
    <Container
      to={to!}
      style={style}
      className={cn(
        "group/bento relative row-span-1 flex min-h-56 flex-col justify-between overflow-hidden rounded-xl border border-transparent bg-slate-900 p-4 shadow-input transition duration-200 hover:shadow-xl",
        className,
      )}
    >
      <div className="flex">
        {icon ? (
          <Icon
            name={icon}
            className="absolute right-4 top-4 text-[6em] text-white opacity-10 md:text-[7em] md:opacity-20"
          />
        ) : (
          (children ?? (
            <span className="self-end font-mono text-[2em] text-neutral-200">
              {index}.
            </span>
          ))
        )}
      </div>

      <div className="relative z-[1] transition duration-200 group-hover/bento:translate-x-2">
        <div className="mb-2 mt-2 font-sans text-2xl font-bold text-accent-accent2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-300">
          {description}
        </div>
      </div>
    </Container>
  );
};
