import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import eventRoutes from "./modules/event/event.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import organizationRoutes from "./modules/organization/organization.routes.js";
import attendanceRoutes
from "./modules/attendance/attendance.routes.js";

import leaderboardRoutes
from "./modules/leaderboard/leaderboard.routes.js";

const app = express();

/*
|--------------------------------------------------------------------------
| BigInt JSON Fix
|--------------------------------------------------------------------------
*/
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API running clean",
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

app.use("/api/leaderboard",leaderboardRoutes);

/*
|--------------------------------------------------------------------------
| 404 Not Found
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
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("ERROR:", err);

    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;