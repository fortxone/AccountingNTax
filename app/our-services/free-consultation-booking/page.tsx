import PageHero from "@/components/shared/PageHero";
import ServicePageContent from "@/components/Services/ServicePageContent";
import image from "@/public/images/our-services/service-2.png";

export const metadata = {
  title: "Free 30-Minute Consultation Booking | AccountingNTax",
  description:
    "Once matched, book a complimentary 30-minute introductory call directly through our integrated calendar — no phone tag, no waiting. Choose a time and show up.",
};

export default function FreeConsultationBookingPage() {
  return (
    <main>
      <PageHero
        title="Free 30-Minute Consultation Booking"
        subtitle="Once matched, book your introductory call instantly — no phone tag, no waiting for email replies."
        subtitleMaxWidth="max-w-[760px]"
      />
      <ServicePageContent
        image={image}
        imageAlt="Free consultation booking calendar"
        description="Once matched, you can book a complimentary 30-minute introductory call directly through our integrated calendar. No awkward phone tag, no waiting for email replies. Choose a time that works for you and show up."
        bullets={[
          "Integrated calendar booking — no third-party apps required",
          "Confirmation sent by email immediately",
          "Reschedule or cancel easily using the link in your email",
          "Available for all matched accountants in our network",
        ]}
      />
    </main>
  );
}
