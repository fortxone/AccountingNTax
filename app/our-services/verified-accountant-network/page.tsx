import PageHero from "@/components/shared/PageHero";
import ServicePageContent from "@/components/Services/ServicePageContent";
import image from "@/public/images/our-services/service-3.png";

export const metadata = {
  title: "Verified Accountant Network | AccountingNTax",
  description:
    "Every professional in our network is vetted for qualifications, regulatory compliance, and client satisfaction. View profiles, specialisms, reviews, and fee structures before booking.",
};

export default function VerifiedAccountantNetworkPage() {
  return (
    <main>
      <PageHero
        title="Verified Accountant Network"
        subtitle="We do not just list any accountant — every professional is rigorously vetted before joining our network."
        subtitleMaxWidth="max-w-[760px]"
      />
      <ServicePageContent
        image={image}
        imageAlt="Verified accountant network"
        description="We do not just list any accountant. Every professional in our network has been vetted for qualifications, regulatory compliance, and client satisfaction. You can view their profile, specialisms, reviews, and typical fee structures before booking."
        bullets={[
          "Qualification verification (ICAEW, ACCA, ACA, AAT)",
          "Regulatory compliance checks",
          "Client review scores and verified testimonials",
          "Transparent fee and service information",
        ]}
      />
    </main>
  );
}
