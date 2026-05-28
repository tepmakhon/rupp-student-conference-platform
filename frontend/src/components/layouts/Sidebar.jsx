import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-primary text-white fixed left-0 top-0 p-5">

      <h1 className="text-2xl font-bold mb-10 text-gold">
        RUPP Platform
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:bg-secondary p-3 rounded-lg transition"
        >
          Dashboard
        </Link>

        <Link
          to="/events"
          className="hover:bg-secondary p-3 rounded-lg transition"
        >
          Events
        </Link>

        <Link
          to="/opportunities"
          className="hover:bg-secondary p-3 rounded-lg transition"
        >
          Opportunities
        </Link>

        <Link
          to="/profile"
          className="hover:bg-secondary p-3 rounded-lg transition"
        >
          Profile
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;