import express from "express";
import cors from "cors";
import path from "path";

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
import { setupBigIntSerialization } from "./utils/bigint.js";
import swaggerUi from "swagger-ui-express"; import { swaggerSpec } from "./config/swagger.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { AppError } from "./utils/AppError.js";
import { successResponse } from "./utils/apiResponse.js";
import userRoutes from "./modules/user/user.routes.js";

setupBigIntSerialization();

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);
/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (_req, res) => {
  return successResponse(
    res,
    {
      version: "1.0.0",
    },
    "RUPP Student Conference & Opportunity Platform API"
  );
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoutes);

app.use("/api/organizations", organizationRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/leaderboard", leaderboardRoutes);

app.use("/api/opportunities", opportunityRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/audit", auditRoutes);


/*
|--------------------------------------------------------------------------
| Swagger Documentation
|--------------------------------------------------------------------------
*/
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/
app.use((req, res, next) => {
  next(
    new AppError(
      `Cannot ${req.method} ${req.originalUrl}`,
      404
    )
  );
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/
app.use(errorMiddleware);
  

export default app;