import HeroSection from "@/components/Home/HeroSection";
import Intro from "@/components/Home/Intro";
import HowItWorks from "@/components/Home/HowItWorks";
import WhyAccounting from "@/components/Home/WhyAccounting";
import ServiceDetails from "@/components/Home/ServiceDetails";
import FindYourAccount from "@/components/Home/FindYourAccount";
import Testimonials from "@/components/Home/Testimonials";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <Intro />
      <HowItWorks />
      <WhyAccounting />
      <ServiceDetails />
      <Testimonials />
      <FindYourAccount />
    </main>
  );
}
