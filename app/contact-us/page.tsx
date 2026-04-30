import PageHero from "@/components/shared/PageHero";
import ContactUs from "@/components/Contact/ContactUs";

export const metadata = {
  title: "Contact Us | AccountingNTax",
  description:
    "Contact us for any questions or inquiries.",
};

export default function ContactUsPage() {
  return (
    <main>
      <PageHero
        title="Get In Touch"
        subtitle="We are here to help. Whether you have a question about our service, want to know more about how our process works, or need help getting started, we would love to hear from you."
        subtitleMaxWidth="max-w-[1200px]"
      />
      <ContactUs />
    </main>
  );
}
