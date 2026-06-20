import express from "express";

import cors from "cors";

import path from "path";

import swaggerUi from "swagger-ui-express";

import { swaggerSpec }

from "./config/swagger.js";

import { setupBigIntSerialization }

from "./utils/bigint.js";

import { AppError }

from "./utils/AppError.js";

import {

 successResponse,

}

from "./utils/apiResponse.js";

import {

 errorMiddleware,

}

from "./middlewares/error.middleware.js";

import {

 helmetMiddleware,

 compressionMiddleware,

 hppMiddleware,

 apiLimiter,

}

from "./middlewares/security.middleware.js";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import authRoutes from "./modules/auth/auth.routes.js";

import eventRoutes from "./modules/event/event.routes.js";

import studentRoutes from "./modules/student/student.routes.js";

import adminRoutes from "./modules/admin/admin.routes.js";

import organizationRoutes from "./modules/organization/organization.routes.js";

import attendanceRoutes from "./modules/attendance/attendance.routes.js";

import opportunityRoutes from "./modules/opportunity/opportunity.routes.js";

import leaderboardRoutes from "./modules/leaderboard/leaderboard.routes.js";

import applicationRoutes from "./modules/application/application.routes.js";

import notificationRoutes from "./modules/notification/notification.routes.js";

import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";

import auditRoutes from "./modules/audit/audit.routes.js";

import userRoutes from "./modules/user/user.routes.js";

import eventCategoryRoutes from "./modules/eventCategory/eventCategory.route.js";

import activityRoutes from "./modules/activity/activity.routes.js";

import opportunityTypeRoutes from "./modules/opportunity-type/opportunityType.routes.js";

import universityRoutes from "./modules/university/university.routes.js";

import facultyRoutes from "./modules/faculty/faculty.routes.js";

import majorRoutes from "./modules/major/major.routes.js";

import skillRoutes from "./modules/skill/skill.routes.js";

import profileRoutes from "./modules/profile/profile.routes.js";

import searchRoutes from "./modules/search/search.routes.js";

import recommendationRoutes from "./modules/recommendation/recommendation.routes.js";

import studentSkillRoutes from "./modules/student-skill/studentSkill.routes.js";

/*
|--------------------------------------------------------------------------
| Initialize
|--------------------------------------------------------------------------
*/

setupBigIntSerialization();

const app = express();

app.disable(

 "x-powered-by"

);

/*
|--------------------------------------------------------------------------
| Security Middlewares
|--------------------------------------------------------------------------
*/

app.use(

 helmetMiddleware

);

app.use(

 compressionMiddleware

);

app.use(

 hppMiddleware

);

app.use(

 apiLimiter

);

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(

 cors({

  origin: [

   "http://localhost:5173",

   "http://localhost:3000",

  ],

  credentials: true,

 })

);

/*
|--------------------------------------------------------------------------
| Body Parsers
|--------------------------------------------------------------------------
*/

app.use(

 express.json()

);

app.use(

 express.urlencoded({

  extended: true,

 })

);

/*
|--------------------------------------------------------------------------
| Static Files
|--------------------------------------------------------------------------
*/

app.use(

 "/uploads",

 express.static(

  path.join(

   process.cwd(),

   "uploads"

  )

 )

);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get(

 "/",

 (_req, res) =>

 successResponse(

  res,

  {

   version:

   "1.0.0",

  },

  "RUPP Student Conference & Opportunity Platform API"

 )

);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(

 "/api/auth",

 authRoutes

);

app.use(

 "/api/events",

 eventRoutes

);

app.use(

 "/api/students",

 studentRoutes

);

app.use(

 "/api/admin",

 adminRoutes

);

app.use(

 "/api/users",

 userRoutes

);

app.use(

 "/api/organizations",

 organizationRoutes

);

app.use(

 "/api/attendance",

 attendanceRoutes

);

app.use(

 "/api/leaderboard",

 leaderboardRoutes

);

app.use(

 "/api/opportunities",

 opportunityRoutes

);

app.use(

 "/api/applications",

 applicationRoutes

);

app.use(

 "/api/notifications",

 notificationRoutes

);

app.use(

 "/api/dashboard",

 dashboardRoutes

);

app.use(

 "/api/audit",

 auditRoutes

);

app.use(

 "/api/event-categories",

 eventCategoryRoutes

);

app.use(

 "/api/activity",

 activityRoutes

);

app.use(

 "/api/opportunity-types",

 opportunityTypeRoutes

);

app.use(

 "/api/universities",

 universityRoutes

);

app.use(

 "/api/faculties",

 facultyRoutes

);

app.use(

 "/api/majors",

 majorRoutes

);

app.use(

 "/api/skills",

 skillRoutes

);

app.use(

 "/api/profile",

 profileRoutes

);

app.use(

 "/api/search",

 searchRoutes

);

app.use(

 "/api/recommendations",

 recommendationRoutes

);

app.use(

  "/api/student-skills",

  studentSkillRoutes

);
/*
|--------------------------------------------------------------------------
| Swagger
|--------------------------------------------------------------------------
*/

app.use(

 "/api/docs",

 swaggerUi.serve,

 swaggerUi.setup(

  swaggerSpec

 )

);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(

 (

  req,

  res,

  next

 ) => {

 next(

 new AppError(

 `Cannot ${req.method} ${req.originalUrl}`,

 404

 )

 );

}

);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(

 errorMiddleware

);

export default app;