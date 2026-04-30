import PageHero from "@/components/shared/PageHero";
import ServicesGrid from "@/components/Services/ServicesGrid";

export const metadata = {
  title: "Our Services | AccountingNTax",
  description:
    "Everything you need to find, connect with, and work with the right accountant.",
};

export default function OurServicesPage() {
  return (
    <main>
      <PageHero
        title="Our Services"
        subtitle="Everything you need to find, connect with, and work with the right accountant."
      />
      <ServicesGrid />
    </main>
  );
}
