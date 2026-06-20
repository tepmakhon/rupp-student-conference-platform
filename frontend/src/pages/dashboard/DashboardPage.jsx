import { useSelector } from "react-redux";

import StudentDashboardPage
from "./StudentDashboardPage";

import OrganizationDashboardPage
from "./OrganizationDashboardPage";

import AdminDashboardPage
from "./AdminDashboardPage";

import ErrorState
from "../../components/common/ErrorState";

function DashboardPage() {

  const {
    role,
    user,
  } = useSelector(
    state => state.auth
  );

  const currentRole =
    role ||
    user?.role?.roleName;

  if (!currentRole) {

    return (
      <ErrorState
        message="Unable to load dashboard."
      />
    );

  }

  const dashboards = {

    ADMIN:
      <AdminDashboardPage />,

    ORGANIZATION:
      <OrganizationDashboardPage />,

    STUDENT:
      <StudentDashboardPage />,

  };

  return (
    dashboards[
      currentRole
    ] || (
      <ErrorState
        message="Unable to load dashboard."
      />
    )
  );

}

export default DashboardPage;