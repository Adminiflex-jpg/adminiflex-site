// app/portal/[tenantSlug]/dashboard/page.tsx
import { cookies } from "next/headers";
import Link from "next/link";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyPortalSession } from "@/lib/portalAuth";

type PortalSession = {
  userId: string;
  customerNumber: string;
  email?: string;
  role?: string;
};

export default async function TenantDashboardPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>;
}) {
  // ✅ Nieuwe Next.js-stijl: params is een Promise
  const { tenantSlug } = await params;

  const cookieStore = await cookies();

  // Portal-sessie (klant)
  const portalToken = cookieStore.get("portal_session")?.value || "";
  const portalSession: PortalSession | null = portalToken
    ? (verifyPortalSession(portalToken) as PortalSession)
    : null;

  // Admin-sessie (beheerdersdashboard)
  const adminToken = cookieStore.get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";
  let adminSession: (JwtPayload & { role?: string }) | null = null;

  if (JWT_SECRET && adminToken) {
    try {
      adminSession = jwt.verify(adminToken, JWT_SECRET) as JwtPayload & {
        role?: string;
      };
    } catch {
      adminSession = null;
    }
  }

  const isAdmin = !!adminSession && adminSession.role === "admin";

  // 1) Niemand ingelogd: geen toegang
  if (!portalSession && !isAdmin) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Geen toegang</h1>
        <p className="text-zinc-600 mb-6">
          Je bent niet ingelogd voor een klantomgeving.
        </p>
        <Link href="/portal/login" className="text-emerald-700 underline">
          Ga naar login
        </Link>
      </main>
    );
  }

  // 2) Gewone klant mag alleen zijn eigen omgeving zien
  if (!isAdmin && portalSession && portalSession.customerNumber !== tenantSlug) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Geen toegang</h1>
        <p className="text-zinc-600 mb-4">
          Deze omgeving hoort niet bij jouw account.
        </p>
        <Link
          href={`/portal/${portalSession.customerNumber}/dashboard`}
          className="text-emerald-700 underline"
        >
          Ga naar jouw omgeving
        </Link>
      </main>
    );
  }

  // 3) Toegang OK – ofwel klant in eigen omgeving, ofwel admin
  const displayName =
    portalSession?.email || (isAdmin ? "Beheerder" : "Onbekende gebruiker");

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">
          Klantdashboard – omgeving {tenantSlug}
        </h1>
        <p className="text-zinc-600 mt-2">
          Welkom in de klantomgeving. Hier komt straks het financiële dashboard
          met bank, facturen, klanten en rapportages.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold mb-2">Status omgeving</h2>
          <p className="text-sm text-zinc-600">
            Dit is een eerste versie van het klantdashboard.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold mb-2">Facturatie</h2>
          <p className="text-sm text-zinc-600">
            Hier kun je straks facturen, betalingen en herinneringen bekijken.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold mb-2">Support</h2>
          <p className="text-sm text-zinc-600">
            Voor vragen kun je altijd contact opnemen met AdminiFlex.
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-700">
        <span>
          Ingelogd als: <b>{displayName}</b>{" "}
          {isAdmin ? "(beheerder – kan alle omgevingen bekijken)" : ""}
        </span>
        <span className="mx-1 text-zinc-400">•</span>
        <span>
          Omgeving: <code>{tenantSlug}</code>
        </span>
        {portalSession && (
          <>
            <span className="mx-1 text-zinc-400">•</span>
            <Link href="/portal/login" className="underline">
              Uitloggen
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
