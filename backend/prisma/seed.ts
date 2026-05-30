import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { id: 1, roleName: "STUDENT" },
      { id: 2, roleName: "ORGANIZATION" },
      { id: 3, roleName: "ADMIN" },
    ],
    skipDuplicates: true,
  });

  await prisma.eventCategory.createMany({
    data: [
      { categoryName: "TECH" },
      { categoryName: "BUSINESS" },
      { categoryName: "DESIGN" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed completed");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });