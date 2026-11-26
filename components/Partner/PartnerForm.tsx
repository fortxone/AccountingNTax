"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/cn";
import { EXPERTISE_OPTIONS, validatePartnerEnquiry } from "@/lib/partner";

type FormState = {
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
  /** Honeypot: hidden from people, bots tend to fill it in. */
  faxNumber: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  firmName: "",
  website: "",
  contactPerson: "",
  position: "",
  email: "",
  telephone: "",
  officeLocation: "",
  professionalBody: "",
  partners: "",
  experience: "",
  expertise: [],
  agreed: false,
  faxNumber: "",
};

/** Order used to find the first field with an error. */
const FIELD_ORDER: (keyof FormState)[] = [
  "firmName",
  "website",
  "contactPerson",
  "position",
  "email",
  "telephone",
  "officeLocation",
  "professionalBody",
  "partners",
  "experience",
  "expertise",
  "agreed",
];

const inputClass =
  "w-full rounded-[10px] border border-[#D5DBE3] bg-white px-4 py-3 font-sans text-[15px] text-[#1C2A3A] outline-none transition placeholder:text-[#9ca3af] focus:border-surface-deep focus:ring-1 focus:ring-surface-deep/20";

const errorTextClass = "font-sans text-[13px] text-[#e11d48]";

type TextFieldProps = {
  field: keyof FormState;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "url";
  autoComplete?: string;
};

