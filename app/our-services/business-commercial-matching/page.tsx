import PageHero from "@/components/shared/PageHero";
import ServicePageContent from "@/components/Services/ServicePageContent";
import image from "@/public/images/our-services/service-5.png";

export const metadata = {
  title: "Business & Commercial Matching | AccountingNTax",
  description:
    "For limited companies, partnerships, and growing businesses — we match you with accountants who understand the commercial realities of running a business.",
};

export default function BusinessCommercialMatchingPage() {
  return (
    <main>
      <PageHero
        title="Business & Commercial Matching"
        subtitle="For limited companies, partnerships, and growing businesses — matched with accountants who understand commercial realities."
        subtitleMaxWidth="max-w-[800px]"
      />
      <ServicePageContent
        image={image}
        imageAlt="Business and commercial matching"
        description="For limited companies, partnerships, and growing businesses, we match you with accountants who understand the commercial realities of running a business — from payroll and VAT compliance to financial forecasting and growth planning."
        bullets={[
          "Limited company accounts and corporation tax",
          "VAT registration and returns",
          "Payroll and PAYE management",
          "R&D tax credits and startup incentives",
          "Financial forecasting and investor-ready accounts",
        ]}
      />
    </main>
  );
}
