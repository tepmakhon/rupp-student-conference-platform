import { Bars3Icon } from "@heroicons/react/24/outline";

function Navbar({ setSidebarOpen }) {
  return (
    <div className="h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-8">

      <div className="flex items-center gap-3">

        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="w-7 h-7" />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold text-primary">
          Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-secondary"></div>

      </div>

    </div>
  );
}

export default Navbar;