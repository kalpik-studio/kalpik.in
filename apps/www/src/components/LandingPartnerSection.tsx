import { PublicSection } from "./PublicSection";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

const keyReasons = {
  "Streamlined Procurement":
    "InnBell simplifies the sourcing and procurement process by providing the buyers and vendors with a single platform, saving time and effort.",
  "Cost Efficiency":
    "InnBell reduces operational costs for buyers by connecting them with trusted and competitive vendors.",
  "Wide Network":
    "Buyers and vendors get access to a broad range of businesses, opening more options to sell or buy products from.",
  "Quality Assurance":
    " All vendors are verified before adding to the InnBell vendors list, assuring quality products and trustworthy partners",
  "Tailored Solutions":
    " InnBell provides specific solutions especially designed for the hospitality industry, making it India's first platform to do so.",
  "Business Growth":
    " InnBell helps vendors to visiblize their products to a bigger marketplace. It helps them reach more buyers to grow their business.",
};

export function LandingPartnerSection() {
  return (
    <PublicSection
      title="Why Partner with InnBell?"
      subTitle={
        "Discover the benefits of partnering with InnBell. From our extensive network to our commitment to quality, we offer solutions tailored to your unique needs, ensuring seamless integration and cost efficiency."
      }
      className="bg-gradient-to-b from-accent-accent3/10 to-transparent"
    >
      <BentoGrid>
        {Object.entries(keyReasons).map(([key, value], index) => (
          <BentoGridItem
            key={key}
            index={index + 1}
            title={key}
            description={value}
          />
        ))}
      </BentoGrid>
    </PublicSection>
  );
}
