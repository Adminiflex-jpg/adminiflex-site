// app/admin/klanten/[customerNumber]/contract/page.tsx
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function ContractPage({
  params,
}: {
  params: Promise<{ customerNumber: string }>;
}) {
  // ✅ In Next.js 16 is params een Promise → eerst uitpakken
  const { customerNumber } = await params;

  if (!customerNumber) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Klantnummer ontbreekt</h1>
        <p className="mb-4">
          Er is geen geldig klantnummer doorgegeven in de URL.
        </p>
        <Link
          href="/admin/klanten/contracten"
          className="underline text-emerald-700"
        >
          Terug naar contractoverzicht
        </Link>
      </main>
    );
  }

  // Klant + laatste contract ophalen
  const customer = await prisma.customer.findUnique({
    where: { number: customerNumber },
    include: {
      contracts: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!customer) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Klant niet gevonden</h1>
        <p className="mb-4">
          Er is geen klant gevonden met nummer{" "}
          <strong>{customerNumber}</strong>.
        </p>
        <Link
          href="/admin/klanten/contracten"
          className="underline text-emerald-700"
        >
          Terug naar contractoverzicht
        </Link>
      </main>
    );
  }

  const contract = customer.contracts[0];

  if (!contract) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Geen contract gevonden</h1>
        <p className="mb-4">
          Voor klant <strong>{customer.number}</strong> (
          {customer.companyName}) is nog geen contract opgeslagen.
        </p>
        <Link
          href="/admin/klanten/contracten"
          className="underline text-emerald-700"
        >
          Terug naar contractoverzicht
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-2xl font-semibold mb-2">
        Contract – {customer.companyName}
      </h1>
      <p className="text-sm text-zinc-600 mb-6">
        Klantnr: <strong>{customer.number}</strong> · Pakket:{" "}
        <strong>{customer.plan}</strong> · Status:{" "}
        <strong>{contract.status}</strong> · Omgeving:{" "}
        <strong>{customer.isActive ? "Actief" : "Nog niet actief"}</strong>
      </p>

      {/* Actie-knoppen */}
      <div className="mb-6 flex flex-wrap gap-3">
        {/* Terug naar lijst */}
        <Link
          href="/admin/klanten/contracten"
          className="px-4 py-2 rounded-md border text-sm"
        >
          ← Terug naar contractlijst
        </Link>

        {/* Download-contract (HTML) */}
        <a
          href={`/api/admin/contracts/${contract.id}/download`}
          className="px-4 py-2 rounded-md border text-sm"
        >
          Download contract (Word)
        </a>

        {/* Alleen tonen als nog NIET actief / niet getekend */}
        {!customer.isActive && contract.status !== "SIGNED" && (
          <form
            action="/api/admin/contracts/mark-signed"
            method="POST"
          >
            <input type="hidden" name="contractId" value={contract.id} />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-emerald-700 text-white text-sm hover:bg-emerald-800 transition"
            >
              Markeer als getekend & omgeving activeren
            </button>
          </form>
        )}

        {/* Alleen tonen als omgeving actief is */}
        {customer.isActive && (
          <form
            action="/api/admin/customers/deactivate"
            method="POST"
          >
            <input type="hidden" name="customerId" value={customer.id} />
            <input
              type="hidden"
              name="customerNumber"
              value={customer.number}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition"
            >
              Omgeving stopzetten
            </button>
          </form>
        )}
      </div>

      {/* Contract-inhoud */}
      <article className="prose max-w-none bg-white border rounded-lg p-6 shadow-sm">
        <div dangerouslySetInnerHTML={{ __html: contract.html }} />
      </article>
    </main>
  );
}
