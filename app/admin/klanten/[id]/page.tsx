// app/admin/klanten/[id]/page.tsx
import Link from "next/link";

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const oldGreen = "#2F6B4F";

  return (
    <>
      <h1 className="text-2xl font-semibold">Klant {id}</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/admin/klanten/${id}`}
          className="px-3 py-2 rounded-md border"
          style={{ borderColor: oldGreen, color: oldGreen }}
        >
          Gegevens
        </Link>
        <Link
          href={`/admin/klanten/${id}/contract`}
          className="px-3 py-2 rounded-md border"
          style={{ borderColor: oldGreen, color: oldGreen }}
        >
          Contract
        </Link>
        <Link
          href={`/admin/klanten/${id}/facturen`}
          className="px-3 py-2 rounded-md border"
          style={{ borderColor: oldGreen, color: oldGreen }}
        >
          Facturen
        </Link>
        <Link
          href={`/admin/klanten/${id}/comms`}
          className="px-3 py-2 rounded-md border"
          style={{ borderColor: oldGreen, color: oldGreen }}
        >
          Communicatie
        </Link>
      </div>

      <div className="mt-8">
        {/* Hier kun je klantgegevens renderen */}
        <p className="text-sm text-zinc-700">
          Informatie en componenten voor klant {id}.
        </p>
      </div>
    </>
  );
}
