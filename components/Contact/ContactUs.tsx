import { Text } from "@/components/ui/Text";
import { EmailIcon, LocationIcon, ClockIcon, CompanyNumberIcon } from "@/components/ui/icons";
import ContactForm from "@/components/Contact/ContactForm";

/* ─── contact info ───────────────────────────────────────────────────────── */

const contactItems = [
  {
    label: "E-mail",
    value: "consultant@accountingntax.co.uk",
    href: "mailto:consultant@accountingntax.co.uk",
    icon: <EmailIcon className="w-7 h-7 md:w-12 md:h-12" />,
  },
  // {
  //   label: "Company Number",
  //   value: "17191390",
  //   icon: <CompanyNumberIcon className="w-7 h-7 md:w-12 md:h-12" />,
  // },
  // {
  //   label: "Office Address",
  //   value: "71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ",
  //   href: "https://www.google.com/maps/search/?api=1&query=71-75+Shelton+Street%2C+Covent+Garden%2C+London%2C+WC2H+9JQ%2C+United+Kingdom",
  //   openInNewTab: true,
  //   icon: <LocationIcon className="w-7 h-7 md:w-11 md:h-11" />,
  // },
  {
    label: "Office Hours",
    value: "Mon–Fri 9am–5:30pm GMT",
    icon: <ClockIcon className="h-7 w-7 md:h-12 md:w-12" />,
  },
  // {
  //   label: "Talk To Us",
  //   value: "+44 XXXX XXXXXX",
  //   href: "tel:+44XXXXXXXXXX",
  //   icon: <PhoneIcon className="w-9 h-9 md:w-[66px] md:h-[66px]" />,
  // },
  // {
  //   label: "Location",
  //   value: "1 Barrington, Uxbridge, UB9 6RJ, UK",
  //   href: "#",
  //   icon: <LocationIcon className="w-7 h-7 md:w-11 md:h-11" />,
  // },
  // {
  //   label: "E-mail For Accountants",
  //   value: "partners@accountingntax.co.uk",
  //   href: "mailto:partners@accountingntax.co.uk",
  //   icon: <EmailIcon className="w-7 h-7 md:w-12 md:h-12" />,
  // },
] as const;

type ContactRow = (typeof contactItems)[number];

export default function ContactUs() {
  return (
    <section
      className="relative z-10 -mt-[60px] rounded-[32px] md:rounded-[50px] bg-white px-4 py-16  md:py-20 xl:px-0 lg:py-[80px]"
      aria-label="Contact us"
    >
      <div className="mx-auto max-w-[1245px]">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-16 xl:gap-24">

          {/* ── Left: contact info ──────────────────────────────────────── */}
          <div className="shrink-0 lg:w-[480px]">
            <Text as="h2" leading="tight" className="tracking-[0px]">
              Send Us Your Query
            </Text>

            <ul className="mt-10 space-y-10">
              {contactItems.map((item) => {
                const row = item as ContactRow;
                const href = "href" in row ? row.href : undefined;
                const openInNewTab = "openInNewTab" in row && row.openInNewTab;
                const linkProps =
                  href !== undefined
                    ? {
                      href,
                      ...(openInNewTab
                        ? {
                          target: "_blank" as const,
                          rel: "noopener noreferrer" as const,
                        }
                        : {}),
                    }
                    : null;

                const iconBoxInteractive =
                  "flex md:h-[79px] h-[60px] md:w-[91px] w-[60px] shrink-0 items-center justify-center rounded-[12px] bg-accent transition hover:bg-accent/90";
                const iconBoxStatic =
                  "flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[12px] bg-accent md:h-[79px] md:w-[91px]";

                return (
                  <li key={row.label} className="flex items-center gap-4">
                    {linkProps ? (
                      <a
                        {...linkProps}
                        className={iconBoxInteractive}
                        aria-label={row.label}
                      >
                        {row.icon}
                      </a>
                    ) : (
                      <div className={iconBoxStatic} aria-hidden>
                        {row.icon}
                      </div>
                    )}
                    <div className="min-w-0">
                      <Text
                        as="p"
                        variant="content"
                        className="text-[20px] font-semibold md:text-[24px]"
                      >
                        {row.label}
                      </Text>
                      {linkProps ? (
                        <a
                          {...linkProps}
                          className="mt-[5px] block font-sans text-[16px] font-medium transition hover:text-accent md:text-[18px]"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="mt-[5px] font-sans text-[16px] font-medium md:text-[18px]">
                          {row.value}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right: form ─────────────────────────────────────────────── */}
          <ContactForm />

        </div>
      </div>
    </section>
  );
}
