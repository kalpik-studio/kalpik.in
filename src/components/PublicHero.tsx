import { cn } from "~/utils/cn";

export function PublicHero({
  children,
  title,
  className,
  style,
  id,
}: {
  id?: string;
  children?: React.ReactNode;
  preChildren?: React.ReactNode;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative h-[50vh] min-h-[400px] bg-slate-950 px-8 text-center text-white md:px-40",
        className,
      )}
      style={style}
    >
      {style?.backgroundImage ? (
        <div className="absolute inset-0 bg-black opacity-70" />
      ) : null}
      <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">{title}</h1>
        {children}
      </div>
    </section>
  );
}
