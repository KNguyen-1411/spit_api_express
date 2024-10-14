import { Router } from "express";
import newsController from "./news.controller";

const router = Router();

router.get("/", newsController.index);
router.post("/", newsController.create);
router.get("/:id", newsController.show);
router.put("/:id", newsController.update);
router.delete("/:id", newsController.delete);
export default router;
