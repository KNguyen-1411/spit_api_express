import { Router } from "express";
import newsController from "./news.controller";
import { checkLogin, checkPermission } from "../auth/auth";
const router = Router();

router.get("/", newsController.index);
router.post("/", checkLogin, checkPermission, newsController.create);
router.get("/:id", newsController.show);
router.put("/:id", checkLogin, checkPermission, newsController.update);
router.delete("/:id", checkLogin, checkPermission, newsController.delete);
export default router;
