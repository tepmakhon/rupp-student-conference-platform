import { Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Navbar({ setSidebarOpen }) {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <div
      className="
        h-16
        bg-white
        shadow-md
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
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="w-7 h-7" />
        </button>

        <h2
          className="
            text-xl
            md:text-2xl
            font-semibold
          "
        >
          Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={handleLogout}
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Navbar;