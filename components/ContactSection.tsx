"use client";

import { FormEvent, useState } from "react";
import { contactEmail, contactPhone, officeLocations } from "../lib/site";

type ContactSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  source: string;
  accent?: "default" | "academy";
};

const serviceOptions = [
  "ECC",
  "S/4HANA On-Premise",
  "S/4HANA Cloud",
  "Multiple",
  "None",
];

const companySizeOptions = [
  "<500",
  "500-5K",
  "5K-10K",
  "10K+",
];

const initialForm = {
  fullName: "",
  workEmail: "",
  company: "",
  phone: "",
  serviceInterest: serviceOptions[0],
  companySize: companySizeOptions[0],
  message: "",
  subscribe: false,
};

export function ContactSection({
  eyebrow,
  title,
  description,
  source,
  accent = "default",
}: ContactSectionProps) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "We could not submit the form right now.");
      }

      setStatus("success");
      setSubmittedEmail(form.workEmail);
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "We could not submit the form right now.");
    }
  }

  return (
    <section id="contact" className={`section shell section--last contact-section contact-section--${accent}`}>
      <div className="contact-shell" id="contact-form">
        <div className="contact-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>

          <div className="contact-meta">
            <div className="contact-meta__item">
              <span>Email</span>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </div>
            <div className="contact-meta__item">
              <span>Call</span>
              <a href={`tel:${contactPhone.replace(/\s+/g, "")}`}>{contactPhone}</a>
            </div>
            <div className="contact-meta__item">
              <span>Meet us</span>
              <p>{officeLocations.join(" • ")}</p>
            </div>
          </div>
        </div>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <div className="contact-form-grid">
            <label>
              <span>Full name</span>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                required
              />
            </label>

            <label>
              <span>Work email</span>
              <input
                type="email"
                name="workEmail"
                value={form.workEmail}
                onChange={(event) => setForm((current) => ({ ...current, workEmail: event.target.value }))}
                required
              />
            </label>

            <label>
              <span>Company</span>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                required
              />
            </label>

            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              />
            </label>

            <label className="contact-form-grid__full">
              <span>Current SAP system</span>
              <select
                name="serviceInterest"
                value={form.serviceInterest}
                onChange={(event) => setForm((current) => ({ ...current, serviceInterest: event.target.value }))}
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Company size</span>
              <select
                name="companySize"
                value={form.companySize}
                onChange={(event) => setForm((current) => ({ ...current, companySize: event.target.value }))}
              >
                {companySizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="contact-form-grid__full">
              <span>Primary challenge</span>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                required
              />
            </label>

            <label className="contact-form-grid__full contact-subscribe-row">
              <input
                type="checkbox"
                name="subscribe"
                checked={form.subscribe}
                onChange={(event) => setForm((current) => ({ ...current, subscribe: event.target.checked }))}
              />
              <span>I&apos;d like to receive updates on S/4HANA migrations, AMS optimization, and payroll innovations.</span>
            </label>
          </div>

          <div className="contact-form-footer">
            <button type="submit" className="button button--primary" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting..." : "Get Your Consultation"}
            </button>
            <p className={`contact-form-status contact-form-status--${status}`}>
              {status === "success" &&
                `Thank you! We've received your request. An SAP expert will contact you within 24 business hours at ${submittedEmail || "the email you provided"}. In the meantime, explore our case studies and blog for relevant insights.`}
              {status === "error" && errorMessage}
              {(status === "idle" || status === "submitting") &&
                "Describe your current SAP landscape and transformation goals. An SAP expert will contact you within 24 business hours to discuss a tailored roadmap."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
