import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import sidebarMenu from "../../constants/sidebar/sidebarMenu";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const location =
    useLocation();

  const role =
    useSelector(
      (state) =>
        state.auth.role
    );

  const menuItems =
    sidebarMenu[role] || [];

  const isActiveRoute =
    (path) => {
      return (
        location.pathname ===
          path ||
        location.pathname.startsWith(
          `${path}/`
        )
      );
    };

  const handleCloseSidebar =
    () => {
      if (
        window.innerWidth < 768
      ) {
        setSidebarOpen(
          false
        );
      }
    };

  return (
    <>
      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            md:hidden
          "
          onClick={() =>
            setSidebarOpen(
              false
            )
          }
        />
      )}

      <aside
        className={`
          fixed

          top-0
          left-0

          z-50

          h-screen
          w-64

          overflow-y-auto

          bg-primary

          text-white

          shadow-2xl

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
        <div
          className="
            px-7
            py-8

            border-b

            border-white/20
          "
        >
          <h1
            className="
              text-3xl

              font-bold

              text-yellow-400
            "
          >
            RUPP Platform
          </h1>

          <p
            className="
              mt-2

              text-sm

              text-gray-300
            "
          >
            Student Conference &
            Opportunity Platform
          </p>
        </div>

        <nav
          className="
            p-5

            flex

            flex-col

            gap-2
          "
        >
          {menuItems.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <Link
                  key={
                    item.path
                  }
                  to={
                    item.path
                  }
                  onClick={
                    handleCloseSidebar
                  }
                  className={`
                    flex

                    items-center

                    gap-4

                    px-4

                    py-3

                    rounded-2xl

                    transition-all

                    duration-200

                    ${
                      isActiveRoute(
                        item.path
                      )
                        ? "bg-secondary shadow-lg"
                        : "hover:bg-secondary/70"
                    }
                  `}
                >
                  <Icon
                    className="
                      w-6
                      h-6
                    "
                  />

                  <span
                    className="
                      font-medium
                    "
                  >
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