import LegalPageContent, { type LegalSection } from "./LegalPageContent";

const linkClass = "text-[#0D7377] underline hover:no-underline";

const detailTableClass =
  "mt-4 w-full border-collapse overflow-hidden rounded-[10px] border border-[#EEF0F4] bg-[#F8F9FB] font-sans text-[14px] md:text-[15px]";

const sections: LegalSection[] = [
  {
    id: "company-information",
    heading: "Company Information",
    body: (
      <>
        <p className="font-medium text-[#0F2545]">Information Details</p>
        <table className={detailTableClass}>
          <tbody className="divide-y divide-[#EEF0F4]">
            <tr>
              <th
                scope="row"
                className="w-[min(40%,200px)] shrink-0 px-4 py-3 text-left font-semibold text-[#64748b] align-top"
              >
                Company Name
              </th>
              <td className="px-4 py-3 text-[#3A4A5C]">ACCOUNTINGNTAX LIMITED</td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-4 py-3 text-left font-semibold text-[#64748b] align-top"
              >
                Company Number
              </th>
              <td className="px-4 py-3 text-[#3A4A5C]">17191390</td>
            </tr>
            <tr>
              <td colSpan={2} className="px-4 py-3 text-[#3A4A5C]">
                Registered in England and Wales
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-4 py-3 text-left font-semibold text-[#64748b] align-top"
              >
                Registered Office Address
              </th>
              <td className="px-4 py-3 text-[#3A4A5C]">
                71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-4 py-3 text-left font-semibold text-[#64748b] align-top"
              >
                VAT Registration
              </th>
              <td className="px-4 py-3 text-[#3A4A5C]">Not applicable</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "website-and-service",
    heading: "Website and Service",
    body: (
      <>
        <p>
          AccountingNTax.co.uk is an accountant-matching platform. We help individuals and
          businesses in the United Kingdom find accountants or accounting firms that may be
          suitable for their needs.
        </p>
        <p className="mt-3">
          We are not an accounting firm and we do not provide accounting, tax, legal, financial,
          or investment advice. Any engagement entered into with an accountant or accounting firm
          introduced through our platform is solely between you and that accountant or accounting
          firm.
        </p>
      </>
    ),
  },
  {
    id: "contact-details",
    heading: "Contact Details",
    body: (
      <>
        <p>
          For general enquiries, support requests, or questions about our service, please
          contact us at{" "}
          <a href="mailto:consultant@accountingntax.co.uk" className={linkClass}>
            consultant@accountingntax.co.uk
          </a>
          .
        </p>
        <p className="mt-4 font-medium text-[#0F2545]">Information Details</p>
        <table className={detailTableClass}>
          <tbody className="divide-y divide-[#EEF0F4]">
            <tr>
              <th
                scope="row"
                className="w-[min(40%,200px)] shrink-0 px-4 py-3 text-left font-semibold text-[#64748b]"
              >
                Website
              </th>
              <td className="px-4 py-3 text-[#3A4A5C]">AccountingNTax.co.uk</td>
            </tr>
            <tr>
              <th scope="row" className="px-4 py-3 text-left font-semibold text-[#64748b]">
                Email
              </th>
              <td className="px-4 py-3 text-[#3A4A5C]">
                <a href="mailto:consultant@accountingntax.co.uk" className={linkClass}>
                  consultant@accountingntax.co.uk
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    body: (
      <p>
        Unless otherwise stated, the content on AccountingNTax.co.uk, including text, graphics,
        logos, icons, images, and website materials, is owned by or licensed to ACCOUNTINGNTAX
        LIMITED. You may not reproduce, distribute, modify, or use website content without our
        prior written permission, except where permitted by law.
      </p>
    ),
  },
  {
    id: "no-fee-to-users",
    heading: "No Fee to Users",
    body: (
      <p>
        AccountingNTax.co.uk is free for users seeking an accountant. We do not charge users a
        subscription fee, introduction fee, or commission for using our accountant-matching
        service.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to This Legal Notice",
    body: (
      <p>
        We may update this Legal Notice from time to time to reflect changes to our company
        information, website, services, or legal requirements. The &ldquo;Last updated&rdquo;
        date at the top of this document will show when it was most recently revised.
      </p>
    ),
  },
];

export default function LegalNotice() {
  return (
    <LegalPageContent
      lastUpdated="1 May 2026"
      intro={
        <>
          <p>
            This Legal Notice provides company and website information for
            AccountingNTax.co.uk.
          </p>
          <p className="mt-3">
            AccountingNTax.co.uk is operated by ACCOUNTINGNTAX LIMITED, a private limited company
            registered in England and Wales.
          </p>
          <p className="mt-3">
            AccountingNTax.co.uk provides an accountant-matching service to help users find and
            compare suitable accounting firms based on their requirements.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
