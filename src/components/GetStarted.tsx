import { Link } from "react-router";
import { Icon, IconName } from "~/components/Icon.tsx";
import { cn } from "~/utils/cn";
import { PublicSection } from "./PublicSection";

export function GetStarted() {
  return (
    <PublicSection
      id="get-started"
      className="bg-slate-100 bg-repeat pt-40"
      title="Project Consultancy Focus Areas"
      // subTitle="Become a registered Buyer or Vendor and begin networking"
      style={{ backgroundImage: `url(/images/hero_bg.jpg)` }}
    >
      <div className="flex flex-col items-stretch justify-between gap-12 md:flex-row ">
        <InfoCard
          accountType="Hospitality Developments"
          subtitle="Advisory services for greenfield hotel projects, conversions, and property refurbishments."
          learnMoreText="Discuss Your Hospitality Projects"
          learnMoreLink={"#contact"}
          benefits={[
            { title: "Operator Standard Compliance" },
            { title: "FF&E Sourcing" },
            { title: "Site Audits" },
            { title: "Defect Management" },
          ]}
        />
        <InfoCard
          accountType="Commercial F&B & Corporate Spaces"
          subtitle="Execution strategy for high-traffic dining venues and premium corporate interiors."
          learnMoreText="Discuss Your Commercial Projects"
          learnMoreLink={"#contact"}
          benefits={[
            { title: "Spatial Flow Optimization" },
            { title: "Vendor Management" },
            { title: "Turnkey Advisory" },
            { title: "Material Selection" },
          ]}
        />
      </div>
    </PublicSection>
  );
}

function InfoCard({
  accountType,
  learnMoreText = "Learn more",
  learnMoreLink,
  benefits,
  subtitle,
}: {
  accountType: string;
  learnMoreText?: string;
  learnMoreLink: string;
  benefits: { title: string; icon?: IconName }[];
  subtitle: string;
}) {
  return (
    <article className="flex min-w-64 max-w-96 flex-col rounded-lg bg-white text-accent-accent1 shadow-lg hover:shadow-2xl">
      <header className="px-10 py-8 flex-1">
        <Link
          to={learnMoreLink}
          tabIndex={-1}
          className="text-4xl font-medium text-accent-accent3"
        >
          {accountType}
        </Link>
      </header>

      <main className="flex-1 px-10 pb-8">
        <p className="text-sm opacity-80">{subtitle}</p>
        <ul className="text-left text-lg">
          {benefits.map(({ icon, title }) => (
            <li
              key={title}
              className={cn("relative my-2", icon ? "" : "list-disc")}
            >
              {icon ? (
                <Icon
                  name={icon}
                  className="absolute -left-6 bottom-1.5 text-[0.75em] text-accent-accent3 opacity-75"
                  aria-hidden
                />
              ) : null}
              {title}
            </li>
          ))}
        </ul>
      </main>

      <footer className="flex w-full flex-col">
        <Link
          to={learnMoreLink}
          className="flex justify-center border-t border-accent-accent2 bg-accent-accent2/10 px-6 py-4 hover:bg-accent-accent3 hover:text-white"
          aria-label={`Learn more about ${accountType}`}
        >
          {learnMoreText}
        </Link>
      </footer>
    </article>
  );
}
