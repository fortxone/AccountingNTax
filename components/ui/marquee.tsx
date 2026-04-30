import { type ComponentProps } from "react";
import FastMarquee from "react-fast-marquee";
import { cn } from "@/lib/cn";

type FastMarqueeProps = ComponentProps<typeof FastMarquee>;

export type MarqueeProps = Omit<FastMarqueeProps, "children"> & {
  items: readonly string[];
  className?: string;
};

function Dot() {
  return (
    <span
      className="h-2 w-2 shrink-0 rounded-full bg-white"
      aria-hidden
    />
  );
}

export default function Marquee({
  items,
  className,
  speed = 40,
  gradient = false,
  autoFill = true,
  direction = "left",
  loop = 0,
  ...marqueeProps
}: MarqueeProps) {
  return (
    <FastMarquee
      speed={speed}
      gradient={gradient}
      autoFill={autoFill}
      direction={direction}
      loop={loop}
      className={cn(className)}
      {...marqueeProps}
    >
      {items.map((label, index) => (
        <span
          key={`${label}-${index}`}
          className="inline-flex shrink-0 items-center gap-4 px-4 md:gap-5 "
        >
          <Dot />
          <span className="whitespace-nowrap font-sans text-[18px] md:text-[24px] font-bold text-white">
            {label}
          </span>
        </span>
      ))}
    </FastMarquee>
  );
}
