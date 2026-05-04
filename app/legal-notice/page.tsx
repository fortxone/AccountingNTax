import PageHero from "@/components/shared/PageHero";
import LegalNotice from "@/components/Legal/LegalNotice";

export const metadata = {
  title: "Legal Notice | AccountingNTax",
  description:
    "Company and website information for AccountingNTax.co.uk, operated by ACCOUNTINGNTAX LIMITED.",
};

export default function LegalNoticePage() {
  return (
    <main>
      <PageHero
        title="Legal Notice"
        subtitle="Company and website information for AccountingNTax.co.uk."
        subtitleMaxWidth="max-w-[680px]"
      />
      <LegalNotice />
    </main>
  );
}
