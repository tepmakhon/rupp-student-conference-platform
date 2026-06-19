import {

  HomeIcon,

  CalendarDaysIcon,

  BriefcaseIcon,

  BookmarkIcon,

  UserCircleIcon,

  ClipboardDocumentCheckIcon,

  TrophyIcon,

  ClockIcon,

} from "@heroicons/react/24/outline";

import {

  ROLES,

} from "./roles";

const sidebarMenu = [

  {

    name: "Dashboard",

    path: "/dashboard",

    icon: HomeIcon,

    roles: [

      ...Object.values(

        ROLES

      ),

    ],

  },

  {

    name: "Leaderboard",

    path: "/leaderboard",

    icon: TrophyIcon,

    roles: [

      ...Object.values(

        ROLES

      ),

    ],

  },

  {

    name: "Events",

    path: "/events",

    icon: CalendarDaysIcon,

    roles: [

      ...Object.values(

        ROLES

      ),

    ],

  },

  {

    name: "Opportunities",

    path: "/opportunities",

    icon: BriefcaseIcon,

    roles: [

      ...Object.values(

        ROLES

      ),

    ],

  },

  {

    name:

      "Saved Opportunities",

    path:

      "/saved-opportunities",

    icon:

      BookmarkIcon,

    roles: [

      ROLES.STUDENT,

    ],

  },

  {

    name:

      "My Events",

    path:

      "/my-events",

    icon:

      CalendarDaysIcon,

    roles: [

      ROLES.STUDENT,

    ],

  },

  {

    name:

      "My Applications",

    path:

      "/my-applications",

    icon:

      BriefcaseIcon,

    roles: [

      ROLES.STUDENT,

    ],

  },

  {

    name:

      "Activity History",

    path:

      "/activity-history",

    icon:

      ClockIcon,

    roles: [

      ROLES.STUDENT,

    ],

  },

  {

    name:

      "My Events",

    path:

      "/organization/events",

    icon:

      CalendarDaysIcon,

    roles: [

      ROLES.ORGANIZATION,

    ],

  },

  {

    name:

      "My Opportunities",

    path:

      "/organization/opportunities",

    icon:

      BriefcaseIcon,

    roles: [

      ROLES.ORGANIZATION,

    ],

  },

  {

    name:

      "Pending Events",

    path:

      "/admin/events/pending",

    icon:

      ClipboardDocumentCheckIcon,

    roles: [

      ROLES.ADMIN,

    ],

  },

  {

    name:

      "Pending Opportunities",

    path:

      "/admin/opportunities/pending",

    icon:

      ClipboardDocumentCheckIcon,

    roles: [

      ROLES.ADMIN,

    ],

  },

  {

    name:

      "Event Categories",

    path:

      "/admin/event-categories",

    icon:

      ClipboardDocumentCheckIcon,

    roles: [

      ROLES.ADMIN,

    ],

  },

  {

    name:

      "Opportunity Types",

    path:

      "/admin/opportunity-types",

    icon:

      ClipboardDocumentCheckIcon,

    roles: [

      ROLES.ADMIN,

    ],

  },

  {

    name:

      "Universities",

    path:

      "/admin/universities",

    icon:

      ClipboardDocumentCheckIcon,

    roles: [

      ROLES.ADMIN,

    ],

  },

  {

    name:

      "Faculties",

    path:

      "/admin/faculties",

    icon:

      ClipboardDocumentCheckIcon,

    roles: [

      ROLES.ADMIN,

    ],

  },

  {

    name:

      "Majors",

    path:

      "/admin/majors",

    icon:

      ClipboardDocumentCheckIcon,

    roles: [

      ROLES.ADMIN,

    ],

  },

  {

    name:

      "Skills",

    path:

      "/admin/skills",

    icon:

      ClipboardDocumentCheckIcon,

    roles: [

      ROLES.ADMIN,

    ],

  },

  {

    name:

      "Profile",

    path:

      "/profile",

    icon:

      UserCircleIcon,

    roles: [

      ...Object.values(

        ROLES

      ),

    ],

  },

];

export default sidebarMenu;