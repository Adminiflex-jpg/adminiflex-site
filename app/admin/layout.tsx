// app/layout.tsx
import "../globals.css";
import React from "react";

export const metadata = {
  title: "AdminiFlex",
  description: "De oplossing voor je boekhouding",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}
