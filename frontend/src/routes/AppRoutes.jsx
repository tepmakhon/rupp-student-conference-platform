import { lazy, Suspense } from "react";
import LoadingState from "../components/common/LoadingState";
const AdminUsersPage = lazy(() => import("../pages/admin/AdminUsersPage"));
const AdminAuditLogsPage = lazy(() => import("../pages/admin/AdminAuditLogsPage"));
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import { ROLES, ALL_ROLES } from "../constants/roles";

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));

const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));

/*
|--------------------------------------------------------------------------
| Leaderboard
|--------------------------------------------------------------------------
*/

const LeaderboardPage = lazy(() => import("../pages/leaderboard/LeaderboardPage"));

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));

const EditProfilePage = lazy(() => import("../pages/profile/EditProfilePage"));

/*
|--------------------------------------------------------------------------
| Events
|--------------------------------------------------------------------------
*/

const EventListPage = lazy(() => import("../pages/events/EventListPage"));

const EventDetailPage = lazy(() => import("../pages/events/EventDetailPage"));

const EventTicketPage = lazy(() => import("../pages/ticket/EventTicketPage"));

/*
|--------------------------------------------------------------------------
| Opportunities
|--------------------------------------------------------------------------
*/

const OpportunityListPage = lazy(() => import("../pages/opportunities/OpportunityListPage"));

const OpportunityDetailPage = lazy(() => import("../pages/opportunities/OpportunityDetailPage"));

const CreateOpportunityPage = lazy(() => import("../pages/opportunities/CreateOpportunityPage"));

const SavedOpportunitiesPage = lazy(() => import("../pages/opportunities/SavedOpportunitiesPage"));

/*
|--------------------------------------------------------------------------
| Student
|--------------------------------------------------------------------------
*/

const MyApplicationsPage = lazy(() => import("../pages/student/MyApplicationsPage"));

const StudentMyEventsPage = lazy(() => import("../pages/student/MyEventsPage"));

const ActivityHistoryPage = lazy(() => import("../pages/student/ActivityHistoryPage"));

const StudentBadgesPage = lazy(() => import("../pages/student/StudentBadgesPage"));

const RecommendationsPage = lazy(() => import("../pages/student/RecommendationsPage"));
/*
|--------------------------------------------------------------------------
| Organization
|--------------------------------------------------------------------------
*/

const MyOpportunitiesPage = lazy(() => import("../pages/organization/MyOpportunitiesPage"));

const EditOpportunityPage = lazy(() => import("../pages/organization/EditOpportunityPage"));

const EventRegistrationsPage = lazy(() => import("../pages/organization/EventRegistrationsPage"));

const EventAttendancePage = lazy(() => import("../pages/organization/EventAttendancePage"));

const OpportunityApplicantsPage = lazy(() => import("../pages/organization/OpportunityApplicantsPage"));

const CreateEventPage = lazy(() => import("../pages/events/CreateEventPage"));

const EditEventPage = lazy(() => import("../pages/organization/EditEventPage"));

const OrganizationMyEventsPage = lazy(() => import("../pages/organization/MyEventsPage"));

const AttendanceScannerPage = lazy(() => import("../pages/organization/AttendanceScannerPage"));

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

const AdminPendingEventsPage = lazy(() => import("../pages/admin/AdminPendingEventsPage"));

const AdminPendingOpportunitiesPage = lazy(() => import("../pages/admin/AdminPendingOpportunitiesPage"));

const AdminEventCategoriesPage = lazy(() => import("../pages/admin/AdminEventCategoriesPage"));

const AdminOpportunityTypesPage = lazy(() => import("../pages/admin/AdminOpportunityTypesPage"));

const AdminUniversitiesPage = lazy(() => import("../pages/admin/AdminUniversitiesPage"));

const AdminFacultiesPage = lazy(() => import("../pages/admin/AdminFacultiesPage"));

const AdminMajorsPage = lazy(() => import("../pages/admin/AdminMajorsPage"));

const AdminSkillsPage = lazy(() => import("../pages/admin/AdminSkillsPage"));

/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/
const NotificationPage = lazy(() => import("../pages/notifications/NotificationPage"));

//Analytics
const AnalyticsPage = lazy(() => import("../pages/analytics/AnalyticsPage"));

