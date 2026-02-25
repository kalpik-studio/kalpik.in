import { genWwwRoute } from "@innbell/router/routes";
import { FAQ } from "~/components/FAQ";
import { LandingAboutUsSection } from "~/components/LandingAboutUsSection";
import { LandingHero } from "~/components/LandingHero";
import { LandingPartnerSection } from "~/components/LandingPartnerSection";
import { PublicSection } from "~/components/PublicSection";
import { TrustedCompanies } from "~/components/TrustedCompanies";
import type { Route } from "./+types/_index";
import { TeamCard } from "./about";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Hospitality Supply Chain Simplified - InnBell" },
    {
      name: "description",
      content:
        "Streamline your hospitality business with InnBell! Discover a smarter way to procure supplies, manage inventory, and connect with vendors. Join the InnBell community today!",
    },
  ];
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.clone().formData();
  switch (formData.get("intent")) {
    default:
      return null;
  }
}

export const links: Route.LinksFunction = () => {
  return [{ rel: "canonical", href: genWwwRoute() }];
};

export default function Index() {
  return (
    <>
      <LandingHero />
      <div id="main-content" />
      <LandingAboutUsSection />
      <TrustedCompanies />
      <LandingPartnerSection />

      <PublicSection
        title="Meet the Team"
        subTitle="Hospitality professional having deep roots in hospitality working tirelessly & passionately towards achieving excellence."
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
        </div>
      </PublicSection>

      <FAQ />
    </>
  );
}

// const heroProducts: HeroParallaxProduct[] = [
//   {
//     // title: "Explore products",
//     thumbnail: "/screenshots/screenshot-app-explore2-desktop.png",
//   },
//   {
//     // title: "Explore categories",
//     thumbnail: "/screenshots/screenshot-app-explore-desktop.png",
//   },
//   {
//     // title: "Vendors list",
//     thumbnail: "/screenshots/screenshot-app-list-desktop.png",
//   },
//   {
//     // title: "Vendor details",
//     thumbnail: "/screenshots/screenshot-app-vendor-desktop.png",
//   },
//   {
//     // title: "Enquiries",
//     thumbnail: "/screenshots/screenshot-app-enquiries-desktop.png",
//   },
//   // row 2
//   {
//     // title: "Explore categories",
//     thumbnail: "/screenshots/screenshot-app-explore-desktop.png",
//   },
//   {
//     // title: "Explore products",
//     thumbnail: "/screenshots/screenshot-app-explore2-desktop.png",
//   },
//   {
//     // title: "Vendor details",
//     thumbnail: "/screenshots/screenshot-app-vendor-desktop.png",
//   },
//   {
//     // title: "Enquiries",
//     thumbnail: "/screenshots/screenshot-app-enquiries-desktop.png",
//   },
//   {
//     // title: "Vendors list",
//     thumbnail: "/screenshots/screenshot-app-list-desktop.png",
//   },
// ];
