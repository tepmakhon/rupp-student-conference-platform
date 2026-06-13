import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({
  children,
}) {

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <div className="flex">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className="
          flex-1
          md:ml-64
          min-h-screen
          bg-gray-100
        "
      >

        <Navbar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-4 md:p-8">
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;