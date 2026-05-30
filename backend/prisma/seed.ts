import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.university.createMany({
  data: [
    {
      id: BigInt(1),
      universityName: "Royal University of Phnom Penh",
    },
  ],
  skipDuplicates: true,
});

await prisma.faculty.createMany({
  data: [
    {
      id: BigInt(1),
      universityId: BigInt(1),
      facultyName: "Engineering",
    },
  ],
  skipDuplicates: true,
});

await prisma.major.createMany({
  data: [
    {
      id: BigInt(1),
      facultyId: BigInt(1),
      majorName: "Computer Science",
    },
  ],
  skipDuplicates: true,
});

await prisma.student.create({
  data: {
    userId: BigInt(5),
    universityId: BigInt(1),
    facultyId: BigInt(1),
    majorId: BigInt(1),
    academicYear: "Year 3",
  },
});

}

main()

  .catch((e) => console.error(e))

  .finally(async () => {

    await prisma.$disconnect();

  });