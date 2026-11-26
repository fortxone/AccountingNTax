"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import WebDrawer from "@/components/ui/WebDrawer";
import Button from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/ShadCnDrawer";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/our-services", label: "Our Services" },
    { href: "/my-accountant", label: "Find My Accountant" },
    { href: "/become-a-partner", label: "Become a Partner" },
] as const;

export default function Navbar() {
    const pathname = usePathname();

    return (
        <>
            {/* ── Desktop ───────────────────────────────────────────────── */}
            <nav
                aria-label="Site navigation"
                className={cn(
                    // positioning
                    "absolute left-1/2 top-[75px] z-50 -translate-x-1/2",
                    // size
                    "hidden h-[87px] w-full max-w-[1245px] lg:flex",
                    // layout
                    "items-center justify-between",
                    // spacing
                    "px-[43px] py-[19px] ",
                    // visual
                    "rounded-[10px] border-[0.5px] border-[#ffffff5c] bg-[#FFFFFF33] backdrop-blur-[25px]"
                )}
            >
                {/* Logo */}
                <Link href="/" className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    <Image
                        src="/images/logo.svg"
                        alt="AccountingNTax"
                        width={243}
                        height={153}
                        priority
                        className="h-[80px] w-auto"
                    />
                </Link>

                <ul className="flex shrink-0 items-center gap-6 lg:gap-[42px]">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "relative whitespace-nowrap font-jakarta text-[14px] font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                                        "after:absolute after:bottom-[-10px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-accent after:transition-opacity",
                                        isActive ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-100"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <Button
                    href="/contact-us"
                    className="md:h-[49px] md:w-[140px] h-[40px] md:py-[8px] md:px-[24px] md:text-[14px] md:leading-0 w-auto min-w-[140px] text-[14px] shrink-0 rounded-[12px] px-6 py-2"
                >
                    Contact Us
                </Button>
            </nav>

            {/* ── Mobile ───────────────────────────────────────────────── */}
            <div
                className={cn(
                    "absolute left-4 right-4 top-[20px] z-50 lg:hidden",
                    "flex items-center justify-between",
                    "rounded-[10px] border-[0.5px] border-[#ffffff5c] bg-[#FFFFFF33] px-4 py-1 backdrop-blur-[25px]"
                )}
            >
                <Link href="/" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    <Image
                        src="/images/logo.svg"
                        alt="AccountingNTax"
                        width={243}
                        height={153}
                        priority
                        className="h-[64px] w-auto"
                    />
                </Link>

                <WebDrawer>
                    <nav className="flex h-full flex-col items-center justify-center">
                        <ul className="flex w-full flex-col">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <DrawerClose asChild>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "block border-b border-white/10 py-5 text-center text-base md:text-[24px] font-medium text-white/70 transition-colors hover:text-white",
                                                pathname === link.href && "font-semibold text-white"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </DrawerClose>
                                </li>
                            ))}
                        </ul>

                        <DrawerClose asChild>
                            <Button
                                href="/contact-us"
                                className="mt-6 h-[40px] w-[140px] rounded-[8px]"
                            >
                                Contact Us
                            </Button>
                        </DrawerClose>
                    </nav>
                </WebDrawer>
            </div>
        </>
    );
}
