import { prisma } from "../config/prisma.js";
import { AppError } from "./AppError.js";
import { verifyToken, type AuthClaims } from "./jwt.js";

// Read current account state so suspension and role changes apply immediately.
export const authenticateToken = async (token: string): Promise<AuthClaims> => {
  let claims: AuthClaims;
  try { claims = verifyToken(token); }
  catch { throw new AppError("Invalid token", 401); }
  const user = await prisma.user.findUnique({
    where: { id: BigInt(claims.id) },
    select: { id: true, email: true, roleId: true, accountStatus: true, role: true },
  });
  if (!user || user.accountStatus !== "ACTIVE") {
    throw new AppError("Account is not active", 401);
  }
  return { id: String(user.id), email: user.email, roleId: String(user.roleId), roleName: user.role.roleName };
};
