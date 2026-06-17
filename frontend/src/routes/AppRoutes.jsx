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
| Student
|--------------------------------------------------------------------------
*/

import MyApplicationsPage
from "../pages/student/MyApplicationsPage";

import StudentMyEventsPage
from "../pages/student/MyEventsPage";

/*
|--------------------------------------------------------------------------
| Organization
|--------------------------------------------------------------------------
*/

import MyOpportunitiesPage
from "../pages/organization/MyOpportunitiesPage";

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

            <ProtectedRoute

              allowedRoles={[

                "ADMIN",

                "STUDENT",

                "ORGANIZATION",

              ]}

            >

              <DashboardPage />

            </ProtectedRoute>

          }

        />

        {/* Profile */}

        <Route

          path="/profile"

          element={

            <ProtectedRoute

              allowedRoles={[

                "ADMIN",

                "STUDENT",

                "ORGANIZATION",

              ]}

            >

              <ProfilePage />

            </ProtectedRoute>

          }

        />

        {/* Events */}

        <Route

          path="/events"

          element={

            <ProtectedRoute

              allowedRoles={[

                "ADMIN",

                "STUDENT",

                "ORGANIZATION",

              ]}

            >

              <EventListPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/events/:id"

          element={

            <ProtectedRoute

              allowedRoles={[

                "ADMIN",

                "STUDENT",

                "ORGANIZATION",

              ]}

            >

              <EventDetailPage />

            </ProtectedRoute>

          }

        />

        {/* Opportunities */}

        <Route

          path="/opportunities"

          element={

            <ProtectedRoute

              allowedRoles={[

                "ADMIN",

                "STUDENT",

                "ORGANIZATION",

              ]}

            >

              <OpportunityListPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/opportunities/:id"

          element={

            <ProtectedRoute

              allowedRoles={[

                "ADMIN",

                "STUDENT",

                "ORGANIZATION",

              ]}

            >

              <OpportunityDetailPage />

            </ProtectedRoute>

          }

        />

        {/* Student */}

        <Route

          path="/saved-opportunities"

          element={

            <ProtectedRoute

              allowedRoles={[

                "STUDENT",

              ]}

            >

              <SavedOpportunitiesPage />

            </ProtectedRoute>

          }

        />

        <Route

          path="/my-applications"

          element={

            <ProtectedRoute

              allowedRoles={[

                "STUDENT",

              ]}

            >

              <MyApplicationsPage />

            </ProtectedRoute>

          }
        
        />

      <Route

        path="/my-events"

        element={

          <ProtectedRoute

            allowedRoles={[

              "STUDENT",

            ]}

          >

            <StudentMyEventsPage />

          </ProtectedRoute>

        }

      />

        {/* Organization */}

      <Route

        path="/opportunities/create"

        element={

          <ProtectedRoute

            allowedRoles={[

              "ORGANIZATION",

            ]}

          >

            <CreateOpportunityPage />

          </ProtectedRoute>

        }

      />

      <Route

        path="/organization/events/:id/registrations"

        element={

          <ProtectedRoute

            allowedRoles={[

              "ORGANIZATION",

            ]}

          >

            <EventRegistrationsPage />

          </ProtectedRoute>

        }

      />

      <Route

        path="/events/create"

        element={

          <ProtectedRoute

            allowedRoles={[

              "ORGANIZATION",

            ]}

          >

            <CreateEventPage />

          </ProtectedRoute>

        }

      />

      <Route

        path="/organization/events/:id/edit"

        element={

          <ProtectedRoute

            allowedRoles={[

              "ORGANIZATION",

            ]}

          >

            <EditEventPage />

          </ProtectedRoute>

        }

      />

      <Route

        path="/organization/opportunities"

        element={

          <ProtectedRoute

            allowedRoles={[

              "ORGANIZATION",

            ]}

          >

            <MyOpportunitiesPage />

          </ProtectedRoute>

        }

      />

      <Route

        path="/organization/opportunities/:id/applicants"

        element={

          <ProtectedRoute

            allowedRoles={[

              "ORGANIZATION",

            ]}

          >

            <OpportunityApplicantsPage />

          </ProtectedRoute>

        }

      />

      <Route

        path="/organization/events"

        element={

          <ProtectedRoute

            allowedRoles={[

              "ORGANIZATION",

            ]}

          >

            <OrganizationMyEventsPage />

          </ProtectedRoute>

        }

      />

        {/* Admin */}

      <Route

        path="/admin/events/pending"

        element={

          <ProtectedRoute

            allowedRoles={[

              "ADMIN",

            ]}

          >

            <AdminPendingEventsPage />

          </ProtectedRoute>

        }

      />

      <Route

        path="/admin/opportunities/pending"

        element={

          <ProtectedRoute

            allowedRoles={[

              "ADMIN",

            ]}

          >

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