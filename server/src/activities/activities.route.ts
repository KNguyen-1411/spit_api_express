import { Router } from "express";
import activitiesController from "./activities.controller";
import { checkLogin, checkPermission } from "../auth/auth";
const router = Router();

router.get("/", activitiesController.index);
router.post("/", checkLogin, checkPermission, activitiesController.create);
router.get("/:id", activitiesController.show);
router.put("/:id", checkLogin, checkPermission, activitiesController.update);
router.delete("/:id", checkLogin, checkPermission, activitiesController.delete);
export default router;
