import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
// import matchsRouter from './Matchs.routes';
// import leaderRoutes from './leaderboard.route';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
// router.use('/matches', matchsRouter);
// router.use('/leaderboard', leaderRoutes);

export default router;
