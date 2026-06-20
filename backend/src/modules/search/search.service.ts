import {

 prisma,

}

from "../../config/prisma.js";

export const globalSearch =

async (

 keyword: string

) => {

 const search =

 keyword.trim();

 if (!search) {

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

 ]

 = await Promise.all([

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

  take: 5,

 }),

 prisma.opportunity.findMany({

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

  take: 5,

 }),

 prisma.organization.findMany({

  where: {

   organizationName: {

    contains: search,

    mode: "insensitive",

   },

  },

  take: 5,

 }),

 ]);

 return {

  events,

  opportunities,

  organizations,

 };

};