import PageHero from "@/components/shared/PageHero";
import TermsAndConditions from "@/components/Legal/TermsAndConditions";

export const metadata = {
  title: "Terms & Conditions | AccountingNTax",
  description:
    "Read the Terms & Conditions that govern your use of the AccountingNTax.co.uk accountant-matching service.",
};

export default function TermsAndConditionsPage() {
  return (
    <main>
      <PageHero
        title="Terms & Conditions"
        subtitle="The rules and guidelines that govern your use of our matching service."
        subtitleMaxWidth="max-w-[680px]"
      />
      <TermsAndConditions />
    </main>
  );
}
