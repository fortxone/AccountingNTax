/**
 * Shared by the partner form (browser) and /api/send-partner-enquiry (server),
 * so both sides apply exactly the same rules. Keep this file free of
 * server-only imports.
 */

export const EXPERTISE_OPTIONS = [
  "Personal tax / Self Assessment",
  "Sole traders / partnerships",
  "HMRC enquiries / investigations",
  "Start-ups & SMEs",
  "Limited company accounts",
  "VAT registration & returns",
  "Property & landlord tax",
  "Audit / assurance",
  "Corporation tax",
  "Bookkeeping & payroll",
  "Tax planning / advisory",
  "Other specialist services",
] as const;

export type PartnerEnquiry = {
  firmName: string;
  website: string;
  contactPerson: string;
  position: string;
  email: string;
  telephone: string;
  officeLocation: string;
  professionalBody: string;
  partners: string;
  experience: string;
  expertise: string[];
  agreed: boolean;
};

export type PartnerErrors = Partial<Record<keyof PartnerEnquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Returns "" when empty, a clean http(s) URL when valid, or null when invalid. */
function normaliseWebsite(raw: string): string | null {
  if (!raw) return "";
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export function validatePartnerEnquiry(input: Record<string, unknown>): {
  data: PartnerEnquiry | null;
  errors: PartnerErrors;
} {
  const errors: PartnerErrors = {};

  const firmName = text(input.firmName, 150);
  const contactPerson = text(input.contactPerson, 100);
  const position = text(input.position, 100);
  const email = text(input.email, 150);
  const telephone = text(input.telephone, 30);
  const officeLocation = text(input.officeLocation, 150);
  const professionalBody = text(input.professionalBody, 150);
  const partners = text(input.partners, 6);
  const experience = text(input.experience, 6);
  const website = normaliseWebsite(text(input.website, 200));

  if (!firmName) errors.firmName = "Enter your firm’s registered name.";
  if (!contactPerson) errors.contactPerson = "Enter the name of your contact person.";

  if (!email) {
    errors.email = "Enter your business email address.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address, like name@firm.co.uk.";
  }

  if (!telephone) {
    errors.telephone = "Enter your business telephone number.";
  } else if (!PHONE_RE.test(telephone)) {
    errors.telephone = "Enter a valid telephone number.";
  }

  if (!officeLocation) errors.officeLocation = "Enter your town or city and postcode.";

  if (!partners) {
    errors.partners = "Enter the number of partners or principals.";
  } else if (!/^\d{1,4}$/.test(partners) || Number(partners) < 1) {
    errors.partners = "Enter a whole number, 1 or more.";
  }

  if (!experience) {
    errors.experience = "Enter the combined years of experience.";
  } else if (!/^\d{1,4}(\.\d)?$/.test(experience)) {
    errors.experience = "Enter a number of years, like 25.";
  }

  if (website === null) {
    errors.website = "Enter a valid website address, like https://yourfirm.co.uk.";
  }

  const selected = new Set<unknown>(
    Array.isArray(input.expertise) ? input.expertise : []
  );
  const expertise = EXPERTISE_OPTIONS.filter((option) => selected.has(option));
  if (expertise.length === 0) {
    errors.expertise = "Select at least one area of expertise.";
  }

  if (input.agreed !== true) {
    errors.agreed = "Agree to the Privacy Policy so we can contact you.";
  }

  if (Object.keys(errors).length > 0) {
    return { data: null, errors };
  }

  return {
    data: {
      firmName,
      website: website ?? "",
      contactPerson,
      position,
      email,
      telephone,
      officeLocation,
      professionalBody,
      partners,
      experience,
      expertise: [...expertise],
      agreed: true,
    },
    errors,
  };
}
