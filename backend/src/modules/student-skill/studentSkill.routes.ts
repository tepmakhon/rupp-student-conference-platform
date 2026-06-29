import { Router } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { rbac } from "../../middlewares/rbac.middleware.js";

import { getMySkills, updateMySkills } from "./studentSkill.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Get My Skills
|--------------------------------------------------------------------------
*/

router.get(
  "/",

  authMiddleware,

  rbac(["STUDENT"]),

  getMySkills,
);

/*
|--------------------------------------------------------------------------
| Update My Skills
|--------------------------------------------------------------------------
*/

router.put(
  "/",

  authMiddleware,

  rbac(["STUDENT"]),

  updateMySkills,
);

export default router;
