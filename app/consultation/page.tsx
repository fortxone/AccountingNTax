import PageHero from "@/components/shared/PageHero";
import ConsultationBooking from "@/components/Consultation/ConsultationBooking";

export const metadata = {
  title: "Book Your Free 30-Minute Consultation | AccountingNTax",
  description:
    "Book a complimentary 30-minute consultation with AccountingNTax. Choose a time that suits you and speak directly with an expert — no obligation required.",
};

export default function ConsultationPage() {
  return (
    <main>
      <PageHero
        title="Book Your Free 30-Minute Consultation"
        subtitle="Pick a time that works for you and speak with one of our experts — completely free, no commitment required."
        subtitleMaxWidth="max-w-[900px]"
      />
      <ConsultationBooking />
    </main>
  );
}
