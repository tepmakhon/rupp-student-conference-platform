import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function seed() {
  for (const roleName of ["STUDENT", "ORGANIZATION", "ADMIN"]) {
    await prisma.role.upsert({ where: { roleName }, create: { roleName }, update: {} });
  }
  for (const categoryName of ["Conference", "Workshop", "Competition", "Volunteering"]) {
    await prisma.eventCategory.upsert({ where: { categoryName }, create: { categoryName }, update: {} });
  }
  for (const typeName of ["Scholarship", "Internship", "Competition", "Volunteering"]) {
    await prisma.opportunityType.upsert({ where: { typeName }, create: { typeName }, update: {} });
  }
  for (const skillName of ["Web Development", "Communication", "Research", "Project Management"]) {
    await prisma.skill.upsert({ where: { skillName }, create: { skillName }, update: {} });
  }
  // These tables have no name uniqueness constraints: sequential seed reruns reuse
  // the existing hierarchy rather than creating duplicates.
  const universityName = "Royal University of Phnom Penh";
  const university = await prisma.university.findFirst({ where: { universityName } }) ||
    await prisma.university.create({ data: { universityName, location: "Phnom Penh" } });
  const facultyName = "Faculty of Science";
  const faculty = await prisma.faculty.findFirst({ where: { universityId: university.id, facultyName } }) ||
    await prisma.faculty.create({ data: { universityId: university.id, facultyName } });
  const majorName = "Computer Science";
  if (!await prisma.major.findFirst({ where: { facultyId: faculty.id, majorName } })) {
    await prisma.major.create({ data: { facultyId: faculty.id, majorName } });
  }
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email || password) {
    if (!email || !password || password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
      throw new Error("Provide ADMIN_EMAIL and ADMIN_PASSWORD (8 characters minimum, 72 UTF-8 bytes maximum)");
    }
    const role = await prisma.role.findUniqueOrThrow({ where: { roleName: "ADMIN" } });
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.roleId !== role.id) throw new Error("ADMIN_EMAIL belongs to a non-admin account");
    if (!existing) {
      await prisma.user.create({ data: {
        email, passwordHash: await bcrypt.hash(password, 12), roleId: role.id,
        profile: { create: { fullName: "Platform Administrator" } },
      } });
    }
  }
  console.log("Reference data seeded. Existing accounts and passwords were preserved.");
}
seed().catch((error) => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
