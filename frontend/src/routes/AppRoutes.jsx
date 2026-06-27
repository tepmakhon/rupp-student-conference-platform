import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute
from "./ProtectedRoute";

import {
  ROLES,
  ALL_ROLES,
} from "../constants/roles";

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/

import LoginPage
from "../pages/auth/LoginPage";

import RegisterPage
from "../pages/auth/RegisterPage";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

import DashboardPage
from "../pages/dashboard/DashboardPage";

/*
|--------------------------------------------------------------------------
| Leaderboard
|--------------------------------------------------------------------------
*/

import LeaderboardPage
from "../pages/leaderboard/LeaderboardPage";

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

import ProfilePage
from "../pages/profile/ProfilePage";

import EditProfilePage
from "../pages/profile/EditProfilePage";

/*
|--------------------------------------------------------------------------
| Events
|--------------------------------------------------------------------------
*/

import EventListPage
from "../pages/events/EventListPage";

import EventDetailPage
from "../pages/events/EventDetailPage";

/*
|--------------------------------------------------------------------------
| Opportunities
|--------------------------------------------------------------------------
*/

import OpportunityListPage
from "../pages/opportunities/OpportunityListPage";

import OpportunityDetailPage
from "../pages/opportunities/OpportunityDetailPage";

import CreateOpportunityPage
from "../pages/opportunities/CreateOpportunityPage";

import SavedOpportunitiesPage
from "../pages/opportunities/SavedOpportunitiesPage";

/*
|--------------------------------------------------------------------------
| Student
|--------------------------------------------------------------------------
*/

import MyApplicationsPage
from "../pages/student/MyApplicationsPage";

import StudentMyEventsPage
from "../pages/student/MyEventsPage";

import ActivityHistoryPage
from "../pages/student/ActivityHistoryPage";

import StudentBadgesPage
from "../pages/student/StudentBadgesPage";

/*
|--------------------------------------------------------------------------
| Organization
|--------------------------------------------------------------------------
*/

import MyOpportunitiesPage
from "../pages/organization/MyOpportunitiesPage";

import EditOpportunityPage
from "../pages/organization/EditOpportunityPage";

import EventRegistrationsPage
from "../pages/organization/EventRegistrationsPage";

import OpportunityApplicantsPage
from "../pages/organization/OpportunityApplicantsPage";

import CreateEventPage
from "../pages/events/CreateEventPage";

import EditEventPage
from "../pages/organization/EditEventPage";

import OrganizationMyEventsPage
from "../pages/organization/MyEventsPage";

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

import AdminPendingEventsPage
from "../pages/admin/AdminPendingEventsPage";

import AdminPendingOpportunitiesPage
from "../pages/admin/AdminPendingOpportunitiesPage";

import AdminEventCategoriesPage
from "../pages/admin/AdminEventCategoriesPage";

import AdminOpportunityTypesPage
from "../pages/admin/AdminOpportunityTypesPage";

import AdminUniversitiesPage
from "../pages/admin/AdminUniversitiesPage";

import AdminFacultiesPage
from "../pages/admin/AdminFacultiesPage";

import AdminMajorsPage
from "../pages/admin/AdminMajorsPage";

import AdminSkillsPage
from "../pages/admin/AdminSkillsPage";

/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/
import NotificationPage
from "../pages/notifications/NotificationPage";

//Analytics
import AnalyticsPage from "../pages/analytics/AnalyticsPage";

