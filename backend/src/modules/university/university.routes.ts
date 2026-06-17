import { Router }
from "express";

import {

  getAllUniversities,

  createUniversity,

  updateUniversity,

  deleteUniversity,

}

from "./university.controller.js";

import {

  authMiddleware,

}

from "../../middlewares/auth.middleware.js";

import {

  rbac,

}

from "../../middlewares/rbac.middleware.js";

import {

  validate,

}

from "../../middlewares/validate.middleware.js";

import {

  createUniversitySchema,

  updateUniversitySchema,

}

from "./university.validation.js";

const router = Router();

router.get(
  "/",
  getAllUniversities
);

router.post(

  "/",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(
    createUniversitySchema
  ),

  createUniversity

);

router.patch(

  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(
    updateUniversitySchema
  ),

  updateUniversity

);

router.delete(

  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  deleteUniversity

);

export default router;