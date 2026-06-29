import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const adminMenu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: HomeIcon,
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
    name: "Pending Events",
    path: "/admin/events/pending",
    icon: ClipboardDocumentCheckIcon,
  },

  {
    name: "Pending Opportunities",
    path: "/admin/opportunities/pending",
    icon: ClipboardDocumentCheckIcon,
  },

  {
    name: "Event Categories",
    path: "/admin/event-categories",
    icon: ClipboardDocumentCheckIcon,
  },

  {
    name: "Opportunity Types",
    path: "/admin/opportunity-types",
    icon: ClipboardDocumentCheckIcon,
  },

  {
    name: "Universities",
    path: "/admin/universities",
    icon: ClipboardDocumentCheckIcon,
  },

  {
    name: "Faculties",
    path: "/admin/faculties",
    icon: ClipboardDocumentCheckIcon,
  },

  {
    name: "Majors",
    path: "/admin/majors",
    icon: ClipboardDocumentCheckIcon,
  },

  {
    name: "Skills",
    path: "/admin/skills",
    icon: ClipboardDocumentCheckIcon,
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

export default adminMenu;