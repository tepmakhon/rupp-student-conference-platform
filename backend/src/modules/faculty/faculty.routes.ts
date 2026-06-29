import { Router } from "express";

import {
  getAllFaculties,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "./faculty.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { rbac } from "../../middlewares/rbac.middleware.js";

import { validate } from "../../middlewares/validate.middleware.js";

import {
  createFacultySchema,
  updateFacultySchema,
} from "./faculty.validation.js";

const router = Router();

router.get("/", getAllFaculties);

router.post(
  "/",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(createFacultySchema),

  createFaculty,
);

router.patch(
  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(updateFacultySchema),

  updateFaculty,
);

router.delete(
  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  deleteFaculty,
);

export default router;
