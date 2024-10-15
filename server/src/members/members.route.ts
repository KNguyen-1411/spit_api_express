import { Router } from "express";
import membersController from "./members.controller";

const router = Router();

router.get("/", membersController.index);
router.post("/", membersController.create);
router.get("/:id", membersController.show);
router.put("/:id", membersController.update);
router.delete("/:id", membersController.delete);
export default router;
