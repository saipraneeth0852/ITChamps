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
  "S/4HANA Migration",
  "SAP AMS Support",
  "SuccessFactors",
  "Global Payroll",
  "ITChamps Academy",
  "Other",
];

const initialForm = {
  fullName: "",
  workEmail: "",
  company: "",
  phone: "",
  serviceInterest: serviceOptions[0],
  message: "",
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
              <span>Service interest</span>
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

            <label className="contact-form-grid__full">
              <span>How can we help?</span>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                required
              />
            </label>
          </div>

          <div className="contact-form-footer">
            <button type="submit" className="button button--primary" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting..." : "Submit Message"}
            </button>
            <p className={`contact-form-status contact-form-status--${status}`}>
              {status === "success" && "Thanks. Your enquiry has been received and routed to the team."}
              {status === "error" && errorMessage}
              {(status === "idle" || status === "submitting") &&
                "Use the same direct inquiry flow as the current site, but with structured fields and cleaner routing."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
