import {
  HomeIcon,
  TrophyIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  BookmarkIcon,
  ClockIcon,
  UserCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import { ROLES } from "../roles";

const studentMenu = [
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
    name: "Saved Opportunities",
    path: "/saved-opportunities",
    icon: BookmarkIcon,
  },

  {
    name: "My Events",
    path: "/my-events",
    icon: CalendarDaysIcon,
  },

  {
    name: "My Applications",
    path: "/my-applications",
    icon: BriefcaseIcon,
  },

  {
    name: "Activity History",
    path: "/activity-history",
    icon: ClockIcon,
  },
  {
    name: "My Badges",
    path: "/badges",
    icon: TrophyIcon,
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

export default studentMenu;