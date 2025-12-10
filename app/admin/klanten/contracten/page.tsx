// app/admin/klanten/contracten/page.tsx
import { PrismaClient, ContractStatus } from "@prisma/client";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";

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
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2">Geen toegang</h1>
        <p className="text-zinc-600">
          Je bent niet ingelogd als beheerder. Log opnieuw in op{" "}
          <Link href="/login" className="underline text-emerald-700">
            het beheerdersdashboard
          </Link>
          .
        </p>
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
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Contracten</h1>
          <p className="text-sm text-zinc-600 mt-1">
            Overzicht van alle klantcontracten. Concepten en niet-getekende
            contracten kun je hier opvolgen.
          </p>
        </div>

        <Link
          href="/admin/klanten/aanmaken"
          className="text-sm border rounded-md px-3 py-2 hover:bg-zinc-50"
        >
          + Nieuwe klantomgeving
        </Link>
      </div>

      <div className="overflow-x-auto bg-white border rounded-md shadow-sm">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-zinc-100">
            <tr className="border-b">
              <th className="px-3 py-2 text-left font-semibold">Datum</th>
              <th className="px-3 py-2 text-left font-semibold">Klantnr</th>
              <th className="px-3 py-2 text-left font-semibold">Bedrijf</th>
              <th className="px-3 py-2 text-left font-semibold">Pakket</th>
              <th className="px-3 py-2 text-left font-semibold">Status</th>
              <th className="px-3 py-2 text-left font-semibold">
                Klantomgeving
              </th>
              <th className="px-3 py-2 text-left font-semibold">Actie</th>
            </tr>
          </thead>
          <tbody>
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
                <tr key={contract.id} className="border-t">
                  <td className="px-3 py-2 whitespace-nowrap">{datum}</td>
                  <td className="px-3 py-2">{c?.number ?? "-"}</td>
                  <td className="px-3 py-2">{c?.companyName ?? "-"}</td>
                  <td className="px-3 py-2">{c?.plan ?? "-"}</td>
                  <td className="px-3 py-2">{statusLabel}</td>
                  <td className="px-3 py-2">
                    {c ? (
                      <span className="text-xs text-zinc-700">
                        /portal/{c.number}
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-400">Onbekend</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {c ? (
                      <Link
                        href={`/admin/klanten/${c.number}/contract`}
                        className="text-emerald-700 underline"
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

            {contracts.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-6 text-center text-zinc-500"
                >
                  Er zijn nog geen contracten aangemaakt.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
