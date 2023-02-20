import { Router } from "express";

const router = Router();

router.get("/users");

router.get("/user:id");

router.put("/user:id");

router.delete("/user:id");

export = router;
