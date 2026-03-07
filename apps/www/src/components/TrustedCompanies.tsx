import { cn } from "@innbell/utils/cn";
import { allLogos, type PublicLogo } from "~/constants/logos";
import { PublicSection } from "./PublicSection";

export function TrustedCompanies({
  logos = allLogos,
  title = "Brand Experience & Collaborations",
  subtitle = "A portfolio of hospitality groups, operators, and commercial brands I have partnered with throughout my contracting career.",
}: {
  logos?: Array<PublicLogo>;
  title?: string;
  subtitle?: string;
}) {
  return (
    <PublicSection title={title} subTitle={subtitle}>
      <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {logos.map((logo) => (
          <li key={logo.alt}>
            <img
              loading="lazy"
              src={logo.src}
              alt={logo.alt}
              className={cn(
                "max-h-20 max-w-24 rounded-lg object-contain p-1 md:max-h-28 md:max-w-40",
              )}
            />
          </li>
        ))}
      </ul>
    </PublicSection>
  );
}
