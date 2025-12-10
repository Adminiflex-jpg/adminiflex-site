// app/admin/klanten/[customerNumber]/comms/page.tsx
export const dynamic = "force-dynamic";

export default async function CustomerCommsPage({
  params,
}: {
  params: Promise<{ customerNumber: string }>;
}) {
  // ✅ params is een Promise → uitpakken
  const { customerNumber } = await params;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Communicatie</h1>
      <p className="text-sm text-zinc-600 mb-4">
        Hier kun je later instellen welke communicatie (mails, meldingen) voor
        klant <strong>{customerNumber}</strong> gebruikt wordt.
      </p>
      <p className="text-sm text-zinc-500">
        Voor nu is dit een placeholder-pagina zonder koppeling aan de database.
      </p>
    </main>
  );
}
