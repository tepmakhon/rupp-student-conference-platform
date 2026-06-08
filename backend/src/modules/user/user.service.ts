import {prisma} from "../../config/prisma.js";

import {
  CreateProfileInput,
  UpdateProfileInput,
} from "./user.validation.js";

export const createProfile =
  async (
    userId: bigint,
    data: CreateProfileInput
  ) => {

    const existing =
      await prisma.userProfile.findUnique(
        {
          where: { userId },
        }
      );

    if (existing) {
      throw new Error(
        "Profile already exists"
      );
    }

    return prisma.userProfile.create({
      data: {
        userId,
        ...data,

        dateOfBirth:
          data.dateOfBirth
            ? new Date(
                data.dateOfBirth
              )
            : null,
      },
    });
  };

export const getProfile =
  async (
    userId: bigint
  ) => {

    return prisma.userProfile.findUnique(
      {
        where: {
          userId,
        },
      }
    );
  };

export const updateProfile =
  async (
    userId: bigint,
    data: UpdateProfileInput
  ) => {

    return prisma.userProfile.update({
      where: {
        userId,
      },

      data: {
        ...data,

        dateOfBirth:
          data.dateOfBirth
            ? new Date(
                data.dateOfBirth
              )
            : undefined,
      },
    });
  };