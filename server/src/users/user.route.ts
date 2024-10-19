import { Router } from "express";
import UserControllers from "./user.controllers";
const router = Router();

router.post("/login", UserControllers.index);
router.get("/", UserControllers.show);
export default router;
