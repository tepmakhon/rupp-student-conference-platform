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
import uploadRoutes from "./modules/upload/upload.routes.js";

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
  res.status(200).json({
    success: true,
    message: "RUPP Student Conference & Opportunity Platform API",
    version: "1.0.0",
  });
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

app.use("/api/organizations", organizationRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/leaderboard", leaderboardRoutes);

app.use("/api/opportunities", opportunityRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/audit", auditRoutes);

app.use("/api/upload", uploadRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;