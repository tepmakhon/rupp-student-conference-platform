import { Router }
from "express";

import {

  getAllMajors,

  createMajor,

  updateMajor,

  deleteMajor,

}

from "./major.controller.js";

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

  createMajorSchema,

  updateMajorSchema,

}

from "./major.validation.js";

const router = Router();

router.get(
  "/",
  getAllMajors
);

router.post(

  "/",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(
    createMajorSchema
  ),

  createMajor

);

router.patch(

  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(
    updateMajorSchema
  ),

  updateMajor

);

router.delete(

  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  deleteMajor

);

export default router;