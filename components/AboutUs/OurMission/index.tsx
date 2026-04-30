import Image from "next/image";
import { Text } from "@/components/ui/Text";

import ourMissionImage from "@/public/images/about-us/our-mission-bg.png";

export default function OurMission() {
  return (
    <section
      className="relative overflow-hidden px-4 xl:px-0 py-16 md:py-[90px] min-h-[336px]"
      aria-labelledby="our-mission-heading"
    >
      {/* Background */}
      <Image
        src={ourMissionImage}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1245px]  text-center ">
        <Text
          as="h2"
          id="our-mission-heading"
          leading="tight"
          className="text-white"
        >
          Our Mission
        </Text>

        <Text
          as="p"
          className="mx-auto mt-5 max-w-[1140px] text-[20px] font-medium leading-[32px] text-white md:text-[24px] md:leading-[38px]"
        >
          Our mission is to simplify the process of finding expert accounting support by providing a structured, transparent, and professional route to comparing suitable firms.

        </Text>
      </div>
    </section>
  );
}
