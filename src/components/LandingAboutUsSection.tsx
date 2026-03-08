import { ButtonLink } from "~/components/Button.tsx";
import { Icon, IconName } from "~/components/Icon.tsx";
import { WwwRoute } from "~/routes-manifest";
import { PublicSection } from "./PublicSection";

const learnMoreAboutUs = [
  "For over two decades, I operated as a principal interior contractor within the Indian hospitality sector, executing complex design briefs for leading 5-star hotel groups. Today, I leverage that hands-on operational background to provide independent project advisory services. My focus is on ensuring design intent translates into functional reality, managing FF&E procurement, and aligning site execution with stringent operator brand standards from schematic design through to final handover.",
];

export function LandingAboutUsSection() {
  return (
    <PublicSection
      title="About us"
      subTitle="25 Years of Industry Execution"
      className="bg-gradient-to-b from-slate-200 to-transparent"
      footer={
        <ButtonLink to={WwwRoute.ABOUT}>
          <Icon name={IconName.INFO} />
          Learn more about us
        </ButtonLink>
      }
    >
      {learnMoreAboutUs.map((p) => (
        <p
          key={p}
          className="text:lg my-4 text-balance md:text-xl text-center max-w-2xl"
        >
          {p}
        </p>
      ))}
    </PublicSection>
  );
}
