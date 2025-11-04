import { cookies } from "next/headers";

export const metadata = { title: "2FA ingesteld - AdminiFlex" };

export default async function Success2FA() {
  const raw = (await cookies()).get("recovery_export")?.value;
  const codes: string[] = raw ? JSON.parse(decodeURIComponent(raw)) : [];

  return (
    <main className="max-w-lg mx-auto px-4 md:px-6 py-12">
      <h1 className="text-2xl font-semibold">2FA is ingeschakeld</h1>
      <p className="mt-2 text-sm text-zinc-700">
        Bewaar deze herstelcodes op een veilige plek. Je ziet ze hierna niet meer terug.
      </p>

      {codes.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-2 bg-white border rounded-lg p-4">
          {codes.map((c, i) => (
            <li key={i} className="font-mono">{c}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-red-600">Geen codes gevonden (sessie verlopen?).</p>
      )}

      <div className="mt-6 flex gap-3">
        <form method="POST" action="/api/2fa/recovery/regenerate">
          <button className="px-4 py-2 rounded-md border">Genereer nieuwe herstelcodes</button>
        </form>
        <a href="/admin" className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: "#2F6B4F" }}>
          Naar dashboard
        </a>
      </div>
    </main>
  );
}
