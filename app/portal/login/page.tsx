// app/portal/login/page.tsx
import Link from "next/link";

export default function PortalLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const rawError = searchParams?.error;

  // 1) Technische error uit de URL halen en leesbaar maken
  const errorKey = rawError ? decodeURIComponent(rawError) : null;

  // 2) Technische "keys" vertalen naar vriendelijke teksten
  let friendlyError: string | null = null;

  if (errorKey === "Onjuiste inloggegevens") {
    friendlyError = "Deze combinatie van e-mailadres en wachtwoord is niet bij ons bekend.";
  } else if (errorKey === "Vul e-mail en wachtwoord in") {
    friendlyError = "Vul alsjeblieft zowel je e-mailadres als je wachtwoord in.";
  } else if (errorKey === "Sessie verlopen") {
    friendlyError = "Je sessie is verlopen. Log opnieuw in om verder te gaan.";
  } else if (errorKey) {
    // Alles wat we niet herkennen gewoon tonen
    friendlyError = errorKey;
  }

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold mb-4">Klantomgeving inloggen</h1>

      {/* 3) Alleen tonen als er echt een fout is */}
      {friendlyError && (
        <p className="text-red-600 mb-4">
          {friendlyError}
        </p>
      )}

      <form method="POST" action="/api/portal/login" className="space-y-4">
        <div>
          <label className="block text-sm font-medium">E-mailadres</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Wachtwoord</label>
          <input
            name="password"
            type="password"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 w-full"
        >
          Inloggen
        </button>
      </form>

      <p className="mt-6 text-sm text-zinc-600">
        Beheerder van AdminiFlex?{" "}
        <Link href="/login" className="underline text-emerald-700">
          Log hier in op het beheerdersdashboard
        </Link>
      </p>
    </main>
  );
}
