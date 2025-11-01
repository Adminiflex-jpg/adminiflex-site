// app/admin/page.tsx
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value || "";
  let ok = false;
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "";
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      ok = payload?.role === "admin";
    }
  } catch {
    ok = false;
  }

  if (!ok) {
    return (
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-2xl font-semibold">Niet ingelogd</h1>
        <p className="mt-2">Je hebt geen toegang tot deze pagina.</p>
        <a href="/login" className="mt-4 inline-block underline">Ga naar inloggen</a>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-16">
      <h1 className="text-3xl font-semibold">Admin dashboard</h1>
      <p className="mt-2 text-zinc-700">Welkom! Je bent ingelogd als admin.</p>
      <div className="mt-6 grid gap-4">
        <a className="underline" href="/">← Terug naar site</a>
      </div>
    </main>
  );
}
