import PageHero from "@/components/shared/PageHero";
import CookiePolicy from "@/components/Legal/CookiePolicy";

export const metadata = {
  title: "Cookie Policy | AccountingNTax",
  description:
    "Find out what cookies AccountingNTax.co.uk uses, why we use them, and how you can manage your preferences.",
};

export default function CookiePolicyPage() {
  return (
    <main>
      <PageHero
        title="Cookie Policy"
        subtitle="We believe in being transparent about how we use cookies on our website."
        subtitleMaxWidth="max-w-[680px]"
      />
      <CookiePolicy />
    </main>
  );
}
