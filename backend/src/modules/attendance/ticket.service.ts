import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getEventTicket = async (
  eventId: bigint,
  userId: bigint
) => {

  const student =
    await prisma.student.findUnique({
      where: {
        userId,
      },
    });

  if (!student) {
    throw new AppError(
      "Student not found",
      404
    );
  }

  const registration =
    await prisma.eventRegistration.findFirst({

      where: {
        eventId,
        studentId: student.id,
      },

      include: {

        event: {
          include: {
            organization: true,
            category: true,
          },
        },

        student: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },

      },

    });

  if (!registration) {

    throw new AppError(
      "You are not registered for this event",
      404
    );

  }

return {

  registrationId: registration.id,

  studentName:
    registration.student.user.profile?.fullName,

  eventTitle:
    registration.event.title,

  location:
    registration.event.location,

  eventDate:
    registration.event.eventDate,

  organization:
    registration.event.organization.organizationName,

  category:
    registration.event.category.categoryName,

  qrCode: JSON.stringify({

    registrationId: registration.id,

    studentId: registration.studentId,

    eventId: registration.eventId,

  }),

};

};