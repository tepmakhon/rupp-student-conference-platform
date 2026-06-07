import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Roles
  const adminRole = await prisma.role.upsert({
    where: { roleName: "ADMIN" },
    update: {},
    create: { roleName: "ADMIN" },
  });

  const studentRole = await prisma.role.upsert({
    where: { roleName: "STUDENT" },
    update: {},
    create: { roleName: "STUDENT" },
  });

  const organizationRole = await prisma.role.upsert({
    where: { roleName: "ORGANIZATION" },
    update: {},
    create: { roleName: "ORGANIZATION" },
  });

  console.log("✅ Roles seeded");

  // Event Categories
  const categories = [
    "Conference",
    "Workshop",
    "Competition",
    "Seminar",
    "Hackathon",
  ];

  for (const category of categories) {
    await prisma.eventCategory.upsert({
      where: { categoryName: category },
      update: {},
      create: { categoryName: category },
    });
  }

  console.log("✅ Event categories seeded");

  // Opportunity Types
  const opportunityTypes = [
    "Internship",
    "Scholarship",
    "Volunteer",
    "Part-Time",
    "Full-Time",
  ];

  for (const type of opportunityTypes) {
    await prisma.opportunityType.upsert({
      where: { typeName: type },
      update: {},
      create: { typeName: type },
    });
  }

  console.log("✅ Opportunity types seeded");

  // Skills
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "Docker",
    "Git",
    "Networking",
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { skillName: skill },
      update: {},
      create: { skillName: skill },
    });
  }

  console.log("✅ Skills seeded");

  console.log("🎉 Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });