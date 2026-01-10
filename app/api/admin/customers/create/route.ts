// app/api/admin/customers/create/route.ts
import { NextResponse } from "next/server";
import {
  Prisma,
  PrismaClient,
  PlanCode,
  ContractStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"; // ✅ nieuw

const prisma = new PrismaClient();

/**
 * Label voor weergave van het pakket
 */
function labelForPlan(plan: PlanCode) {
  switch (plan) {
    case "PLUS":
      return "PLUS";
    case "PRO":
      return "PRO";
    default:
      return "BASIC";
  }
}

/**
 * HTML van het contract met jouw volledige tekst,
 * maar mét dynamische gegevens (klant, pakket, KVK/BTW, datum).
 */
function buildContractHtml(opts: {
  companyName: string;
  contactName: string;
  kvk: string;
  btw: string;
  plan: PlanCode;
  customerNumber: string;
}) {
  const { companyName, contactName, kvk, btw, plan, customerNumber } = opts;

  const planLabel = labelForPlan(plan);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  return `
    <h2>Overeenkomst Software-as-a-Service (SaaS) – AdminiFlex B.V.</h2>
    <p><strong>Versie:</strong> 2025-11-10<br/>
    <strong>Datum van ondertekening:</strong> ${today}</p>

    <h3>Artikel 1 – Partijen</h3>
    <p>
      <strong>Leverancier:</strong> AdminiFlex B.V. gevestigd te [adres invullen],
      ingeschreven bij de Kamer van Koophandel onder nummer [KvK invullen],
      BTW-nummer [BTW invullen], rechtsgeldig vertegenwoordigd door [naam invullen],
      in de hoedanigheid van oprichter/directeur, hierna: <em>Leverancier</em>.
    </p>
    <p>
      <strong>Klant:</strong> ${companyName} (KVK: ${kvk}, BTW: ${btw}),
      t.a.v. ${contactName}, hierna: <em>Klant</em>.
      <br/>Klantnummer: <strong>${customerNumber}</strong>.
    </p>

    <h3>Artikel 2 – Doel en aard van de dienst</h3>
    <p>
      Leverancier biedt via www.adminiflex.nl een online softwareapplicatie aan
      onder de naam AdminiFlex (de <em>Dienst</em>).
    </p>
    <p>
      De Dienst richt zich op ondernemingen, verenigingen en zelfstandigen
      (zzp, mkb en grotere organisaties) voor digitale boekhouding,
      ledenadministratie, offertes/contracten en rapportages.
    </p>
    <p>
      De Dienst stelt Klant in staat administratieve en boekhoudkundige taken te
      automatiseren, rapportages te genereren en financiële transacties te
      registreren. Leverancier levert uitsluitend technische ondersteuning
      omtrent de werking van de software; er wordt geen fiscaal, juridisch
      of boekhoudkundig advies verstrekt.
    </p>

    <h3>Artikel 3 – Duur, verlenging en opzegging</h3>
    <p>
      De Overeenkomst wordt aangegaan voor onbepaalde tijd, tenzij schriftelijk
      anders overeengekomen.
    </p>
    <p>
      Klant kiest bij aanvang voor een maand- of jaarabonnement (gekozen pakket:
      <strong>${planLabel}</strong>).
    </p>
    <p>
      Bij maandabonnementen geldt een opzegtermijn van één (1) maand.
      Bij jaarabonnementen geldt een opzegtermijn van drie (3) maanden vóór
      het einde van de contractperiode.
    </p>
    <p>
      Jaarcontracten worden automatisch verlengd met telkens twaalf (12) maanden,
      tenzij tijdig opgezegd.
    </p>
    <p>
      Nieuwe klanten ontvangen een proefperiode van dertig (30) dagen waarin
      de Dienst kosteloos gebruikt mag worden.
    </p>

    <h3>Artikel 4 – Prijzen en betaling</h3>
    <p>
      Tarieven (excl. btw): Basic € 12,50 p/m; Plus € 24,50 p/m; Pro € 49,50 p/m.
    </p>
    <p>
      Facturatie vindt maandelijks achteraf plaats, tenzij anders overeengekomen.
      Betalingstermijn: 14 dagen na factuurdatum.
    </p>
    <p>
      Leverancier kan tarieven jaarlijks indexeren of aanpassen met een
      aankondigingstermijn van minimaal 30 dagen.
    </p>

    <h3>Artikel 5 – Hosting en beschikbaarheid</h3>
    <p>
      De Dienst wordt gehost via Netlify (en gekoppelde diensten) met databeheer
      en beveiliging conform Europese wetgeving.
    </p>
    <p>
      Leverancier streeft naar hoge beschikbaarheid, maar kan geen absolute
      uptime garanderen. Onderhoud vindt bij voorkeur buiten kantooruren plaats;
      storingen worden zo spoedig mogelijk verholpen.
    </p>

    <h3>Artikel 6 – Privacy en gegevensbescherming</h3>
    <p>
      Partijen erkennen dat persoonsgegevens worden verwerkt bij gebruik van de
      Dienst. Leverancier handelt conform de AVG. Bij invoer van
      persoonsgegevens door Klant geldt Klant als verwerkingsverantwoordelijke
      en Leverancier als verwerker.
    </p>
    <p>
      Op verzoek sluiten partijen een verwerkersovereenkomst (DPA) waarin
      verwerking en beveiliging nader zijn geregeld. Data wordt veilig
      opgeslagen in een online database. Passende technische en organisatorische
      maatregelen zijn van toepassing.
    </p>

    <h3>Artikel 7 – Intellectuele eigendom</h3>
    <p>
      Alle IE-rechten op software, broncode, ontwerpen en documentatie berusten
      volledig bij Leverancier. Klant krijgt een niet-exclusief,
      niet-overdraagbaar en herroepbaar gebruiksrecht voor de duur van de
      Overeenkomst.
    </p>
    <p>
      Het is Klant verboden de software te kopiëren, wijzigen, sublicentiëren,
      verhuren of reverse-engineeren zonder voorafgaande schriftelijke
      toestemming.
    </p>

    <h3>Artikel 8 – Aansprakelijkheid</h3>
    <p>
      Leverancier is niet aansprakelijk voor indirecte schade, gevolgschade,
      winstderving of verlies van gegevens.
    </p>
    <p>
      De totale aansprakelijkheid is beperkt tot het bedrag dat Klant in de
      laatste drie (3) maanden aan abonnementskosten heeft voldaan, met een
      maximum van € 10.000.
    </p>
    <p>
      Leverancier is niet verantwoordelijk voor fouten die voortvloeien uit
      onjuiste of onvolledige gegevensinvoer door Klant.
    </p>

    <h3>Artikel 9 – Beëindiging</h3>
    <p>
      Beide partijen kunnen de Overeenkomst beëindigen met inachtneming van de
      toepasselijke opzegtermijn zoals beschreven bij het gekozen abonnement.
    </p>
    <p>
      Na beëindiging blijft de Dienst 30 dagen beschikbaar om data te exporteren.
      Daarna worden gegevens verwijderd, tenzij wettelijke bewaarplicht anders
      voorschrijft.
    </p>

    <h3>Artikel 10 – Toepasselijk recht en bevoegde rechter</h3>
    <p>
      Op deze Overeenkomst is Nederlands recht van toepassing.
      Geschillen worden voorgelegd aan de bevoegde rechter te Amsterdam.
    </p>

    <h3>Artikel 11 – Slotbepalingen</h3>
    <p>
      Indien een bepaling nietig of onafdwingbaar blijkt, blijven overige
      bepalingen onverkort van kracht. Wijzigingen zijn slechts geldig indien
      schriftelijk overeengekomen.
    </p>

    <h3>Artikel 12 – Ondertekening</h3>
    <p>
      Aldus overeengekomen en (digitaal) rechtsgeldig ondertekend door beide
      partijen.
    </p>

    <p>
      <strong>Leverancier</strong><br/>
      AdminiFlex B.V.<br/>
      Naam: [naam vertegenwoordiger]<br/>
      Functie: Oprichter/Directeur<br/>
      Datum: ${today}
    </p>

    <p>
      <strong>Klant</strong><br/>
      Naam: ${companyName}<br/>
      Contactpersoon: ${contactName}<br/>
      Functie: [functie invullen]<br/>
      Datum: ${today}
    </p>
  `;
}

/**
 * E-mail sturen naar demo-klant met inloggegevens
 */
async function sendDemoEmail(params: {
  to: string;
  contactName: string;
  companyName: string;
  loginEmail: string;
  tempPassword: string;
  demoExpiresAt: Date;
}) {
  const {
    to,
    contactName,
    companyName,
    loginEmail,
    tempPassword,
    demoExpiresAt,
  } = params;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Als SMTP niet goed is ingesteld: loggen, maar niet crashen
  if (!host || !user || !pass) {
    console.warn(
      "[sendDemoEmail] SMTP-gegevens ontbreken (SMTP_HOST/SMTP_USER/SMTP_PASS). E-mail wordt niet verzonden."
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const from = process.env.SMTP_FROM || "noreply@adminiflex.nl";
  const portalUrl =
    process.env.PORTAL_LOGIN_URL || "https://www.adminiflex.nl/portal/login";

  const vervalDatum = demoExpiresAt.toLocaleDateString("nl-NL");

  const html = `
    <p>Beste ${contactName},</p>
    <p>
      Je demo-omgeving voor <strong>${companyName}</strong> is aangemaakt in AdminiFlex.
    </p>
    <p>Je kunt inloggen via: <a href="${portalUrl}">${portalUrl}</a></p>
    <p>
      <strong>Gebruikersnaam:</strong> ${loginEmail}<br/>
      <strong>Tijdelijk wachtwoord:</strong> ${tempPassword}
    </p>
    <p>
      De demo-omgeving is geldig tot en met <strong>${vervalDatum}</strong>.
      Na deze datum wordt de toegang automatisch geblokkeerd, tenzij jullie
      kiezen voor omzetting naar een betaald abonnement.
    </p>
    <p>Met vriendelijke groet,<br/>Het AdminiFlex-team</p>
  `;

  await transporter.sendMail({
    from,
    to,
    subject: "Jouw AdminiFlex demo-omgeving is klaar",
    html,
  });
}

/**
 * POST /api/admin/customers/create
 * Maakt:
 *  - Customer (met isActive = false + evt. demoActive/demoExpiresAt)
 *  - PortalUser (login voor klant)
 *  - Contract (DRAFT) met bovenstaande HTML
 */
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const companyName = String(form.get("companyName") ?? "").trim();
    const contactName = String(form.get("contactName") ?? "").trim();
    const address = String(form.get("address") ?? "").trim();
    const postalCode = String(form.get("postalCode") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const kvk = String(form.get("kvk") ?? "").trim();
    const btw = String(form.get("btw") ?? "").trim();

    const planRaw = String(form.get("plan") ?? "BASIC").toUpperCase();
    const allowedPlans: PlanCode[] = ["BASIC", "PLUS", "PRO"];
    const plan: PlanCode = (allowedPlans as string[]).includes(planRaw)
      ? (planRaw as PlanCode)
      : "BASIC";

    const portalEmail = String(form.get("portalEmail") ?? "").trim().toLowerCase();
    const portalPassword = String(form.get("portalPassword") ?? "");

    // ✅ Demo-veld uitlezen uit formulier (checkbox, hidden of radio)
    const isDemoRaw = String(form.get("isDemo") ?? "").toLowerCase();
    const isDemo =
      isDemoRaw === "1" ||
      isDemoRaw === "true" ||
      isDemoRaw === "on";

    // 30 dagen demo-periode als isDemo = true
    const demoExpiresAt = isDemo
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      : null;

    if (!companyName || !contactName || !portalEmail || !portalPassword) {
      return NextResponse.redirect(
        new URL(
          "/admin/klanten/contracten?error=Verplichte+velden+ontbreken",
          req.url,
        ),
      );
    }

    const passwordHash = await bcrypt.hash(portalPassword, 10);

    // Klantnummer genereren, bijvoorbeeld: CUST-2025XXXXXX
    const now = new Date();
    const year = now.getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    const customerNumber = `CUST-${year}${random}`;

    // 1) Customer aanmaken
    const customer = await prisma.customer.create({
      data: {
        number: customerNumber,
        companyName,
        contactName,
        address,
        postalCode,
        city,
        email,
        kvk,
        btw,
        plan,
        // Omgeving nog niet actief totdat contract getekend is
        isActive: false,
        // ✅ Nieuw: demo-informatie
        demoActive: isDemo,
        demoExpiresAt: demoExpiresAt ?? undefined,
      } as Prisma.CustomerCreateInput,
    });

    // 2) PortalUser aanmaken
    await prisma.portalUser.create({
      data: {
        customerId: customer.id,
        email: portalEmail,
        passwordHash,
        role: "SUPER_USER",
      },
    });

    // 3) Contract (concept) aanmaken
    const html = buildContractHtml({
      companyName,
      contactName,
      kvk,
      btw,
      plan,
      customerNumber,
    });

    await prisma.contract.create({
      data: {
        customerId: customer.id,
        status: ContractStatus.DRAFT,
        html,
        version: 1,
      },
    });

    // 4) Als demo → e-mail sturen met inloggegevens
    if (isDemo && demoExpiresAt) {
      try {
        await sendDemoEmail({
          to: email, // contact e-mailadres klant
          contactName,
          companyName,
          loginEmail: portalEmail,
          tempPassword: portalPassword,
          demoExpiresAt,
        });
      } catch (err) {
        console.error("[customers/create] Demo-mail kon niet worden verstuurd:", err);
        // we laten de redirect gewoon doorgaan
      }
    }

    // 5) Terug naar contract-overzicht
    return NextResponse.redirect(
      new URL(
        "/admin/klanten/contracten?success=Klantomgeving+en+contract+aangemaakt",
        req.url,
      ),
    );
  } catch (error) {
    console.error("Fout bij klant + contract aanmaken:", error);
    return NextResponse.redirect(
      new URL(
        "/admin/klanten/contracten?error=Kon+klantomgeving+niet+aanmaken",
        req.url,
      ),
    );
  }
}
