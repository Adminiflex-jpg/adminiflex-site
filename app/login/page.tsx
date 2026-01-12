// app/login/page.tsx
import React from "react";
import Link from "next/link";
import { BRAND_GREEN } from "../../lib/theme";
import PublicFormLayout from "../components/PublicFormLayout";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const oldGreen = BRAND_GREEN;
  const error = searchParams?.error
    ? decodeURIComponent(searchParams.error)
    : null;

  return (
    <PublicFormLayout
      title="Inloggen"
      description="Voer je gebruikersnaam en wachtwoord in."
    >
      {error ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form
        method="POST"
        action="/api/login"
        className="mt-8 bg-white border rounded-2xl p-6 shadow-sm grid gap-4 max-w-2xl mx-auto w-full"
      >
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Gebruikersnaam *
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Wachtwoord *
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="pt-2 grid gap-3">
          <button
            type="submit"
            className="px-5 py-3 rounded-md text-white font-medium"
            style={{ backgroundColor: oldGreen }}
          >
            Inloggen
          </button>

          <Link href="/wachtwoord-vergeten" className="text-sm underline">
            Wachtwoord vergeten?
          </Link>
        </div>
      </form>
    </PublicFormLayout>
  );
}
