// app/login/page.tsx
import React from "react";

export default function LoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  const error = searchParams?.error;

  return (
    <main className="max-w-md mx-auto px-4 md:px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Inloggen</h1>
      <p className="mt-2 text-sm text-zinc-600">Voer je gebruikersnaam en wachtwoord in.</p>

      {error && (
        <div className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {decodeURIComponent(error)}
        </div>
      )}

      <form method="POST" action="/api/login" className="mt-6 grid gap-3">
        <input
          type="text"
          name="username"
          placeholder="Gebruikersnaam"
          className="border rounded-md px-3 py-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Wachtwoord"
          className="border rounded-md px-3 py-2"
          required
        />

        <button
          type="submit"
          className="mt-2 rounded-md bg-emerald-700 text-white px-4 py-2 hover:bg-emerald-800 transition"
        >
          Inloggen
        </button>
      </form>

      <div className="mt-4 text-sm">
        <a href="/wachtwoord-vergeten" className="underline">Wachtwoord vergeten?</a>
      </div>
    </main>
  );
}
