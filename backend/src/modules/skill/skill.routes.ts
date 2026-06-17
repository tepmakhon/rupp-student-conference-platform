import { Router }
from "express";

import {

  getAllSkills,

  createSkill,

  updateSkill,

  deleteSkill,

}

from "./skill.controller.js";

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

  createSkillSchema,

  updateSkillSchema,

}

from "./skill.validation.js";

const router = Router();

router.get(
  "/",
  getAllSkills
);

router.post(

  "/",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(
    createSkillSchema
  ),

  createSkill

);

router.patch(

  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  validate(
    updateSkillSchema
  ),

  updateSkill

);

router.delete(

  "/:id",

  authMiddleware,

  rbac(["ADMIN"]),

  deleteSkill

);

export default router;