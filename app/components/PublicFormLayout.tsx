// app/components/PublicFormLayout.tsx
"use client";

import React from "react";
import { BRAND_GREEN, BRAND_MINT } from "../../lib/theme";

export default function PublicFormLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const oldGreen = BRAND_GREEN;
  const lightMint = BRAND_MINT;

  return (
    <main
      className="min-h-screen bg-zinc-50"
      style={{
        color: oldGreen,
        background: `linear-gradient(180deg, ${lightMint}, white)`,
      }}
    >
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h1>

        {description ? (
          <p className="mt-2 text-zinc-700 max-w-2xl">{description}</p>
        ) : null}

        {children}
      </section>
    </main>
  );
}
