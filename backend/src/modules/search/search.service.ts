import { prisma } from "../../config/prisma.js";

export const globalSearch = async (
  keyword: string
) => {

  const search =
    keyword
      .trim()
      .slice(0, 100);

  if (search.length < 2) {

    return {
      events: [],
      opportunities: [],
      organizations: [],
    };

  }

  const [
    events,
    opportunities,
    organizations,
  ] = await Promise.all([

    prisma.event.findMany({

      where: {

        OR: [

          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },

        ],

      },

      select: {
          id: true,
          title: true,
          bannerImageUrl: true,
          eventDate: true,
          organization: {
              select: {
                  organizationName: true,
              },
          },
      },

      take: 5,

      orderBy: {
        createdAt: "desc",
      },

    }),

    prisma.opportunity.findMany({

      where: {

        status: "APPROVED",

        OR: [

          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },

        ],

      },

      select: {
          id: true,
          title: true,
          coverImageUrl: true,
          deadline: true,

          organization: {
              select: {
                  organizationName: true,
                  logoUrl: true,
              },
          },
      },

      take: 5,

      orderBy: {
        createdAt: "desc",
      },

    }),

    prisma.organization.findMany({

      where: {

        organizationName: {

          contains: search,
          mode: "insensitive",

        },

      },

      select: {
        id: true,
        organizationName: true,
        logoUrl: true,
      },

      take: 5,

      orderBy: {
        createdAt: "desc",
      },

    }),

  ]);

  return {

    keyword: search,

    total:

      events.length +

      opportunities.length +

      organizations.length,

    events,

    opportunities,

    organizations,

  };

};