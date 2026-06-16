import {
  Bars3Icon,
} from "@heroicons/react/24/outline";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import NotificationDropdown
from "../notifications/NotificationDropdown";

import {
  logout,
} from "../../redux/slices/authSlice";

function Navbar({

  setSidebarOpen,

}) {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const user =
    useSelector(

      (state) =>

        state.auth.user

    );

  const userName =

    user?.fullName ||

    user?.email ||

    "User";

  const pageTitles = {

    "/dashboard":

      "Dashboard",

    "/events":

      "Events",

    "/opportunities":

      "Opportunities",

    "/saved-opportunities":

      "Saved Opportunities",

    "/my-applications":

      "My Applications",

    "/organization/opportunities":

      "My Opportunities",

    "/admin/events/pending":

      "Pending Events",

    "/admin/opportunities/pending":

      "Pending Opportunities",

    "/profile":

      "Profile",

  };

  const currentTitle =

    pageTitles[
      location.pathname
    ]

    ||

    "RUPP Platform";

  const handleLogout =

    () => {

      dispatch(
        logout()
      );

      navigate(
        "/login",
        {
          replace: true,
        }
      );

    };

  return (

    <header

      className="

        sticky

        top-0

        z-30

        h-16

        bg-white

        border-b

        shadow-sm

        px-4

        md:px-8

        flex

        items-center

        justify-between

      "

    >

      <div

        className="

          flex

          items-center

          gap-3

        "

      >

        <button

          className="

            md:hidden

          "

          onClick={() =>

            setSidebarOpen(
              true
            )

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

          {

            currentTitle

          }

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

            text-white

            font-bold

            flex

            items-center

            justify-center

            uppercase

          "

        >

          {

            userName[0]

          }

        </div>

        <button

          onClick={
            handleLogout
          }

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

    </header>

  );

}

export default Navbar;