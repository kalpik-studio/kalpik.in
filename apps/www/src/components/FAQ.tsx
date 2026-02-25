import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@innbell/components/ui/accordion.tsx";
import { cn } from "@innbell/utils/cn";

const faqs: { q: string; a: string }[] = [
  {
    q: "What is InnBell?",
    a: `InnBell is India's first online B2B platform that connects hospitality investors and businesses with trusted suppliers, simplifying the supply chain and enhancing operational efficiency.`,
  },
  {
    q: `How does InnBell benefit hospitality businesses?`,
    a: `InnBell helps businesses streamline their supply chain logistics, reduce project costs, and improve operational efficiency by connecting them with reliable suppliers.`,
  },
  {
    q: `Who can use InnBell's services?`,
    a: `InnBell caters to a wide range of users, including small and medium enterprises (SMEs), large enterprises, and individual hospitality investors.`,
  },
  {
    q: `How does InnBell simplify the sourcing process?`,
    a: `InnBell offers a seamless platform where users can find, compare, and connect with suppliers, eliminating the need for lengthy searches and negotiations.`,
  },
  {
    q: `What types of products and services can I find on InnBell?`,
    a: `InnBell offers a variety of hospitality products and services, tailored to meet the unique requirements of hotels, restaurants, and other hospitality businesses.`,
  },
  {
    q: `How does Innbell ensure the quality of products from vendors?`,
    a: `Vendors undergo a verification process during enrollment. Our experts check the quality of the products and compare the services in the market. We choose only vendors who meet all the requirements to be our partners.`,
  },
  {
    q: `In which regions of India does InnBell serve?`,
    a: `Innbell serves the entire Indian market. Hotels can find vendors from their regions all over India. We are enrolling more vendors and hotels on a regular basis to expand our marketplace.`,
  },
  {
    q: `How do I become a vendor on InnBell?`,
    a: `Vendors interested in joining InnBell can register via the InnBell app or website. After verifying them, we will list them on the platform. This will link vendors with hotels and restaurants seeking quality products and services.`,
  },
];

export function FAQ() {
  return (
    <section
      id={"faq"}
      className={cn("grid gap-8 md:grid-cols-[2fr_1fr] relative bg-slate-50")}
    >
      <main className="flex flex-col gap-12 py-20 px-8 max-w-[620px] w-full md:ml-auto">
        <header className="flex flex-col gap-4">
          <h2 className="text-accent-accent1 text-balance text-5xl font-medium">
            FAQs
          </h2>
          <p className="text-accent-accent3 text-balance text-lg font-medium">
            Direct answers to your most common questions
          </p>
        </header>
        <Accordion type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem value={index.toString()} key={index}>
              <AccordionTrigger className="text-left">
                {faq.q}
                <span className="sr-only">{faq.a}</span>
              </AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>

      <aside className="hidden md:flex bg-accent-accent2 pl-8 py-4 overflow-hidden items-center">
        <img
          src="/images/app-buyer-explore.png"
          alt="asd"
          className="w-full h-full object-cover object-left rounded-l-lg shadow-xl border-4 border-white border-r-0 max-h-[520px]"
        />
      </aside>
    </section>
  );
}
