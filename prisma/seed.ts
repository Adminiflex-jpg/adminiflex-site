import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.plan.upsert({
    where: { code: "BASIC" },
    update: {},
    create: { code: "BASIC", name: "Basic", priceCents: 1250, features: { users: 1, admins: 1 } }
  });
  await prisma.plan.upsert({
    where: { code: "PLUS" },
    update: {},
    create: { code: "PLUS", name: "Plus", priceCents: 2450, features: { leden: true, voorraad: true } }
  });
  await prisma.plan.upsert({
    where: { code: "PRO" },
    update: {},
    create: { code: "PRO", name: "Pro", priceCents: 4950, features: { offertes: true, api: true } }
  });
}

main().finally(() => prisma.$disconnect());
