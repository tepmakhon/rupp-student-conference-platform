import { NavLink } from "react-router-dom";
import { HomeIcon, CalendarDaysIcon, BriefcaseIcon, BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
const links = [
  { path: "/dashboard", name: "Home", icon: HomeIcon },
  { path: "/events", name: "Events", icon: CalendarDaysIcon },
  { path: "/opportunities", name: "Explore", icon: BriefcaseIcon },
  { path: "/notifications", name: "Alerts", icon: BellIcon },
  { path: "/profile", name: "Profile", icon: UserCircleIcon },
];
export default function BottomNavigation() {
  return <nav aria-label="Mobile navigation" className="fixed bottom-0 inset-x-0 z-40 border-t bg-white md:hidden pb-[env(safe-area-inset-bottom)]">
    <div className="grid grid-cols-5">{links.map(({ path, name, icon: Icon }) =>
      <NavLink key={path} to={path} className={({ isActive }) => `flex flex-col items-center gap-1 py-3 text-xs ${isActive ? "text-primary font-semibold" : "text-gray-500"}`}>
        <Icon aria-hidden="true" className="w-6 h-6" />{name}
      </NavLink>)}
    </div>
  </nav>;
}
