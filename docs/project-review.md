# Project review and implementation report

Reviewed and updated on October 6, 2026. The repository was clean when work started. Existing architecture and routes were retained; these changes are an incremental engineering pass, not a complete redesign or a claim that the full production acceptance suite has passed.

## Architecture

The backend is an Express 5 application in TypeScript. `src/app.ts` mounts module routers under `/api`; controllers call services, and services query PostgreSQL through Prisma. JWT authentication and role middleware protect private routes. Socket.IO shares the HTTP server and publishes notification, dashboard and attendance updates.

The frontend is React 19 with JavaScript/JSX, React Router, Redux Toolkit, Axios and Tailwind CSS. Pages compose the existing layouts and UI components. API modules preserve backend response envelopes; shared hooks now handle several data queries and moderation operations. Redux retains authentication, dashboard, profile and notification state. Pages load on demand through React lazy imports.

The data path remains:

`PostgreSQL → Prisma → service → controller → REST response → Axios/API module → hook or Redux → page → shared UI`.

The frontend was not converted wholesale to TypeScript. The existing RUPP visual language was preserved. The Figma reference was not visually inspected in this session, so pixel-level conformity is unverified.

## Database and ERD

The existing Prisma schema contains 25 models. No schema migration was added during this pass.

| Area | Models and relationships |
| --- | --- |
| Identity | `User` belongs to `Role`; optional one-to-one `UserProfile`, `Student` and `Organization` connect through unique user IDs. |
| Authorization | `Permission` and `RolePermission` form a many-to-many role/permission catalog. Runtime authorization currently checks role names. |
| Education | `University → Faculty → Major`; students reference each level. Registration now checks that all three selected IDs form the same hierarchy. |
| Skills | `StudentSkill` joins students to skills with a composite key. Replacement now validates IDs and runs atomically. |
| Events | Organizations own events; events belong to categories. Registrations join events and students with a unique pair. Each registration has at most one attendance record. |
| Opportunities | Organizations own opportunities; opportunity types classify them. Applications have a unique opportunity/student pair; saved opportunities use that pair as their primary key. |
| Notifications | Notifications connect to users through `UserNotification`, which stores read state. |
| Activity | Student scores have a corresponding `ActivityScoreHistory`; attendance, registration and application awards now use the transaction creating the associated record. |
| Audit and sessions | `AuditLog` references its actor. `UserSession` exists in the schema, but refresh/session revocation endpoints are not implemented. |

IDs are PostgreSQL BigInts and serialize to JSON strings. Event images use `bannerImageUrl`; opportunity images use `coverImageUrl`. These existing fields were retained.

Badges are derived from a shared score catalog, not a new database entity. Profile badge names and thresholds now match the badge endpoint.

## API map and contracts

[api-map.md](api-map.md) documents 98 mounted module endpoints, their methods, authentication and role checks. Regenerate it with `npm run docs:api` from `backend/`. `/api/docs` supplies the existing Swagger UI; `/` is the existing API health response.

JSON responses retain `{ success, message, data }`. CSV/PDF attendance exports return files. The response boundary strips `passwordHash`, `password` and `refreshToken`, including nested user records.

Selected contracts verified in code:

