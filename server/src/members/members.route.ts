import { Router } from "express";
import membersController from "./members.controller";
import { checkLogin, checkPermission } from "../auth/auth";
const router = Router();

router.get("/", membersController.index);
router.post("/", checkLogin, checkPermission, membersController.create);
router.get("/:id", membersController.show);
router.put("/:id", checkLogin, checkPermission, membersController.update);
router.delete("/:id", checkLogin, checkPermission, membersController.delete);
export default router;
