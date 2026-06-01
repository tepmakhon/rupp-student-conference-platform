import { Router } from "express";

import { authMiddleware }
from "../../middlewares/auth.middleware.js";

import { rbac }
from "../../middlewares/rbac.middleware.js";

import {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  approveOpportunity,
  applyOpportunity,
} from "./opportunity.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  getAllOpportunities
);

router.get(
  "/:id",
  getOpportunityById
);

/*
|--------------------------------------------------------------------------
| ORGANIZATION
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authMiddleware,
  rbac(["ORGANIZATION"]),
  createOpportunity
);

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/approve",
  authMiddleware,
  rbac(["ADMIN"]),
  approveOpportunity
);

/*
|--------------------------------------------------------------------------
| STUDENT
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/apply",
  authMiddleware,
  rbac(["STUDENT"]),
  applyOpportunity
);

/**
 * @swagger
 * /api/opportunities:
 *   get:
 *     summary: Get Opportunities
 *     tags:
 *       - Opportunities
 */


/**
 * @swagger
 * /api/opportunities:
 *   post:
 *     summary: Create Opportunity
 *     tags:
 *       - Opportunities
 */
export default router;