function AppRoutes() {

  const protect = (

    element,

    allowedRoles

  ) => (

    <ProtectedRoute

      allowedRoles={

        allowedRoles

      }

    >

      {element}

    </ProtectedRoute>

  );

  return (

    <BrowserRouter>

      <Routes>

        {/* Home */}

        <Route

          path="/"

          element={

            <Navigate

              to="/dashboard"

              replace

            />

          }

        />

        {/* Auth */}

        <Route

          path="/login"

          element={

            <LoginPage />

          }

        />

        <Route

          path="/register"

          element={

            <RegisterPage />

          }

        />

        {/* Shared */}

        <Route

          path="/dashboard"

          element={

            protect(

              <DashboardPage />,

              ALL_ROLES

            )

          }

        />

        <Route

          path="/leaderboard"

          element={

            protect(

              <LeaderboardPage />,

              ALL_ROLES

            )

          }

        />

        <Route

          path="/notifications"

          element={

            protect(

              <NotificationPage />,

              ALL_ROLES

            )

          }

        />
        <Route
          path="/analytics"
          element={<AnalyticsPage />}
        />

        <Route

          path="/profile"

          element={

            protect(

              <ProfilePage />,

              ALL_ROLES

            )

          }

        />

        <Route

          path="/profile/edit"

          element={

            <EditProfilePage />

          }

        />

        <Route

          path="/events"

          element={

            protect(

              <EventListPage />,

              ALL_ROLES

            )

          }

        />

        <Route

          path="/events/create"

          element={

            protect(

              <CreateEventPage />,

              [

                ROLES.ORGANIZATION,

              ]

            )

          }

        />

        <Route

          path="/events/:id"

          element={

            protect(

              <EventDetailPage />,

              ALL_ROLES

            )

          }

        />

        <Route

          path="/opportunities"

          element={

            protect(

              <OpportunityListPage />,

              ALL_ROLES

            )

          }

        />

        <Route

          path="/opportunities/create"

          element={

            protect(

              <CreateOpportunityPage />,

              [

                ROLES.ORGANIZATION,

              ]

            )

          }

        />

        <Route

          path="/opportunities/:id"

          element={

            protect(

              <OpportunityDetailPage />,

              ALL_ROLES

            )

          }

        />

        {/* Student */}

        <Route

          path="/saved-opportunities"

          element={

            protect(

              <SavedOpportunitiesPage />,

              [

                ROLES.STUDENT,

              ]

            )

          }

        />

        <Route

          path="/my-applications"

          element={

            protect(

              <MyApplicationsPage />,

              [

                ROLES.STUDENT,

              ]

            )

          }

        />

        <Route

          path="/my-events"

          element={

            protect(

              <StudentMyEventsPage />,

              [

                ROLES.STUDENT,

              ]

            )

          }

        />

        <Route

          path="/activity-history"

          element={

            protect(

              <ActivityHistoryPage />,

              [

                ROLES.STUDENT,

              ]

            )

          }

        />

        <Route
          path="/badges"
          element={
            <ProtectedRoute
              roles={["STUDENT"]}
            >
              <StudentBadgesPage />
            </ProtectedRoute>
          }
        />

        {/* Organization */}

        <Route

          path="/organization/events"

          element={

            protect(

              <OrganizationMyEventsPage />,

              [

                ROLES.ORGANIZATION,

              ]

            )

          }

        />

        <Route

          path="/organization/events/:id/edit"

          element={

            protect(

              <EditEventPage />,

              [

                ROLES.ORGANIZATION,

              ]

            )

          }

        />

        <Route

          path="/organization/events/:id/registrations"

          element={

            protect(

              <EventRegistrationsPage />,

              [

                ROLES.ORGANIZATION,

              ]

            )

          }

        />

        <Route

          path="/organization/opportunities"

          element={

            protect(

              <MyOpportunitiesPage />,

              [

                ROLES.ORGANIZATION,

              ]

            )

          }

        />

        <Route

          path="/organization/opportunities/:id/edit"

          element={

            protect(

              <EditOpportunityPage />,

              [

                ROLES.ORGANIZATION,

              ]

            )

          }

        />

        <Route

          path="/organization/opportunities/:id/applicants"

          element={

            protect(

              <OpportunityApplicantsPage />,

              [

                ROLES.ORGANIZATION,

              ]

            )

          }

        />

        {/* Admin */}

        <Route

          path="/admin/events/pending"

          element={

            protect(

              <AdminPendingEventsPage />,

              [

                ROLES.ADMIN,

              ]

            )

          }

        />

        <Route

          path="/admin/opportunities/pending"

          element={

            protect(

              <AdminPendingOpportunitiesPage />,

              [

                ROLES.ADMIN,

              ]

            )

          }

        />

        <Route

          path="/admin/event-categories"

          element={

            protect(

              <AdminEventCategoriesPage />,

              [

                ROLES.ADMIN,

              ]

            )

          }

        />

        <Route

          path="/admin/opportunity-types"

          element={

            protect(

              <AdminOpportunityTypesPage />,

              [

                ROLES.ADMIN,

              ]

            )

          }

        />

        <Route

          path="/admin/universities"

          element={

            protect(

              <AdminUniversitiesPage />,

              [

                ROLES.ADMIN,

              ]

            )

          }

        />

        <Route

          path="/admin/faculties"

          element={

            protect(

              <AdminFacultiesPage />,

              [

                ROLES.ADMIN,

              ]

            )

          }

        />

        <Route

          path="/admin/majors"

          element={

            protect(

              <AdminMajorsPage />,

              [

                ROLES.ADMIN,

              ]

            )

          }

        />

        <Route

          path="/admin/skills"

          element={

            protect(

              <AdminSkillsPage />,

              [

                ROLES.ADMIN,

              ]

            )

          }

        />

        {/* 404 */}

        <Route

          path="*"

          element={

            <Navigate

              to="/dashboard"

              replace

            />

          }

        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;