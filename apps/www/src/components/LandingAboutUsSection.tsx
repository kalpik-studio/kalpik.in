import { ButtonLink } from "@innbell/components/Button.tsx";
import { Icon, IconName } from "@innbell/components/Icon.tsx";
import { WwwRoute } from "@innbell/router/routes";
import { PublicSection } from "./PublicSection";

const learnMoreAboutUs = [
  "At InnBell, we are revolutionizing the hospitality industry by bridging the gap between businesses and top-tier service providers. Our platform is engineered to meet the unique demands of both small enterprises and large corporations, ensuring seamless access to the best products and services in hospitality. Whether you're sourcing for a boutique hotel or managing operations for a multi-location restaurant chain, InnBell guarantees that the procurement process is streamlined, efficient, and backed by quality assurance.",
];

export function LandingAboutUsSection() {
  return (
    <PublicSection
      title="About us"
      subTitle="Simplifying Hospitality Industry"
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
