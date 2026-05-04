import LegalPageContent, { type LegalSection } from "./LegalPageContent";

const linkClass = "text-[#0D7377] underline hover:no-underline";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using the AccountingNTax.co.uk website and matching service, you
        confirm that you have read, understood, and agree to be bound by these Terms &amp;
        Conditions. If you do not agree, please do not use our service. These terms apply to
        all visitors, users, and anyone who accesses or uses our platform.
      </p>
    ),
  },
  {
    id: "our-service",
    heading: "Our Service",
    body: (
      <>
        <p>
          AccountingNTax.co.uk is a free-to-use accountant-matching platform. We help
          individuals and businesses in the United Kingdom find suitable accountants or
          accounting firms based on their specific requirements. Our service includes:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>
            An online assessment to understand your accounting needs and circumstances.
          </li>
          <li>
            A free 30-minute consultation to better understand your requirements and the type
            of accounting support you need.
          </li>
          <li>
            Where available, obtaining quotes from at least two suitable accounting firms based
            on your requirements.
          </li>
          <li>
            Helping you compare your options and choose the firm that best suits your business.
          </li>
        </ul>
        <p className="mt-3">
          We aim to obtain quotes from at least two suitable accounting firms where available.
          In some cases, depending on your requirements, location, sector, budget, complexity,
          or firm availability, we may provide fewer suitable options.
        </p>
        <p className="mt-3">
          We are a matching service only. We are not an accounting firm, do not provide
          accounting, tax, or financial advice ourselves, and are not responsible for the
          services provided by any accountant or accounting firm introduced through our
          platform.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    heading: "Eligibility",
    body: (
      <p>
        Our service is available to individuals aged 18 or over and to businesses operating
        legally in the United Kingdom. By using our service, you confirm that you meet these
        requirements and that all information you provide is accurate, current, and complete.
        We reserve the right to refuse or terminate access to our service at our discretion.
      </p>
    ),
  },
  {
    id: "free-service",
    heading: "No Fee to Users",
    body: (
      <p>
        Our matching and consultation-booking service is completely free of charge to
        individuals and businesses seeking an accountant. We do not charge any subscription
        fee, introduction fee, or commission from users. Accountants or accounting firms in
        our network may have a commercial arrangement with us, which may include referral,
        introduction, marketing, or listing fees. This does not create any obligation on your
        part.
      </p>
    ),
  },
  {
    id: "accountant-network",
    heading: "Our Accountant Network",
    body: (
      <>
        <p>
          We aim to work with accountants and accounting firms who have relevant experience,
          qualifications, professional standing, or sector knowledge. As part of our matching
          process, we may consider information such as areas of specialism, experience, service
          offering, location, availability, and suitability for your requirements.
        </p>
        <p className="mt-3 font-medium">However:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            We do not guarantee the suitability, performance, qualifications, regulatory
            status, availability, or quality of any specific accountant or accounting firm for
            your particular circumstances.
          </li>
          <li>
            Any engagement, contract, or arrangement entered into between you and a matched
            accountant or accounting firm is solely between you and that accountant or
            accounting firm. We are not a party to such arrangements.
          </li>
          <li>
            You are responsible for carrying out your own due diligence before engaging any
            accountant or accounting firm introduced through our platform, including checking
            qualifications, professional memberships, insurance, fees, engagement terms, and
            suitability.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "consultations",
    heading: "Introductory Consultations",
    body: (
      <>
        <p>
          The free 30-minute introductory consultation facilitated by AccountingNTax.co.uk is
          an exploratory session only. It does not constitute formal accounting, tax, or
          financial advice, and does not create a client–accountant relationship unless both
          parties subsequently agree to engage.
        </p>
        <p className="mt-3">
          Consultation slots are subject to availability. We endeavour to offer accurate
          real-time availability; however, we cannot guarantee that a selected slot will remain
          available until the booking is confirmed. If a slot becomes unavailable, we will
          contact you to arrange an alternative.
        </p>
        <p className="mt-3">
          If you need to cancel or reschedule, please contact us at least 24 hours in advance
          at{" "}
          <a href="mailto:consultant@accountingntax.co.uk" className={linkClass}>
            consultant@accountingntax.co.uk
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "user-conduct",
    heading: "Your Conduct",
    body: (
      <>
        <p>When using our service, you agree not to:</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          <li>Provide false, misleading, or incomplete information in the assessment.</li>
          <li>Use our service for any unlawful or fraudulent purpose.</li>
          <li>
            Attempt to gain unauthorised access to any part of our website or systems.
          </li>
          <li>
            Harass, abuse, or threaten any accountant, accounting firm, or member of our team.
          </li>
          <li>
            Use automated tools, bots, or scrapers to access or collect data from our website
            without our prior written consent.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    body: (
      <p>
        All content on the AccountingNTax.co.uk website &mdash; including text, graphics,
        logos, icons, images, and software &mdash; is owned by or licensed to ACCOUNTINGNTAX
        LIMITED and is protected by UK and international copyright and intellectual property
        laws. You may not reproduce, distribute, modify, or create derivative works from any
        content on this website without our express written permission.
      </p>
    ),
  },
  {
    id: "limitation-liability",
    heading: "Limitation of Liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by applicable law, ACCOUNTINGNTAX LIMITED shall not
          be liable for any indirect, incidental, special, consequential, or punitive damages
          arising out of or in connection with your use of our service or your reliance on any
          information provided through it.
        </p>
        <p className="mt-3">
          Our total liability to you for any claim arising out of or in connection with these
          terms or our service shall not exceed £100. Nothing in these terms limits our
          liability for death or personal injury caused by our negligence, fraud or fraudulent
          misrepresentation, or any other liability that cannot be excluded under English law.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    heading: "Third-Party Links",
    body: (
      <p>
        Our website may contain links to third-party websites, including those of accountants
        or accounting firms in our network. These links are provided for your convenience and do
        not constitute an endorsement. We have no control over the content or practices of
        third-party sites and accept no responsibility for them. You access such sites at your
        own risk.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    body: (
      <p>
        These Terms &amp; Conditions are governed by and construed in accordance with the laws
        of England and Wales. Any disputes arising out of or in connection with these terms
        shall be subject to the exclusive jurisdiction of the courts of England and Wales.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to These Terms",
    body: (
      <p>
        We reserve the right to update or modify these Terms &amp; Conditions at any time.
        Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date.
        Your continued use of our service after any changes are posted constitutes your
        acceptance of the revised terms. If you disagree with any changes, you should stop
        using our service.
      </p>
    ),
  },
];

export default function TermsAndConditions() {
  return (
    <LegalPageContent
      lastUpdated="1 May 2026"
      intro={
        <>
          <p>
            These Terms &amp; Conditions govern your use of the AccountingNTax.co.uk website
            and accountant-matching service, operated by ACCOUNTINGNTAX LIMITED (company number
            17191390), registered in England and Wales. Registered office: 71-75 Shelton
            Street, Covent Garden, London, United Kingdom, WC2H 9JQ.
          </p>
          <p className="mt-3">
            Please read these terms carefully before using our service. By accessing or using
            AccountingNTax.co.uk in any way, you agree to be bound by these terms.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
