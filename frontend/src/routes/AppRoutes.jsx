import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute
from "./ProtectedRoute";

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
| Profile
|--------------------------------------------------------------------------
*/

import ProfilePage
from "../pages/profile/ProfilePage";

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
| Organization
|--------------------------------------------------------------------------
*/

import MyOpportunitiesPage
from "../pages/organization/MyOpportunitiesPage";

import OpportunityApplicantsPage
from "../pages/organization/OpportunityApplicantsPage";

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

import AdminPendingEventsPage
from "../pages/admin/AdminPendingEventsPage";

import AdminPendingOpportunitiesPage
from "../pages/admin/AdminPendingOpportunitiesPage";

function AppRoutes() {

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

        {/* Dashboard */}

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <DashboardPage />

            </ProtectedRoute>

          }

        />

        {/* Profile */}

        <Route

          path="/profile"

          element={

            <ProtectedRoute>

              <ProfilePage />

            </ProtectedRoute>

          }

        />

        {/* Events */}

        <Route

          path="/events"

          element={

            <ProtectedRoute>

              <EventListPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/events/:id"

          element={

            <ProtectedRoute>

              <EventDetailPage />

            </ProtectedRoute>

          }

        />

        {/* Opportunities */}

        <Route

          path="/opportunities"

          element={

            <ProtectedRoute>

              <OpportunityListPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/opportunities/create"

          element={

            <ProtectedRoute>

              <CreateOpportunityPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/opportunities/:id"

          element={

            <ProtectedRoute>

              <OpportunityDetailPage />

            </ProtectedRoute>

          }

        />

        {/* Student */}

        <Route

          path="/saved-opportunities"

          element={

            <ProtectedRoute>

              <SavedOpportunitiesPage />

            </ProtectedRoute>

          }

        />

        {/* Organization */}

        <Route

          path="/organization/opportunities"

          element={

            <ProtectedRoute>

              <MyOpportunitiesPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/organization/opportunities/:id/applicants"

          element={

            <ProtectedRoute>

              <OpportunityApplicantsPage />

            </ProtectedRoute>

          }

        />

        {/* Admin */}

        <Route

          path="/admin/events/pending"

          element={

            <ProtectedRoute>

              <AdminPendingEventsPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/admin/opportunities/pending"

          element={

            <ProtectedRoute>

              <AdminPendingOpportunitiesPage />

            </ProtectedRoute>

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