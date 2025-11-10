// app/admin/page.tsx
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Prisma singleton (voorkomt teveel connecties bij hot reload)
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const prisma = globalThis.__prisma ?? new PrismaClient();
if (!globalThis.__prisma) globalThis.__prisma = prisma;

function StatRow({
  label,
  value,
  href,
}: {
  label: string;
  value: number | string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <Link href={href} className="text-emerald-700 underline underline-offset-2">
        {label}
      </Link>
      <span className="tabular-nums text-emerald-700">{value}</span>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value || "";
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

  // ===== Live data: nieuwe aanmeldingen (Applications met status PENDING)
  const pendingCount = await prisma.application.count({
    where: { status: "PENDING" },
  });

  // ---- Demo-data (vervang later door echte API/DB) ----
  const kpis = {
    omzet: "€ 78.340,99",
    omzet_2023: "€ 537.576,00",
  };
  const todo = {
    openTickets: 5,
    bankTransacties: 11,
    inkoopFacturen: 4,
  };
  const tickets = {
    achterstallig: 14,
    gedeeltelijk: 2,
    teLaat: 1,
  };

  const aandachtNodigTotal =
    pendingCount + todo.openTickets + todo.bankTransacties + todo.inkoopFacturen;

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Beheerder dashboard</h1>
      <p className="mt-1 text-zinc-700">Overzicht van taken, omzet en tickets.</p>

      {/* 3 kolommen zoals in je voorbeeld */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* To do */}
        <div className="rounded-md border bg-white">
          <div className="border-b px-4 py-3">
            <h2 className="text-xl font-medium">To do</h2>
          </div>
          <div className="px-4 py-4">
            <div className="text-sm font-medium text-zinc-700">Aandacht nodig</div>
            <div className="text-3xl mt-1">{aandachtNodigTotal}</div>

            <div className="mt-4 text-sm">
              <div className="flex items-center justify-between text-zinc-500 mb-1">
                <span>To do</span>
                <span className="text-zinc-500">Details</span>
              </div>

              {/* ➕ Nieuwe rij met live teller */}
              <StatRow
                label="Nieuwe aanmeldingen"
                value={pendingCount}
                href="/admin/klanten/aanmaken"
              />

              <StatRow
                label="Openstaande tickets"
                value={todo.openTickets}
                href="/admin/tickets/openstaande"
              />
              <StatRow
                label="Openstaande banktransacties"
                value={todo.bankTransacties}
                href="/admin/financieel/bank"
              />
              <StatRow
                label="Te verwerken inkoopfacturen"
                value={todo.inkoopFacturen}
                href="/admin/financieel/crediteuren"
              />
            </div>
          </div>
        </div>

        {/* Omzet (midden) */}
        <div className="rounded-md border bg-white">
          <div className="border-b px-4 py-3">
            <h2 className="text-xl font-medium">Omzet</h2>
          </div>

          <div className="px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-zinc-50 p-3">
                <div className="text-zinc-500">2024 • t/m periode 12</div>
                <div className="text-xl font-semibold">{kpis.omzet}</div>
              </div>
              <div className="rounded-md bg-zinc-50 p-3">
                <div className="text-zinc-500">2023 • t/m periode 12</div>
                <div className="text-xl font-semibold">{kpis.omzet_2023}</div>
              </div>
            </div>

            {/* Plaatsvervanger voor grafiek */}
            <div className="h-48 rounded-md border border-dashed grid place-items-center text-sm text-zinc-500">
              Grafiek omzet (mock)
            </div>
          </div>
        </div>

        {/* Overzicht openstaande tickets (vervangt 'Waarschuwing') */}
        <div className="rounded-md border bg-white">
          <div className="border-b px-4 py-3">
            <h2 className="text-xl font-medium">Overzicht openstaande tickets</h2>
          </div>
          <div className="px-4 py-4">
            <div className="text-sm font-medium text-zinc-700">Aandacht nodig</div>
            <div className="text-3xl mt-1">
              {tickets.achterstallig + tickets.gedeeltelijk + tickets.teLaat}
            </div>

            <div className="mt-4 text-sm">
              <div className="flex items-center justify-between text-zinc-500 mb-1">
                <span>Signaleren</span>
                <span className="text-zinc-500">Details</span>
              </div>

              <StatRow
                label="Achterstallige tickets"
                value={tickets.achterstallig}
                href="/admin/tickets/openstaande"
              />
              <StatRow
                label="Gedeeltelijk afgehandelde tickets"
                value={tickets.gedeeltelijk}
                href="/admin/tickets/openstaande"
              />
              <StatRow
                label="Te late tickets"
                value={tickets.teLaat}
                href="/admin/tickets/openstaande"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
