import { Router, Request, Response } from "express";
const router = Router();
import newsRouter from "./news/news.route";
import actiRouter from "./activities/activities.route";
import membersRouter from "./members/members.route";
import usersRouter from "./users/user.route";

router.use("/news", newsRouter);
router.use("/activities", actiRouter);
router.use("/members", membersRouter);
router.use("/user", usersRouter);

router.all("/", (req: Request, res: Response) => {
  res.status(200).json({ data: "Api đã sẵn sàng", message: "Api ready!" });
});

export default router;
