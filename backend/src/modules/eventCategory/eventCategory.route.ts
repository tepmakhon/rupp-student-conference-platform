import { Router }
from "express";

import {

  authMiddleware,

} from "../../middlewares/auth.middleware.js";

import {

  rbac,

} from "../../middlewares/rbac.middleware.js";

import {

  validate,

} from "../../middlewares/validate.middleware.js";

import {

  createEventCategorySchema,

  updateEventCategorySchema,

} from "./eventCategory.validation.js";

import {

  getAllCategories,

  createCategory,

  updateCategory,

  deleteCategory,

} from "./eventCategory.controller.js";

const router =
  Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.get(

  "/",

  getAllCategories

);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.post(

  "/",

  authMiddleware,

  rbac([

    "ADMIN",

  ]),

  validate(

    createEventCategorySchema

  ),

  createCategory

);

router.patch(

  "/:id",

  authMiddleware,

  rbac([

    "ADMIN",

  ]),

  validate(

    updateEventCategorySchema

  ),

  updateCategory

);

router.delete(

  "/:id",

  authMiddleware,

  rbac([

    "ADMIN",

  ]),

  deleteCategory

);

export default router;