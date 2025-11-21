// app/admin/layout.tsx
import React from "react";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";

  let isAdmin = false;
  try {
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & { role?: string };
      isAdmin = payload.role === "admin";
    }
  } catch {
    isAdmin = false;
  }

  // 🔴 Als niet ingelogd → redirect
  if (!isAdmin) {
    return (
      <meta
        httpEquiv="refresh"
        content="0; url=/login?error=Sessie%20verlopen"
      />
    );
  }

  // 🔵 Als ingelogd → laat dashboard layout zien
  return (
    <html lang="nl">
      <body className="min-h-screen bg-white text-zinc-900">
        {/* NAV DASHBOARD */}
        <header className="border-b py-4 px-6 bg-emerald-700 text-white">
          <nav className="flex gap-6 text-sm font-medium">
            <a href="/admin">Dashboard</a>
            <a href="/admin/klanten">Klanten</a>
            <a href="/admin/financieel">Financieel</a>
            <a href="/admin/producten">Producten</a>
            <a href="/admin/tickets">Tickets</a>
            <a href="/admin/rapportages">Rapportages</a>
            <a href="/admin/instellingen">Instellingen</a>
            <form action="/api/logout" method="POST" className="ml-auto">
              <button type="submit" className="underline">Uitloggen</button>
            </form>
          </nav>
        </header>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