| Feature | Endpoint | Request / response data |
| --- | --- | --- |
| Authentication | `POST /api/auth/register`, `POST /api/auth/login` | Register accepts email/password/role plus role-specific data. Login returns `{ user, token }`. Public admin registration remains disabled. |
| Profile | `GET`, `PUT /api/profile/me` | GET returns a user aggregate containing `profile`, role, optional student/organization, statistics and recent activity. PUT validates profile fields and updates profile/role-specific fields in one transaction. |
| Discover events | `GET /api/events/approved` | Accepts page, limit, keyword and category ID; returns `{ events, pagination }`. |
| Event details | `GET /api/events/:id` | Approved events can be read publicly; unapproved details require their owner or an admin. Returns event/category/organization and registration count without disclosing registration records. |
| Register | `POST /api/events/:id/register` | Student JWT required. Checks approval/date/duplicate/capacity; creates registration and points atomically, then confirmation notifications. |
| Student registrations | `GET /api/events/my-registrations` | Returns registration records containing nested `event`. The frontend maps those actual records into existing event cards. |
| Organization events | `GET /api/events/my-events`, `GET /api/events/:id/registrations` | Organization JWT; registrant access also checks ownership. |
| Discover opportunities | `GET /api/opportunities` | Returns `{ opportunities, pagination, filters }`. Public status queries cannot expose pending submissions. |
| Opportunity details | `GET /api/opportunities/:id` | Approved details public; pending/rejected details limited to owner/admin. |
| Save / apply | `POST /api/opportunities/:id/save`, `DELETE /api/opportunities/:id/save`, `POST /api/opportunities/:id/apply` | Student JWT. Application body accepts optional validated `cvUrl`; application and score changes are atomic. |
| Saved opportunities | `GET /api/opportunities/saved/list` | Returns saved records containing nested `opportunity`. |
| Applications | `GET /api/applications/me` | Returns `{ applications, pagination }`; the student page now exposes pagination. |
| Applicants / review | `GET /api/applications/opportunity/:id`, `PATCH /api/applications/:id/status` | Organization ownership required. Existing statuses remain `PENDING`, `REVIEWING`, `ACCEPTED`, `REJECTED`; no unsupported shortlist status was invented. |
| Moderation | Event/opportunity pending lists and `PATCH .../:id/approve`, `PATCH .../:id/reject` | Admin JWT. Rejection requires `{ reason }` of 3–1000 trimmed characters. Reasons persist in notifications/audit logs; no unsupported resource field was added. |
| Attendance | Organization scan/statistics/CSV/PDF endpoints | Scan body validates registration ID. Statistics and exports require event ownership, including when an event has no registrants. |
| Accounts | `GET /api/users`, `PATCH /api/users/:id/status` | New admin-only list with page/limit/search/role. Status update accepts `ACTIVE` or `SUSPENDED`; self changes and admin suspension are blocked. Status/audit write is atomic. |
| Audit | `GET /api/audit` | Admin JWT; returns `{ logs, pagination }`. Now integrated into the frontend. |
| Notifications | `GET /api/notifications`, read endpoints | Returns `{ userNotifications, unreadCount, pagination }`; unread count covers all pages. Preview queries no longer overwrite the full notification page's Redux list. |

Path ID validation rejects malformed, nonpositive and out-of-range BigInts. Paginated services validate safe positive integers and enforce a maximum limit of 100. Express's global error handler maps validation, conflicts and missing records without exposing unexpected database errors.

## Authentication and RBAC

1. Credentials are validated; registration normalizes email and hashes the password with bcrypt.
2. Tokens are signed and verified by a single JWT utility, with HS256 and `JWT_EXPIRES_IN`. Missing JWT configuration fails startup; the insecure fallback secret is removed.
3. HTTP authentication checks the current database account and role on every authenticated request. Suspended/deleted accounts are refused and current roles replace stale token claims. Database outages propagate as server failures rather than falsely expiring a valid session.
4. Existing backend role guards remain authoritative. Frontend role guards are UX only; incorrect `roles` props were fixed, and profile editing and analytics are now protected.
5. Axios uses environment configuration, timeout, token attachment and session-expiry events. Responses from an older session are discarded. Logout clears persisted auth and cached Redux feature data. Old persisted password hashes are removed on initialization.
6. Socket connections require a JWT, join rooms using verified identity and role, check organization ownership for attendance subscriptions, and disconnect on token expiry. Account suspension disconnects that user's existing sockets. Attendance subscriptions rejoin after reconnect.

Passwords in login/register forms are read from form submission rather than React state. JWT storage remains localStorage to preserve the existing implementation. There is no refresh endpoint or server-side logout revocation; localStorage is not an HttpOnly cookie solution.

## Student flow

