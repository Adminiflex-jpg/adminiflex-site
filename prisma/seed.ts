import { PrismaClient, PlanCode } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // voorbeeld seed: voeg demo-klant toe als die niet bestaat
  await prisma.customer.upsert({
    where: { number: "KL-2025-0001" },
    update: {},
    create: {
      number: "KL-2025-0001",
      companyName: "Demo Klant BV",
      email: "klant@example.com",
      contactName: "Demo Contact",
      address: "Demolaan 1",
      postalCode: "1234AB",
      city: "Amsterdam",
      kvk: "12345678",
      btw: "NL123456789B01",
      plan: PlanCode.PLUS,
    }
  });
  console.log("✅ Seed klaar");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
