"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

const noop = () => () => { };

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Modal shell width; default ~booking spec */
  className?: string;
  bodyClassName?: string;
  /** Header background (design: deep navy) */
  headerClassName?: string;
};

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("size-5", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className,
  bodyClassName,
  headerClassName,
}: ModalProps) {
  const titleId = useId();
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    if (!isOpen) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [isOpen]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onKeyDown]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close"
        className="absolute cursor-pointer inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-[997px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-12px_rgba(10,25,47,0.45)] sm:rounded-[16px]",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <header
          className={cn(
            "flex shrink-0 items-start justify-between gap-4 bg-[#0A192F] px-5 py-5 md:px-6 md:py-6",
            headerClassName
          )}
        >
          <div className="min-w-0 pr-2 pt-0.5">
            <h2
              id={titleId}
              className="font-sans text-[22px] font-bold leading-snug text-white lg:text-[22px]"
            >
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1.5 font-jakarta text-sm leading-snug text-[#72808E] lg:text-[16px]">
                {subtitle}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 cursor-pointer shrink-0 items-center justify-center rounded-lg bg-[#132847] text-white transition hover:bg-[#1a3560] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close dialog"
          >
            <CloseIcon />
          </button>
        </header>
        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto bg-white",
            bodyClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
