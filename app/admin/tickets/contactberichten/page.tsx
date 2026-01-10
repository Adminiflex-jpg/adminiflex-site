// app/admin/tickets/contactberichten/page.tsx
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ContactBerichtenPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-2xl font-semibold mb-2">Contactberichten</h1>
      <p className="text-sm text-zinc-600 mb-6">
        Dit zijn alle berichten die via het contactformulier zijn verstuurd.
      </p>

      {messages.length === 0 ? (
        <p className="text-sm text-zinc-600">
          Er zijn nog geen contactberichten.
        </p>
      ) : (
        <div className="overflow-x-auto border rounded-lg bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 border-b">
              <tr>
                <th className="text-left px-4 py-2 whitespace-nowrap">Datum</th>
                <th className="text-left px-4 py-2">Naam</th>
                <th className="text-left px-4 py-2">E-mail</th>
                <th className="text-left px-4 py-2">Onderwerp</th>
                <th className="text-left px-4 py-2">Bericht</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="border-t align-top">
                  <td className="px-4 py-2 whitespace-nowrap text-zinc-600">
                    {m.createdAt.toLocaleDateString("nl-NL")}
                  </td>
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2">
                    <a
                      href={`mailto:${m.email}`}
                      className="text-emerald-700 underline"
                    >
                      {m.email}
                    </a>
                  </td>
                  <td className="px-4 py-2">{m.subject ?? "-"}</td>
                  <td className="px-4 py-2 max-w-md">
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {m.message}
                    </pre>
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
