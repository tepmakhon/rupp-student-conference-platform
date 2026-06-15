import StudentDashboardPage
from "./StudentDashboardPage";

import OrganizationDashboardPage
from "./OrganizationDashboardPage";

import AdminDashboardPage
from "./AdminDashboardPage";

function DashboardPage() {

  const user = JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

  const role =
    user?.role?.roleName;

  if (role === "ADMIN") {

    return (
      <AdminDashboardPage />
    );

  }

  if (
    role === "ORGANIZATION"
  ) {

    return (
      <OrganizationDashboardPage />
    );

  }

  return (
    <StudentDashboardPage />
  );

}

export default DashboardPage;