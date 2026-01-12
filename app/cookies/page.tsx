// app/cookies/page.tsx
import React from "react";
import { BRAND_GREEN } from "../../lib/theme";
import PublicFormLayout from "../components/PublicFormLayout";

export const metadata = {
  title: "Cookies – AdminiFlex",
  description: "Cookie-informatie van AdminiFlex.",
};

export default function CookiesPage() {
  return (
    <PublicFormLayout
      title="Cookies – AdminiFlex"
      description="Informatie over het gebruik van cookies en vergelijkbare technieken binnen AdminiFlex."
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
          <h2>1. Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die door je browser worden opgeslagen. Ze helpen om een website of applicatie
            correct te laten functioneren, bijvoorbeeld door een sessie te onthouden of beveiligingsinstellingen toe te passen.
          </p>

          <h2>2. Welke cookies gebruikt AdminiFlex?</h2>
          <p>
            AdminiFlex gebruikt uitsluitend <strong>functionele</strong> en <strong>beveiligingscookies</strong>. Deze zijn nodig om:
          </p>
          <ul>
            <li>inloggen mogelijk te maken en sessies te beheren;</li>
            <li>beveiligingsmaatregelen toe te passen (bijv. bescherming tegen misbruik);</li>
            <li>basisvoorkeuren te bewaren die nodig zijn voor de werking van de applicatie.</li>
          </ul>

          <h2>3. Geen marketing- of trackingcookies</h2>
          <p>
            Wij plaatsen geen marketingcookies en doen geen cross-site tracking. Er worden geen persoonsgegevens verkocht of
            gebruikt voor advertentieprofilering.
          </p>

          <h2>4. Cookies beheren of verwijderen</h2>
          <p>
            Je kunt cookies via je browserinstellingen verwijderen of blokkeren. Let op: als je cookies uitschakelt kan het
            zijn dat bepaalde onderdelen (zoals inloggen) niet correct werken.
          </p>

          <h2>5. Meer informatie</h2>
          <p>
            Meer informatie over hoe wij omgaan met persoonsgegevens vind je in onze{" "}
            <a href="/privacy">privacyverklaring</a>. Bij vragen kun je contact opnemen via{" "}
            <a href="/contact">/contact</a> of{" "}
            <a href="mailto:info@adminiflex.nl">info@adminiflex.nl</a>.
          </p>
        </article>
      </div>
    </PublicFormLayout>
  );
}