function AppRoutes() {
  const protect = (
    element,

    allowedRoles,
  ) => <ProtectedRoute allowedRoles={allowedRoles}>{element}</ProtectedRoute>;

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingState message="Loading page..." />}><Routes>
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
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        {/* Shared */}

        <Route
          path="/dashboard"

          element={protect(
            <DashboardPage />,

            ALL_ROLES,
          )}
        />

        <Route
          path="/leaderboard"

          element={protect(
            <LeaderboardPage />,

            ALL_ROLES,
          )}
        />

        <Route
          path="/notifications"

          element={protect(
            <NotificationPage />,

            ALL_ROLES,
          )}
        />
        <Route path="/analytics" element={protect(<AnalyticsPage />, ALL_ROLES)} />

        <Route
          path="/profile"

          element={protect(
            <ProfilePage />,

            ALL_ROLES,
          )}
        />

        <Route
          path="/profile/edit"

          element={protect(<EditProfilePage />, ALL_ROLES)}
        />

        <Route
          path="/events"

          element={protect(
            <EventListPage />,

            ALL_ROLES,
          )}
        />

        <Route
          path="/events/create"

          element={protect(
            <CreateEventPage />,

            [ROLES.ORGANIZATION],
          )}
        />

        <Route
          path="/events/:id"

          element={protect(
            <EventDetailPage />,

            ALL_ROLES,
          )}
        />

        <Route
          path="/opportunities"

          element={protect(
            <OpportunityListPage />,

            ALL_ROLES,
          )}
        />

        <Route
          path="/opportunities/create"

          element={protect(
            <CreateOpportunityPage />,

            [ROLES.ORGANIZATION],
          )}
        />

        <Route
          path="/opportunities/:id"

          element={protect(
            <OpportunityDetailPage />,

            ALL_ROLES,
          )}
        />

        {/* Student */}

        <Route
          path="/saved-opportunities"

          element={protect(
            <SavedOpportunitiesPage />,

            [ROLES.STUDENT],
          )}
        />

        <Route
          path="/my-applications"

          element={protect(
            <MyApplicationsPage />,

            [ROLES.STUDENT],
          )}
        />

        <Route
          path="/my-events"

          element={protect(
            <StudentMyEventsPage />,

            [ROLES.STUDENT],
          )}
        />

        <Route
          path="/activity-history"

          element={protect(
            <ActivityHistoryPage />,

            [ROLES.STUDENT],
          )}
        />

        <Route
          path="/recommendations"
          element={protect(<RecommendationsPage />, [ROLES.STUDENT])}
        />

        <Route
          path="/badges"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentBadgesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:eventId/ticket"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <EventTicketPage />
            </ProtectedRoute>
          }
        />

        {/* Organization */}

        <Route
          path="/organization/events"

          element={protect(
            <OrganizationMyEventsPage />,

            [ROLES.ORGANIZATION],
          )}
        />

        <Route
          path="/organization/attendance/scanner"
          element={
            <ProtectedRoute allowedRoles={["ORGANIZATION"]}>
              <AttendanceScannerPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id/scanner"
          element={protect(<AttendanceScannerPage />, [ROLES.ORGANIZATION])}
        />

        <Route
          path="/organization/events/:id/edit"

          element={protect(
            <EditEventPage />,

            [ROLES.ORGANIZATION],
          )}
        />

        <Route
          path="/organization/events/:id/registrations"

          element={protect(
            <EventRegistrationsPage />,

            [ROLES.ORGANIZATION],
          )}
        />

        <Route
          path="/events/:id/attendance"
          element={protect(<EventAttendancePage />, [ROLES.ORGANIZATION])}
        />

        <Route
          path="/organization/opportunities"

          element={protect(
            <MyOpportunitiesPage />,

            [ROLES.ORGANIZATION],
          )}
        />

        <Route
          path="/organization/opportunities/:id/edit"

          element={protect(
            <EditOpportunityPage />,

            [ROLES.ORGANIZATION],
          )}
        />

        <Route
          path="/organization/opportunities/:id/applicants"

          element={protect(
            <OpportunityApplicantsPage />,

            [ROLES.ORGANIZATION],
          )}
        />

        {/* Admin */}
        <Route path="/admin/users" element={protect(<AdminUsersPage />, [ROLES.ADMIN])} />
        <Route path="/admin/organizations" element={protect(<AdminUsersPage key="organizations" organizationsOnly />, [ROLES.ADMIN])} />
        <Route path="/admin/audit-logs" element={protect(<AdminAuditLogsPage />, [ROLES.ADMIN])} />

        <Route
          path="/admin/events/pending"

          element={protect(
            <AdminPendingEventsPage />,

            [ROLES.ADMIN],
          )}
        />

        <Route
          path="/admin/opportunities/pending"

          element={protect(
            <AdminPendingOpportunitiesPage />,

            [ROLES.ADMIN],
          )}
        />

        <Route
          path="/admin/event-categories"

          element={protect(
            <AdminEventCategoriesPage />,

            [ROLES.ADMIN],
          )}
        />

        <Route
          path="/admin/opportunity-types"

          element={protect(
            <AdminOpportunityTypesPage />,

            [ROLES.ADMIN],
          )}
        />

        <Route
          path="/admin/universities"

          element={protect(
            <AdminUniversitiesPage />,

            [ROLES.ADMIN],
          )}
        />

        <Route
          path="/admin/faculties"

          element={protect(
            <AdminFacultiesPage />,

            [ROLES.ADMIN],
          )}
        />

        <Route
          path="/admin/majors"

          element={protect(
            <AdminMajorsPage />,

            [ROLES.ADMIN],
          )}
        />

        <Route
          path="/admin/skills"

          element={protect(
            <AdminSkillsPage />,

            [ROLES.ADMIN],
          )}
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
      </Routes></Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
