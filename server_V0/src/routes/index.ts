import { Router, Request, Response } from 'express';
import membersRoutes from './members.route';
import newRoutes from './news.route';
import activityRoutes from './activities.route';
import userRoutes from './user.route';
const router = Router();
import { authenticate, authorize } from '../middlewares/auth';

router.use('/members', membersRoutes);
router.use('/news', newRoutes);
router.use('/activities', activityRoutes);
router.use('/user', userRoutes);

router.all('/', (req: Request, res: Response) => {
  res.status(200).json({ data: 'Api đã sẵn sàng', message: 'Api ready!' });
});

export default router;
