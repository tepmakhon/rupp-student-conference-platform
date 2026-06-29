import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slices/authSlice";

import getInitials from "../../utils/getInitials";

function NavbarProfile() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div
      className="
        flex
        items-center
        gap-4
      "
    >
      <div
        className="
          hidden
          md:flex
          flex-col
          text-right
        "
      >
        <span
          className="
            font-semibold
            text-primary
          "
        >
          {user?.fullName || user?.email}
        </span>

        <span
          className="
            text-xs
            text-gray-500
          "
        >
          {role}
        </span>
      </div>

      <div
        className="
          w-11
          h-11
          rounded-full

          bg-secondary

          text-white

          font-bold

          flex

          items-center

          justify-center
        "
      >
        {getInitials(user?.fullName || user?.email || "User")}
      </div>

      <button
        onClick={handleLogout}

        className="
          flex
          items-center
          gap-2

          bg-primary

          hover:bg-secondary

          text-white

          px-4

          py-2

          rounded-xl

          transition
        "
      >
        <ArrowRightStartOnRectangleIcon
          className="
            w-5
            h-5
          "
        />

        <span
          className="
            hidden
            md:block
          "
        >
          Logout
        </span>
      </button>
    </div>
  );
}

export default NavbarProfile;
