import PageHero from "@/components/shared/PageHero";
import PrivacyPolicy from "@/components/Legal/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy | AccountingNTax",
  description:
    "Learn how AccountingNTax.co.uk collects, uses, and protects your personal information in accordance with UK data protection law.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHero
        title="Privacy Policy"
        subtitle="We take your privacy seriously. Here's exactly how we handle your personal data."
        subtitleMaxWidth="max-w-[700px]"
      />
      <PrivacyPolicy />
    </main>
  );
}
