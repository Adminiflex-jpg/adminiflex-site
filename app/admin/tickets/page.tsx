// app/admin/tickets/page.tsx
export default function TicketsPage() {
    const oldGreen = "#2F6B4F";
    return (
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-2xl font-semibold">Klantvragen / Tickets</h1>
        <div className="mt-4 flex gap-2">
          <select className="border rounded-md px-3 py-2">
            <option value="open">Open</option>
            <option value="pending">Wachtend</option>
            <option value="closed">Gesloten</option>
          </select>
          <input className="border rounded-md px-3 py-2 w-full md:w-80" placeholder="Zoek onderwerp of klant…" />
          <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: oldGreen }}>
            Filter
          </button>
        </div>
  
        <div className="mt-6 rounded-xl border bg-white/90 p-4">
          <p className="text-sm text-zinc-600">Hier komt de lijst met tickets (koppelen aan API/DB).</p>
        </div>
      </main>
    );
  }
  