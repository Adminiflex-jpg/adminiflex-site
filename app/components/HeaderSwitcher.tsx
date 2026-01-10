// app/components/HeaderSwitcher.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function HeaderSwitcher({
  loggedIn,
  oldGreen,
}: { loggedIn: boolean; oldGreen: string }) {
  const pathname = usePathname() || "/";
  const isAdmin = loggedIn && pathname.startsWith("/admin");

  if (!isAdmin) {
    // Publiek menu (homepage etc.)
    return (
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <a href="/#features" style={{ color: oldGreen }}>Functionaliteiten</a>
        <a href="/#modules"  style={{ color: oldGreen }}>Modules</a>
        <a href="/#pricing"  style={{ color: oldGreen }}>Prijzen</a>
        <a href="/contact"   style={{ color: oldGreen }}>Contact</a>
      </nav>
    );
  }

  return <AdminDropdownNav color={oldGreen} />;
}

function AdminDropdownNav({ color }: { color: string }) {
  const pathname = usePathname() || "/admin";

  const items: {
    key: string;
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: "/admin",
      children: [{ label: "Aanpassen", href: "/admin/aanpassen" }],
    },
    {
      key: "klanten",
      label: "Klanten",
      href: "/admin/klanten",
      children: [
        // 👉 hier staat nu jouw gewenste volgorde
        { label: "Aanmaken",   href: "/admin/klanten/aanmaken" },
        { label: "Contracten", href: "/admin/klanten/contracten" },
        { label: "Overzicht",  href: "/admin/klanten/overzicht" },
        { label: "Download",   href: "/admin/klanten/downloads" },
      ],
    },
    {
      key: "financieel",
      label: "Financieel",
      href: "/admin/financieel",
      children: [
        { label: "Debiteuren", href: "/admin/financieel/debiteuren" },
        { label: "Crediteuren", href: "/admin/financieel/crediteuren" },
        { label: "Bank", href: "/admin/financieel/bank" },
        { label: "Balans", href: "/admin/financieel/balans" },
      ],
    },
    {
      key: "producten",
      label: "Producten",
      href: "/admin/producten",
      children: [
        { label: "Basic", href: "/admin/producten/basic" },
        { label: "Plus", href: "/admin/producten/plus" },
        { label: "Pro", href: "/admin/producten/pro" },
      ],
    },
    {
      key: "tickets",
      label: "Tickets",
      href: "/admin/tickets",
      children: [
        { label: "Openstaande", href: "/admin/tickets/openstaande" },
        { label: "Archief", href: "/admin/tickets/archief" },
        { label: "Per klant", href: "/admin/tickets/per-klant" },
        { label: "Contactberichten", href: "/admin/tickets/contactberichten" },
      ],
    },
    { key: "rapportages", label: "Rapportages", href: "/admin/rapportages" },
    {
      key: "instellingen",
      label: "Instellingen",
      href: "/admin/instellingen",
      children: [
        { label: "Gebruikers", href: "/admin/instellingen/gebruikers" },
        { label: "Rollen", href: "/admin/instellingen/rollen" },
        {
          label: "Bankinstellingen",
          href: "/admin/instellingen/bankinstellingen",
        },
      ],
    },
  ];

  const seg = pathname.replace(/^\/admin\/?/, "").split("/")[0] || "dashboard";

  // Mobile sheet
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <>
      {/* DESKTOP: dropdowns */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {items.map((it) => {
          const active =
            seg === it.key || (it.key === "dashboard" && pathname === "/admin");
          const hasChildren = !!it.children?.length;

          return (
            <div key={it.key} className="relative group">
              {/* Trigger */}
              <Link
                href={it.href}
                className={`inline-block py-2 transition ${
                  active ? "font-semibold" : ""
                }`}
                style={{ color }}
              >
                {it.label}
              </Link>

              {/* Dropdown */}
              {hasChildren && (
                <div
                  className="
                    absolute left-0 top-full -mt-px
                    w-56 rounded-lg border bg-white shadow-lg z-50
                    opacity-0 invisible translate-y-1
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition
                  "
                  style={{ borderColor: color }}
                >
                  <ul className="py-2">
                    {it.children!.map((c) => {
                      const subActive = pathname === c.href;
                      return (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`block px-3 py-2 text-sm hover:bg-zinc-50 ${
                              subActive ? "font-medium" : ""
                            }`}
                            style={{ color }}
                          >
                            {c.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* MOBIEL: klik-menu */}
      <div className="md:hidden">
        <button
          onClick={() => setOpenMobile((v) => !v)}
          className="px-3 py-2 rounded-md border text-sm"
          style={{ borderColor: color, color }}
          aria-expanded={openMobile}
          aria-controls="admin-mobile-menu"
        >
          Menu
        </button>

        {openMobile && (
          <div
            id="admin-mobile-menu"
            className="absolute left-0 right-0 top-16 bg-white border-b z-40"
            style={{ borderColor: color }}
          >
            <ul className="max-w-6xl mx-auto px-4 py-3 space-y-2">
              {items.map((it) => (
                <li
                  key={it.key}
                  className="border rounded-md"
                  style={{ borderColor: color }}
                >
                  <details>
                    <summary
                      className="px-3 py-2 cursor-pointer select-none"
                      style={{ color }}
                    >
                      <Link href={it.href} className="hover:underline">
                        {it.label}
                      </Link>
                    </summary>
                    {!!it.children?.length && (
                      <ul className="px-3 pb-3">
                        {it.children.map((c) => (
                          <li key={c.href} className="py-1">
                            <Link
                              href={c.href}
                              className="underline"
                              style={{ color }}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
