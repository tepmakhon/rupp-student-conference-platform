import { Bars3Icon } from "@heroicons/react/24/outline";

import { useLocation } from "react-router-dom";

import pageTitles from "../../constants/pageTitles";

import NavbarSearch from "./NavbarSearch";

import NavbarNotifications from "./NavbarNotifications";

import NavbarProfile from "./NavbarProfile";

function Navbar({ setSidebarOpen }) {
  const location = useLocation();

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <header
      className="
        sticky
        top-0
        z-30

        h-20

        bg-white

        border-b

        px-6

        md:px-8

        flex

        items-center

        justify-between

        shadow-sm
      "
    >
      <div
        className="
          flex

          items-center

          gap-5
        "
      >
        <button
          onClick={() => setSidebarOpen(true)}

          className="
            md:hidden
          "
        >
          <Bars3Icon
            className="
              w-8
              h-8

              text-primary
            "
          />
        </button>

        <div>
          <p
            className="
              text-sm

              font-semibold

              text-yellow-500
            "
          >
            RUPP Platform
          </p>

          <h1
            className="
              text-2xl

              font-bold

              text-primary
            "
          >
            {currentTitle}
          </h1>
        </div>
      </div>

      <NavbarSearch />

      <div
        className="
          flex

          items-center

          gap-5
        "
      >
        <NavbarNotifications />

        <NavbarProfile />
      </div>
    </header>
  );
}

export default Navbar;
