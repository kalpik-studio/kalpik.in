import { m } from "framer-motion";
import { Link } from "react-router";
import { ButtonLink } from "~/components/Button.tsx";
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
        <Link
          to="/"
          className="h-20 overflow-hidden block absolute left-1/2 -translate-x-1/2 -top-40"
        >
          <img
            src="/images/MarketingLogo.png"
            alt="InnBell"
            className="w-full h-full object-fit"
          />
        </Link>
        <strong className="block text-xl font-extrabold tracking-wide md:text-3xl">
          Kalpik
        </strong>
        <h1 className="text-balance text-5xl font-medium tracking-tight md:text-7xl">
          Hospitality Consulting & Project Advisory
        </h1>
        <p className="text:lg my-4 text-balance md:text-xl">
          {`25 years of specialized experience in interior contracting, procurement, and turnkey execution for international hotel brands, commercial F&B, and corporate environments.`}
        </p>
        <div className="flex gap-4">
          <ButtonLink
            to="#main-content"
            className="w-max"
            variant={"secondary"}
          >
            View Expertise
          </ButtonLink>
          <ButtonLink to="#get-started" className="w-max">
            Get in Touch
          </ButtonLink>
        </div>
      </m.div>
    </LampContainer>
  );
}
