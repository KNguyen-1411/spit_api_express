import { Router } from "express";
import activitiesController from "./activities.controller";

const router = Router();

router.get("/", activitiesController.index);
router.post("/", activitiesController.create);
router.get("/:id", activitiesController.show);
router.put("/:id", activitiesController.update);
router.delete("/:id", activitiesController.delete);
export default router;
