import Image, { StaticImageData } from "next/image";
import { Text } from "@/components/ui/Text";

type ServicePageContentProps = {
  image: StaticImageData;
  imageAlt: string;
  description: string;
  bullets: string[];
};

export default function ServicePageContent({
  image,
  imageAlt,
  description,
  bullets,
}: ServicePageContentProps) {
  return (
    <section className="px-6 py-16 md:pt-[62px] md:pb-[90px] lg:px-0 rounded-[32px] md:rounded-[50px] -mt-[60px] bg-white z-10 relative">
      <div className="mx-auto max-w-[1246px]">
        {/* Full-width image */}
        <div className="relative md:h-[483px] h-[200px] w-full overflow-hidden md:rounded-[30px] rounded-[16px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            quality={100}
            priority
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1246px"
          />
        </div>

        {/* Text block */}
        <div className="mt-[43px]">
          <Text
            as="p"
            className="md:text-[32px] text-[20px] md:font-normal md:leading-[51px] leading-[30px]"
          >
            {description}
            <br />
            <br />
          </Text>

          <ul className="list-disc space-y-2 lg:space-y-0 list-outside pl-6 md:pl-8 md:text-[32px] text-[20px] md:font-normal md:leading-[51px] leading-[30px]">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
