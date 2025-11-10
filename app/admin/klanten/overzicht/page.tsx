// app/admin/klanten/overzicht/page.tsx
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function OverzichtPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-2xl font-semibold">Klanten – Overzicht</h1>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <Th>Klantnr</Th><Th>Bedrijf</Th><Th>Contact</Th><Th>Adres</Th>
              <Th>Postcode</Th><Th>Plaats</Th><Th>E-mail</Th>
              <Th>KVK</Th><Th>BTW</Th><Th>Pakket</Th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-t">
                <Td>{c.number}</Td>
                <Td>{c.companyName}</Td>
                <Td>{c.contactName}</Td>
                <Td>{c.address}</Td>
                <Td>{c.postalCode}</Td>
                <Td>{c.city}</Td>
                <Td>{c.email}</Td>
                <Td>{c.kvk}</Td>
                <Td>{c.btw}</Td>
                <Td>{c.plan}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
function Th({ children }: any) { return <th className="text-left px-3 py-2 border">{children}</th>; }
function Td({ children }: any) { return <td className="px-3 py-2 border">{children}</td>; }

