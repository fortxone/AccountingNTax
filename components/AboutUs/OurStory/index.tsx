import Image from "next/image";

import { Text } from "@/components/ui/Text";
import ourStoryImage from "@/public/images/about-us/our-story.png";

export default function OurStory() {
  return (
    <section
      className="relative z-10 -mt-[60px] rounded-[32px] md:rounded-[50px] bg-white  py-16 md:px-10 md:py-20 xl:px-0 px-4 lg:pt-[76px] lg:pb-[62px]"
      aria-labelledby="our-story-heading"
    >
      <div className="mx-auto max-w-[1245px]">

        {/* Heading */}
        <Text
          as="h2"
          id="our-story-heading"
          leading="tight"
          className="mb-[32px] md:mb-[34px] text-center "
        >
          Our Story
        </Text>

        {/* Two-column body */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[33px]">

          {/* Text column */}


          <Text

            as="p"
            className="text-[16px] md:text-[20px] md:leading-[37px] font-medium leading-[28px] tracking-[0px] lg:max-w-[627px]"
          >
            AccountingNTax was created to make the process of finding the right accountant easier and more efficient. Many businesses and individuals spend too much time searching, comparing firms, and trying to work out which accountant is the right fit. We built AccountingNTax to simplify that process.
            <br />
            <br />
            <br className="lg:block hidden" />
            Our approach is simple. You complete our assessment, book a 30-minute consultation, and we obtain quotes from at least two suitable accounting firms based on your requirements. This allows you to compare your options and choose the firm that best suits your needs.
            <br />
            <br />
          </Text>


          {/* Image column */}
          <div className="w-full shrink-0 lg:w-[585px]">
            <div className="relative md:h-[500px] lg:h-[518px] h-[300px] w-full overflow-hidden rounded-[20px]">
              <Image
                src={ourStoryImage}
                alt="The AccountingNTax team collaborating"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 585px"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
