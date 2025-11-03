// app/admin/klanten/[id]/layout.tsx
import Link from "next/link";

export default function CustomerLayout({
  children, params,
}:{ children: React.ReactNode; params: { id: string } }) {
  const { id } = params;
  const oldGreen = "#2F6B4F";

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-16">
      <h1 className="text-2xl font-semibold">Klant {id}</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link href={`/admin/klanten/${id}`} className="px-3 py-2 rounded-md border" style={{ borderColor: oldGreen, color: oldGreen }}>
          Gegevens
        </Link>
        <Link href={`/admin/klanten/${id}/contract`} className="px-3 py-2 rounded-md border" style={{ borderColor: oldGreen, color: oldGreen }}>
          Contract
        </Link>
        <Link href={`/admin/klanten/${id}/facturen`} className="px-3 py-2 rounded-md border" style={{ borderColor: oldGreen, color: oldGreen }}>
          Facturen
        </Link>
        <Link href={`/admin/klanten/${id}/comms`} className="px-3 py-2 rounded-md border" style={{ borderColor: oldGreen, color: oldGreen }}>
          Communicatie
        </Link>
      </div>

      <div className="mt-8">{children}</div>
    </main>
  );
}
