"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

export type AccordionItemProps = {
  title: string;
  children?: ReactNode;
  className?: string;
  buttonClassName?: string;
  /** Uncontrolled default. Ignored when `isOpen` is provided. */
  defaultOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Called when the header button is clicked (controlled mode) */
  onToggle?: () => void;
};

export default function AccordionItem({
  title,
  children,
  className,
  buttonClassName,
  defaultOpen = false,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const controlled = isOpen !== undefined;
  const open = controlled ? isOpen : internalOpen;

  const id = useId();
  const panelId = `${id}-panel`;
  const hasBody = children != null;

  function handleToggle() {
    if (controlled) {
      onToggle?.();
    } else {
      setInternalOpen((o) => !o);
    }
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl bg-accent", className)}
    >
      {/* Background image shown only when open */}
      {open && (
        <Image
          src="/images/home/accor-bg.png"
          alt=""
          fill
          className="pointer-events-none object-cover object-center"
          aria-hidden
        />
      )}

      <div className="relative z-10">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={hasBody ? panelId : undefined}
          onClick={handleToggle}
          className={cn(
            "flex w-full items-center justify-between cursor-pointer gap-6 px-5 py-4 text-left md:px-6 md:py-5",
            buttonClassName
          )}
        >
          <Text
            as="span"
            variant="content"
            className="pr-2 font-jakarta lg:text-[30px] md:text-[20px] text-[18px] font-medium leading-snug text-white"
          >
            {title}
          </Text>
          <Image
            src="/images/home/accordian.svg"
            alt=""
            width={18}
            height={9}
            className={cn(
              "shrink-0 transition-transform duration-200 ease-out",
              open && "-scale-y-100"
            )}
            aria-hidden
          />
        </button>
        {hasBody ? (
          <Text
            as="div"
            variant="content"
            id={panelId}
            role="region"
            hidden={!open}
            className=" px-5 pb-5 pt-2 font-jakarta text-sm md:text-[18px] md:leading-[33px] font-semibold leading-relaxed text-white/90 md:px-6 md:pb-6 md:pt-2"
          >
            {children}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
