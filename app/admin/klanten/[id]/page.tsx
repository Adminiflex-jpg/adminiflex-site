// app/admin/klanten/[id]/page.tsx
export default function CustomerDetailsPage({ params }:{ params: { id: string } }) {
    const { id } = params;
    return (
      <section>
        <h2 className="text-xl font-medium">Gegevens</h2>
        <p className="mt-2 text-zinc-700">Toon/bewerk klantgegevens, modules en plan (koppelen aan DB).</p>
        <div className="mt-4 grid gap-3 max-w-xl">
          <input className="border rounded-md px-3 py-2" placeholder="Bedrijfsnaam" />
          <input className="border rounded-md px-3 py-2" placeholder="E-mail" />
          <input className="border rounded-md px-3 py-2" placeholder="Gebruikersnaam" />
          <select className="border rounded-md px-3 py-2">
            <option>Basic</option><option>Plus</option><option>Pro</option>
          </select>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor:"#2F6B4F" }}>Opslaan</button>
            <button className="px-4 py-2 rounded-md border" style={{ borderColor:"#2F6B4F", color:"#2F6B4F" }}>Deactiveren</button>
          </div>
        </div>
      </section>
    );
  }
  