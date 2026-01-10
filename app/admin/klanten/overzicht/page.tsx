// app/admin/klanten/overzicht/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import { BRAND_MINT } from "@/lib/theme";

export const dynamic = "force-dynamic";

export default async function CustomersOverviewPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main
      className="min-h-[calc(100vh-4rem)]"
      style={{
        background: `linear-gradient(180deg, ${BRAND_MINT} 0%, #ffffff 100%)`,
      }}
    >
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {/* Titel + korte uitleg */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
            Klanten – overzicht
          </h1>
          <p className="mt-2 text-sm md:text-base text-zinc-600">
            Overzicht van alle klantomgevingen. Klik op een klant om details,
            contracten en de klantomgeving te bekijken.
          </p>
        </div>

        {/* Witte kaart met tabel */}
        <div className="bg-white/90 border border-emerald-100 shadow-sm rounded-xl overflow-hidden">
          <div className="border-b border-emerald-100 px-4 md:px-6 py-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-zinc-700">
              {customers.length} klant
              {customers.length === 1 ? "" : "en"}
            </h2>
            <Link
              href="/admin/klanten/aanmaken"
              className="inline-flex items-center rounded-md border border-emerald-700 text-emerald-700 px-3 py-1.5 text-xs md:text-sm font-medium hover:bg-emerald-50 transition"
            >
              + Nieuwe klantomgeving
            </Link>
          </div>

          {customers.length === 0 ? (
            <div className="px-4 md:px-6 py-8 text-sm text-zinc-500">
              Er zijn nog geen klanten aangemaakt.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-emerald-50/70 border-b border-emerald-100">
                  <tr className="text-xs font-medium text-zinc-700 uppercase tracking-wide">
                    <th className="px-4 md:px-6 py-3">Klantnr</th>
                    <th className="px-4 md:px-6 py-3">Bedrijf</th>
                    <th className="px-4 md:px-6 py-3">Contact</th>
                    <th className="px-4 md:px-6 py-3">Adres</th>
                    <th className="px-4 md:px-6 py-3">Postcode</th>
                    <th className="px-4 md:px-6 py-3">Plaats</th>
                    <th className="px-4 md:px-6 py-3">E-mail</th>
                    <th className="px-4 md:px-6 py-3">KVK</th>
                    <th className="px-4 md:px-6 py-3">BTW</th>
                    <th className="px-4 md:px-6 py-3">Pakket</th>
                    <th className="px-4 md:px-6 py-3 text-right">Acties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50">
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-emerald-50/40 transition-colors"
                    >
                      {/* Klik op klantnummer => naar admin-omgeving van die klant */}
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        <Link
                          href={`/admin/klanten/${customer.number}/contract`}
                          className="font-medium text-emerald-800 hover:text-emerald-900 underline-offset-2 hover:underline"
                        >
                          {customer.number}
                        </Link>
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        {customer.companyName}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        {customer.contactName}
                      </td>
                      <td className="px-4 md:px-6 py-3">
                        {customer.address}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        {customer.postalCode}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        {customer.city}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        {customer.email}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        {customer.kvk}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        {customer.btw}
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                          {customer.plan}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/klanten/${customer.number}/contract`}
                            className="text-xs md:text-sm font-medium text-emerald-700 hover:text-emerald-900 underline-offset-2 hover:underline"
                          >
                            Bekijk details
                          </Link>
                          <Link
                            href={`/portal/${customer.number}/dashboard`}
                            className="text-xs md:text-sm text-zinc-500 hover:text-zinc-800 underline-offset-2 hover:underline"
                          >
                            Klantdashboard
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
