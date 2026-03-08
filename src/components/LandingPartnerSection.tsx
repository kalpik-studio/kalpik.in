import { PublicSection } from "./PublicSection";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

const keyReasons = {
  "Project Co-ordination & Oversight":
    "Aligning architectural teams, MEP (Mechanical, Electrical, Plumbing) consultants, and on-site contractors to maintain project timelines and design integrity.",
  "FF&E OS&E Procurement":
    "Strategic sourcing of Furniture, Fixtures, & Equipment, leveraging an established international vendor network for optimal commercial terms.",
  "Value Engineering":
    "Analyzing BOQs (Bill of Quantities) and specifications to identify cost-saving alternatives without compromising brand compliance or operational durability.",
  "Pre-Opening & Handover":
    "Managing the final stages of the project lifecycle, including comprehensive snagging, defect resolution, and operational handover readiness.",
  "Brand Standard Compliance":
    "Conducting rigorous site audits to ensure all finishes, materials, and spatial flows meet the exact specifications of international hotel operators.",
  "Turnkey Execution Advisory":
    "Providing end-to-end guidance for commercial F&B and corporate spaces, from initial layout planning to contractor management.",
};

export function LandingPartnerSection() {
  return (
    <PublicSection
      title="Core Advisory Competencies"
      subTitle={
        "Strategic guidance and technical oversight for hospitality developments and commercial interiors."
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
