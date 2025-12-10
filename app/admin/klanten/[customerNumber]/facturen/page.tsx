// app/admin/klanten/[customerNumber]/facturen/page.tsx
export const dynamic = "force-dynamic";

export default async function CustomerInvoicesPage({
  params,
}: {
  params: Promise<{ customerNumber: string }>;
}) {
  const { customerNumber } = await params;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-xl font-medium mb-2">Facturen</h2>
      <p className="text-zinc-700">
        Overzicht van facturen voor klant <strong>{customerNumber}</strong>:
        nummer, datum, status, totaal. (Nog te koppelen aan je facturen-data.)
      </p>
      <div className="mt-4 rounded-xl border bg-white/90 p-4">
        <p className="text-sm text-zinc-600">
          Nog geen data – koppel later aan je facturen-API of database.
        </p>
      </div>
    </section>
  );
}
