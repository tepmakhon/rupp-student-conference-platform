import {
  Bars3Icon,
} from "@heroicons/react/24/outline";

import {
  useNavigate,
} from "react-router-dom";

import NotificationDropdown
from "../notifications/NotificationDropdown";

function Navbar({ setSidebarOpen }) {

  const navigate =
    useNavigate();

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      navigate("/login");
    };

  return (

    <div
      className="
        h-16
        bg-white
        shadow-sm
        border-b
        flex
        items-center
        justify-between
        px-4
        md:px-8
      "
    >

      <div className="flex items-center gap-3">

        <button
          className="md:hidden"
          onClick={() =>
            setSidebarOpen(true)
          }
        >
          <Bars3Icon
            className="
              w-7
              h-7
              text-primary
            "
          />
        </button>

        <h2
          className="
            text-xl
            md:text-2xl
            font-bold
            text-primary
          "
        >
          Dashboard
        </h2>

      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <NotificationDropdown />

        <div
          className="
            w-10
            h-10
            rounded-full
            bg-secondary
            flex
            items-center
            justify-center
            text-white
            font-bold
          "
        >
          U
        </div>

        <button
          onClick={handleLogout}
          className="
            bg-primary
            hover:bg-secondary
            text-white
            px-4
            py-2
            rounded-lg
            transition
          "
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Navbar;