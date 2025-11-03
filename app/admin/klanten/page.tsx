// app/admin/klanten/page.tsx
export default function CustomersListPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Klanten</h1>
        <a href="/admin/klanten/nieuw" className="px-4 py-2 rounded-md text-white" style={{ backgroundColor:"#2F6B4F" }}>
          Nieuwe klant
        </a>
      </div>

      <div className="mt-4">
        <input className="border rounded-md px-3 py-2 w-full md:w-80" placeholder="Zoek op naam, e-mail of nummer…" />
      </div>

      <p className="mt-4 text-zinc-700">Hier komt een tabel met klantnummer, naam, e-mail, plan en status (koppelen aan API/DB).</p>
    </main>
  );
}
