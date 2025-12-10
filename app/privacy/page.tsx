// app/privacy/page.tsx
import React from "react";

export const metadata = {
  title: "Privacyverklaring – AdminiFlex",
  description: "Privacyverklaring van AdminiFlex B.V.",
};

export default function PrivacyPage() {
  const oldGreen = "#2F6B4F";

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Privacyverklaring – AdminiFlex</h1>
        <p className="text-sm text-zinc-600 mt-2">Versie: 2025-11-10</p>
      </header>

      <article className="prose prose-zinc max-w-none">
        <h2 style={{ color: oldGreen }}>1. Inleiding</h2>
        <p>
          Deze privacyverklaring beschrijft hoe AdminiFlex omgaat met persoonsgegevens van
          klanten en gebruikers van onze SaaS-dienst voor boekhouding, ledenadministratie
          en voorraadbeheer. Wij verwerken gegevens uitsluitend in overeenstemming met de
          Algemene Verordening Gegevensbescherming (AVG) en andere relevante wet- en
          regelgeving.
        </p>
        <p>
          AdminiFlex richt zich uitsluitend op zakelijke klanten (B2B). Deze verklaring is
          bedoeld voor onze klanten, hun medewerkers en contactpersonen.
        </p>

        <h2 style={{ color: oldGreen }}>2. Wie is verantwoordelijk?</h2>
        <p>
          <strong>AdminiFlex</strong>
          <br />
          E-mail: <a href="mailto:info@adminiflex.nl" style={{ color: oldGreen }}>info@adminiflex.nl</a>
          <br />
          Website: <a href="https://www.adminiflex.nl" style={{ color: oldGreen }}>www.adminiflex.nl</a>
        </p>
        <p>
          AdminiFlex is verwerkingsverantwoordelijke voor de verwerking van persoonsgegevens
          binnen de eigen dienstverlening.
        </p>

        <h2 style={{ color: oldGreen }}>3. Welke persoonsgegevens verwerken wij?</h2>
        <p>Afhankelijk van het gebruik van onze diensten kunnen wij de volgende categorieën gegevens verwerken:</p>
        <ul>
          <li><strong>Identificatie- en contactgegevens:</strong> naam, e-mail, telefoonnummer.</li>
          <li><strong>Accountgegevens:</strong> gebruikersnaam, login- en voorkeurinstellingen.</li>
          <li><strong>Administratieve gegevens:</strong> factuur- en betaalinformatie (factuuradres, IBAN, btw-nummer).</li>
          <li><strong>Supportgegevens:</strong> berichten via contactformulieren of e-mail.</li>
          <li><strong>Gebruiksgegevens:</strong> technische logbestanden (tijdstip, IP-adres, browser, foutmeldingen).</li>
        </ul>
        <p>Wij verwerken géén bijzondere persoonsgegevens (zoals gezondheidsgegevens of politieke opvattingen).</p>

        <h2 style={{ color: oldGreen }}>4. Doeleinden van verwerking</h2>
        <p>Wij gebruiken persoonsgegevens uitsluitend voor:</p>
        <ul>
          <li>Het aanmaken en beheren van gebruikersaccounts.</li>
          <li>Het leveren van onze online diensten (boekhouding, leden- en voorraadbeheer).</li>
          <li>Klantondersteuning en communicatie.</li>
          <li>Facturatie en naleving van wettelijke verplichtingen.</li>
          <li>Verbetering van onze software en beveiliging.</li>
        </ul>
        <p>Wij gebruiken gegevens niet voor marketingdoeleinden of geautomatiseerde besluitvorming/profilering.</p>

        <h2 style={{ color: oldGreen }}>5. Grondslagen</h2>
        <ul>
          <li>Uitvoering van een overeenkomst (het leveren van onze SaaS-dienst).</li>
          <li>Wettelijke verplichting (fiscale bewaarplicht, boekhouding).</li>
          <li>Gerechtvaardigd belang (beveiliging en verbetering van onze diensten).</li>
        </ul>

        <h2 style={{ color: oldGreen }}>6. Bewaartermijnen</h2>
        <ul>
          <li>Factuur- en financiële gegevens: 7 jaar (wettelijke bewaarplicht).</li>
          <li>Gebruiks- en accountgegevens: maximaal 12 maanden na beëindiging van het contract.</li>
          <li>Supportberichten: maximaal 1 jaar.</li>
        </ul>
        <p>Daarna worden gegevens verwijderd of geanonimiseerd.</p>

        <h2 style={{ color: oldGreen }}>7. Delen van gegevens met derden</h2>
        <p>
          Wij delen persoonsgegevens alleen met partijen die ons ondersteunen bij de
          uitvoering van onze diensten. Deze partijen handelen als verwerkers in opdracht
          van AdminiFlex en zijn contractueel gebonden aan geheimhouding en beveiliging
          conform de AVG.
        </p>
        <p>Tot onze verwerkers behoren o.a.:</p>
        <ul>
          <li>Netlify – hosting en infrastructuur.</li>
          <li>Zoho Mail – e-mailcommunicatie.</li>
          <li>GitHub – broncodebeheer en deployment.</li>
          <li>(Toekomstig) Betaal- en integratiepartners zoals banken, Mollie, Belastingdienst of Shopify.</li>
        </ul>
        <p>Met alle verwerkers wordt een verwerkersovereenkomst (DPA) afgesloten. Wij verkopen geen persoonsgegevens aan derden.</p>

        <h2 style={{ color: oldGreen }}>8. Beveiliging</h2>
        <p>AdminiFlex treft passende technische en organisatorische maatregelen om gegevens te beschermen, waaronder:</p>
        <ul>
          <li>Versleutelde verbindingen (TLS/HTTPS, HSTS).</li>
          <li>Versleutelde opslag en back-ups.</li>
          <li>Toegangsbeheer volgens het least-privilege principe.</li>
          <li>Logging en monitoring van toegang en wijzigingen.</li>
          <li>Regelmatige updates en afhankelijkheids-controles.</li>
        </ul>

        <h2 style={{ color: oldGreen }}>9. Cookies</h2>
        <p>
          Onze website gebruikt alleen functionele cookies die noodzakelijk zijn voor de
          werking van de site en het inloggen in de SaaS-omgeving. Er worden geen analytische
          of marketingcookies geplaatst zonder toestemming.
        </p>

        <h2 style={{ color: oldGreen }}>10. Rechten van betrokkenen</h2>
        <p>Betrokkenen hebben recht op:</p>
        <ul>
          <li>Inzage in hun persoonsgegevens.</li>
          <li>Rectificatie of verwijdering van gegevens.</li>
          <li>Beperking of bezwaar tegen verwerking.</li>
          <li>Overdraagbaarheid van gegevens (dataportabiliteit).</li>
        </ul>
        <p>
          Verzoeken kunnen worden gestuurd naar{" "}
          <a href="mailto:info@adminiflex.nl" style={{ color: oldGreen }}>info@adminiflex.nl</a>.
          Wij reageren binnen uiterlijk 30 dagen.
        </p>

        <h2 style={{ color: oldGreen }}>11. Internationale doorgifte</h2>
        <p>
          Onze gegevens worden primair opgeslagen binnen de EU. Indien gegevens buiten de
          EER worden verwerkt (bijv. door Amerikaanse cloudproviders), zorgen wij voor
          passende waarborgen conform artikel 46 AVG (EU-US Data Privacy Framework of
          standaardcontractbepalingen).
        </p>

        <h2 style={{ color: oldGreen }}>12. Beleid bij datalekken</h2>
        <p>
          Bij een vermoeden van een beveiligingsincident of datalek meldt AdminiFlex dit
          onmiddellijk bij de Autoriteit Persoonsgegevens en — indien relevant — bij de
          betrokken klanten binnen 72 uur na ontdekking.
        </p>

        <h2 style={{ color: oldGreen }}>13. Wijzigingen</h2>
        <p>
          AdminiFlex behoudt zich het recht voor deze privacyverklaring aan te passen bij
          wijzigingen in wetgeving of bedrijfsvoering. De actuele versie is altijd
          beschikbaar op{" "}
          <a href="/privacy" style={{ color: oldGreen }}>www.adminiflex.nl/privacy</a>.
        </p>

        <h2 style={{ color: oldGreen }}>14. Contact</h2>
        <p className="mb-0"><strong>AdminiFlex</strong></p>
        <p className="mb-0">E-mail: <a href="mailto:info@adminiflex.nl" style={{ color: oldGreen }}>info@adminiflex.nl</a></p>
        <p>Website: <a href="https://www.adminiflex.nl" style={{ color: oldGreen }}>www.adminiflex.nl</a></p>
      </article>
    </main>
  );
}
