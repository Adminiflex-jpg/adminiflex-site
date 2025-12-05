
import { cookies } from "next/headers";
import { verifyPortalSession } from "@/lib/portalAuth";
import Link from "next/link";

export default async function TenantDashboardPage({
  params,
}: {
  params: { tenantSlug: string };
}) {
  const token = (await cookies()).get("portal_session")?.value || "";
  const session = token ? verifyPortalSession(token) : null;

  // 1) Controle: geen sessie
  if (!session) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Geen toegang</h1>
        <p className="mb-4">Je bent niet ingelogd.</p>
        <Link href="/portal/login" className="underline text-emerald-700">
          Ga naar login
        </Link>
      </main>
    );
  }

  // 2) Klant probeert op een verkeerde omgeving te komen
  if (session.customerNumber !== params.tenantSlug) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Geen toegang</h1>
        <p className="mb-4">
          Deze omgeving hoort niet bij jouw account.
        </p>
        <Link
          href={`/portal/${session.customerNumber}/dashboard`}
          className="underline text-emerald-700"
        >
          Ga naar jouw omgeving
        </Link>
      </main>
    );
  }

  // 3) TOEGESTAAN → Dashboard laten zien
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">
        Welkom in jouw omgeving: <span className="text-emerald-700">{session.customerNumber}</span>
      </h1>

      <p className="mt-2 text-zinc-600">
        Hier komt straks het financiële dashboard met Bank, Facturen, Klanten, Rapportages, enz.
      </p>

      <div className="mt-6">
        <p className="mb-4">Ingelogd als: <b>{session.role}</b></p>

        <Link href="/portal/login" className="underline text-sm text-zinc-700">
          Uitloggen (tijdelijk)
        </Link>
      </div>
    </main>
  );
}
