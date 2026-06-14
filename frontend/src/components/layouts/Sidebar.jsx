import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  HomeIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  BookmarkIcon,
  PlusCircleIcon,
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  const location =
    useLocation();

  const menuItems = [
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
      name: "Pending Events",
      path: "/admin/events/pending",
      icon: ClipboardDocumentCheckIcon,
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
      name: "Create Opportunity",
      path: "/opportunities/create",
      icon: PlusCircleIcon,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserCircleIcon,
    },
  ];

  const handleCloseSidebar =
    () => {

      if (
        window.innerWidth < 768
      ) {
        setSidebarOpen(false);
      }
    };

  return (
    <>
      {sidebarOpen && (

        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            md:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />

      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          w-64
          h-screen
          bg-primary
          text-white
          p-6
          transform
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* Logo */}

        <div className="mb-10">

          <h1
            className="
              text-2xl
              font-bold
              text-gold
            "
          >
            RUPP Platform
          </h1>

          <p
            className="
              text-sm
              text-gray-300
              mt-1
            "
          >
            Student Conference &
            Opportunity Platform
          </p>

        </div>

        {/* Navigation */}

        <nav
          className="
            flex
            flex-col
            gap-2
          "
        >

          {menuItems.map(
            (item) => {

              const Icon =
                item.icon;

              const isActive =
                location.pathname ===
                item.path;

              return (

                <Link
                  key={item.path}
                  to={item.path}
                  onClick={
                    handleCloseSidebar
                  }
                  className={`
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    transition-all

                    ${
                      isActive
                        ? `
                          bg-secondary
                          text-white
                          shadow-md
                        `
                        : `
                          hover:bg-secondary/70
                        `
                    }
                  `}
                >

                  <Icon
                    className="
                      w-6
                      h-6
                    "
                  />

                  <span>
                    {item.name}
                  </span>

                </Link>

              );
            }
          )}

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;