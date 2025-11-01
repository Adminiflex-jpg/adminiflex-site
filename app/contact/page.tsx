// app/page.tsx
import React from "react";
import RevenueChart from "./components/RevenueChart";

export default function AdminiFlexHomepage() {
  const oldGreen = "#2F6B4F";   // hoofdkleur (oud groen)
  const deepGreen = "#1E4C37";  // donkere tint (alleen voor gradients)
  const lightMint = "#E8F2ED";  // lichte achtergrond

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
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="px-5 py-3 rounded-md text-white font-medium"
                style={{ backgroundColor: oldGreen }}
              >
                Start gratis
              </a>
              <a
                href="#pricing"
                className="px-5 py-3 rounded-md font-medium border"
                style={{ borderColor: oldGreen, color: oldGreen }}
              >
                Bekijk prijzen
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

            {/* Echte grafiek (client component) */}
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
            <h3 className="font-medium" style={{ color: oldGreen }}>
              Vereniging
            </h3>
            <p className="mt-2 text-sm text-zinc-700">
              Met of zonder leden. Ledenadministratie, contributie, kas/bank, rapporten.
            </p>
          </div>
          <div className="p-6 rounded-xl border">
            <h3 className="font-medium" style={{ color: oldGreen }}>
              Webshop / Handel
            </h3>
            <p className="mt-2 text-sm text-zinc-700">
              Voorraadbeheer (gem. kostprijs), marge per product, Mollie & Klarna, btw.
            </p>
          </div>
          <div className="p-6 rounded-xl border">
            <h3 className="font-medium" style={{ color: oldGreen }}>
              Hovenier / Dienstverlener
            </h3>
            <p className="mt-2 text-sm text-zinc-700">
              Kostprijscalculatie, offertes → contracten, uren & materialen.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PRIJZEN ===== */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Prijzen</h2>
        <p className="mt-2 text-zinc-700">
          Betaal alleen voor wat je gebruikt en klaar voor de toekomst.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "Basic",
              p: "€12,50",
              f: ["1 gebruiker", "1 administratie", "Rapportages"],
            },
            {
              n: "Plus",
              p: "€24,50",
              f: ["Alles van Basic", "Leden en/of Voorraad", "Bankkoppeling"],
            },
            {
              n: "Pro",
              p: "€49,50",
              f: ["Alles van Plus", "Offertes & Contracten", "API & Webhooks"],
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl border ${i === 1 ? "shadow-md" : ""}`}
              style={i === 1 ? { borderColor: oldGreen } : {}}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{plan.n}</h3>
                {i === 1 && (
                  <span
                    className="text-xs px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: oldGreen }}
                  >
                    Meest gekozen
                  </span>
                )}
              </div>
              <div className="mt-2 text-3xl font-bold">
                {plan.p}
                <span className="text-base font-normal text-zinc-600">/mnd</span>
              </div>
              <ul className="mt-4 text-sm text-zinc-700 space-y-2">
                {plan.f.map((x, idx) => (
                  <li key={idx}>• {x}</li>
                ))}
              </ul>
              <a
                href="#cta"
                className="mt-6 inline-block w-full text-center px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: oldGreen }}
              >
                Start nu
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
            style={{
              background: `linear-gradient(90deg, ${deepGreen}, ${oldGreen})`,
            }}
          >
            <h3 className="text-2xl font-semibold">Probeer AdminiFlex vandaag</h3>
            <p className="mt-1 text-white/90">
              Maak in 5 minuten je account aan en begin meteen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/contact" className="px-5 py-3 rounded-md bg-white text-zinc-900 font-medium">
                Neem contact op
              </a>
              <a
                href="#pricing"
                className="px-5 py-3 rounded-md border border-white/40 text-white font-medium"
              >
                Bekijk prijzen
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
