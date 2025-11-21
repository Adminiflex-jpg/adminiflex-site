// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const g = global as any;

export const prisma: PrismaClient =
  g.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") g.prisma = prisma;
