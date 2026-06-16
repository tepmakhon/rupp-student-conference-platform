import { Router }
from "express";

import {

  getAllCategories,

} from "./eventCategory.controller.js";

const router = Router();

router.get(
  "/",
  getAllCategories
);

export default router;
