// app/admin/page.tsx
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function Tile({ title, value, href }:{
  title: string; value: string | number; href: string;
}) {
  return (
    <Link href={href} className="rounded-xl border bg-white/90 p-5 shadow-sm hover:shadow-md transition">
      <div className="text-xs text-zinc-600">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div className="mt-3 inline-block text-sm underline" style={{ color: "#2F6B4F" }}>
        Bekijken →
      </div>
    </Link>
  );
}

export default async function AdminDashboard() {
  const token = (await cookies()).get("session")?.value || "";
  const secret = process.env.JWT_SECRET || "";
  let isAdmin = false;
  try {
    if (secret && token) {
      const p = jwt.verify(token, secret) as JwtPayload & { role?: string };
      isAdmin = p?.role === "admin";
    }
  } catch {}
  if (!isAdmin)
    return (
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-2xl font-semibold">Niet ingelogd</h1>
        <p className="mt-2">Je hebt geen toegang tot deze pagina.</p>
        <Link href="/login" className="mt-4 inline-block underline">Ga naar inloggen</Link>
      </main>
    );

  // Placeholder stats – later uit DB/API.
  const stats = { openTickets: 3, customers: 12, invoicesOpen: 7, contractsTodo: 2 };

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Beheerder dashboard</h1>
      <p className="mt-1 text-zinc-700">Overzicht van klanten, vragen en contracten.</p>

      <section className="grid gap-4 md:grid-cols-4 mt-6">
        <Tile title="Openstaande klantvragen" value={stats.openTickets} href="/admin/tickets" />
        <Tile title="Klanten" value={stats.customers} href="/admin/klanten" />
        <Tile title="Openstaande facturen" value={stats.invoicesOpen} href="/admin/klanten" />
        <Tile title="Contracten te doen" value={stats.contractsTodo} href="/admin/klanten" />
      </section>
    </main>
  );
}



