import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.update({
    where: {
      email: "admin@rupp.com",
    },
    data: {
      passwordHash,
    },
  });

  console.log("✅ Admin password reset to: 123456");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
