// app/status/page.tsx
import React from "react";
import { BRAND_GREEN } from "../../lib/theme";
import PublicFormLayout from "../components/PublicFormLayout";

export const metadata = {
  title: "Status – AdminiFlex",
  description: "Actuele status en onderhoudsinformatie van AdminiFlex.",
};

export default function StatusPage() {
  return (
    <PublicFormLayout
      title="Status – AdminiFlex"
      description="Hier vind je de actuele beschikbaarheid van onze diensten, gepland onderhoud en eventuele incidenten."
    >
      <div
        className="mt-8 bg-white border rounded-2xl p-6 shadow-sm text-zinc-800"
        style={{ ["--brand" as any]: BRAND_GREEN }}
      >
        <article
          className="
            text-sm md:text-base leading-relaxed
            [&>*:first-child]:mt-0

            [&>h2]:font-semibold
            [&>h2]:text-[var(--brand)]
            [&>h2]:mt-10
            [&>h2]:mb-3
            [&>h2]:text-base
            md:[&>h2]:text-lg

            [&>p]:mt-3
            [&>ul]:mt-3
            [&>ol]:mt-3

            [&>ul]:list-disc
            [&>ol]:list-decimal
            [&>ul]:pl-6
            [&>ol]:pl-6
            [&_li]:mt-1

            [&_a]:text-[var(--brand)]
            [&_a]:underline
            [&_a]:underline-offset-4
          "
        >
          <h2>Huidige status</h2>

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="font-medium">Operationeel</span>
              <span className="text-zinc-500">– alle systemen functioneren normaal</span>
            </div>

            <div className="text-zinc-500 text-sm">
              Laatst bijgewerkt: 12 januari 2026 12:00
            </div>
          </div>

          <h2>Componenten</h2>
          <ul>
            <li>
              <strong>Website</strong> (publieke pagina’s)
              <span className="ml-2 text-emerald-700">✓</span>
            </li>
            <li>
              <strong>Login</strong> (admin & portal)
              <span className="ml-2 text-emerald-700">✓</span>
            </li>
            <li>
              <strong>Portal</strong> (klantdashboard)
              <span className="ml-2 text-emerald-700">✓</span>
            </li>
            <li>
              <strong>Admin</strong> (beheerdersdashboard)
              <span className="ml-2 text-emerald-700">✓</span>
            </li>
            <li>
              <strong>API</strong> (contact, aanmelden, etc.)
              <span className="ml-2 text-emerald-700">✓</span>
            </li>
            <li>
              <strong>Database</strong> (PostgreSQL / Neon)
              <span className="ml-2 text-emerald-700">✓</span>
            </li>
          </ul>

          <h2>Gepland onderhoud</h2>
          <p>
            Er is momenteel geen gepland onderhoud ingepland. Indien er onderhoud plaatsvindt,
            kondigen wij dit hier aan met datum/tijd en verwachte impact.
          </p>

          <h2>Incidenten</h2>
          <p>
            Er zijn op dit moment geen actieve incidenten. Als je een probleem ervaart, neem contact op via{" "}
            <a href="/contact">/contact</a> of mail naar{" "}
            <a href="mailto:info@adminiflex.nl">info@adminiflex.nl</a>.
          </p>

          <h2>Cookies</h2>
          <p>
            AdminiFlex gebruikt uitsluitend functionele cookies die noodzakelijk zijn voor o.a. inloggen en beveiliging.
            Lees meer op onze <a href="/cookies">cookiepagina</a> en in de{" "}
            <a href="/privacy">privacyverklaring</a>.
          </p>
        </article>
      </div>
    </PublicFormLayout>
  );
}
