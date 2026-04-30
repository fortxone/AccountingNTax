import PageHero from "@/components/shared/PageHero";
import ServicePageContent from "@/components/Services/ServicePageContent";
import image from "@/public/images/our-services/service-6.png";

export const metadata = {
  title: "International & Cross-Border Advisory | AccountingNTax",
  description:
    "For businesses operating internationally or individuals with UK tax obligations from abroad — connect with accountants specialising in cross-border taxation and double tax treaties.",
};

export default function InternationalCrossBorderAdvisoryPage() {
  return (
    <main>
      <PageHero
        title="International & Cross-Border Advisory"
        subtitle="Connecting you with specialists in cross-border taxation, double tax treaties, and HMRC non-resident rules."
        subtitleMaxWidth="max-w-[800px]"
      />
      <ServicePageContent
        image={image}
        imageAlt="International and cross-border advisory"
        description="For businesses operating internationally or individuals with UK tax obligations from abroad, we connect you with accountants who hold specialist expertise in cross-border taxation, double tax treaties, and HMRC non-resident tax rules."
        bullets={[
          "UK tax obligations for international businesses",
          "Expat and non-domicile tax planning",
          "Cross-border VAT and compliance",
          "Double tax treaty advice",
        ]}
      />
    </main>
  );
}
