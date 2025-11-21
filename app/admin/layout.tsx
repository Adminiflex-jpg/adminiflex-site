// app/admin/layout.tsx
import React from "react";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("session")?.value || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";

  let isAdmin = false;

  try {
    if (JWT_SECRET && token) {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        role?: string;
      };
      isAdmin = payload.role === "admin";
    }
  } catch {
    isAdmin = false;
  }

  // Niet ingelogd als admin → terug naar login
  if (!isAdmin) {
    redirect("/login?error=Sessie%20verlopen");
  }

  // Wél admin → géén extra HTML/body/header, alleen de inhoud
  // De algemene layout (app/layout.tsx) regelt de groene balk.
  return <>{children}</>;
}
