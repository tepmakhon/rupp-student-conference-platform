import { prisma } from "../../config/prisma.js";
import { createAuditLog } from "../audit/audit.service.js";

export const getMyOrganization = async (
  userId: bigint
) => {

  const organization =
    await prisma.organization.findUnique({
      where: {
        userId,
      },
    });

  if (!organization) {
    throw new Error(
      "Organization not found"
    );
  }

  return organization;
};

export const updateOrganizationLogo =
  async (
    userId: bigint,
    logoUrl: string
  ) => {

    const organization =
      await prisma.organization.findUnique({
        where: {
          userId,
        },
      });

    if (!organization) {
      throw new Error(
        "Organization not found"
      );
    }

    const updatedOrganization =
      await prisma.organization.update({
        where: {
          id: organization.id,
        },

        data: {
          logoUrl,
        },
      });

    await createAuditLog(
      userId,
      "ORGANIZATION_LOGO_UPDATED"
    );

    return updatedOrganization;
  };