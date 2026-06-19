import {

  useSelector,

} from "react-redux";

import StudentDashboardPage
from "./StudentDashboardPage";

import OrganizationDashboardPage
from "./OrganizationDashboardPage";

import AdminDashboardPage
from "./AdminDashboardPage";

import ErrorState
from "../../components/common/ErrorState";

function DashboardPage() {

  const auth =

    useSelector(

      (state) =>

        state.auth

    );

  const role =

    auth.role

    ||

    auth.user

    ?.role

    ?.roleName;

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

      return (

        <StudentDashboardPage />

      );

    default:

      return (

        <ErrorState

          message="Unable to load dashboard."

        />

      );

  }

}

export default DashboardPage;