Existing dashboard, discovery, details, registration, QR ticket, registrations, opportunities, save/apply, applications, notifications, recommendations, badges, activity and profile pages were retained.

Registration now shows confirmation and a link to My Events. Registration actions display only for students viewing approved events. My Applications can navigate past the first page. Registration, application and attendance scores share their associated database transaction. Query-driven student lists distinguish a failed request from a truly empty list and expose retry actions.

The core PostgreSQL-backed acceptance paths still need live validation: login → event → register → ticket/registrations; opportunity → save → apply → application status; profile → edit → reload.

## Organization flow

Existing event/opportunity creation, editing, owned lists, registrants, applicants, attendance scanner/statistics/exports and analytics pages were retained.

Edits return submissions to `PENDING` and clear previous approval timestamps. Empty event capacity is accepted as unlimited, capacity must be a positive integer, blank image fields work consistently on create/edit, and local event date editing no longer displays UTC as local time. Opportunity editing/application requests now have validation. Uploads share one configured Cloudinary helper; submitting an opportunity during an image upload is blocked.

Ownership checks protect attendance exports/statistics and socket subscriptions. Attendance and points are written atomically. Event deletion removes attendance before registrations; related deletion steps run in one transaction.

The full organization → admin moderation → student participation → organization review sequence still needs PostgreSQL/browser acceptance testing.

## Admin flow

Existing dashboard, approvals and master-data screens remain. Added Users, Organizations and Audit Logs pages with real API integration and protected navigation. Users and Organizations share a page implementation; organizations apply the organization-role filter. Admins can suspend/activate non-admin accounts and review recorded actions.

Faculties and Majors now use the existing shared CRUD page instead of separate copies of modal, submit, search and delete logic. All six master-data screens use shared responsive table behavior. Shared moderation actions require a rejection reason and record the admin actor. Shared CRUD writes disable repeated submissions and expose loading/error/retry states.

## Frontend route map

Existing URLs were preserved rather than replaced by the master prompt's proposed namespace.

| Role | Routes |
| --- | --- |
| Guest | `/login`, `/register` |
| All authenticated roles | `/dashboard`, `/leaderboard`, `/notifications`, `/analytics`, `/profile`, `/profile/edit`, `/events`, `/events/:id`, `/opportunities`, `/opportunities/:id` |
| Student | `/saved-opportunities`, `/my-applications`, `/my-events`, `/activity-history`, `/recommendations`, `/badges`, `/events/:eventId/ticket` |
| Organization | `/events/create`, `/opportunities/create`, `/organization/events`, `/organization/events/:id/edit`, `/organization/events/:id/registrations`, `/events/:id/attendance`, `/events/:id/scanner`, `/organization/attendance/scanner`, `/organization/opportunities`, `/organization/opportunities/:id/edit`, `/organization/opportunities/:id/applicants` |
| Admin | `/admin/users`, `/admin/organizations`, `/admin/audit-logs`, `/admin/events/pending`, `/admin/opportunities/pending`, `/admin/event-categories`, `/admin/opportunity-types`, `/admin/universities`, `/admin/faculties`, `/admin/majors`, `/admin/skills` |

`/` and unmatched URLs retain the existing dashboard redirect. Role-specific dashboards still use the shared `/dashboard` entry.

## Reusable components and utilities

New frontend components/hooks: `ResponsiveTable`, `SafeImage`, `BottomNavigation`, `ModerationActions`, `useApiQuery`, `useModeration`. New shared utilities: API configuration/error messages and status colors. Existing loading/error/pagination/form inputs, CRUD pages and status wrappers were updated.

`useApiQuery` owns loading/data/error/retry and rejects stale results after route changes or unmount. Some existing Redux/forms still retain their older loader patterns; their callbacks and dependencies were repaired, but the hook was not forced into every page.

New backend utilities: current-user authentication, JWT claims verification, configurable CORS, ID validation, event ownership, response serialization, shared badge catalog, and validated pagination. The route extraction script is now functional rather than a placeholder.

