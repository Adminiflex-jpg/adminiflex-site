// app/contact/page.tsx
"use client";

import React, { useState } from "react";
import { BRAND_GREEN } from "../../lib/theme";
import PublicFormLayout from "../components/PublicFormLayout";

export default function ContactPage() {
  const oldGreen = BRAND_GREEN;

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(
    null
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      // honeypot (bot-detectie)
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus({
          ok: true,
          msg: "Bedankt voor uw contact met AdminiFlex. Wij proberen binnen 5 werkdagen te reageren op uw vraag.",
        });
        form.reset();
      } else {
        setStatus({ ok: false, msg: "Verzenden mislukt. Probeer het opnieuw." });
      }
    } catch {
      setStatus({
        ok: false,
        msg: "Verzenden mislukt. Controleer uw internetverbinding en probeer het opnieuw.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicFormLayout
      title="Contact"
      description="Heeft u een vraag of wilt u een demo plannen? Laat uw gegevens achter; wij nemen contact met u op."
    >
      <form
        onSubmit={onSubmit}
        className="mt-8 bg-white border rounded-2xl p-6 shadow-sm grid gap-4"
      >
        {/* Honeypot (verborgen veld voor bots) */}
        <input
          type="text"
          name="company"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Naam *</label>
            <input
              name="name"
              required
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">E-mailadres *</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Onderwerp</label>
          <input
            name="subject"
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bericht *</label>
          <textarea
            name="message"
            required
            rows={6}
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="pt-2 grid gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-md text-white font-medium disabled:opacity-60"
            style={{ backgroundColor: oldGreen }}
          >
            {loading ? "Verzenden…" : "Verstuur bericht"}
          </button>

          {status ? (
            <div className={`text-sm ${status.ok ? "text-emerald-700" : "text-red-600"}`}>
              {status.msg}
            </div>
          ) : null}
        </div>
      </form>
    </PublicFormLayout>
  );
}
