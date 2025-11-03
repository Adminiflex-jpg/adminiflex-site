// app/admin/klanten/[id]/contract/page.tsx
export default function CustomerContractPage({ params }:{ params: { id: string } }) {
    const oldGreen = "#2F6B4F";
    const { id } = params;
  
    return (
      <section>
        <h2 className="text-xl font-medium">Contract</h2>
        <p className="mt-2 text-zinc-700">
          Genereer contract op basis van plan: looptijd, CPI-indexatie, opzegtermijn 3 mnd.
          (Hier komt de contract-HTML + “Print / E-mailen / Upload getekend”.)
        </p>
  
        <div className="mt-4 grid gap-3 max-w-xl">
          <select className="border rounded-md px-3 py-2">
            <option value="BASIC">Basic</option>
            <option value="PLUS">Plus</option>
            <option value="PRO">Pro</option>
          </select>
          <div className="grid grid-cols-3 gap-3">
            <input className="border rounded-md px-3 py-2" placeholder="Looptijd (mnd)" defaultValue={12} />
            <select className="border rounded-md px-3 py-2">
              <option value="true">CPI indexatie: Ja</option>
              <option value="false">Nee</option>
            </select>
            <input className="border rounded-md px-3 py-2" placeholder="Opzegtermijn (mnd)" defaultValue={3} />
          </div>
  
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: oldGreen }}>
              Genereer voorbeeld (HTML/PDF)
            </button>
            <button className="px-4 py-2 rounded-md border" style={{ borderColor: oldGreen, color: oldGreen }}>
              Verstuur per e-mail
            </button>
            <label className="px-4 py-2 rounded-md border cursor-pointer" style={{ borderColor: oldGreen, color: oldGreen }}>
              Upload getekend
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
      </section>
    );
  }
  