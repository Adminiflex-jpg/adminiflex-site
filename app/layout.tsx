// app/layout.tsx
import "./globals.css";
import React from "react";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Link from "next/link";
import HeaderSwitcher from "./components/HeaderSwitcher";

export const metadata = {
  title: "AdminiFlex",
  description: "De oplossing voor je boekhouding",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const oldGreen = "#2F6B4F";
  const deepGreen = "#1E4C37";
  const lightMint = "#E8F2ED";

  // Loginstatus bepalen via JWT-cookie
  const token = (await cookies()).get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";
  let loggedIn = false;

  try {
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        role?: string;
      };
      loggedIn = Boolean(payload);
    }
  } catch {
    loggedIn = false;
  }

  // 👉 Logo-link: als ingelogd → /admin, anders → /
  const logoHref = loggedIn ? "/admin" : "/";

  return (
    <html lang="nl">
      <body
        className="min-h-screen text-zinc-900 flex flex-col"
        style={{
          background: `linear-gradient(180deg, ${lightMint} 0%, #ffffff 100%)`,
        }}
      >
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white border-b md:bg-white/80 md:backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            {/* Logo + titel */}
            <Link href={logoHref} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl grid place-items-center text-white font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${oldGreen}, ${deepGreen})`,
                }}
              >
                <span className="text-[11px] leading-none select-none">AF</span>
              </div>
              <span className="font-semibold tracking-tight text-lg">
                AdminiFlex
              </span>
            </Link>

            {/* Menu-schakelaar: publiek menu vs admin menu */}
            <HeaderSwitcher loggedIn={loggedIn} oldGreen={oldGreen} />

            {/* Rechts: in-/uitloggen + kennisbank */}
            <div className="flex items-center gap-2">
              {!loggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-md border text-sm"
                    style={{ borderColor: oldGreen, color: oldGreen }}
                  >
                    Inloggen
                  </Link>
                  <a
                    href="#cta"
                    className="px-4 py-2 rounded-md text-sm text-white"
                    style={{ backgroundColor: oldGreen }}
                  >
                    Vraag demo aan
                  </a>
                </>
              ) : (
                <>
                  <form action="/api/logout" method="POST">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md text-sm text-white"
                      style={{ backgroundColor: oldGreen }}
                    >
                      Uitloggen
                    </button>
                  </form>
                  <Link
                    href="/kennisbank"
                    className="px-4 py-2 rounded-md border text-sm"
                    style={{ borderColor: oldGreen, color: oldGreen }}
                  >
                    Kennisbank
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        {/* PAGINA-INHOUD */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-white/70 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 text-sm text-zinc-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg grid place-items-center text-white text-[10px] font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${oldGreen}, ${deepGreen})`,
                }}
              >
                AF
              </div>
              <span className="font-medium">AdminiFlex</span>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy">Privacy</Link>
              <Link href="/voorwaarden">Voorwaarden</Link>
              <Link href="/status">Status</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              © {new Date().getFullYear()} AdminiFlex. Alle rechten
              voorbehouden.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
