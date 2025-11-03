// app/page.tsx
import React from "react";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import RevenueChart from "./components/RevenueChart";

export default async function AdminiFlexHomepage() {
  const oldGreen = "#2F6B4F";
  const deepGreen = "#1E4C37";
  const lightMint = "#E8F2ED";

  // Loginstatus (voor eventuele varianten elders)
  const token = (await cookies()).get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";
  let loggedIn = false;
  try {
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & { role?: string };
      loggedIn = Boolean(payload);
    }
  } catch {
    loggedIn = false;
  }

  return (
    <main className="min-h-screen text-zinc-900 bg-white">
      {/* ===== HERO ===== */}
      <section className="relative">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${lightMint}, white)` }}
        />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              AdminiFlex{" "}
              <span className="block" style={{ color: oldGreen }}>
                de oplossing voor je boekhouding.
              </span>
            </h1>
            <p className="mt-4 text-lg text-zinc-700 max-w-prose">
              Alles voor je organisatie in één platform — boekhouding,
              ledenadministratie, offertes, contracten, rapportages en meer.
              Eenvoudig, professioneel en klaar voor de groei van uw organisatie.
            </p>

            {/* CTA primair → Vraag demo aan */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="px-5 py-3 rounded-md text-white font-medium"
                style={{ backgroundColor: oldGreen }}
              >
                Vraag demo aan
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                PSD2-bankkoppeling
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                Mollie & Klarna
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                OCR-bonherkenning
              </span>
            </div>
          </div>

          {/* KPI + Grafiek */}
          <div className="rounded-2xl border bg-white shadow-sm p-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "Omzet", v: "€ 27.450" },
                { k: "Kosten", v: "€ 12.980" },
                { k: "Cashflow", v: "€ 9.240" },
                { k: "Openstaand", v: "€ 4.210" },
              ].map((x, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: lightMint }}
                >
                  <div className="text-xs text-zinc-600">{x.k}</div>
                  <div className="text-xl font-semibold">{x.v}</div>
                </div>
              ))}
            </div>

            <RevenueChart />
          </div>
        </div>
      </section>

      {/* ===== FUNCTIONALITEITEN ===== */}
      <section id="features" className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Waarom AdminiFlex?</h2>
        <p className="mt-2 text-zinc-700 max-w-3xl">
          Slimme automatisering zodat jij tijd bespaart: OCR-boekingsvoorstellen,
          automatische bankmatching, btw per maand/kwartaal/jaar en realtime
          rapportages.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "OCR & boekingsvoorstellen",
              d: "Foto van bon of factuur → herkend → voorstel. Jij bevestigt, wij boeken.",
            },
            {
              t: "PSD2-koppeling",
              d: "Banktransacties veilig binnen, automatische aflettering en reconciliatie.",
            },
            {
              t: "Openstaande posten",
              d: "Duidelijk overzicht debiteuren/crediteuren met aging.",
            },
            {
              t: "BTW & niet-aftrekbaar",
              d: "Volledige btw-logica incl. niet-aftrekbare btw en perioden.",
            },
            {
              t: "Balans & W&V",
              d: "Altijd inzicht in je resultaat, per periode en project.",
            },
            {
              t: "Cashflow & prognose",
              d: "Directe methode + vooruitblik 3–12 maanden.",
            },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-xl border bg-white">
              <h3 className="font-medium" style={{ color: oldGreen }}>
                {f.t}
              </h3>
              <p className="mt-2 text-sm text-zinc-700">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MODULES ===== */}
      <section id="modules" className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Modules op maat</h2>
        <p className="mt-2 text-zinc-700">Activeer alleen wat je nodig hebt.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="p-6 rounded-xl border">
            <h3 className="font-medium" style={{ color: oldGreen }}>Verenigingen</h3>
            <p className="mt-2 text-sm text-zinc-700">
              Ledenadministratie, contributies, kas/bank, rapportages. Met of zonder leden.
            </p>
          </div>
          <div className="p-6 rounded-xl border">
            <h3 className="font-medium" style={{ color: oldGreen }}>Handel</h3>
            <p className="mt-2 text-sm text-zinc-700">
              Inkoop/Verkoop, voorraad (gem. kostprijs), marges, openstaande posten.
            </p>
          </div>
          <div className="p-6 rounded-xl border">
            <h3 className="font-medium" style={{ color: oldGreen }}>Webshops</h3>
            <p className="mt-2 text-sm text-zinc-700">
              Koppelingen (Mollie/Klarna), voorraad, BTW, order- en factuurstromen.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRIJZEN ===== */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Prijzen & pakketten</h2>
        <p className="mt-2 text-zinc-700">Betaal alleen voor wat je gebruikt.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Basic", price: "€12,50",  features: ["Boekhouding & btw", "Export CSV/PDF", "1 gebruiker"] },
            { name: "Plus",  price: "€24,50", features: ["Alles van Basic", "Leden of Voorraad", "Openstaande posten"] },
            { name: "Pro",   price: "€49,50", features: ["Alles van Plus", "Offertes & Contracten", "API & Webhooks"] },
          ].map((p, i) => (
            <div key={i} className={`rounded-xl border bg-white p-6 ${i === 1 ? "shadow-lg border-emerald-400" : ""}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {i === 1 && <span className="text-xs px-2 py-1 rounded bg-emerald-500 text-white">Meest gekozen</span>}
              </div>
              <div className="mt-2 text-3xl font-bold">
                {p.price}
                <span className="text-base font-normal text-zinc-500">/mnd</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: oldGreen }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className="mt-6 inline-block w-full text-center px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: oldGreen }}
              >
                Vraag demo aan
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="cta" className="py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div
            className="rounded-2xl p-8 md:p-10 text-white"
            style={{ background: `linear-gradient(90deg, ${deepGreen}, ${oldGreen})` }}
          >
            <h3 className="text-2xl font-semibold">Neem vandaag nog contact op</h3>
            <p className="mt-1 text-white/90">
              Vraag de gratis demo aan en ontdek of AdminiFlex past bij jouw organisatie.
            </p>

            {/* Alleen één knop: Vraag demo aan (geen Inloggen hier) */}
            <div className="mt-6">
              <a
                href="/contact"
                className="px-5 py-3 rounded-md bg-white text-zinc-900 font-medium inline-block"
              >
                Vraag demo aan
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
