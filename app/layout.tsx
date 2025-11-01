import "./globals.css";
import React from "react";

export const metadata = {
  title: "AdminiFlex",
  description: "De oplossing voor je boekhouding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const oldGreen = "#2F6B4F";
  const deepGreen = "#1E4C37";
  const lightMint = "#E8F2ED";

  return (
    <html lang="nl">
      <body
        className="min-h-screen text-zinc-900 flex flex-col"
        style={{
          background: `linear-gradient(180deg, ${lightMint} 0%, #ffffff 100%)`,
        }}
      >
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${oldGreen}, ${deepGreen})`,
                }}
              />
              <span className="font-semibold tracking-tight text-lg">
                AdminiFlex
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/#features" style={{ color: oldGreen }}>
                Functionaliteiten
              </a>
              <a href="/#modules" style={{ color: oldGreen }}>
                Modules
              </a>
              <a href="/#pricing" style={{ color: oldGreen }}>
                Prijzen
              </a>
              <a href="/contact" style={{ color: oldGreen }}>
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <a
                href="#login"
                className="px-4 py-2 rounded-md border text-sm"
                style={{ borderColor: oldGreen, color: oldGreen }}
              >
                Inloggen
              </a>
              <a
                href="#cta"
                className="px-4 py-2 rounded-md text-sm text-white"
                style={{ backgroundColor: oldGreen }}
              >
                Gratis proberen
              </a>
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
                className="w-8 h-8 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${oldGreen}, ${deepGreen})`,
                }}
              />
              <span className="font-medium">AdminiFlex</span>
            </div>
            <div className="flex gap-4">
              <a href="/privacy">Privacy</a>
              <a href="/voorwaarden">Voorwaarden</a>
              <a href="/status">Status</a>
              <a href="/contact">Contact</a>
            </div>
            <div>
              © {new Date().getFullYear()} AdminiFlex. Alle rechten voorbehouden.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
