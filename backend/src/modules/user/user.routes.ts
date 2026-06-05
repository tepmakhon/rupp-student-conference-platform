import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { rbac } from "../../middlewares/rbac.middleware.js";
import { successResponse } from "../../utils/apiResponse.js";

const router = express.Router();

router.get(
  "/admin-only",
  authMiddleware,
  rbac(["ADMIN"]),
  (req, res) => {
    return successResponse(
      res,
      null,
      "Welcome Admin"
    );
  }
);

export default router;