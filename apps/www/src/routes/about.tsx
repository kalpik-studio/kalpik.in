/* eslint-disable no-unescaped-entities */

import { RichText } from "@innbell/components/RichText.tsx";
import { genWwwRoute } from "@innbell/router/routes";
import { cn } from "@innbell/utils/cn";
import { MissionHero } from "~/components/MissionHero";
import { PublicSection } from "~/components/PublicSection";
import { RegisterCTA } from "~/components/RegisterCTA";
import type { Route } from "./+types/about";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Our Story, Mission and Values - InnBell" },
    {
      name: "description",
      content:
        "Get to know the heart of InnBell! Our story, mission, and values drive us to simplify hospitality supply chains. Read about our journey and join our community of innovators.",
    },
  ];
};

export const links: Route.LinksFunction = () => {
  return [{ rel: "canonical", href: genWwwRoute((Route) => Route.ABOUT) }];
};

const aboutUs = [
  "At InnBell, we are revolutionizing the hospitality industry by bridging the gap between businesses and top-tier service providers. Our platform is engineered to meet the unique demands of both small enterprises and large corporations, ensuring seamless access to the best products and services in hospitality. Whether you're sourcing for a boutique hotel or managing operations for a multi-location restaurant chain, InnBell guarantees that the procurement process is streamlined, efficient, and backed by quality assurance.",
  `What sets InnBell apart is our focus on end-to-end supply chain optimization, reducing friction in sourcing everything from **furnishings, interior contracting, kitchen equipment, to guest amenities and cleaning supplies**. By offering direct connections to trusted suppliers, we eliminate the traditional bottlenecks associated with procurement, including time-consuming negotiations and unpredictable supply lead times.`,
  `Our platform ensures transparency in pricing, reliability in delivery, and flexibility in sourcing, making it easier for businesses to stay within budget and time constraints while maintaining high standards of operational excellence. Additionally, InnBell's technology-driven marketplace provides real-time analytics, helping businesses monitor supplier performance, optimize inventory, and predict future needs.`,
  `In an industry where margins are tight and guest expectations are ever-evolving, InnBell serves as a crucial partner, enabling businesses to focus on what truly matters: enhancing guest experiences. We leverage our **vast supplier network**, cutting-edge technology, and deep industry expertise to offer solutions that are tailored to the evolving needs of modern hospitality players.`,
  `By facilitating partnerships with leading manufacturers and service providers, InnBell not only improves the procurement process but also fosters long-term business relationships, ensuring sustainable growth and innovation within the hospitality sector.`,
].join("\n\n");

export default function AboutPage() {
  return (
    <>
      <MissionHero />
      <div id="main-content" className="h-16" />

      <PublicSection
        title="About InnBell"
        subTitle="One Stop Solution for all Hospitality needs."
      >
        <div className="flex w-full flex-wrap items-start gap-8 px-8">
          <div className="flex w-full justify-center sm:w-max">
            <img
              src="/logos/innbell-duotone.png"
              alt="InnBell"
              width={200}
              height={200}
            />
          </div>

          <RichText className="flex w-full max-w-[60ch] flex-col gap-4">
            {aboutUs}
          </RichText>
        </div>
      </PublicSection>

      <PublicSection
        title="Meet the Team"
        subTitle="Two Hospitality professionals having deep roots in hospitality working tirelessly & passionately towards achieving excellence."
        className="bg-slate-200"
      >
        <div className="flex w-full flex-col justify-stretch gap-8 px-8 sm:flex-row">
          <TeamCard
            name="Pawan Gupta"
            role="Co-founder & CEO"
            img="/team/PawanGupta.jpg"
          >
            <p>
              He is veteran in hospitality Industry who has given three decades
              of dedication and hard work.
            </p>
            <p>
              He has contributed towards creation of Hotel assets by involving
              himself in Civil/ Interior contracting of various Hotel projects
              pan India.
            </p>
            <p>
              Currently, He is also wearing cap of Consultant and have advised
              various hospitality Investors to make their journey profitable &
              fruitful.
            </p>
          </TeamCard>
          <TeamCard
            name="Amitabh Sanduja"
            role="Co-founder & COO"
            img="/team/AmitabhSanduja.jpg"
          >
            <p>
              He is a seasoned Hotelier having three decades of professional
              experience in Hospitality Trade.
            </p>
            <p>
              He has won many professional caps and have been instrumental in
              handling both Hotel operations as well as execution of Hotel
              Projects.
            </p>
            <p>He is a Hotel entrepreneur and Turn key advisor.</p>
          </TeamCard>
        </div>
      </PublicSection>

      <RegisterCTA />
    </>
  );
}

export function TeamCard({
  children,
  img,
  name,
  role,
}: {
  name: string;
  role: string;
  img: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "min-w-64 max-w-96 rounded-lg bg-white text-slate-900 shadow",
        "flex flex-1 flex-col gap-4 overflow-hidden",
      )}
    >
      <img
        className="aspect-square w-full bg-slate-300 object-cover"
        src={img}
        alt={name}
        loading="lazy"
      />
      <main className="px-4">
        <p className="text-2xl font-medium">{name}</p>
        <p className="text-base font-medium">{role}</p>
      </main>
      <footer className="flex-1 space-y-2 px-4 pb-4 text-sm leading-6 opacity-80">
        {children}
      </footer>
    </article>
  );
}
