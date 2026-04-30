import LegalPageContent, { type LegalSection } from "./LegalPageContent";

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    heading: "What Are Cookies?",
    body: (
      <p>
        Cookies are small text files that are placed on your device (computer, tablet, or
        smartphone) when you visit a website. They are widely used to make websites work
        efficiently and to provide information to website owners. Cookies do not harm your
        device, and they cannot access any other files stored on it.
      </p>
    ),
  },
  {
    id: "how-we-use",
    heading: "How We Use Cookies",
    body: (
      <p>
        AccountingNTax.co.uk uses cookies to make our website function correctly, to improve
        your experience, and to understand how visitors interact with our pages. We use only
        the types of cookies described below. We do not use cookies for advertising or
        retargeting purposes, and we do not share cookie data with advertising networks.
      </p>
    ),
  },
  {
    id: "types",
    heading: "Types of Cookies We Use",
    body: (
      <>
        <div className="mt-1 flex flex-col gap-5">
          {/* Strictly necessary */}
          <div className="rounded-[10px] border border-[#EEF0F4] bg-[#F8F9FB] p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#0D7377] px-2.5 py-0.5 font-sans text-[11px] font-bold uppercase tracking-wide text-white">
                Strictly Necessary
              </span>
            </div>
            <p className="text-[14px] leading-relaxed text-[#3A4A5C]">
              These cookies are essential for the website to function. They enable core
              features such as page navigation and security. Without them, the site cannot
              work properly. These cookies cannot be disabled.
            </p>
            <table className="mt-3 w-full border-collapse font-sans text-[13px]">
              <thead>
                <tr className="border-b border-[#EEF0F4]">
                  <th className="pb-1.5 pr-4 text-left font-semibold text-[#64748b]">Name</th>
                  <th className="pb-1.5 pr-4 text-left font-semibold text-[#64748b]">Purpose</th>
                  <th className="pb-1.5 text-left font-semibold text-[#64748b]">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF0F4]">
                <tr>
                  <td className="py-2 pr-4 font-mono text-[12px] text-[#0F2545]">__session</td>
                  <td className="py-2 pr-4 text-[#3A4A5C]">Maintains your session state during your visit</td>
                  <td className="py-2 text-[#3A4A5C]">Session</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-[12px] text-[#0F2545]">csrf_token</td>
                  <td className="py-2 pr-4 text-[#3A4A5C]">Protects against cross-site request forgery attacks</td>
                  <td className="py-2 text-[#3A4A5C]">Session</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Functional */}
          <div className="rounded-[10px] border border-[#EEF0F4] bg-[#F8F9FB] p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#0F2545] px-2.5 py-0.5 font-sans text-[11px] font-bold uppercase tracking-wide text-white">
                Functional
              </span>
            </div>
            <p className="text-[14px] leading-relaxed text-[#3A4A5C]">
              Functional cookies allow the website to remember choices you have made (such as
              your assessment progress) and provide enhanced, more personalised features.
            </p>
            <table className="mt-3 w-full border-collapse font-sans text-[13px]">
              <thead>
                <tr className="border-b border-[#EEF0F4]">
                  <th className="pb-1.5 pr-4 text-left font-semibold text-[#64748b]">Name</th>
                  <th className="pb-1.5 pr-4 text-left font-semibold text-[#64748b]">Purpose</th>
                  <th className="pb-1.5 text-left font-semibold text-[#64748b]">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF0F4]">
                <tr>
                  <td className="py-2 pr-4 font-mono text-[12px] text-[#0F2545]">ant_prefs</td>
                  <td className="py-2 pr-4 text-[#3A4A5C]">Stores your cookie consent preferences</td>
                  <td className="py-2 text-[#3A4A5C]">12 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Analytics */}
          <div className="rounded-[10px] border border-[#EEF0F4] bg-[#F8F9FB] p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#64748b] px-2.5 py-0.5 font-sans text-[11px] font-bold uppercase tracking-wide text-white">
                Analytics
              </span>
              <span className="font-sans text-[11px] italic text-[#64748b]">requires consent</span>
            </div>
            <p className="text-[14px] leading-relaxed text-[#3A4A5C]">
              Analytics cookies help us understand how visitors interact with our website by
              collecting and reporting information anonymously. This helps us improve the
              experience for everyone.
            </p>
            <table className="mt-3 w-full border-collapse font-sans text-[13px]">
              <thead>
                <tr className="border-b border-[#EEF0F4]">
                  <th className="pb-1.5 pr-4 text-left font-semibold text-[#64748b]">Name</th>
                  <th className="pb-1.5 pr-4 text-left font-semibold text-[#64748b]">Purpose</th>
                  <th className="pb-1.5 text-left font-semibold text-[#64748b]">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF0F4]">
                <tr>
                  <td className="py-2 pr-4 font-mono text-[12px] text-[#0F2545]">_ga</td>
                  <td className="py-2 pr-4 text-[#3A4A5C]">Google Analytics — distinguishes unique users</td>
                  <td className="py-2 text-[#3A4A5C]">2 years</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-[12px] text-[#0F2545]">_ga_*</td>
                  <td className="py-2 pr-4 text-[#3A4A5C]">Google Analytics — maintains session state</td>
                  <td className="py-2 text-[#3A4A5C]">2 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "third-party",
    heading: "Third-Party Cookies",
    body: (
      <>
        <p>
          Some cookies on our website are set by third-party services. These include:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Google Analytics</strong> — to understand website traffic and usage
            patterns. Google may process this data in accordance with their own privacy
            policy. You can opt out via{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D7377] underline hover:no-underline"
            >
              Google&rsquo;s opt-out tool
            </a>
            .
          </li>
          <li>
            <strong>Google Meet / Google Calendar</strong> — if you book a consultation,
            we use Google services to schedule and host the call. These services may set
            their own cookies in accordance with{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D7377] underline hover:no-underline"
            >
              Google&rsquo;s Privacy Policy
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "manage",
    heading: "Managing & Disabling Cookies",
    body: (
      <>
        <p>
          You can control and manage cookies in several ways:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Browser settings</strong> — most browsers allow you to block or delete
            cookies through their settings. Please note that blocking all cookies may affect
            the functionality of our website.
          </li>
          <li>
            <strong>Our cookie preferences</strong> — when you first visit our site, you
            will be asked to consent to non-essential cookies. You can update your
            preferences at any time by clearing the <code className="rounded bg-[#EEF0F4] px-1 py-0.5 font-mono text-[12px]">ant_prefs</code> cookie
            in your browser and reloading the page.
          </li>
          <li>
            <strong>Third-party opt-outs</strong> — you can opt out of Google Analytics
            tracking using the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D7377] underline hover:no-underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </li>
        </ul>
        <p className="mt-3">
          For more information about managing cookies, visit{" "}
          <a
            href="https://www.allaboutcookies.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0D7377] underline hover:no-underline"
          >
            allaboutcookies.org
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    body: (
      <p>
        We may update this Cookie Policy from time to time, for example as new cookie types
        are introduced or legislation changes. The &ldquo;Last updated&rdquo; date shown on
        this page will always reflect the most recent revision. We encourage you to review
        this policy periodically.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact Us",
    body: (
      <p>
        If you have any questions about our use of cookies or this Cookie Policy, please
        contact us at{" "}
        <a
          href="mailto:consultant@accountingntax.co.uk"
          className="text-[#0D7377] underline hover:no-underline"
        >
          consultant@accountingntax.co.uk
        </a>
        .
      </p>
    ),
  },
];

export default function CookiePolicy() {
  return (
    <LegalPageContent
      lastUpdated="15 April 2026"
      intro={
        <p>
          This Cookie Policy explains what cookies are, how AccountingNTax.co.uk uses them,
          the types of cookies we set, and your choices regarding their use. It should be read
          alongside our{" "}
          <a href="/privacy" className="text-[#0D7377] underline hover:no-underline">
            Privacy Policy
          </a>
          , which sets out more detail on how we handle your personal data generally.
        </p>
      }
      sections={sections}
    />
  );
}
