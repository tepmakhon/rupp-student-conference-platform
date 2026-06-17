import { Router }
from "express";

import {

  getAllTypes,

  createType,

  updateType,

  deleteType,

}

from "./opportunityType.controller.js";

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

  createOpportunityTypeSchema,

  updateOpportunityTypeSchema,

}

from "./opportunityType.validation.js";

const router = Router();

router.get(
  "/",
  getAllTypes
);

router.post(

  "/",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(
    createOpportunityTypeSchema
  ),

  createType

);

router.patch(

  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(
    updateOpportunityTypeSchema
  ),

  updateType

);

router.delete(

  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  deleteType

);

export default router;