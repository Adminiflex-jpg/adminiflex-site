// app/admin/klanten/[customerNumber]/bewerken/page.tsx
import { PrismaClient, PlanCode } from "@prisma/client";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { BRAND_GREEN, BRAND_MINT } from "../../../../../lib/theme";

const prisma = new PrismaClient();
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = {
  customerNumber: string;
};

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { customerNumber } = await params;

  // 1. Check: ingelogd als admin?
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";
  let isAdmin = false;

  try {
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        role?: string;
      };
      isAdmin = payload?.role === "admin";
    }
  } catch {
    isAdmin = false;
  }

  if (!isAdmin) {
    redirect("/login");
  }

  const customer = await prisma.customer.findUnique({
    where: { number: customerNumber },
    include: {
      portalUsers: { take: 1 },
    },
  });

  if (!customer) {
    return (
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-16">
        <h1 className="text-2xl font-semibold mb-2">Klant niet gevonden</h1>
        <p className="text-sm text-zinc-600">
          Er bestaat geen klant met klantnummer <code>{customerNumber}</code>.
        </p>
      </main>
    );
  }

  const portalUser = customer.portalUsers[0] ?? null;
  const allPlans: { value: PlanCode; label: string }[] = [
    { value: "BASIC", label: "Basic" },
    { value: "PLUS", label: "Plus" },
    { value: "PRO", label: "Pro" },
  ];

  const contractEndDateValue =
    (customer as { contractEndDate?: Date | null }).contractEndDate
      ? (
          customer as { contractEndDate?: Date | null }
        ).contractEndDate!.toISOString().slice(0, 10)
      : "";

  return (
    <main
      className="min-h-screen"
      style={{
        background: `linear-gradient(180deg, ${BRAND_MINT} 0%, #ffffff 100%)`,
      }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Klant bewerken
            </h1>
            <p className="text-sm text-zinc-600 mt-1">
              Klantnummer: <code>{customer.number}</code>
            </p>
          </div>
          <a
            href={`/admin/klanten/${customer.number}/contract`}
            className="text-sm border rounded-md px-3 py-2 hover:bg-zinc-50"
            style={{ borderColor: BRAND_GREEN, color: BRAND_GREEN }}
          >
            ← Terug naar klantdossier
          </a>
        </header>

        <form
          method="POST"
          action={`/api/admin/customers/${customer.number}/edit`}
          className="space-y-8"
        >
          {/* 1. Bedrijf + adres */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border shadow-sm p-5 space-y-3">
              <h2 className="font-semibold mb-1">Bedrijfsgegevens</h2>
              <label className="block text-sm">
                <span className="block mb-1">Bedrijfsnaam*</span>
                <input
                  name="companyName"
                  defaultValue={customer.companyName}
                  required
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-sm">
                <span className="block mb-1">Contactpersoon*</span>
                <input
                  name="contactName"
                  defaultValue={customer.contactName}
                  required
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-sm">
                <span className="block mb-1">E-mailadres*</span>
                <input
                  type="email"
                  name="email"
                  defaultValue={customer.email}
                  required
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </label>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-5 space-y-3">
              <h2 className="font-semibold mb-1">Adres & registratie</h2>
              <label className="block text-sm">
                <span className="block mb-1">Adres</span>
                <input
                  name="address"
                  defaultValue={customer.address}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="block mb-1">Postcode</span>
                  <input
                    name="postalCode"
                    defaultValue={customer.postalCode}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-sm">
                  <span className="block mb-1">Plaats</span>
                  <input
                    name="city"
                    defaultValue={customer.city}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="block mb-1">KvK</span>
                  <input
                    name="kvk"
                    defaultValue={customer.kvk}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-sm">
                  <span className="block mb-1">BTW-nummer</span>
                  <input
                    name="btw"
                    defaultValue={customer.btw}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* 2. Abonnement + demo + contract-einddatum */}
          <section className="bg-white rounded-lg border shadow-sm p-5 space-y-4 max-w-xl">
            <h2 className="font-semibold mb-1">Abonnement & demo</h2>
            <label className="block text-sm">
              <span className="block mb-1">Pakket</span>
              <select
                name="plan"
                defaultValue={customer.plan}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                {allPlans.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="block mb-1">Contract einddatum</span>
              <input
                type="date"
                name="contractEndDate"
                defaultValue={contractEndDateValue}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </label>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="demoActive"
                defaultChecked={customer.demoActive}
                className="mt-1"
              />
              <span>
                Demo-klant
                <br />
                <span className="text-xs text-zinc-600">
                  Als dit aan staat, wordt deze omgeving als demo beschouwd.
                </span>
              </span>
            </label>
          </section>

          {/* 3. Login voor klantomgeving */}
          <section className="bg-white rounded-lg border shadow-sm p-5 space-y-4">
            <h2 className="font-semibold mb-1">Login klantomgeving</h2>
            <p className="text-xs text-zinc-600">
              Je kunt hier het e-mailadres aanpassen. Een nieuw wachtwoord wordt
              alleen gezet als je hieronder een waarde invult.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="block mb-1">Login e-mailadres</span>
                <input
                  type="email"
                  name="portalEmail"
                  defaultValue={portalUser?.email ?? customer.email}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </label>
              <label className="block text-sm">
                <span className="block mb-1">Nieuw wachtwoord (optioneel)</span>
                <input
                  type="text"
                  name="portalPassword"
                  placeholder="Laat leeg om wachtwoord niet te wijzigen"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </label>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-md text-white text-sm font-medium"
              style={{ backgroundColor: BRAND_GREEN }}
            >
              Wijzigingen opslaan
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
