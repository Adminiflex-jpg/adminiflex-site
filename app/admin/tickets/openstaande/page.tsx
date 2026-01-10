// app/admin/tickets/openstaande/page.tsx
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import { BRAND_GREEN } from "../../../../lib/theme";

const prisma = new PrismaClient();
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function OpenstaandeTicketsPage() {
  // 1. Check: ingelogd als admin?
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
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-16">
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

  // 2. Alle PENDING applications ophalen
  const applications = await prisma.application.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-2xl font-semibold mb-2">Openstaande tickets</h1>
      <p className="text-sm text-zinc-600 mb-6">
        Dit zijn alle proefaanmeldingen via het formulier (Application) die nog
        de status <span className="font-semibold">PENDING</span> hebben. Vanuit
        hier kun je ze omzetten naar echte klanten.
      </p>

      {applications.length === 0 ? (
        <p className="text-sm text-zinc-600">
          Er zijn momenteel geen openstaande tickets.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium border-b">
                  Datum
                </th>
                <th className="px-4 py-2 text-left font-medium border-b">
                  Bedrijf
                </th>
                <th className="px-4 py-2 text-left font-medium border-b">
                  Contactpersoon
                </th>
                <th className="px-4 py-2 text-left font-medium border-b">
                  E-mail
                </th>
                <th className="px-4 py-2 text-left font-medium border-b">
                  Pakket
                </th>
                {/* NIEUWE KOLUM VOOR OPMERKINGEN */}
                <th className="px-4 py-2 text-left font-medium border-b">
                  Opmerkingen
                </th>
                <th className="px-4 py-2 text-left font-medium border-b">
                  Acties
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="px-4 py-2">
                    {new Date(app.createdAt).toLocaleDateString("nl-NL")}
                  </td>
                  <td className="px-4 py-2">{app.companyName}</td>
                  <td className="px-4 py-2">{app.contactName}</td>
                  <td className="px-4 py-2">{app.email}</td>
                  <td className="px-4 py-2">{app.plan}</td>
                  {/* OPMERKINGEN TONEN UIT Application.notes */}
                  <td className="px-4 py-2 max-w-xs whitespace-pre-wrap">
                    {/* pas 'notes' aan als jouw veld in Prisma anders heet */}
                    {app.notes && app.notes.trim() !== "" ? app.notes : "—"}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/admin/klanten/aanmaken?app=${app.id}`}
                      className="inline-flex items-center px-3 py-1 rounded-md text-white text-xs md:text-sm"
                      style={{ backgroundColor: BRAND_GREEN }}
                    >
                      Klant aanmaken
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