## UX, responsive behavior and performance

- Mobile bottom navigation, safe-area padding, and content padding prevent overlap; the existing sidebar remains available for role-specific tools.
- Shared tables render cards on small screens and tables on larger screens.
- Local image fallback and lazy loading protect cards, avatars, previews and detail imagery from broken URLs.
- Shared skeleton loading, retry errors, accessible input labels and bounded pagination improve common states.
- Student registration selectors filter faculties/majors by their parent and clear child selections when the parent changes.
- Search rejects stale requests and reports failures; organization search results no longer navigate to a nonexistent detail route.
- Notification previews are isolated from the full list, and duplicate sounds/toasts and duplicate dashboard fetches were removed.
- Page-based code splitting reduced the frontend entry bundle from approximately 1,388 KB to 333 KB before gzip. This is bundle-size measurement, not a browser performance benchmark.

## Setup and delivery support

The previously empty seed script now creates roles, event categories, opportunity types, skills and an RUPP education hierarchy. Sequential reruns reuse existing data. Optional initial admin creation uses `ADMIN_EMAIL`/`ADMIN_PASSWORD`; existing passwords are preserved. The admin reset script no longer resets a hardcoded account to a weak printed password.

Docker uses `npm ci`, excludes environment files/node_modules/build output, and Compose waits for database readiness. The hardcoded database password was replaced by required environment configuration. Existing volumes require their existing password. No containers, databases or accounts were changed during this pass.

A GitHub Actions workflow was added for both builds, strict frontend lint and the regression suite. The workflow is present only as a local file; it has not run on GitHub in this session.

## Verification results

| Check | Result |
| --- | --- |
| Backend TypeScript build, including seed/scripts | Passed |
| Frontend ESLint | Passed with zero errors/warnings; baseline was 57 errors/14 warnings |
| Frontend production build | Passed; route splitting removed the oversized entry chunk warning |
| Regression suite | 48 tests passed in 6 files |
| Prisma schema validation | Passed |
| API map generation | Passed: 98 module endpoints |
| Docker Compose configuration validation | Passed using a placeholder environment password |
| Git whitespace check | Passed |
| Running PostgreSQL migrations/seed, real transaction rollback and concurrency | Not verified; Docker daemon was unavailable |
| Browser visual/responsive interactions and full login flows | Not verified; browser execution tooling was unavailable |
| Docker image build / container startup | Not verified; Docker daemon was unavailable |
| Hosted CI / deployment | Not run |

Tests cover JWT integrity/expiry, active account checks, current roles, secret serialization, ownership, input boundaries, transaction usage, capacity/duplicate rejection, atomic account/audit changes, public visibility, authenticated socket rooms, encoded search parameters, expired/changed sessions, logout cache cleanup, shared UI rendering and safe API errors. Database calls are mocked; these tests do not prove real PostgreSQL locks, migrations or complete browser acceptance flows.

## Remaining backend TODOs

1. Run every master-prompt acceptance flow against a development PostgreSQL database; include concurrent seat registration, duplicate application/check-in races, transaction rollback and repeated seed execution.
2. Review the existing student self-check-in endpoint and QR attendance proof before production. Authentication and uniqueness checks alone do not establish physical attendance. Prefer organizer-controlled verification with an explicit policy for self-check-in.
3. Implement refresh/revocation/session endpoints if required. The `UserSession` tables are not currently a working refresh/session lifecycle. Role/permission tables also need explicit permission-level policy if role checks are insufficient.
4. Add an outbox or transactional notification/audit strategy. Several workflows publish side effects after a committed write; delivery failure can still make the client receive an error after the primary action succeeded.
5. Add platform settings, organization settings beyond the existing profile fields, certificates and any desired shortlist/application-detail contracts. Do not expose simulated UI actions for them.
6. Verify older migrations against populated data: existing history includes a required notification-type addition and unique constraints that need a safe data migration plan.
7. Review anonymous read projections and organization account visibility policies across all discovery/recommendation/analytics modules; query authorization is not replaced by the JSON secret filter.

