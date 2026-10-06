# API map

Generated from mounted Express routers by `npm run docs:api` in backend. Routes and middleware are authoritative; request/response contracts are in the linked module controllers, validation schemas and services. JSON responses use `{ success, message, data }`; IDs serialize as strings. CSV/PDF endpoints return files.

98 mounted module endpoints. Swagger is at `/api/docs`; the health response is at `/`.

| Method | Path | Authentication | Roles | Validation |
| --- | --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | — | Service/controller validation |
| POST | `/api/auth/login` | Public | — | Service/controller validation |
| POST | `/api/events` | JWT | ORGANIZATION | validate(createEventSchema) |
| GET | `/api/events/approved` | Public | — | Service/controller validation |
| GET | `/api/events/pending` | JWT | ADMIN | Service/controller validation |
| GET | `/api/events/my-registrations` | JWT | STUDENT | Service/controller validation |
| GET | `/api/events/my-events` | JWT | ORGANIZATION | Service/controller validation |
| GET | `/api/events/:id` | Optional JWT; pending details require owner/admin | — | Service/controller validation |
| GET | `/api/events/:id/registrations` | JWT | ORGANIZATION | Service/controller validation |
| PATCH | `/api/events/:id/approve` | JWT | ADMIN | Service/controller validation |
| PATCH | `/api/events/:id/reject` | JWT | ADMIN | validate(rejectionSchema) |
| PATCH | `/api/events/:id` | JWT | ORGANIZATION | validate(updateEventSchema) |
| DELETE | `/api/events/:id` | JWT | ORGANIZATION | Service/controller validation |
| POST | `/api/events/:id/register` | JWT | STUDENT | Service/controller validation |
| GET | `/api/students/dashboard` | JWT | STUDENT | Service/controller validation |
| GET | `/api/students/history` | JWT | STUDENT | Service/controller validation |
| POST | `/api/students/profile` | JWT | STUDENT | Service/controller validation |
| GET | `/api/students/profile` | JWT | STUDENT | Service/controller validation |
| GET | `/api/students/:id/public` | JWT | — | Service/controller validation |
| GET | `/api/admin/dashboard` | JWT | ADMIN | Service/controller validation |
| GET | `/api/admin/stats` | JWT | ADMIN | Service/controller validation |
| GET | `/api/users` | JWT | ADMIN | Service/controller validation |
| PATCH | `/api/users/:id/status` | JWT | ADMIN | validate(z.object({ accountStatus: z.enum(["ACTIVE", "SUSPENDED"]) })) |
| GET | `/api/users/admin-only` | JWT | ADMIN | Service/controller validation |
| POST | `/api/users/profile` | JWT | — | Service/controller validation |
| GET | `/api/users/profile` | JWT | — | Service/controller validation |
| PUT | `/api/users/profile` | JWT | — | Service/controller validation |
| GET | `/api/organizations/me` | JWT | ORGANIZATION | Service/controller validation |
| PATCH | `/api/organizations/logo` | JWT | ORGANIZATION | Service/controller validation |
| POST | `/api/attendance/checkin/:eventId` | JWT | STUDENT | Service/controller validation |
| GET | `/api/attendance/my` | JWT | STUDENT | Service/controller validation |
| POST | `/api/attendance/scan` | JWT | ORGANIZATION | validate(z.object({ registrationId: z.union([z.string().regex(/^[1-9]\d*$/), z.number().int().positi |
| GET | `/api/attendance/statistics/:eventId` | JWT | ORGANIZATION | Service/controller validation |
| GET | `/api/attendance/export/:eventId/csv` | JWT | ORGANIZATION | Service/controller validation |
| GET | `/api/attendance/export/:eventId/pdf` | JWT | ORGANIZATION | Service/controller validation |
| GET | `/api/events/:eventId/ticket` | JWT | STUDENT | Service/controller validation |
| GET | `/api/leaderboard` | JWT | — | Service/controller validation |
| GET | `/api/badges/me` | JWT | STUDENT | Service/controller validation |
| GET | `/api/opportunities` | Public | — | Service/controller validation |
| GET | `/api/opportunities/recent` | Public | — | Service/controller validation |
| GET | `/api/opportunities/pending` | JWT | ADMIN | Service/controller validation |
| GET | `/api/opportunities/my` | JWT | ORGANIZATION | Service/controller validation |
| GET | `/api/opportunities/saved/list` | JWT | STUDENT | Service/controller validation |
| GET | `/api/opportunities/organization/me` | JWT | ORGANIZATION | Service/controller validation |
| GET | `/api/opportunities/:id` | Optional JWT; pending details require owner/admin | — | Service/controller validation |
| POST | `/api/opportunities` | JWT | ORGANIZATION | validate(createOpportunitySchema) |
| PATCH | `/api/opportunities/:id` | JWT | ORGANIZATION | validate(updateOpportunitySchema) |
| DELETE | `/api/opportunities/:id` | JWT | ORGANIZATION | Service/controller validation |
| PATCH | `/api/opportunities/:id/approve` | JWT | ADMIN | Service/controller validation |
| PATCH | `/api/opportunities/:id/reject` | JWT | ADMIN | validate(rejectionSchema) |
| POST | `/api/opportunities/:id/apply` | JWT | STUDENT | validate(applyOpportunitySchema) |
| POST | `/api/opportunities/:id/save` | JWT | STUDENT | Service/controller validation |
| DELETE | `/api/opportunities/:id/save` | JWT | STUDENT | Service/controller validation |
| GET | `/api/applications/me` | JWT | STUDENT | Service/controller validation |
| GET | `/api/applications/opportunity/:id` | JWT | ORGANIZATION | Service/controller validation |
| PATCH | `/api/applications/:id/status` | JWT | ORGANIZATION | validate(updateApplicationStatusSchema) |
| GET | `/api/notifications` | JWT | — | Service/controller validation |
| PATCH | `/api/notifications/:id/read` | JWT | — | Service/controller validation |
| PATCH | `/api/notifications/read-all` | JWT | — | Service/controller validation |
| GET | `/api/dashboard/admin` | JWT | ADMIN | Service/controller validation |
| GET | `/api/dashboard/organization` | JWT | ORGANIZATION | Service/controller validation |
| GET | `/api/dashboard/student` | JWT | STUDENT | Service/controller validation |
| GET | `/api/audit` | JWT | ADMIN | Service/controller validation |
| GET | `/api/audit/me` | JWT | — | Service/controller validation |
| GET | `/api/event-categories` | Public | — | Service/controller validation |
| POST | `/api/event-categories` | JWT | ADMIN | validate(createEventCategorySchema) |
| PATCH | `/api/event-categories/:id` | JWT | ADMIN | validate(updateEventCategorySchema) |
| DELETE | `/api/event-categories/:id` | JWT | ADMIN | Service/controller validation |
| GET | `/api/activity/my-history` | JWT | STUDENT | Service/controller validation |
| GET | `/api/opportunity-types` | Public | — | Service/controller validation |
| POST | `/api/opportunity-types` | JWT | ADMIN | validate(createOpportunityTypeSchema) |
| PATCH | `/api/opportunity-types/:id` | JWT | ADMIN | validate(updateOpportunityTypeSchema) |
| DELETE | `/api/opportunity-types/:id` | JWT | ADMIN | Service/controller validation |
| GET | `/api/universities` | Public | — | Service/controller validation |
| POST | `/api/universities` | JWT | ADMIN | validate(createUniversitySchema) |
| PATCH | `/api/universities/:id` | JWT | ADMIN | validate(updateUniversitySchema) |
| DELETE | `/api/universities/:id` | JWT | ADMIN | Service/controller validation |
| GET | `/api/faculties` | Public | — | Service/controller validation |
| POST | `/api/faculties` | JWT | ADMIN | validate(createFacultySchema) |
| PATCH | `/api/faculties/:id` | JWT | ADMIN | validate(updateFacultySchema) |
| DELETE | `/api/faculties/:id` | JWT | ADMIN | Service/controller validation |
| GET | `/api/majors` | Public | — | Service/controller validation |
| POST | `/api/majors` | JWT | ADMIN | validate(createMajorSchema) |
| PATCH | `/api/majors/:id` | JWT | ADMIN | validate(updateMajorSchema) |
| DELETE | `/api/majors/:id` | JWT | ADMIN | Service/controller validation |
| GET | `/api/skills` | Public | — | Service/controller validation |
| POST | `/api/skills` | JWT | ADMIN | validate(createSkillSchema) |
| PATCH | `/api/skills/:id` | JWT | ADMIN | validate(updateSkillSchema) |
| DELETE | `/api/skills/:id` | JWT | ADMIN | Service/controller validation |
| GET | `/api/profile/me` | JWT | — | Service/controller validation |
| PUT | `/api/profile/me` | JWT | — | validate(updateProfileSchema) |
| GET | `/api/search` | JWT | — | Service/controller validation |
| GET | `/api/recommendations` | JWT | STUDENT | Service/controller validation |
| GET | `/api/student-skills` | JWT | STUDENT | Service/controller validation |
| PUT | `/api/student-skills` | JWT | STUDENT | Service/controller validation |
| GET | `/api/analytics/student` | JWT | STUDENT | Service/controller validation |
| GET | `/api/analytics/organization` | JWT | ORGANIZATION | Service/controller validation |
| GET | `/api/analytics/admin` | JWT | ADMIN | Service/controller validation |
