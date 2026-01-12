// app/voorwaarden/page.tsx
import React from "react";
import { BRAND_GREEN } from "../../lib/theme";
import PublicFormLayout from "../components/PublicFormLayout";

export const metadata = {
  title: "Algemene Voorwaarden – AdminiFlex B.V.",
  description: "Algemene Voorwaarden van AdminiFlex B.V.",
};

export default function VoorwaardenPage() {
  return (
    <PublicFormLayout
      title="Algemene Voorwaarden – AdminiFlex B.V."
      description="Versie: 2026-01-12 • Geldig vanaf: 12 januari 2026"
    >
      {/* Meer ruimte tussen kop (H1/description) en het artikel */}
      <div
        className="mt-8 bg-white border rounded-2xl p-6 shadow-sm text-zinc-800"
        style={{ ["--brand" as any]: BRAND_GREEN }}
      >
        <article
          className="
            text-sm md:text-base leading-relaxed
            [&>*:first-child]:mt-0

            /* Koppen 1–15 */
            [&>h2]:font-semibold
            [&>h2]:text-[var(--brand)]
            [&>h2]:mt-10
            [&>h2]:mb-3
            [&>h2]:text-base
            md:[&>h2]:text-lg

            /* Spacing body */
            [&>p]:mt-3
            [&>ul]:mt-3
            [&>ol]:mt-3

            /* Lists */
            [&>ul]:list-disc
            [&>ol]:list-decimal
            [&>ul]:pl-6
            [&>ol]:pl-6
            [&_li]:mt-1

            /* Links */
            [&_a]:text-[var(--brand)]
            [&_a]:underline
            [&_a]:underline-offset-4
          "
        >
          <h2>1. Definities</h2>
          <p>In deze algemene voorwaarden wordt verstaan onder:</p>
          <ul>
            <li>
              <strong>AdminiFlex</strong>: de besloten vennootschap AdminiFlex B.V.,
              gevestigd in Nederland, hierna ook “wij”, “ons” of “onze”.
            </li>
            <li>
              <strong>Klant</strong>: iedere natuurlijke persoon of rechtspersoon die als
              ondernemer gebruikmaakt van de diensten van AdminiFlex.
            </li>
            <li>
              <strong>Diensten</strong>: de online SaaS-oplossing van AdminiFlex voor
              boekhouding, ledenadministratie en voorraadbeheer, inclusief aanvullende
              modules en ondersteuning.
            </li>
            <li>
              <strong>Overeenkomst</strong>: de overeenkomst tussen AdminiFlex en de Klant
              met betrekking tot het gebruik van de Diensten.
            </li>
          </ul>

          <h2>2. Toepasselijkheid</h2>
          <ol>
            <li>
              Deze voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en
              leveringen van AdminiFlex, tenzij schriftelijk anders is overeengekomen.
            </li>
            <li>
              Afwijkingen of aanvullingen zijn alleen geldig als ze schriftelijk door
              AdminiFlex zijn bevestigd.
            </li>
            <li>De algemene voorwaarden van de Klant zijn niet van toepassing.</li>
          </ol>

          <h2>3. Totstandkoming van de overeenkomst</h2>
          <ol>
            <li>
              De overeenkomst komt tot stand wanneer de Klant zich via de website
              registreert, een account aanmaakt en de voorwaarden aanvaardt, of wanneer
              AdminiFlex een offerte schriftelijk heeft bevestigd.
            </li>
            <li>
              Door het aanmaken van een account verklaart de Klant bevoegd te zijn om namens
              zijn organisatie de overeenkomst te sluiten.
            </li>
          </ol>

          <h2>4. Diensten en gebruik</h2>
          <ol>
            <li>
              AdminiFlex verleent de Klant een niet-exclusief en niet-overdraagbaar
              gebruiksrecht op de software, zolang de overeenkomst voortduurt.
            </li>
            <li>
              De Klant mag de software uitsluitend gebruiken voor eigen bedrijfsdoeleinden
              en zal geen rechten van derden schenden of de software doorverkopen of
              verhuren.
            </li>
            <li>
              AdminiFlex kan de functionaliteit van de software uitbreiden of wijzigen.
              Wijzigingen worden tijdig aangekondigd.
            </li>
          </ol>

          <h2>5. Abonnementen, looptijd en opzegging</h2>
          <ol>
            <li>AdminiFlex biedt maand- en jaarabonnementen aan.</li>
            <li>
              Een maandabonnement kan ieder moment worden opgezegd met een opzegtermijn van
              één maand.
            </li>
            <li>
              Een jaarabonnement heeft een looptijd van 12 maanden en wordt daarna
              automatisch met telkens één jaar verlengd, tenzij de Klant uiterlijk drie
              maanden vóór de verlengingsdatum opzegt.
            </li>
            <li>Opzegging dient schriftelijk of per e-mail te gebeuren.</li>
            <li>
              Bij beëindiging van het abonnement wordt de toegang tot de software beëindigd
              na afloop van de opzegtermijn.
            </li>
          </ol>

          <h2>6. Prijzen en betaling</h2>
          <ol>
            <li>Alle prijzen zijn exclusief btw en andere heffingen.</li>
            <li>
              Betaling geschiedt achteraf per maand of per jaar, afhankelijk van het gekozen
              abonnement.
            </li>
            <li>De betalingstermijn bedraagt 14 dagen na factuurdatum.</li>
            <li>
              Bij niet-tijdige betaling heeft AdminiFlex het recht de toegang tot de
              diensten tijdelijk op te schorten of de overeenkomst te beëindigen.
            </li>
            <li>
              AdminiFlex mag haar tarieven jaarlijks aanpassen. Wijzigingen worden minimaal
              30 dagen van tevoren aangekondigd.
            </li>
          </ol>

          <h2>7. Beschikbaarheid en onderhoud</h2>
          <ol>
            <li>
              AdminiFlex spant zich in om de diensten continu beschikbaar te houden, maar
              garandeert geen ononderbroken werking.
            </li>
            <li>
              Onderhoudswerkzaamheden kunnen zonder voorafgaande kennisgeving worden
              uitgevoerd, indien noodzakelijk voor veiligheid of stabiliteit.
            </li>
            <li>
              AdminiFlex is niet aansprakelijk voor schade door tijdelijke onbeschikbaarheid
              of storingen.
            </li>
          </ol>

          <h2>8. Aansprakelijkheid</h2>
          <ol>
            <li>
              AdminiFlex is uitsluitend aansprakelijk voor directe schade die het gevolg is
              van een aantoonbare tekortkoming in de uitvoering van de overeenkomst.
            </li>
            <li>
              De totale aansprakelijkheid is beperkt tot het bedrag van de facturen die in
              de laatste drie maanden aan de Klant zijn gefactureerd (met een maximum van
              €10.000).
            </li>
            <li>
              AdminiFlex is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde
              winst, verlies van gegevens of reputatieschade.
            </li>
            <li>
              De Klant blijft verantwoordelijk voor de juistheid en volledigheid van
              ingevoerde gegevens.
            </li>
          </ol>

          <h2>9. Beveiliging en privacy</h2>
          <ol>
            <li>
              AdminiFlex neemt passende technische en organisatorische maatregelen om
              persoonsgegevens te beschermen, conform de AVG.
            </li>
            <li>
              AdminiFlex handelt als verwerkingsverantwoordelijke voor haar eigen
              administratie en als verwerker voor klantdata binnen de SaaS-dienst.
            </li>
            <li>
              AdminiFlex sluit met haar leveranciers en hostingpartners (zoals Netlify en
              andere clouddiensten) verwerkersovereenkomsten af.
            </li>
            <li>
              De volledige privacyverklaring is beschikbaar op{" "}
              <a href="/privacy">www.adminiflex.nl/privacy</a>.
            </li>
          </ol>

          <h2>10. Intellectuele eigendom</h2>
          <p>
            Alle rechten van intellectuele eigendom op de software, broncode, ontwerpen en
            documentatie berusten bij AdminiFlex. De Klant krijgt uitsluitend
            gebruiksrechten zoals expliciet in deze voorwaarden zijn verleend.
          </p>

          <h2>11. Datalekken en beveiligingsincidenten</h2>
          <ol>
            <li>
              In geval van een datalek of beveiligingsincident zal AdminiFlex de Klant zo
              spoedig mogelijk informeren.
            </li>
            <li>
              Indien vereist meldt AdminiFlex het incident binnen 72 uur bij de Autoriteit
              Persoonsgegevens.
            </li>
          </ol>

          <h2>12. Overmacht</h2>
          <p>
            AdminiFlex is niet aansprakelijk voor tekortkomingen als gevolg van overmacht,
            waaronder o.a. storingen in internetverbindingen, stroomuitval, cyberaanvallen,
            pandemieën, stakingen of overheidsmaatregelen.
          </p>

          <h2>13. Beëindiging</h2>
          <ol>
            <li>
              AdminiFlex kan de overeenkomst onmiddellijk beëindigen als de Klant zijn
              verplichtingen niet nakomt of in strijd handelt met de wet.
            </li>
            <li>
              Na beëindiging wordt de toegang tot de software beëindigd en worden gegevens
              na een redelijke bewaartermijn verwijderd of geanonimiseerd.
            </li>
          </ol>

          <h2>14. Toepasselijk recht en geschillen</h2>
          <p>
            Op deze overeenkomst is uitsluitend Nederlands recht van toepassing. Geschillen
            worden bij uitsluiting voorgelegd aan de rechtbank Midden-Nederland (locatie
            Utrecht).
          </p>

          <h2>15. Contact</h2>
          <p className="mb-0">
            <strong>AdminiFlex B.V.</strong>
          </p>
          <p className="mb-0">
            E-mail: <a href="mailto:info@adminiflex.nl">info@adminiflex.nl</a>
          </p>
          <p>
            Website: <a href="https://www.adminiflex.nl">www.adminiflex.nl</a>
          </p>
        </article>
      </div>
    </PublicFormLayout>
  );
}
