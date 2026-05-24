import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.deleteMany();
  await prisma.order.deleteMany();

  const victim = await prisma.user.upsert({
    where: { email: "victim@shopvuln.com" },
    update: {},
    create: {
      email: "victim@shopvuln.com",
      password: "password123",
      name: "Alice Johnson",
      phone: "555-0101"
    }
  });

  const attacker = await prisma.user.upsert({
    where: { email: "attacker@shopvuln.com" },
    update: {},
    create: {
      email: "attacker@shopvuln.com",
      password: "password123",
      name: "Bob Smith",
      phone: "555-0102"
    }
  });

  await prisma.user.upsert({
    where: { email: "admin@shopvuln.com" },
    update: {},
    create: {
      email: "admin@shopvuln.com",
      password: "password123",
      name: "Admin User",
      phone: "555-0103"
    }
  });

  await prisma.order.createMany({
    data: [
      {
        userId: victim.id,
        items: JSON.stringify([{ name: "iPhone 15", qty: 1, price: 999 }]),
        total: 999,
        status: "delivered",
        address: "123 Main St, New York, NY 10001"
      },
      {
        userId: victim.id,
        items: JSON.stringify([{ name: "MacBook Pro", qty: 1, price: 2499 }]),
        total: 2499,
        status: "shipped",
        address: "123 Main St, New York, NY 10001"
      },
      {
        userId: victim.id,
        items: JSON.stringify([{ name: "AirPods Pro", qty: 2, price: 249 }]),
        total: 498,
        status: "pending",
        address: "123 Main St, New York, NY 10001"
      },
      {
        userId: victim.id,
        items: JSON.stringify([{ name: "iPad Air", qty: 1, price: 749 }]),
        total: 749,
        status: "delivered",
        address: "123 Main St, New York, NY 10001"
      },
      {
        userId: victim.id,
        items: JSON.stringify([{ name: "Apple Watch", qty: 1, price: 399 }]),
        total: 399,
        status: "shipped",
        address: "123 Main St, New York, NY 10001"
      },
      {
        userId: attacker.id,
        items: JSON.stringify([{ name: "USB Cable", qty: 3, price: 10 }]),
        total: 30,
        status: "delivered",
        address: "456 Oak Ave, Los Angeles, CA 90001"
      },
      {
        userId: attacker.id,
        items: JSON.stringify([{ name: "Mouse Pad", qty: 1, price: 15 }]),
        total: 15,
        status: "pending",
        address: "456 Oak Ave, Los Angeles, CA 90001"
      }
    ]
  });

  await prisma.profile.createMany({
    data: [
      {
        userId: victim.id,
        creditCard: "4532-1234-5678-9012",
        bankAccount: "ACC-789456123",
        ssn: "123-45-6789",
        address: "123 Main St, New York, NY 10001",
        phone: "555-0101"
      },
      {
        userId: attacker.id,
        creditCard: "4532-9876-5432-1011",
        bankAccount: "ACC-123789456",
        ssn: "987-65-4321",
        address: "456 Oak Ave, Los Angeles, CA 90001",
        phone: "555-0102"
      }
    ]
  });

  console.log("Seeded ShopVuln database");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
