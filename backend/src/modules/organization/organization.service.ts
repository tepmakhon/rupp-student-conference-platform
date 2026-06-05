import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
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
    throw new AppError(
      "Organization not found",
      404
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
      throw new AppError(
        "Organization not found",
        404
      );
    }

    if (!logoUrl) {
      throw new AppError(
        "Logo URL is required",
        400
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