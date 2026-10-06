import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma.js";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (8 characters minimum, 72 UTF-8 bytes maximum)");
  }
  const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
  if (!user || user.role.roleName !== "ADMIN") throw new Error("Administrator account not found");
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(password, 12) } });
  console.log("Administrator password updated.");
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
