// app/page.tsx
import React from "react";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import RevenueChart from "./components/RevenueChart";

export default async function AdminiFlexHomepage() {
  const oldGreen = "#2F6B4F";
  const deepGreen = "#1E4C37";
  const lightMint = "#E8F2ED";

  // Loginstatus (voor CTA's)
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

            {/* CTA's afhankelijk van login */}
            <div className="mt-6 flex flex-wrap gap-3">
              {!loggedIn ? (
                <>
                  <a
                    href="#cta"
                    className="px-5 py-3 rounded-md text-white font-medium"
                    style={{ backgroundColor: oldGreen }}
                  >
                    Start gratis
                  </a>
                  {/* "Bekijk prijzen" verwijderd */}
                </>
              ) : (
                <>
                  <form action="/api/logout" method="POST">
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-md text-white font-medium"
                      style={{ backgroundColor: oldGreen }}
                    >
                      Uitloggen
                    </button>
                  </form>
                  <a
                    href="/kennisbank"
                    className="px-5 py-3 rounded-md font-medium border"
                    style={{ borderColor: oldGreen, color: oldGreen }}
                  >
                    Kennisbank
                  </a>
                </>
              )}
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

      {/* ===== MODULES (hernoemd) ===== */}
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

      {/* ===== CTA ===== */}
      <section id="cta" className="py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div
            className="rounded-2xl p-8 md:p-10 text-white"
            style={{ background: `linear-gradient(90deg, ${deepGreen}, ${oldGreen})` }}
          >
            <h3 className="text-2xl font-semibold">Probeer AdminiFlex vandaag</h3>
            <p className="mt-1 text-white/90">Maak in 5 minuten je account aan en begin meteen.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {!loggedIn ? (
                <>
                  <a href="/login" className="px-5 py-3 rounded-md bg-white text-zinc-900 font-medium">
                    Inloggen
                  </a>
                  <a
                    href="/contact"
                    className="px-5 py-3 rounded-md border border-white/40 text-white font-medium"
                  >
                    Neem contact op
                  </a>
                </>
              ) : (
                <>
                  <form action="/api/logout" method="POST">
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-md bg-white text-zinc-900 font-medium"
                    >
                      Uitloggen
                    </button>
                  </form>
                  <a
                    href="/kennisbank"
                    className="px-5 py-3 rounded-md border border-white/40 text-white font-medium"
                  >
                    Kennisbank
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
