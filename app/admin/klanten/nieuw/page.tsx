// app/admin/klanten/nieuw/page.tsx
"use client";
import { useState } from "react";

export default function NewCustomerPage() {
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string|null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSaving(true); setMsg(null);
    const f = e.currentTarget;
    const body = {
      name: (f.elements.namedItem("name") as HTMLInputElement).value,
      email: (f.elements.namedItem("email") as HTMLInputElement).value,
      username: (f.elements.namedItem("username") as HTMLInputElement).value,
      planCode: (f.elements.namedItem("plan") as HTMLSelectElement).value,
    };
    const res = await fetch("/api/admin/customers", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setMsg("Klant aangemaakt."); f.reset(); }
    else { setMsg("Mislukt. Controleer velden."); }
    setSaving(false);
  }

  return (
    <main className="max-w-xl mx-auto px-4 md:px-6 py-16">
      <h1 className="text-2xl font-semibold">Nieuwe klant</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <input name="name" placeholder="Bedrijfsnaam" className="border rounded-md px-3 py-2" required />
        <input name="email" type="email" placeholder="E-mail" className="border rounded-md px-3 py-2" required />
        <input name="username" placeholder="Gebruikersnaam" className="border rounded-md px-3 py-2" required />
        <select name="plan" className="border rounded-md px-3 py-2">
          <option value="BASIC">Basic</option>
          <option value="PLUS">Plus</option>
          <option value="PRO">Pro</option>
        </select>
        <button disabled={saving} className="px-4 py-2 rounded-md text-white" style={{ backgroundColor:"#2F6B4F" }}>
          {saving ? "Opslaan…" : "Opslaan"}
        </button>
        {msg && <div className="text-sm">{msg}</div>}
      </form>
    </main>
  );
}
