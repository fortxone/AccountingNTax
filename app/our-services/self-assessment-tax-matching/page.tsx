import PageHero from "@/components/shared/PageHero";
import ServicePageContent from "@/components/Services/ServicePageContent";
import image from "@/public/images/our-services/service-4.png";

export const metadata = {
  title: "Self-Assessment Tax Matching | AccountingNTax",
  description:
    "Specifically designed for individuals who need help with HMRC self-assessment tax returns, personal tax planning, capital gains tax, or inheritance tax.",
};

export default function SelfAssessmentTaxMatchingPage() {
  return (
    <main>
      <PageHero
        title="Self-Assessment Tax Matching"
        subtitle="Connecting individuals with accountants who specialise in personal tax — from sole traders to expats."
        subtitleMaxWidth="max-w-[760px]"
      />
      <ServicePageContent
        image={image}
        imageAlt="Self-assessment tax matching"
        description="Specifically designed for individuals who need help with HMRC self-assessment tax returns, personal tax planning, capital gains tax, or inheritance tax. We match individuals with accountants who specialise in personal tax."
        bullets={[
          "Sole trader and freelancer specialists",
          "Personal tax return experts",
          "Capital gains and investment income advice",
          "Expat and international tax advisors",
        ]}
      />
    </main>
  );
}
