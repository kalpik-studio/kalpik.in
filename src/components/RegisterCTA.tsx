import { cn } from "~/utils/cn";
import { MovingBorderButton } from "./ui/moving-border";

export function RegisterCTA({
  children = "Register with InnBell",
}: {
  registerLinkType?: string;
  children?: React.ReactNode;
}) {
  const href = `#`;

  return (
    <section className="relative h-40 bg-accent-accent1">
      <MovingBorderButton
        as="a"
        href={href}
        containerClassName={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "text-white w-auto hover:bg-accent-accent2",
        )}
        className={"whitespace-nowrap px-8"}
      >
        {children}
      </MovingBorderButton>
    </section>
  );
}
