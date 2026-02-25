import { m } from "framer-motion";
import { ButtonLink } from "@innbell/components/Button.tsx";
import { LampContainer } from "./ui/lamp";

export function LandingHero() {
  return (
    <LampContainer>
      <m.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex max-w-2xl flex-col items-center gap-2 bg-gradient-to-br from-white to-slate-500 bg-clip-text py-4 text-center text-transparent"
      >
        <strong className="block text-xl font-extrabold tracking-wide md:text-3xl">
          InnBell
        </strong>
        <h1 className="text-balance text-5xl font-medium tracking-tight md:text-7xl">
          {/* {`Connoisseur for all hospitality needs`} */}
          {`Your One-Stop B2B Platform for Hospitality Services`}
        </h1>
        <p className="text:lg my-4 text-balance md:text-xl">
          {`India's First B2B Marketplace for the Hospitality Industry to connect with the right suppliers for all your hotel and restaurant needs.`}
        </p>
        <div className="flex gap-4">
          <ButtonLink
            to="#main-content"
            className="w-max"
            variant={"secondary"}
          >
            Discover more
          </ButtonLink>
          <ButtonLink to="#get-started" className="w-max">
            Get started
          </ButtonLink>
        </div>
      </m.div>
    </LampContainer>
  );
}
