// app/admin/klanten/page.tsx
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";

const prisma = new PrismaClient();
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function KlantenOverzichtPage() {
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
      <main className="max-w-5xl mx-auto px-4 py-10">
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

  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      contracts: {
        orderBy: { createdAt: "desc" },
        take: 1, // laatste contract
      },
    },
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Klanten – Overzicht</h1>

      <div className="mb-4">
        <Link
          href="/admin/klanten/aanmaken"
          className="inline-flex items-center px-4 py-2 rounded-md text-sm border hover:bg-zinc-50"
        >
          + Nieuwe klantomgeving
        </Link>
      </div>

      <div className="overflow-x-auto bg-white border rounded-md shadow-sm">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-zinc-100">
            <tr className="border-b">
              <th className="px-3 py-2 text-left font-semibold">Klantnr</th>
              <th className="px-3 py-2 text-left font-semibold">Bedrijf</th>
              <th className="px-3 py-2 text-left font-semibold">Contact</th>
              <th className="px-3 py-2 text-left font-semibold">Adres</th>
              <th className="px-3 py-2 text-left font-semibold">Postcode</th>
              <th className="px-3 py-2 text-left font-semibold">Plaats</th>
              <th className="px-3 py-2 text-left font-semibold">E-mail</th>
              <th className="px-3 py-2 text-left font-semibold">KVK</th>
              <th className="px-3 py-2 text-left font-semibold">BTW</th>
              <th className="px-3 py-2 text-left font-semibold">Pakket</th>
              <th className="px-3 py-2 text-left font-semibold">Contract</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const latestContract = c.contracts[0] ?? null;
              return (
                <tr key={c.id} className="border-t">
                  <td className="px-3 py-2">{c.number}</td>
                  <td className="px-3 py-2">{c.companyName}</td>
                  <td className="px-3 py-2">{c.contactName}</td>
                  <td className="px-3 py-2">{c.address}</td>
                  <td className="px-3 py-2">{c.postalCode}</td>
                  <td className="px-3 py-2">{c.city}</td>
                  <td className="px-3 py-2">{c.email}</td>
                  <td className="px-3 py-2">{c.kvk}</td>
                  <td className="px-3 py-2">{c.btw}</td>
                  <td className="px-3 py-2">{c.plan}</td>
                  <td className="px-3 py-2">
                    {latestContract ? (
                      <Link
                        href={`/admin/klanten/${c.number}/contract`}
                        className="text-emerald-700 underline"
                      >
                        Bekijken
                      </Link>
                    ) : (
                      <span className="text-zinc-400 text-xs">
                        Nog geen contract
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

            {customers.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  className="px-3 py-6 text-center text-zinc-500"
                >
                  Nog geen klanten aangemaakt.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
