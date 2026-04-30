import PageHero from "@/components/shared/PageHero";
import ServicePageContent from "@/components/Services/ServicePageContent";
import image from "@/public/images/our-services/service-1.png";

export const metadata = {
  title: "Intelligent Accountant Matching | AccountingNTax",
  description:
    "Our proprietary assessment engine matches you with the most compatible accountants from our curated, vetted network — based on your sector, services needed, budget, and working style.",
};

export default function IntelligentAccountantMatchingPage() {
  return (
    <main>
      <PageHero
        title="Intelligent Accountant Matching"
        subtitle="The heart of what we do — precision matching built around your exact requirements."
        subtitleMaxWidth="max-w-[700px]"
      />
      <ServicePageContent
        image={image}
        imageAlt="Intelligent accountant matching"
        description="The heart of what we do. Our proprietary assessment engine asks the right questions to understand your exact requirements — your business type, size, sector, the services you need, your budget, and your preferred working style. We then match you with the most compatible accountants from our curated, vetted network."
        bullets={[
          "Matches based on sector expertise, service requirements, and location",
          "Up to 3 tailored recommendations per assessment",
          "All matched accountants hold ICAEW, ACCA, ACA, or AAT qualifications",
          "Results delivered instantly at the end of your assessment",
        ]}
      />
    </main>
  );
}
