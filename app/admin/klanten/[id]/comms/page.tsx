// app/admin/klanten/[id]/comms/page.tsx
export default function CustomerCommsPage({ params }:{ params: { id: string } }) {
    const oldGreen = "#2F6B4F";
    return (
      <section>
        <h2 className="text-xl font-medium">Communicatie</h2>
        <p className="mt-2 text-zinc-700">Notities, e-mails, telefoongesprekken. (Koppelen aan DB)</p>
  
        <div className="mt-4 grid gap-3 max-w-2xl">
          <textarea className="border rounded-md px-3 py-2" rows={4} placeholder="Nieuwe notitie…" />
          <button className="px-4 py-2 rounded-md text-white self-start" style={{ backgroundColor: oldGreen }}>
            Opslaan
          </button>
        </div>
  
        <div className="mt-6 rounded-xl border bg-white/90 p-4">
          <p className="text-sm text-zinc-600">Hier komt de tijdlijn met eerdere communicatie.</p>
        </div>
      </section>
    );
  }
  