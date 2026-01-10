// app/admin/klanten/contracten/page.tsx
import { PrismaClient, ContractStatus } from "@prisma/client";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import { BRAND_MINT } from "@/lib/theme";

const prisma = new PrismaClient();
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ContractenPage() {
  // 1. Check: admin ingelogd?
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
    return (
      <main
        className="min-h-[calc(100vh-4rem)]"
        style={{
          background: `linear-gradient(180deg, ${BRAND_MINT} 0%, #ffffff 100%)`,
        }}
      >
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
          <div className="bg-white/90 border border-emerald-100 shadow-sm rounded-xl p-6">
            <h1 className="text-2xl font-semibold mb-2">Geen toegang</h1>
            <p className="text-sm text-zinc-600">
              Je bent niet ingelogd als beheerder. Log opnieuw in op{" "}
              <Link href="/login" className="underline text-emerald-700">
                het beheerdersdashboard
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    );
  }

  // 2. Alle contracten ophalen (laatste eerst)
  const contracts = await prisma.contract.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
    },
  });

  return (
    <main
      className="min-h-[calc(100vh-4rem)]"
      style={{
        background: `linear-gradient(180deg, ${BRAND_MINT} 0%, #ffffff 100%)`,
      }}
    >
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {/* Titel + uitleg */}
        <div className="mb-6 md:mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
              Contracten
            </h1>
            <p className="mt-2 text-sm md:text-base text-zinc-600">
              Overzicht van alle klantcontracten. Concepten en niet-getekende
              contracten kun je hier opvolgen.
            </p>
          </div>
          <Link
            href="/admin/klanten/aanmaken"
            className="inline-flex items-center rounded-md border border-emerald-700 text-emerald-700 px-3 py-1.5 text-xs md:text-sm font-medium hover:bg-emerald-50 transition"
          >
            + Nieuwe klantomgeving
          </Link>
        </div>

        {/* Witte kaart met tabel */}
        <div className="bg-white/90 border border-emerald-100 shadow-sm rounded-xl overflow-hidden">
          <div className="border-b border-emerald-100 px-4 md:px-6 py-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-zinc-700">
              {contracts.length} contract
              {contracts.length === 1 ? "" : "en"}
            </h2>
          </div>

          {contracts.length === 0 ? (
            <div className="px-4 md:px-6 py-8 text-sm text-zinc-500">
              Er zijn nog geen contracten aangemaakt.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-emerald-50/70 border-b border-emerald-100">
                  <tr className="text-xs font-medium text-zinc-700 uppercase tracking-wide">
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      Datum
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      Klantnr
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      Bedrijf
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      Pakket
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      Klantomgeving
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap text-right">
                      Actie
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50">
                  {contracts.map((contract) => {
                    const c = contract.customer;
                    const datum = contract.createdAt.toISOString().slice(0, 10);
                    const statusLabel =
                      contract.status === ContractStatus.SIGNED
                        ? "Getekend"
                        : contract.status === ContractStatus.SENT
                        ? "Verzonden ter ondertekening"
                        : "Concept";

                    return (
                      <tr
                        key={contract.id}
                        className="hover:bg-emerald-50/40 transition-colors"
                      >
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                          {datum}
                        </td>
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                          {c?.number ?? "-"}
                        </td>
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                          {c?.companyName ?? "-"}
                        </td>
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                            {c?.plan ?? "-"}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                          {statusLabel}
                        </td>
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                          {c ? (
                            <span className="text-xs text-zinc-700 font-mono">
                              /portal/{c.number}
                            </span>
                          ) : (
                            <span className="text-xs text-zinc-400">
                              Onbekend
                            </span>
                          )}
                        </td>
                        <td className="px-4 md:px-6 py-3 whitespace-nowrap text-right">
                          {c ? (
                            <Link
                              href={`/admin/klanten/${c.number}/contract`}
                              className="text-xs md:text-sm font-medium text-emerald-700 hover:text-emerald-900 underline-offset-2 hover:underline"
                            >
                              Bekijken
                            </Link>
                          ) : (
                            <span className="text-xs text-zinc-400">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
