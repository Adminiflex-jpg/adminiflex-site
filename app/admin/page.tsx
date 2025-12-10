// app/admin/page.tsx
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import { PrismaClient, ContractStatus } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Prisma singleton (voorkomt teveel connecties bij hot reload)
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const prisma = globalThis.__prisma ?? new PrismaClient();
if (!globalThis.__prisma) {
  globalThis.__prisma = prisma;
}

// kleur voor koppen en links
const oldGreen = "#2F6B4F";

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
      <Link
        href={href}
        className="underline underline-offset-2"
        style={{ color: oldGreen }}
      >
        {label}
      </Link>
      <span className="tabular-nums" style={{ color: oldGreen }}>
        {value}
      </span>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";

  // ===== Check of gebruiker admin is =====
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
    return (
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-2xl font-semibold" style={{ color: oldGreen }}>
          Niet ingelogd
        </h1>
        <p className="mt-2">Je hebt geen toegang tot deze pagina.</p>
        <Link href="/login" className="mt-4 inline-block underline">
          Ga naar inloggen
        </Link>
      </main>
    );
  }

  // ===== Nieuwe aanmeldingen: openstaande contracten =====
  // (alles wat nog NIET op SIGNED staat)
  let openContractsCount = 0;
  let openContracts: {
    id: string;
    companyName: string;
    number: string;
    status: ContractStatus;
    createdAt: Date;
  }[] = [];

  try {
    if (process.env.DATABASE_URL) {
      const rawContracts = await prisma.contract.findMany({
        where: { status: { not: ContractStatus.SIGNED } },
        orderBy: { createdAt: "desc" },
        include: { customer: true },
        take: 5, // laat de laatste 5 zien in de lijst
      });

      openContractsCount = await prisma.contract.count({
        where: { status: { not: ContractStatus.SIGNED } },
      });

      openContracts = rawContracts
        .filter((c) => c.customer)
        .map((c) => ({
          id: c.id,
          companyName: c.customer!.companyName,
          number: c.customer!.number,
          status: c.status,
          createdAt: c.createdAt,
        }));
    }
  } catch (err) {
    console.error(
      "[admin/dashboard] Kon database niet bereiken, openContractsCount -> 0",
      err
    );
    openContractsCount = 0;
    openContracts = [];
  }

  // ===== Openstaande tickets: proef-aanmeldingen (Application PENDING) =====
  let openTicketCount = 0;

  try {
    if (process.env.DATABASE_URL) {
      openTicketCount = await prisma.application.count({
        where: { status: "PENDING" },
      });
    }
  } catch (err) {
    console.error(
      "[admin/dashboard] Kon applications niet ophalen, openTicketCount -> 0",
      err
    );
    openTicketCount = 0;
  }

  // ---- Demo-data + koppeling met openTicketCount ----
  const kpis = {
    omzet: "€ 78.340,99",
    omzet_2023: "€ 537.576,00",
  };

  const todo = {
    openTickets: openTicketCount, // ✅ nu echt openstaande proef-aanmeldingen
    bankTransacties: 11,
    inkoopFacturen: 4,
  };

  const tickets = {
    achterstallig: openTicketCount, // zelfde set, eventueel later specificeren
    gedeeltelijk: 0,
    teLaat: 0,
  };

  const aandachtNodigTotal =
    openContractsCount +
    todo.openTickets +
    todo.bankTransacties +
    todo.inkoopFacturen;

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-10">
      <h1
        className="text-3xl font-semibold tracking-tight"
        style={{ color: oldGreen }}
      >
        Beheerder dashboard
      </h1>
      <p className="mt-1 text-zinc-700">
        Overzicht van taken, omzet en tickets.
      </p>

      {/* 3 kolommen zoals in je ontwerp */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* To do */}
        <div className="rounded-md border bg-white">
          <div className="border-b px-4 py-3">
            <h2
              className="text-xl font-medium"
              style={{ color: oldGreen }}
            >
              To do
            </h2>
          </div>
          <div className="px-4 py-4">
            <div className="text-sm font-medium text-zinc-700">
              Aandacht nodig
            </div>
            <div className="text-3xl mt-1">{aandachtNodigTotal}</div>

            <div className="mt-4 text-sm">
              <div className="flex items-center justify-between text-zinc-500 mb-1">
                <span>To do</span>
                <span className="text-zinc-500">Details</span>
              </div>

              {/* Nieuwe aanmeldingen → alle openstaande contracten */}
              <StatRow
                label="Nieuwe aanmeldingen"
                value={openContractsCount}
                href="/admin/klanten/contracten"
              />

              {/* Openstaande tickets → proef-aanmeldingen (Application PENDING) */}
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

            {/* Extra: lijstje met laatste nieuwe aanmeldingen (contracten) */}
            <div className="mt-4 border-t pt-3 text-xs text-zinc-600">
              <div className="mb-1 font-medium">
                Laatste nieuwe aanmeldingen
              </div>
              {openContracts.length === 0 && (
                <p className="text-zinc-500">
                  Er zijn op dit moment geen openstaande nieuwe aanmeldingen.
                </p>
              )}
              <ul className="space-y-1">
                {openContracts.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div>
                      <Link
                        href={`/admin/klanten/${c.number}/contract`}
                        className="underline"
                        style={{ color: oldGreen }}
                      >
                        {c.companyName}
                      </Link>
                      <span className="ml-2 text-[11px] text-zinc-500">
                        {c.number} ·{" "}
                        {c.createdAt.toISOString().slice(0, 10)}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border text-zinc-600">
                      {c.status === ContractStatus.DRAFT
                        ? "Concept"
                        : "Verzonden"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Omzet */}
        <div className="rounded-md border bg-white">
          <div className="border-b px-4 py-3">
            <h2
              className="text-xl font-medium"
              style={{ color: oldGreen }}
            >
              Omzet
            </h2>
          </div>

          <div className="px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-zinc-50 p-3">
                <div className="text-zinc-500">2024 • t/m periode 12</div>
                <div className="text-xl font-semibold">{kpis.omzet}</div>
              </div>
              <div className="rounded-md bg-zinc-50 p-3">
                <div className="text-zinc-500">2023 • t/m periode 12</div>
                <div className="text-xl font-semibold">
                  {kpis.omzet_2023}
                </div>
              </div>
            </div>

            <div className="h-48 rounded-md border border-dashed grid place-items-center text-sm text-zinc-500">
              Grafiek omzet (mock)
            </div>
          </div>
        </div>

        {/* Overzicht tickets */}
        <div className="rounded-md border bg-white">
          <div className="border-b px-4 py-3">
            <h2
              className="text-xl font-medium"
              style={{ color: oldGreen }}
            >
              Overzicht openstaande tickets
            </h2>
          </div>
          <div className="px-4 py-4">
            <div className="text-sm font-medium text-zinc-700">
              Aandacht nodig
            </div>
            <div className="text-3xl mt-1">
              {tickets.achterstallig +
                tickets.gedeeltelijk +
                tickets.teLaat}
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
