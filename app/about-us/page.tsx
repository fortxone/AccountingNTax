import PageHero from "@/components/shared/PageHero";
import OurStory from "@/components/AboutUs/OurStory";
import OurMission from "@/components/AboutUs/OurMission";
import OurValue from "@/components/AboutUs/OurValue";
import WhoWeHelp from "@/components/AboutUs/WhoWeHelp";

export const metadata = {
  title: "About Us | AccountingNTax",
  description:
    "About us and our mission.",
};

export default function AboutUsPage() {
  return (
    <main>
      <PageHero
        title="About AccountingNTax"
        subtitle="We believe finding the right accountant should be straightforward, transparent, and tailored to your business needs."
        subtitleMaxWidth="max-w-[900px]"
      />
      <OurStory />
      <OurMission />
      <OurValue />
      <WhoWeHelp />
    </main>
  );
}
