import { useState } from "react";

import Sidebar from "./Sidebar";

import Navbar from "../navbar/Navbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
        flex
        min-h-screen
        bg-gray-100
      "
    >
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className="
          flex-1
          md:ml-64
          flex
          flex-col
          min-h-screen
        "
      >
        <Navbar setSidebarOpen={setSidebarOpen} />

        <section
          className="
            flex-1
            p-4
            md:p-8
          "
        >
          {children}
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;
