import {
  HomeIcon,
  TrophyIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  UserCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const organizationMenu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: HomeIcon,
  },

  {
    name: "Leaderboard",
    path: "/leaderboard",
    icon: TrophyIcon,
  },

  {
    name: "Events",
    path: "/events",
    icon: CalendarDaysIcon,
  },

  {
    name: "Opportunities",
    path: "/opportunities",
    icon: BriefcaseIcon,
  },

  {
    name: "My Events",
    path: "/organization/events",
    icon: CalendarDaysIcon,
  },

  {
    name: "My Opportunities",
    path: "/organization/opportunities",
    icon: BriefcaseIcon,
  },

  {
    name: "Analytics",
    path: "/analytics",
    icon: ChartBarIcon,
  },
  
  {
    name: "Profile",
    path: "/profile",
    icon: UserCircleIcon,
  },
];

export default organizationMenu;