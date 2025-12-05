// scripts/create-demo-portal-user.cjs
const { PrismaClient, PlanCode, PortalRole } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Kies zelf waarden als je wilt
  const customerNumber = "CUST-0001";
  const email = "demo@bedrijf.nl";
  const plainPassword = "Test123!";

  console.log("Maak demo klant + portal user aan...");
  console.log({ customerNumber, email, plainPassword });

  // 1) klant (Customer) aanmaken of updaten
  const customer = await prisma.customer.upsert({
    where: { number: customerNumber },
    update: {},
    create: {
      number: customerNumber,
      companyName: "Demo BV",
      contactName: "Piet Demo",
      address: "Dorpsstraat 1",
      postalCode: "1234 AB",
      city: "Amsterdam",
      email,
      kvk: "12345678",
      btw: "NL001234567B01",
      plan: PlanCode.BASIC,
    },
  });

  console.log("Customer:", customer);

  // 2) wachtwoord hashen
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  // 3) PortalUser aanmaken of updaten
  const portalUser = await prisma.portalUser.upsert({
    where: {
      // unieke combi customer + email
      customerId_email: {
        customerId: customer.id,
        email,
      },
    },
    update: {
      passwordHash,
      role: PortalRole.SUPER_USER,
    },
    create: {
      customerId: customer.id,
      email,
      passwordHash,
      role: PortalRole.SUPER_USER,
    },
  });

  console.log("PortalUser:", portalUser);
}

main()
  .then(() => {
    console.log("Klaar! Demo klant + gebruiker zijn aangemaakt.");
  })
  .catch((e) => {
    console.error("FOUT tijdens seeden:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
