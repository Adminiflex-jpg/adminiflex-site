// app/privacy/page.tsx
import React from "react";
import { BRAND_GREEN } from "../../lib/theme";
import PublicFormLayout from "../components/PublicFormLayout";

export const metadata = {
  title: "Privacyverklaring – AdminiFlex",
  description: "Privacyverklaring van AdminiFlex B.V.",
};

export default function PrivacyPage() {
  return (
    <PublicFormLayout
      title="Privacyverklaring – AdminiFlex"
      description="Versie: 2026-01-12 • Geldig vanaf: 12 januari 2026"
    >
      <div
        className="mt-8 bg-white border rounded-2xl p-6 shadow-sm text-zinc-800"
        style={{ ["--brand" as any]: BRAND_GREEN }}
      >
        <article
          className="
            text-sm md:text-base leading-relaxed
            [&>*:first-child]:mt-0

            /* Koppen */
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
          <h2>1. Inleiding</h2>
          <p>
            Deze privacyverklaring beschrijft hoe AdminiFlex omgaat met persoonsgegevens
            van klanten en gebruikers van onze SaaS-dienst voor boekhouding,
            ledenadministratie en voorraadbeheer. Wij verwerken gegevens uitsluitend in
            overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en
            andere relevante wet- en regelgeving.
          </p>
          <p>
            AdminiFlex richt zich uitsluitend op zakelijke klanten (B2B). Deze verklaring
            is bedoeld voor onze klanten, hun medewerkers en contactpersonen.
          </p>

          <h2>2. Wie is verantwoordelijk?</h2>
          <p>
            <strong>AdminiFlex</strong>
          </p>
          <p className="mt-1">
            E-mail: <a href="mailto:info@adminiflex.nl">info@adminiflex.nl</a>
            <br />
            Website: <a href="https://www.adminiflex.nl">www.adminiflex.nl</a>
          </p>
          <p>
            AdminiFlex is verwerkingsverantwoordelijke voor de verwerking van
            persoonsgegevens binnen de eigen dienstverlening.
          </p>

          <h2>3. Welke persoonsgegevens verwerken wij?</h2>
          <p>
            Afhankelijk van het gebruik van onze diensten kunnen wij de volgende
            categorieën gegevens verwerken:
          </p>
          <ul>
            <li>
              <strong>Identificatie- en contactgegevens:</strong> naam, e-mail,
              telefoonnummer.
            </li>
            <li>
              <strong>Accountgegevens:</strong> gebruikersnaam, login- en
              voorkeurinstellingen.
            </li>
            <li>
              <strong>Administratieve gegevens:</strong> factuur- en betaalinformatie
              (factuuradres, IBAN, btw-nummer).
            </li>
            <li>
              <strong>Supportgegevens:</strong> berichten via contactformulieren of e-mail.
            </li>
            <li>
              <strong>Gebruiksgegevens:</strong> technische logbestanden (tijdstip, IP-adres,
              browser, foutmeldingen).
            </li>
          </ul>
          <p>
            Wij verwerken géén bijzondere persoonsgegevens (zoals gezondheidsgegevens of
            politieke opvattingen).
          </p>

          <h2>4. Doeleinden van verwerking</h2>
          <p>Wij gebruiken persoonsgegevens uitsluitend voor:</p>
          <ul>
            <li>Het aanmaken en beheren van gebruikersaccounts.</li>
            <li>Het leveren van onze online diensten (boekhouding, leden- en voorraadbeheer).</li>
            <li>Klantondersteuning en communicatie.</li>
            <li>Facturatie en naleving van wettelijke verplichtingen.</li>
            <li>Verbetering van onze software en beveiliging.</li>
          </ul>
          <p>
            Wij gebruiken gegevens niet voor marketingdoeleinden of geautomatiseerde
            besluitvorming/profilering.
          </p>

          <h2>5. Grondslagen</h2>
          <ul>
            <li>Uitvoering van een overeenkomst (het leveren van onze SaaS-dienst).</li>
            <li>Wettelijke verplichting (fiscale bewaarplicht, boekhouding).</li>
            <li>Gerechtvaardigd belang (beveiliging en verbetering van onze diensten).</li>
          </ul>

          <h2>6. Bewaartermijnen</h2>
          <ul>
            <li>Factuur- en financiële gegevens: 7 jaar (wettelijke bewaarplicht).</li>
            <li>Gebruiks- en accountgegevens: maximaal 12 maanden na beëindiging van het contract.</li>
            <li>Supportberichten: maximaal 1 jaar.</li>
          </ul>
          <p>Daarna worden gegevens verwijderd of geanonimiseerd.</p>

          <h2>7. Delen van gegevens met derden</h2>
          <p>
            Wij delen persoonsgegevens alleen met partijen die ons ondersteunen bij de
            uitvoering van onze diensten. Deze partijen handelen als verwerkers in
            opdracht van AdminiFlex en zijn contractueel gebonden aan geheimhouding en
            beveiliging conform de AVG.
          </p>
          <p>Tot onze verwerkers behoren o.a.:</p>
          <ul>
            <li>Netlify – hosting en infrastructuur.</li>
            <li>Zoho Mail – e-mailcommunicatie.</li>
            <li>GitHub – broncodebeheer en deployment.</li>
            <li>
              (Toekomstig) Betaal- en integratiepartners zoals banken, Mollie,
              Belastingdienst of Shopify.
            </li>
          </ul>
          <p>
            Met alle verwerkers wordt een verwerkersovereenkomst (DPA) afgesloten. Wij
            verkopen geen persoonsgegevens aan derden.
          </p>

          <h2>8. Beveiliging</h2>
          <p>
            AdminiFlex treft passende technische en organisatorische maatregelen om gegevens
            te beschermen, waaronder:
          </p>
          <ul>
            <li>Versleutelde verbindingen (TLS/HTTPS, HSTS).</li>
            <li>Versleutelde opslag en back-ups.</li>
            <li>Toegangsbeheer volgens het least-privilege principe.</li>
            <li>Logging en monitoring van toegang en wijzigingen.</li>
            <li>Regelmatige updates en afhankelijkheids-controles.</li>
          </ul>

          <h2>9. Cookies</h2>
          <p>
            Onze website gebruikt alleen functionele cookies die noodzakelijk zijn voor de
            werking van de site en het inloggen in de SaaS-omgeving. Er worden geen
            analytische of marketingcookies geplaatst zonder toestemming.
          </p>

          <h2>10. Rechten van betrokkenen</h2>
          <p>Betrokkenen hebben recht op:</p>
          <ul>
            <li>Inzage in hun persoonsgegevens.</li>
            <li>Rectificatie of verwijdering van gegevens.</li>
            <li>Beperking of bezwaar tegen verwerking.</li>
            <li>Overdraagbaarheid van gegevens (dataportabiliteit).</li>
          </ul>
          <p>
            Verzoeken kunnen worden gestuurd naar{" "}
            <a href="mailto:info@adminiflex.nl">info@adminiflex.nl</a>. Wij reageren
            binnen uiterlijk 30 dagen.
          </p>

          <h2>11. Internationale doorgifte</h2>
          <p>
            Onze gegevens worden primair opgeslagen binnen de EU. Indien gegevens buiten de
            EER worden verwerkt (bijv. door Amerikaanse cloudproviders), zorgen wij voor
            passende waarborgen conform artikel 46 AVG (EU-US Data Privacy Framework of
            standaardcontractbepalingen).
          </p>

          <h2>12. Beleid bij datalekken</h2>
          <p>
            Bij een vermoeden van een beveiligingsincident of datalek meldt AdminiFlex dit
            onmiddellijk bij de Autoriteit Persoonsgegevens en — indien relevant — bij de
            betrokken klanten binnen 72 uur na ontdekking.
          </p>

          <h2>13. Wijzigingen</h2>
          <p>
            AdminiFlex behoudt zich het recht voor deze privacyverklaring aan te passen bij
            wijzigingen in wetgeving of bedrijfsvoering. De actuele versie is altijd
            beschikbaar op <a href="/privacy">www.adminiflex.nl/privacy</a>.
          </p>

          <h2>14. Contact</h2>
          <p className="mb-0">
            <strong>AdminiFlex</strong>
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
