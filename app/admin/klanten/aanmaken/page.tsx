// app/admin/klanten/aanmaken/page.tsx
import { Prisma, PrismaClient, PlanCode } from "@prisma/client";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { BRAND_GREEN } from "../../../../lib/theme";

const prisma = new PrismaClient();

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SearchParams = {
  app?: string;
};

export default async function NieuweKlantomgevingPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  // 1. Check of je als admin bent ingelogd
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";
  let isAdmin = false;

  try {
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        role?: string;
      };
      isAdmin = payload?.role === "admin";
    }
  } catch {
    isAdmin = false;
  }

  if (!isAdmin) {
    redirect("/login");
  }

  // 2. Application ophalen als ?app=<id> is meegegeven (prefill)
  const appId = searchParams?.app;
  type AppSelection = Prisma.ApplicationGetPayload<{
    select: {
      id: true;
      companyName: true;
      contactName: true;
      email: true;
      address: true;
      postalCode: true;
      city: true;
      kvk: true;
      btw: true;
      plan: true;
    };
  }>;

  let appData: AppSelection | null = null;

  if (appId) {
    const app = await prisma.application.findUnique({
      where: { id: appId },
      select: {
        id: true,
        companyName: true,
        contactName: true,
        email: true,
        address: true,
        postalCode: true,
        city: true,
        kvk: true,
        btw: true,
        plan: true,
      },
    });
    if (app) {
      appData = app;
    }
  }

  // Helper voor pakketselectie
  const allPlans: { value: PlanCode; label: string }[] = [
    { value: "BASIC", label: "Basic" },
    { value: "PLUS", label: "Plus" },
    { value: "PRO", label: "Pro" },
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 md:px-6 py-16">
      {/* Titel + teruglink, zelfde structuur als contact */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-3xl font-semibold">
          Nieuwe klantomgeving aanmaken
        </h1>
        <a
          href="/admin/klanten/overzicht"
          className="px-3 py-2 rounded-md border text-sm"
          style={{ borderColor: BRAND_GREEN, color: BRAND_GREEN }}
        >
          ← Terug naar overzicht
        </a>
      </div>

      <p className="mt-2 text-zinc-700">
        Vul de gegevens van de klant in. We maken automatisch een
        conceptcontract aan op basis van het gekozen pakket en, indien gewenst,
        een demo-omgeving van 30 dagen.
      </p>

      {/* Formulier – zelfde “blok”-stijl als contact: één kolom, duidelijke labels */}
      <form
        action="/api/admin/customers/create"
        method="POST"
        className="mt-8 grid gap-6"
      >
        {/* Als deze klant vanuit een Application komt, stuur de id mee */}
        {appData && (
          <input type="hidden" name="applicationId" value={appData.id} />
        )}

        {/* Bedrijfsgegevens */}
        <section className="grid gap-4">
          <h2 className="text-lg font-semibold">Bedrijfsgegevens</h2>

          <div>
            <label className="block text-sm mb-1">Bedrijfsnaam*</label>
            <input
              name="companyName"
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
              defaultValue={appData?.companyName ?? ""}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Contactpersoon*</label>
            <input
              name="contactName"
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
              defaultValue={appData?.contactName ?? ""}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">E-mailadres*</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
              defaultValue={appData?.email ?? ""}
            />
          </div>
        </section>

        {/* Adres & registratie */}
        <section className="grid gap-4">
          <h2 className="text-lg font-semibold">Adres &amp; registratie</h2>

          <div>
            <label className="block text-sm mb-1">Adres</label>
            <input
              name="address"
              className="w-full border rounded-md px-3 py-2 text-sm"
              defaultValue={appData?.address ?? ""}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm mb-1">Postcode</label>
              <input
                name="postalCode"
                className="w-full border rounded-md px-3 py-2 text-sm"
                defaultValue={appData?.postalCode ?? ""}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Plaats</label>
              <input
                name="city"
                className="w-full border rounded-md px-3 py-2 text-sm"
                defaultValue={appData?.city ?? ""}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm mb-1">KvK-nummer</label>
              <input
                name="kvk"
                className="w-full border rounded-md px-3 py-2 text-sm"
                defaultValue={appData?.kvk ?? ""}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">BTW-nummer</label>
              <input
                name="btw"
                className="w-full border rounded-md px-3 py-2 text-sm"
                defaultValue={appData?.btw ?? ""}
              />
            </div>
          </div>
        </section>

        {/* Abonnement / pakket + demo */}
        <section className="grid gap-4">
          <h2 className="text-lg font-semibold">Abonnement</h2>

          <div>
            <label className="block text-sm mb-1">Pakket*</label>
            <select
              name="plan"
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
              defaultValue={appData?.plan ?? "BASIC"}
            >
              {allPlans.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs text-zinc-600">
            Het gekozen pakket wordt ook automatisch in het contract opgenomen.
          </p>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="isDemo"
              value="on"
              className="mt-1"
            />
            <span>
              Maak demo-omgeving (30 dagen actief)
              <br />
              <span className="text-xs text-zinc-600">
                De klantomgeving wordt gemarkeerd als demo en krijgt automatisch
                een einddatum 30 dagen vanaf vandaag.
              </span>
            </span>
          </label>
        </section>

        {/* Login voor klantomgeving */}
        <section className="grid gap-4">
          <h2 className="text-lg font-semibold">Login voor klantomgeving</h2>
          <p className="text-xs text-zinc-600">
            Dit zijn de inloggegevens die de klant gebruikt op{" "}
            <code className="px-1 py-0.5 bg-zinc-100 rounded text-[11px]">
              /portal/login
            </code>
            . Geef deze veilig door.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm mb-1">
                E-mailadres klantlogin*
              </label>
              <input
                type="email"
                name="portalEmail"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                defaultValue={appData?.email ?? ""}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Tijdelijk wachtwoord*</label>
              <input
                type="text"
                name="portalPassword"
                required
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Bijv. Tijdelijk2025!"
              />
            </div>
          </div>
        </section>

        {/* Opslaan-knop */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-3 rounded-md text-white text-sm font-medium"
            style={{ backgroundColor: BRAND_GREEN }}
          >
            Klantomgeving aanmaken
          </button>
        </div>
      </form>
    </main>
  );
}

/**
 * Hier staat je volledige contract-template.
 * De gegevens van de klant worden ingevuld via de variabelen p.*.
 */
function buildContractHtml(p: {
  companyName: string;
  contactName: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  kvk: string;
  btw: string;
  plan: string;
}) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  return `
<h1>Overeenkomst Software-as-a-Service (SaaS) – AdminiFlex B.V.</h1>
<p><strong>Versie:</strong> 2025-11-10<br/>
<strong>Datum van ondertekening:</strong> ${today}</p>

<h2><strong>Artikel 1 – Partijen</strong></h2>
<p><strong>Leverancier:</strong> AdminiFlex B.V. gevestigd te [adres invullen], ingeschreven bij de Kamer van Koophandel onder nummer [KvK invullen], BTW-nummer [BTW invullen], rechtsgeldig vertegenwoordigd door [naam invullen], in de hoedanigheid van oprichter/directeur, hierna: <em>Leverancier</em>.</p>
<p><strong>Klant:</strong> ${p.companyName} (KVK: ${p.kvk}, BTW: ${p.btw}), ${p.address}, ${p.postalCode} ${p.city}, t.a.v. ${p.contactName} &lt;${p.email}&gt; hierna: <em>Klant</em>.</p>

<h2><strong>Artikel 2 – Doel en aard van de dienst</strong></h2>
<ol>
  <li>Leverancier biedt via <a href="https://www.adminiflex.nl">www.adminiflex.nl</a> een online softwareapplicatie aan onder de naam AdminiFlex (de <em>Dienst</em>).</li>
  <li>De Dienst richt zich op ondernemingen, verenigingen en zelfstandigen (zzp, mkb en grotere organisaties) voor digitale boekhouding, ledenadministratie, offertes/contracten en rapportages.</li>
  <li>De Dienst stelt Klant in staat administratieve en boekhoudkundige taken te automatiseren, rapportages te genereren en financiële transacties te registreren.</li>
  <li>Leverancier levert uitsluitend technische ondersteuning omtrent de werking van de software; er wordt geen fiscaal, juridisch of boekhoudkundig advies verstrekt.</li>
</ol>

<h2><strong>Artikel 3 – Duur, verlenging en opzegging</strong></h2>
<ol>
  <li>De Overeenkomst wordt aangegaan voor onbepaalde tijd, tenzij schriftelijk anders overeengekomen.</li>
  <li>Klant kiest bij aanvang voor een maand- of jaarabonnement (gekozen pakket: <strong>${p.plan}</strong>).</li>
  <li>Bij maandabonnementen geldt een opzegtermijn van één (1) maand.</li>
  <li>Bij jaarabonnementen geldt een opzegtermijn van drie (3) maanden vóór het einde van de contractperiode.</li>
  <li>Jaarcontracten worden automatisch verlengd met telkens twaalf (12) maanden, tenzij tijdig opgezegd.</li>
  <li>Nieuwe klanten ontvangen een proefperiode van dertig (30) dagen waarin de Dienst kosteloos gebruikt mag worden.</li>
</ol>

<h2><strong>Artikel 4 – Prijzen en betaling</strong></h2>
<ol>
  <li>Tarieven (excl. btw): Basic € 12,50 p/m; Plus € 24,50 p/m; Pro € 49,50 p/m.</li>
  <li>Facturatie vindt maandelijks achteraf plaats, tenzij anders overeengekomen.</li>
  <li>Betalingstermijn: 14 dagen na factuurdatum.</li>
  <li>Leverancier kan tarieven jaarlijks indexeren of aanpassen met een aankondigingstermijn van minimaal 30 dagen.</li>
</ol>

<h2><strong>Artikel 5 – Hosting en beschikbaarheid</strong></h2>
<ol>
  <li>De Dienst wordt gehost via Netlify (en gekoppelde diensten) met databeheer en beveiliging conform Europese wetgeving.</li>
  <li>Leverancier streeft naar hoge beschikbaarheid, maar kan geen absolute uptime garanderen.</li>
  <li>Onderhoud vindt bij voorkeur buiten kantooruren plaats; storingen worden zo spoedig mogelijk verholpen.</li>
</ol>

<h2><strong>Artikel 6 – Privacy en gegevensbescherming</strong></h2>
<ol>
  <li>Partijen erkennen dat persoonsgegevens worden verwerkt bij gebruik van de Dienst.</li>
  <li>Leverancier handelt conform de AVG. Bij invoer van persoonsgegevens door Klant geldt Klant als verwerkingsverantwoordelijke en Leverancier als verwerker.</li>
  <li>Op verzoek sluiten partijen een verwerkersovereenkomst (DPA) waarin verwerking en beveiliging nader zijn geregeld.</li>
  <li>Data wordt veilig opgeslagen in een online database. Passende technische en organisatorische maatregelen zijn van toepassing.</li>
</ol>

<h2><strong>Artikel 7 – Intellectuele eigendom</strong></h2>
<ol>
  <li>Alle IE-rechten op software, broncode, ontwerpen en documentatie berusten volledig bij Leverancier.</li>
  <li>Klant krijgt een niet-exclusief, niet-overdraagbaar en herroepbaar gebruiksrecht voor de duur van de Overeenkomst.</li>
  <li>Het is Klant verboden de software te kopiëren, wijzigen, sublicentiëren, verhuren of reverse-engineeren zonder voorafgaande schriftelijke toestemming.</li>
</ol>

<h2><strong>Artikel 8 – Aansprakelijkheid</strong></h2>
<ol>
  <li>Leverancier is niet aansprakelijk voor indirecte schade, gevolgschade, winstderving of verlies van gegevens.</li>
  <li>De totale aansprakelijkheid is beperkt tot het bedrag dat Klant in de laatste drie (3) maanden aan abonnementskosten heeft voldaan, met een maximum van € 10.000.</li>
  <li>Leverancier is niet verantwoordelijk voor fouten die voortvloeien uit onjuiste of onvolledige gegevensinvoer door Klant.</li>
</ol>

<h2><strong>Artikel 9 – Beëindiging</strong></h2>
<ol>
  <li>Beide partijen kunnen de Overeenkomst beëindigen met inachtneming van de toepasselijke opzegtermijn zoals beschreven bij het gekozen abonnement.</li>
  <li>Na beëindiging blijft de Dienst 30 dagen beschikbaar om data te exporteren.</li>
  <li>Daarna worden gegevens verwijderd, tenzij wettelijke bewaarplicht anders voorschrijft.</li>
</ol>

<h2><strong>Artikel 10 – Toepasselijk recht en bevoegde rechter</strong></h2>
<ol>
  <li>Op deze Overeenkomst is Nederlands recht van toepassing.</li>
  <li>Geschillen worden voorgelegd aan de bevoegde rechter te Amsterdam.</li>
</ol>

<h2><strong>Artikel 11 – Slotbepalingen</strong></h2>
<ol>
  <li>Indien een bepaling nietig of onafdwingbaar blijkt, blijven overige bepalingen onverkort van kracht.</li>
  <li>Wijzigingen zijn slechts geldig indien schriftelijk overeengekomen.</li>
</ol>

<h2><strong>Artikel 12 – Ondertekening</strong></h2>
<p>Aldus overeengekomen en digitaal rechtsgeldig ondertekend door beide partijen.</p>

<p><strong>Leverancier</strong><br/>
AdminiFlex B.V.<br/>
Naam: [naam vertegenwoordiger]<br/>
Functie: Oprichter/Directeur<br/>
Datum: ${today}</p>

<p><strong>Klant</strong><br/>
${p.companyName}<br/>
Naam: ${p.contactName}<br/>
Functie: [functie invullen]<br/>
Datum: ${today}</p>
`.trim();
}

