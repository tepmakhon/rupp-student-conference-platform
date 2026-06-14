import { Link } from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

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

      <div
        className={`
          fixed
          top-0
          left-0
          z-50
          w-64
          h-screen
          bg-primary
          text-white
          p-5
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

        <h1
          className="
            text-2xl
            font-bold
            mb-10
            text-gold
          "
        >
          RUPP Platform
        </h1>

        <nav
          className="
            flex
            flex-col
            gap-4
          "
        >

          <Link
            to="/dashboard"
            className="
              hover:bg-secondary
              p-3
              rounded-lg
            "
          >
            Dashboard
          </Link>

          <Link
            to="/events"
            className="
              hover:bg-secondary
              p-3
              rounded-lg
            "
          >
            Events
          </Link>

          <Link
            to="/opportunities"
            className="
              hover:bg-secondary
              p-3
              rounded-lg
            "
          >
            Opportunities
          </Link>

          <Link
            to="/saved-opportunities"
            className="
              hover:bg-secondary
              p-3
              rounded-lg
            "
          >
            Saved Opportunities
          </Link>

          <Link
            to="/opportunities/create"
            className="
              hover:bg-secondary
              p-3
              rounded-lg
            "
          >
            Create Opportunity
          </Link>

          <Link
            to="/profile"
            className="
              hover:bg-secondary
              p-3
              rounded-lg
            "
          >
            Profile
          </Link>

        </nav>

      </div>
    </>
  );
}

export default Sidebar;