import { GeminiEffect } from "./ui/gemini-effect";

export function MissionHero() {
  return (
    <div className="relative h-[90vh] w-full overflow-clip bg-slate-950">
      <GeminiEffect
        title={
          <>
            <strong className="block py-4 text-xl font-extrabold uppercase tracking-wide text-accent-accent2 md:text-3xl">
              Our Mission
            </strong>
            <h1>
              Connecting the Suppliers and Manufacturers to the world of
              Hospitality Players
            </h1>
          </>
        }
      />
    </div>
  );
}