function TextField({
  field,
  label,
  value,
  placeholder,
  onChange,
  error,
  required,
  type = "text",
  inputMode,
  autoComplete,
}: TextFieldProps) {
  const id = `partner-${field}`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-[14px] font-semibold text-[#1C2A3A]">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={field}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required ? true : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, error && "border-[#e11d48] focus:border-[#e11d48]")}
      />
      {error && (
        <p id={errorId} className={errorTextClass}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function PartnerForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function toggleExpertise(option: string) {
    const next = form.expertise.includes(option)
      ? form.expertise.filter((item) => item !== option)
      : [...form.expertise, option];
    setField("expertise", next);
  }

  function focusFirstError(found: Errors) {
    const key = FIELD_ORDER.find((k) => found[k]);
    if (!key) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(`partner-${key}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const { errors: found } = validatePartnerEnquiry(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please check the highlighted fields.");
      focusFirstError(found);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/send-partner-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm(initialState);
      } else {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        toast.error(data?.error ?? "We couldn’t send your application. Please try again.");
      }
    } catch {
      toast.error("We couldn’t send your application. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        role="status"
        className="rounded-[16px] border border-[#E2E8F0] bg-white p-8 text-center shadow-[0_12px_40px_-12px_rgba(15,37,69,0.18)] md:p-12"
      >
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h3 className="mt-5 font-jakarta text-[24px] font-bold text-surface-deep">
          Thank you for filling the form
        </h3>
        <p className="mt-2 font-sans text-[16px] leading-[26px] text-[#475569]">
          We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_12px_40px_-12px_rgba(15,37,69,0.18)] md:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-jakarta text-[20px] font-bold text-surface-deep md:text-[22px]">
          Firm details
        </h3>
        <p className="font-sans text-[13px] text-[#64748b]">* Required fields</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        <TextField
          field="firmName"
          label="Firm name"
          required
          value={form.firmName}
          onChange={(v) => setField("firmName", v)}
          placeholder="Enter registered practice name"
          error={errors.firmName}
          autoComplete="organization"
        />
        <TextField
          field="website"
          label="Website"
          value={form.website}
          onChange={(v) => setField("website", v)}
          placeholder="https://"
          error={errors.website}
          inputMode="url"
          autoComplete="url"
        />
        <TextField
          field="contactPerson"
          label="Contact person"
          required
          value={form.contactPerson}
          onChange={(v) => setField("contactPerson", v)}
          placeholder="Full name"
          error={errors.contactPerson}
          autoComplete="name"
        />
        <TextField
          field="position"
          label="Position / role"
          value={form.position}
          onChange={(v) => setField("position", v)}
          placeholder="e.g. Partner"
          error={errors.position}
          autoComplete="organization-title"
        />
        <TextField
          field="email"
          label="Email address"
          required
          type="email"
          value={form.email}
          onChange={(v) => setField("email", v)}
          placeholder="Business email address"
          error={errors.email}
          autoComplete="email"
        />
        <TextField
          field="telephone"
          label="Telephone"
          required
          type="tel"
          value={form.telephone}
          onChange={(v) => setField("telephone", v)}
          placeholder="Business telephone number"
          error={errors.telephone}
          autoComplete="tel"
        />
        <TextField
          field="officeLocation"
          label="Office location / postcode"
          required
          value={form.officeLocation}
          onChange={(v) => setField("officeLocation", v)}
          placeholder="Town or city, postcode"
          error={errors.officeLocation}
        />
        <TextField
          field="professionalBody"
          label="Professional body / registration"
          value={form.professionalBody}
          onChange={(v) => setField("professionalBody", v)}
          placeholder="e.g. ICAEW, ACCA, ICAS, AAT"
          error={errors.professionalBody}
        />
        <TextField
          field="partners"
          label="Number of partners / principals"
          required
          value={form.partners}
          onChange={(v) => setField("partners", v)}
          placeholder="Enter number"
          error={errors.partners}
          inputMode="numeric"
        />
        <TextField
          field="experience"
          label="Combined practice experience"
          required
          value={form.experience}
          onChange={(v) => setField("experience", v)}
          placeholder="Total years of partners’ experience"
          error={errors.experience}
          inputMode="decimal"
        />
      </div>

      <fieldset
        id="partner-expertise"
        className="mt-8"
        aria-describedby={errors.expertise ? "partner-expertise-error" : undefined}
      >
        <legend className="font-jakarta text-[18px] font-bold text-surface-deep">
          Areas of expertise <span aria-hidden="true">*</span>
          <span className="ml-2 font-sans text-[14px] font-normal text-[#64748b]">
            (Select all that apply)
          </span>
        </legend>

        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 md:grid-flow-col md:grid-cols-3 md:grid-rows-4">
          {EXPERTISE_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 font-sans text-[15px] text-[#1C2A3A]"
            >
              <input
                type="checkbox"
                checked={form.expertise.includes(option)}
                onChange={() => toggleExpertise(option)}
                className="h-5 w-5 shrink-0 cursor-pointer accent-accent"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        {errors.expertise && (
          <p id="partner-expertise-error" className={cn(errorTextClass, "mt-3")}>
            {errors.expertise}
          </p>
        )}
      </fieldset>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 font-sans text-[15px] leading-[24px] text-[#1C2A3A]">
          <input
            id="partner-agreed"
            type="checkbox"
            checked={form.agreed}
            onChange={(e) => setField("agreed", e.target.checked)}
            aria-required="true"
            aria-invalid={errors.agreed ? true : undefined}
            aria-describedby={errors.agreed ? "partner-agreed-error" : undefined}
            className="mt-[3px] h-5 w-5 shrink-0 cursor-pointer accent-accent"
          />
          <span>
            I agree to the{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline underline-offset-2"
            >
              Privacy Policy
            </Link>{" "}
            and consent to being contacted about the partner programme.{" "}
            <span aria-hidden="true">*</span>
          </span>
        </label>
        {errors.agreed && (
          <p id="partner-agreed-error" className={cn(errorTextClass, "mt-2")}>
            {errors.agreed}
          </p>
        )}
      </div>

      {/* Honeypot: off-screen and ignored by people. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label>
          Fax number
          <input
            type="text"
            name="faxNumber"
            tabIndex={-1}
            autoComplete="off"
            value={form.faxNumber}
            onChange={(e) => setField("faxNumber", e.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 flex h-[56px] w-full items-center justify-center rounded-[10px] bg-accent font-jakarta text-[16px] font-bold text-white transition hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit Partner Application"}
      </button>

      <p className="mt-4 text-center font-sans text-[14px] text-[#475569]">
        Our team will review your application and contact you to discuss the next steps.
      </p>
    </form>
  );
}
