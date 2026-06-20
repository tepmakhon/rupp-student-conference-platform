import { Router }

from "express";

import {

 authMiddleware,

}

from "../../middlewares/auth.middleware.js";

import {

 rbac,

}

from "../../middlewares/rbac.middleware.js";

import {

 getRecommendations,

}

from "./recommendation.controller.js";

const router = Router();

router.get(

 "/",

 authMiddleware,

 rbac([

  "STUDENT"

 ]),

 getRecommendations

);

export default router;