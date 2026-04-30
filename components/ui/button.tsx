import Link from "next/link";
import {
  type ButtonHTMLAttributes,
  type ComponentProps,
} from "react";
import { cn } from "@/lib/cn";

/** Layout, type, padding, focus — no background (use default fill or `backgroundClassName`) */
export const buttonShell = cn(
  "inline-flex items-center justify-center gap-[10px] whitespace-nowrap font-jakarta",
  "md:rounded-[15px] rounded-[10px] md:text-base text-[14px] font-medium text-white",
  "box-border md:h-[70px] h-[50px] md:w-[272px] w-[260px] min-w-0 shrink-0",
  "md:pt-[10px] md:pr-[25px] md:pb-[15px] md:pl-[26px] pt-[8px] pr-[20px] pb-[12px] pl-[22px]",
  "transition",
  "disabled:pointer-events-none disabled:opacity-50"
);

const defaultFill = "bg-accent hover:bg-accent/90";

/** Full default styles (shell + accent fill) for reuse elsewhere */
export const buttonVariants = cn(buttonShell, defaultFill);

type Common = {
  className?: string;
  /** Only replaces background + default hover fill; shell (size, radius, padding, text) stays the same */
  backgroundClassName?: string;
  children?: React.ReactNode;
};

type AsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = Common &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

function Button(props: ButtonProps) {
  const { className, children, backgroundClassName } = props;
  const fill = backgroundClassName
    ? cn(backgroundClassName, "hover:brightness-110")
    : defaultFill;
  const cls = cn(buttonShell, fill, className);

  if ("href" in props && props.href !== undefined) {
    const { href, className: _c, children: _ch, backgroundClassName: _b, ...forward } =
      props as AsLink;
    return (
      <Link href={href} className={cls} {...forward}>
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    className: _c,
    children: _ch,
    backgroundClassName: _b,
    ...forward
  } = props as AsButton;
  return (
    <button type={type} className={cls} {...forward}>
      {children}
    </button>
  );
}

export default Button;
