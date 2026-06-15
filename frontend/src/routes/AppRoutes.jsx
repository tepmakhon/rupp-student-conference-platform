import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

/*
|--------------------------------------------------------------------------
| Auth Pages
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
| Admin Opportunity Pages
|--------------------------------------------------------------------------
*/

import AdminPendingOpportunitiesPage
from "../pages/admin/AdminPendingOpportunitiesPage";

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
| Admin Event Pages
|--------------------------------------------------------------------------
*/

import AdminPendingEventsPage
from "../pages/admin/AdminPendingEventsPage";

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

        {/* Saved Opportunities */}

        <Route
          path="/saved-opportunities"
          element={
            <ProtectedRoute>

              <SavedOpportunitiesPage />

            </ProtectedRoute>
          }
        />

        {/* Admin Opportunity */}

        <Route
          path="/admin/opportunities/pending"
          element={
            <ProtectedRoute>

              <AdminPendingOpportunitiesPage />

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

        {/* Admin Event */}

        <Route
          path="/admin/events/pending"
          element={
            <ProtectedRoute>

              <AdminPendingEventsPage />

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