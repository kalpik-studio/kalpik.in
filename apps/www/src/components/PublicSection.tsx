import { cn } from "~/utils/cn";

export type PublicSectionProps = {
  id?: string;
  className?: string;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
};

export function PublicSection({
  id,
  className,
  title,
  subTitle,
  children,
  style,
  footer,
}: PublicSectionProps) {
  return (
    <section
      id={id}
      style={style}
      className={cn("flex flex-col items-center gap-10 py-20 px-8", className)}
    >
      <header className="flex max-w-4xl flex-col gap-4 text-center">
        <h2 className="text-accent-accent1 text-balance text-5xl font-medium">
          {title}
        </h2>
        {subTitle ? (
          <p className="text-accent-accent3 text-balance text-lg font-medium">
            {subTitle}
          </p>
        ) : null}
      </header>

      <main className="mx-auto max-w-[1024px]">{children}</main>

      {footer ? <footer>{footer}</footer> : null}
    </section>
  );
}
