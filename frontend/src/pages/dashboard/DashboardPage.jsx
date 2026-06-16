import { useSelector } from "react-redux";

import StudentDashboardPage
from "./StudentDashboardPage";

import OrganizationDashboardPage
from "./OrganizationDashboardPage";

import AdminDashboardPage
from "./AdminDashboardPage";

function DashboardPage() {

  const role =
    useSelector(
      (state) =>
        state.auth.role
    );

  switch (role) {

    case "ADMIN":

      return (
        <AdminDashboardPage />
      );

    case "ORGANIZATION":

      return (
        <OrganizationDashboardPage />
      );

    case "STUDENT":

    default:

      return (
        <StudentDashboardPage />
      );

  }

}

export default DashboardPage;