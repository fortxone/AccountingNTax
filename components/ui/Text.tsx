import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { cn } from "@/lib/cn";

const headingTags = new Set(["h1", "h2", "h3"]);

type TextOwnProps<T extends ElementType> = {
  as?: T;
  /** Defaults from tag: h1–h6 → heading, otherwise → content */
  variant?: "heading" | "content";
  /** Heading only: default 63.2px line-height, tight 48px */
  leading?: "default" | "tight";
};

export type TextProps<T extends ElementType = "p"> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

export function Text<T extends ElementType = "p">({
  as,
  variant,
  leading = "default",
  className,
  ...props
}: TextProps<T>) {
  const Tag = (as ?? "p") as ElementType;
  const tagName = typeof Tag === "string" ? Tag : "p";
  const resolvedVariant =
    variant ?? (headingTags.has(tagName) ? "heading" : "content");

  const isH1OrH2 = tagName === "h1" || tagName === "h2";

  const headingClass =
    resolvedVariant === "heading"
      ? cn(
          "font-sans font-bold tracking-normal",
          isH1OrH2
            ? cn(
                "text-[36px] sm:text-[40px] md:text-[50px]",
                leading === "tight"
                  ? "leading-[38px] sm:leading-[44px] md:leading-[48px]"
                  : "leading-[40px] sm:leading-[52px] md:leading-[63.2px]"
              )
            : cn(
                "text-[50px]",
                leading === "tight" ? "leading-[48px]" : "leading-[63.2px]"
              )
        )
      : null;

  const contentClass =
    resolvedVariant === "content"
      ? "font-heading text-[18px] md:text-[22px] font-normal leading-[28px] md:leading-[35px] tracking-normal"
      : null;

  return (
    <Tag className={cn(headingClass, contentClass, className)} {...props} />
  );
}