## Remaining frontend TODOs

1. Run actual mobile/tablet/desktop browser checks, keyboard navigation, focus trapping in modals, scanner/camera permissions and all acceptance flows. Compare the resulting UI with the supplied Figma file.
2. Finish any remaining legacy loader migration where stale same-page results can occur; add browser interaction tests for filtering and fast route changes.
3. Add settings/application-detail/shortlist screens only after their real contracts exist. A standalone organization-detail API/page is still missing; organization search is informational.
4. Complete field-level validation messaging and accessibility across older hand-written forms; shared inputs are improved, but not every legacy form uses them.
5. Decide and document date-only opportunity deadline semantics and timezone display consistently before release.
6. Add comprehensive frontend contract types when undertaking a scoped TypeScript migration.

## Files changed

The list below includes tracked modifications and newly added files. Changes have not been committed, deployed or pushed.

- `.github/workflows/ci.yml`
- `README.md`
- `backend/.dockerignore`
- `backend/Dockerfile`
- `backend/env-example`
- `backend/package.json`
- `backend/prisma.config.ts`
- `backend/prisma/seed.ts`
- `backend/scripts/extract-routes.ts`
- `backend/scripts/reset-admin.ts`
- `backend/src/app.ts`
- `backend/src/config/cors.ts`
- `backend/src/middlewares/auth.middleware.ts`
- `backend/src/middlewares/error.middleware.ts`
- `backend/src/middlewares/id.middleware.ts`
- `backend/src/middlewares/optionalAuth.middleware.ts`
- `backend/src/middlewares/rbac.middleware.ts`
- `backend/src/modules/activity/activity.controller.ts`
- `backend/src/modules/activity/activityScore.service.ts`
- `backend/src/modules/admin/admin.controller.ts`
- `backend/src/modules/application/application.controller.ts`
- `backend/src/modules/application/application.routes.ts`
- `backend/src/modules/application/application.service.ts`
- `backend/src/modules/attendance/attendance.controller.ts`
- `backend/src/modules/attendance/attendance.routes.ts`
- `backend/src/modules/attendance/attendance.service.ts`
- `backend/src/modules/attendance/ticket.routes.ts`
- `backend/src/modules/audit/audit.controller.ts`
- `backend/src/modules/audit/audit.service.ts`
- `backend/src/modules/audit/moderation.validation.ts`
- `backend/src/modules/auth/auth.service.ts`
- `backend/src/modules/auth/auth.validation.ts`
- `backend/src/modules/badge/badge.constants.ts`
- `backend/src/modules/badge/badge.controller.ts`
- `backend/src/modules/badge/badge.service.ts`
- `backend/src/modules/dashboard/dashboard.controller.ts`
- `backend/src/modules/event/event.controller.ts`
- `backend/src/modules/event/event.routes.ts`
- `backend/src/modules/event/event.service.ts`
- `backend/src/modules/event/event.validation.ts`
- `backend/src/modules/eventCategory/eventCategory.controller.ts`
- `backend/src/modules/eventCategory/eventCategory.route.ts`
- `backend/src/modules/faculty/faculty.controller.ts`
- `backend/src/modules/faculty/faculty.routes.ts`
- `backend/src/modules/leaderboard/leaderboard.controller.ts`
- `backend/src/modules/major/major.controller.ts`
- `backend/src/modules/major/major.routes.ts`
- `backend/src/modules/notification/notification.controller.ts`
- `backend/src/modules/notification/notification.routes.ts`
- `backend/src/modules/notification/notification.service.ts`
- `backend/src/modules/opportunity-type/opportunityType.controller.ts`
- `backend/src/modules/opportunity-type/opportunityType.routes.ts`
- `backend/src/modules/opportunity/opportunity.controller.ts`
- `backend/src/modules/opportunity/opportunity.routes.ts`
- `backend/src/modules/opportunity/opportunity.service.ts`
- `backend/src/modules/opportunity/opportunity.validation.ts`
- `backend/src/modules/organization/organization.controller.ts`
- `backend/src/modules/profile/profile.routes.ts`
- `backend/src/modules/profile/profile.service.ts`
- `backend/src/modules/profile/profile.validation.ts`
- `backend/src/modules/search/search.service.ts`
- `backend/src/modules/skill/skill.controller.ts`
- `backend/src/modules/skill/skill.routes.ts`
- `backend/src/modules/student-skill/studentSkill.service.ts`
- `backend/src/modules/student/student.controller.ts`
- `backend/src/modules/student/student.routes.ts`
- `backend/src/modules/university/university.controller.ts`
- `backend/src/modules/university/university.routes.ts`
- `backend/src/modules/user/user.admin.controller.ts`
- `backend/src/modules/user/user.admin.service.ts`
- `backend/src/modules/user/user.controller.ts`
- `backend/src/modules/user/user.routes.ts`
- `backend/src/modules/user/user.service.ts`
- `backend/src/socket/socket.ts`
- `backend/src/utils/authUser.ts`
- `backend/src/utils/eventOwnership.ts`
- `backend/src/utils/jwt.ts`
- `backend/src/utils/pagination.ts`
- `backend/src/utils/responseSerializer.ts`
- `backend/tests/errors.test.ts`
- `backend/tests/frontend-contracts.test.ts`
- `backend/tests/security.test.ts`
- `backend/tests/shared-ui.test.ts`
- `backend/tests/socket.test.ts`
- `backend/tests/workflows.test.ts`
- `backend/tsconfig.json`
- `docker-compose.yml`
- `docs/api-map.md`
- `docs/project-review.md`
- `frontend/env-example`
- `frontend/public/image-placeholder.svg`
- `frontend/src/App.jsx`
- `frontend/src/api/adminApi.js`
- `frontend/src/api/axios.js`
- `frontend/src/api/eventApi.js`
- `frontend/src/api/opportunityApi.js`
- `frontend/src/components/admin/AdminCrudPage.jsx`
- `frontend/src/components/admin/AdminDataTable.jsx`
- `frontend/src/components/admin/AdminFormModal.jsx`
- `frontend/src/components/admin/DeleteConfirmationModal.jsx`
- `frontend/src/components/admin/ModerationActions.jsx`
- `frontend/src/components/admin/PendingEventCard.jsx`
- `frontend/src/components/admin/PendingOpportunityCard.jsx`
- `frontend/src/components/applications/ApplicationStatusBadge.jsx`
- `frontend/src/components/auth/StudentRegisterForm.jsx`
- `frontend/src/components/common/ErrorState.jsx`
- `frontend/src/components/common/LoadingState.jsx`
- `frontend/src/components/common/Pagination.jsx`
- `frontend/src/components/common/ResponsiveTable.jsx`
- `frontend/src/components/common/SafeImage.jsx`
- `frontend/src/components/common/StatusBadge.jsx`
- `frontend/src/components/dashboard/LeaderboardPreview.jsx`
- `frontend/src/components/dashboard/RecentOpportunities.jsx`
- `frontend/src/components/events/EventCard.jsx`
- `frontend/src/components/events/EventDetailHero.jsx`
- `frontend/src/components/events/EventForm.jsx`
- `frontend/src/components/events/MyEventStatus.jsx`
- `frontend/src/components/layouts/BottomNavigation.jsx`
- `frontend/src/components/layouts/DashboardLayout.jsx`
- `frontend/src/components/navbar/NavbarSearch.jsx`
- `frontend/src/components/notifications/NotificationDropdown.jsx`
- `frontend/src/components/opportunities/OpportunityCard.jsx`
- `frontend/src/components/opportunities/OpportunityForm.jsx`
- `frontend/src/components/opportunities/OpportunityHero.jsx`
- `frontend/src/components/organization/ApplicantCard.jsx`
- `frontend/src/components/profile/EditProfileSkills.jsx`
- `frontend/src/components/profile/ProfileAvatar.jsx`
- `frontend/src/components/profile/ProfileForm.jsx`
- `frontend/src/components/profile/ProfileSkillSelector.jsx`
- `frontend/src/components/search/SearchBar.jsx`
- `frontend/src/components/ui/Input.jsx`
- `frontend/src/components/ui/Select.jsx`
- `frontend/src/components/ui/Textarea.jsx`
- `frontend/src/constants/pageTitles.js`
- `frontend/src/constants/sidebar/adminMenu.js`
- `frontend/src/constants/sidebar/studentMenu.js`
- `frontend/src/constants/statusStyles.js`
- `frontend/src/hooks/useApiQuery.js`
- `frontend/src/hooks/useModeration.js`
- `frontend/src/pages/admin/AdminAuditLogsPage.jsx`
- `frontend/src/pages/admin/AdminFacultiesPage.jsx`
- `frontend/src/pages/admin/AdminMajorsPage.jsx`
- `frontend/src/pages/admin/AdminPendingEventsPage.jsx`
- `frontend/src/pages/admin/AdminPendingOpportunitiesPage.jsx`
- `frontend/src/pages/admin/AdminUsersPage.jsx`
- `frontend/src/pages/analytics/AnalyticsPage.jsx`
- `frontend/src/pages/auth/LoginPage.jsx`
- `frontend/src/pages/auth/RegisterPage.jsx`
- `frontend/src/pages/dashboard/AdminDashboardPage.jsx`
- `frontend/src/pages/dashboard/OrganizationDashboardPage.jsx`
- `frontend/src/pages/dashboard/StudentDashboardPage.jsx`
- `frontend/src/pages/events/CreateEventPage.jsx`
- `frontend/src/pages/events/EventDetailPage.jsx`
- `frontend/src/pages/events/EventListPage.jsx`
- `frontend/src/pages/leaderboard/LeaderboardPage.jsx`
- `frontend/src/pages/notifications/NotificationPage.jsx`
- `frontend/src/pages/opportunities/CreateOpportunityPage.jsx`
- `frontend/src/pages/opportunities/OpportunityDetailPage.jsx`
- `frontend/src/pages/opportunities/OpportunityListPage.jsx`
- `frontend/src/pages/opportunities/SavedOpportunitiesPage.jsx`
- `frontend/src/pages/organization/AttendanceScannerPage.jsx`
- `frontend/src/pages/organization/EditEventPage.jsx`
- `frontend/src/pages/organization/EditOpportunityPage.jsx`
- `frontend/src/pages/organization/EventAttendancePage.jsx`
- `frontend/src/pages/organization/EventRegistrationsPage.jsx`
- `frontend/src/pages/organization/MyEventsPage.jsx`
- `frontend/src/pages/organization/MyOpportunitiesPage.jsx`
- `frontend/src/pages/organization/OpportunityApplicantsPage.jsx`
- `frontend/src/pages/profile/EditProfilePage.jsx`
- `frontend/src/pages/profile/ProfilePage.jsx`
- `frontend/src/pages/student/ActivityHistoryPage.jsx`
- `frontend/src/pages/student/MyApplicationsPage.jsx`
- `frontend/src/pages/student/MyEventsPage.jsx`
- `frontend/src/pages/student/RecommendationsPage.jsx`
- `frontend/src/pages/student/StudentBadgesPage.jsx`
- `frontend/src/pages/ticket/EventTicketPage.jsx`
- `frontend/src/redux/slices/authSlice.js`
- `frontend/src/redux/slices/notificationSlice.js`
- `frontend/src/redux/store.js`
- `frontend/src/routes/AppRoutes.jsx`
- `frontend/src/socket/socket.js`
- `frontend/src/utils/apiConfig.js`
- `frontend/src/utils/apiError.js`
- `frontend/src/utils/cloudinaryUpload.js`
