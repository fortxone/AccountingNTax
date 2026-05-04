import LegalPageContent, { type LegalSection } from "./LegalPageContent";

const linkClass = "text-[#0D7377] underline hover:no-underline";

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who We Are",
    body: (
      <>
        <p>
          AccountingNTax.co.uk is operated by ACCOUNTINGNTAX LIMITED (company number 17191390),
          registered in England and Wales. Registered office: 71-75 Shelton Street, Covent
          Garden, London, United Kingdom, WC2H 9JQ.
        </p>
        <p className="mt-3">
          We are the data controller for all personal information collected through this website
          and our matching service. If you have any questions about how we handle your data,
          please contact us at{" "}
          <a href="mailto:consultant@accountingntax.co.uk" className={linkClass}>
            consultant@accountingntax.co.uk
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    heading: "Information We Collect",
    body: (
      <>
        <p>We collect information you provide directly when using our service, including:</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Contact details</strong> — your name, email address, and phone number when
            you complete our assessment or contact us.
          </li>
          <li>
            <strong>Assessment responses</strong> — your answers about your business type,
            size, sector, required accounting services, and budget range.
          </li>
          <li>
            <strong>Consultation booking details</strong> — your preferred date and time for
            an introductory consultation.
          </li>
          <li>
            <strong>Correspondence</strong> — messages you send us via our contact form or by
            email.
          </li>
        </ul>
        <p className="mt-3">
          We also collect certain technical data automatically when you visit our website,
          such as your IP address, browser type, device type, and pages visited. This is
          collected via cookies and analytics tools where permitted. Please see our{" "}
          <a href="/cookie-policy" className={linkClass}>
            Cookie Policy
          </a>{" "}
          for details.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "How We Use Your Information",
    body: (
      <>
        <p>We use your personal information to:</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            Match you with suitable accountants or accounting firms in our network based on
            your requirements.
          </li>
          <li>
            Arrange and confirm free introductory consultations, including sending calendar
            invites and Google Meet links where applicable.
          </li>
          <li>
            Communicate with you about your enquiry, including sending confirmation emails and
            follow-up messages.
          </li>
          <li>Respond to your questions and support requests.</li>
          <li>
            Improve our website and matching service based on how users interact with them.
          </li>
          <li>
            Comply with legal obligations, including maintaining records for accounting and
            fraud-prevention purposes.
          </li>
        </ul>
        <p className="mt-3">
          We will not use your information for automated decision-making that produces legal
          or similarly significant effects without your consent.
        </p>
      </>
    ),
  },
  {
    id: "legal-basis",
    heading: "Our Legal Basis for Processing",
    body: (
      <>
        <p>
          Under the UK GDPR and the Data Protection Act 2018, we rely on the following legal
          bases:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Contract performance</strong> — processing is necessary to provide the
            matching and consultation-booking service you have requested.
          </li>
          <li>
            <strong>Legitimate interests</strong> — to improve our service, prevent fraud, and
            maintain the security of our platform, where those interests are not overridden by
            your rights.
          </li>
          <li>
            <strong>Consent</strong> — for any optional marketing communications or
            non-essential cookies, where we ask for your agreement first.
          </li>
          <li>
            <strong>Legal obligation</strong> — where we are required to retain or share data
            by law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Who We Share Your Data With",
    body: (
      <>
        <p>
          We share your personal information only where necessary and with appropriate
          safeguards in place:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Matched accountants or accounting firms</strong> — we share your name,
            contact details, and relevant assessment summary with the accountant(s) or
            accounting firm(s) we match you with, so they can assess your requirements and
            prepare for any introductory consultation.
          </li>
          <li>
            <strong>Google</strong> — we may use Google Calendar and Google Meet to schedule
            consultations. Your name and email address may be included in calendar invites.
          </li>
          <li>
            <strong>Email service providers</strong> — we use Gmail / Google Workspace to send
            confirmation and notification emails.
          </li>
          <li>
            <strong>Analytics providers</strong> — anonymised or aggregated usage data may be
            processed by our analytics tools where you have consented to analytics cookies.
            Please see our{" "}
            <a href="/cookie-policy" className={linkClass}>
              Cookie Policy
            </a>
            .
          </li>
          <li>
            <strong>Legal and regulatory bodies</strong> — we may disclose information if
            required by law, court order, or to protect the rights and safety of our users and
            the public.
          </li>
        </ul>
        <p className="mt-3">
          We do not sell your personal information to third parties, and we do not share it for
          advertising purposes.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "How Long We Keep Your Data",
    body: (
      <>
        <p>
          We retain your personal information only for as long as necessary for the purposes
          described in this policy, or as required by law.
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            Assessment and booking data is kept for up to 12 months from your last interaction,
            after which it is securely deleted or anonymised unless we have a lawful reason to
            retain it for longer.
          </li>
          <li>
            Contact form enquiries are retained for up to 24 months in case of follow-up or
            disputes.
          </li>
          <li>
            Records we are legally required to retain, such as records relevant to tax or
            accounting, may be kept for up to 6 years in line with applicable record-keeping
            requirements.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    body: (
      <>
        <p>
          Under UK data protection law, you have the following rights regarding your personal
          information:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Right of access</strong> — you can request a copy of the personal data we
            hold about you.
          </li>
          <li>
            <strong>Right to rectification</strong> — you can ask us to correct inaccurate or
            incomplete data.
          </li>
          <li>
            <strong>Right to erasure</strong> — you can ask us to delete your data where there
            is no overriding legal reason to retain it.
          </li>
          <li>
            <strong>Right to restriction</strong> — you can ask us to limit how we use your data
            in certain circumstances.
          </li>
          <li>
            <strong>Right to portability</strong> — you can request your data in a structured,
            machine-readable format.
          </li>
          <li>
            <strong>Right to object</strong> — you can object to processing based on legitimate
            interests or for direct marketing.
          </li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, please email us at{" "}
          <a href="mailto:consultant@accountingntax.co.uk" className={linkClass}>
            consultant@accountingntax.co.uk
          </a>
          . We will respond without undue delay and normally within one calendar month. Where a
          request is complex or you have made multiple requests, we may extend this by up to two
          further months, and we will inform you if this applies. You also have the right to
          lodge a complaint with the{" "}
          <a
            href="https://ico.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Information Commissioner&rsquo;s Office (ICO)
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Data Security",
    body: (
      <p>
        We take appropriate technical and organisational measures to protect your personal
        information against unauthorised access, loss, or destruction. Our website is served
        over HTTPS, and access to personal data is restricted to authorised personnel only.
        However, no method of transmission over the internet is completely secure, and we
        cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our
        practices or legal requirements. The &ldquo;Last updated&rdquo; date at the top of this
        page will always show when the policy was most recently revised. We encourage you to
        review this page periodically. Continued use of our service after any changes
        constitutes acceptance of the updated policy.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPageContent
      lastUpdated="1 May 2026"
      intro={
        <p>
          At AccountingNTax.co.uk, we take the privacy and security of your personal information
          seriously. This Privacy Policy explains what data we collect, why we collect it, how we
          use and protect it, and your rights under UK data protection law, including the UK GDPR
          and the Data Protection Act 2018. Please read this policy carefully before using our
          service.
        </p>
      }
      sections={sections}
    />
  );
}
