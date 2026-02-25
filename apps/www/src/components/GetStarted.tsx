import { Icon, IconName } from "@innbell/components/Icon.tsx";
import { Link } from "@innbell/router";
import { genAppRoute, WwwRoute } from "@innbell/router/routes";
import { cn } from "@innbell/utils/cn";
import { PublicSection } from "./PublicSection";

export function GetStarted() {
  return (
    <PublicSection
      id="get-started"
      className="bg-slate-100 bg-repeat pt-40"
      title="Get started with InnBell"
      subTitle="Become a registered Buyer or Vendor and begin networking"
      style={{ backgroundImage: `url(/images/hero_bg.jpg)` }}
    >
      <div className="flex flex-col items-stretch justify-between gap-12 md:flex-row ">
        <InfoCard
          accountType="Buyer"
          learnMoreLink={WwwRoute.BUYER}
          registerLink={`${genAppRoute((Route) => Route.REGISTER_ACCOUNT)}?type=buyer`}
          benefits={[
            { title: "Simplified Supplier Discovery", icon: IconName.SEARCH },
            { title: "Time-Efficient Sourcing", icon: IconName.CLOCK_5 },
            { title: "Quality Assurance", icon: IconName.STAR },
            { title: "Budget Optimization", icon: IconName.COINS },
            { title: "Seamless Procurement", icon: IconName.WAVES },
          ]}
        />
        <InfoCard
          accountType="Vendor"
          learnMoreLink={WwwRoute.VENDOR}
          registerLink={`${genAppRoute((Route) => Route.REGISTER_ACCOUNT)}?type=vendor`}
          benefits={[
            { title: "Reach a Wider Audience", icon: IconName.USERS },
            {
              title: "Increase Sales Opportunities",
              icon: IconName.COINS,
            },
            { title: "Enhanced Visibility", icon: IconName.EYE },
            { title: "Reliable Partnerships", icon: IconName.HANDSHAKE },
            { title: "Marketing Support", icon: IconName.MEGAPHONE },
          ]}
        />
      </div>
    </PublicSection>
  );
}

function InfoCard({
  accountType,
  learnMoreLink,
  registerLink,
  benefits,
}: {
  accountType: string;
  learnMoreLink: string;
  registerLink: string;
  benefits: { title: string; icon?: IconName }[];
}) {
  return (
    <article className="flex min-w-64 max-w-96 flex-col rounded-lg bg-white text-accent-accent1 shadow-lg hover:shadow-2xl">
      <header className="px-10 py-8">
        <p className="font-bold">InnBell</p>
        <Link
          to={learnMoreLink}
          tabIndex={-1}
          className="text-4xl font-medium text-accent-accent3"
        >
          {accountType}
        </Link>
      </header>

      <main className="flex-1 px-10 pb-8">
        <p className="text-sm opacity-80">
          Benefits of joining us as a {accountType}:
        </p>
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
          Learn more
        </Link>
        <Link
          reloadDocument
          to={registerLink}
          className="flex flex-1 justify-center gap-1 rounded-b-lg border-t border-accent-accent2 bg-accent-accent2 px-6 py-4 font-medium hover:bg-accent-accent3 hover:text-white"
        >
          <span>Register as</span>
          <span className="font-bold">{accountType}</span>
        </Link>
      </footer>
    </article>
  );
}
