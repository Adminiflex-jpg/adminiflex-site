"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

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
      company: (form.elements.namedItem("company") as HTMLInputElement).value, // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus({ ok: true, msg: "Bedankt! Je bericht is verzonden." });
        form.reset();
      } else {
        setStatus({ ok: false, msg: "Verzenden mislukt. Probeer het opnieuw." });
      }
    } catch {
      setStatus({ ok: false, msg: "Verzenden mislukt. Controleer je verbinding." });
    } finally {
      setLoading(false);
    }
  }

  const oldGreen = "#2F6B4F";

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-6 py-16">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-2 text-zinc-700">
        Stel je vraag of plan een demo. We reageren doorgaans binnen één werkdag.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        {/* Honeypot (verborgen) */}
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

        <div>
          <label className="block text-sm mb-1">Naam</label>
          <input name="name" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">E-mail</label>
          <input name="email" type="email" required className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Onderwerp</label>
          <input name="subject" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Bericht</label>
          <textarea name="message" required rows={6} className="w-full border rounded-md px-3 py-2" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-md text-white font-medium disabled:opacity-60"
          style={{ backgroundColor: oldGreen }}
        >
          {loading ? "Verzenden…" : "Verstuur bericht"}
        </button>

        {status && (
          <div className={`text-sm ${status.ok ? "text-emerald-700" : "text-red-600"}`}>
            {status.msg}
          </div>
        )}
      </form>
    </main>
  );
}
