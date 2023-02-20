import { Router } from "express";
import category_router from "./api/v1/category.api.v1";

const router = Router();

router.use("/v1/category", category_router);

export = router;
