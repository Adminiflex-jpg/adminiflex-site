// app/admin/page.tsx
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function StatCard({
  title,
  value,
  href,
  color = "#2F6B4F",
}: {
  title: string;
  value: string | number;
  href: string;
  color?: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border bg-white/90 backdrop-blur p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="text-xs text-zinc-600">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div className="mt-3 inline-block text-sm underline" style={{ color }}>
        Bekijken →
      </div>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";

  let isAdmin = false;
  try {
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & { role?: string };
      isAdmin = payload?.role === "admin";
    }
  } catch {
    isAdmin = false;
  }

  if (!isAdmin) {
    return (
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-2xl font-semibold">Niet ingelogd</h1>
        <p className="mt-2">Je hebt geen toegang tot deze pagina.</p>
        <Link href="/login" className="mt-4 inline-block underline">
          Ga naar inloggen
        </Link>
      </main>
    );
  }

  const oldGreen = "#2F6B4F";
  const lightMint = "#E8F2ED";

  // Placeholder stat-waarden (later vervangen door echte data)
  const stats = {
    klanten: 12,
    administraties: 18,
    openstaand: "€ 4.210",
    betalingenVandaag: 6,
  };

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Admin dashboard</h1>
        <p className="mt-1 text-zinc-700">Welkom! Hier beheer je klanten, administraties en instellingen.</p>
      </div>

      {/* KPI-balk */}
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard title="Klanten" value={stats.klanten} href="/admin/klanten" />
        <StatCard title="Administraties" value={stats.administraties} href="/admin/administraties" />
        <StatCard title="Openstaande posten" value={stats.openstaand} href="/admin/facturatie" />
        <StatCard title="Betalingen (vandaag)" value={stats.betalingenVandaag} href="/admin/facturatie" />
      </section>

      {/* Tegel-navigatie */}
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-xl border bg-white/90 backdrop-blur">
          <h3 className="font-medium" style={{ color: oldGreen }}>Klantenbeheer</h3>
          <p className="mt-2 text-sm text-zinc-700">
            Zoeken, toevoegen, bewerken, deactiveren, wachtwoord resetten.
          </p>
          <Link href="/admin/klanten" className="mt-4 inline-block px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: oldGreen }}>
            Naar klanten
          </Link>
        </div>

        <div className="p-6 rounded-xl border bg-white/90 backdrop-blur">
          <h3 className="font-medium" style={{ color: oldGreen }}>Administraties</h3>
          <p className="mt-2 text-sm text-zinc-700">
            Balans, W&V, BTW-status, import/export, auditlog.
          </p>
          <Link href="/admin/administraties" className="mt-4 inline-block px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: oldGreen }}>
            Naar administraties
          </Link>
        </div>

        <div className="p-6 rounded-xl border bg-white/90 backdrop-blur">
          <h3 className="font-medium" style={{ color: oldGreen }}>Facturatie & betalingen</h3>
          <p className="mt-2 text-sm text-zinc-700">
            Facturen, betaalstatus, openstaande posten, export CSV/PDF.
          </p>
          <Link href="/admin/facturatie" className="mt-4 inline-block px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: oldGreen }}>
            Naar facturatie
          </Link>
        </div>

        <div className="p-6 rounded-xl border bg-white/90 backdrop-blur">
          <h3 className="font-medium" style={{ color: oldGreen }}>Rapportages</h3>
          <p className="mt-2 text-sm text-zinc-700">
            Klantgroei, modulegebruik, omzet per klant, export.
          </p>
          <Link href="/admin/rapportages" className="mt-4 inline-block px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: oldGreen }}>
            Naar rapportages
          </Link>
        </div>

        <div className="p-6 rounded-xl border bg-white/90 backdrop-blur">
          <h3 className="font-medium" style={{ color: oldGreen }}>Modules & features</h3>
          <p className="mt-2 text-sm text-zinc-700">
            Activeer/deactiveer modules per klant (Leden, Voorraad, Offertes).
          </p>
          <Link href="/admin/modules" className="mt-4 inline-block px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: oldGreen }}>
            Naar modules
          </Link>
        </div>

        <div className="p-6 rounded-xl border bg-white/90 backdrop-blur">
          <h3 className="font-medium" style={{ color: oldGreen }}>Instellingen</h3>
          <p className="mt-2 text-sm text-zinc-700">
            Branding, e-mailsjablonen, notificaties, beveiliging (2FA), API-keys.
          </p>
          <div className="mt-4 flex gap-2">
            <Link href="/admin/instellingen" className="px-4 py-2 rounded-md text-white"
                  style={{ backgroundColor: oldGreen }}>
              Open instellingen
            </Link>
            <Link href="/admin/setup-2fa" className="px-4 py-2 rounded-md border"
                  style={{ borderColor: oldGreen, color: oldGreen }}>
              2FA instellen
            </Link>
          </div>
        </div>
      </section>

      {/* Systeem acties */}
      <section className="mt-10 rounded-xl border bg-white/80 p-5">
        <h3 className="font-medium" style={{ color: oldGreen }}>Systeem</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          <form action="/api/logout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: oldGreen }}
            >
              Uitloggen
            </button>
          </form>

          <Link href="/" className="px-4 py-2 rounded-md border"
                style={{ borderColor: oldGreen, color: oldGreen }}>
            Terug naar website
          </Link>
        </div>
        <p className="mt-3 text-xs text-zinc-600">
          Tip: in een volgende iteratie vullen we deze tegels met echte cijfers via API’s.
        </p>
      </section>
    </main>
  );
}

