// app/admin/klanten/[id]/facturen/page.tsx
export default function CustomerInvoicesPage({ params }:{ params: { id: string } }) {
    return (
      <section>
        <h2 className="text-xl font-medium">Facturen</h2>
        <p className="mt-2 text-zinc-700">Overzicht van facturen: nummer, datum, status, totaal. (Koppelen aan DB)</p>
        <div className="mt-4 rounded-xl border bg-white/90 p-4">
          <p className="text-sm text-zinc-600">Nog geen data – koppel aan je facturen-API.</p>
        </div>
      </section>
    );
  }
  