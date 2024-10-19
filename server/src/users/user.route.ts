import { Router } from "express";
import UserControllers from "./user.controllers";
import { checkLogin, checkPermission } from "../auth/auth";
const router = Router();

router.post("/login", UserControllers.index);
router.get("/", checkLogin, checkPermission, UserControllers.show);

export default router;
