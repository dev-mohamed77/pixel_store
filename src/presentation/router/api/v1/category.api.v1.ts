import { Router } from "express";
import upload from "../../../../app/middleware/upload";
import {
  create,
  getCategories,
  getCategoryByID,
  updateCategoryByID,
  deleteCategoryByID,
} from "../../../controller/category.controller";

const router = Router();

router.post("/", upload.single("image"), create);

router.get("/", getCategories);

router.get("/:category_id", getCategoryByID);

router.put("/:category_id", upload.single("image"), updateCategoryByID);

router.delete("/:category_id", deleteCategoryByID);

// router.post("/login");

export = router;
