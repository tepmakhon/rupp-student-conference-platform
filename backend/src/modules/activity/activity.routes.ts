import { Router }
from "express";

import {

  authMiddleware,

} from "../../middlewares/auth.middleware.js";

import {

  rbac,

} from "../../middlewares/rbac.middleware.js";

import {

  getMyActivityHistoryController,

} from "./activity.controller.js";

const router =
  Router();

router.get(

  "/my-history",

  authMiddleware,

  rbac([

    "STUDENT",

  ]),

  getMyActivityHistoryController

);

export default router;