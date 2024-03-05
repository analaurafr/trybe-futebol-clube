import { Router } from 'express';
import teamRouter from './team.routes';
// import loginRouter from './login.routes';
// import matchsRouter from './Matchs.routes';
// import leaderRoutes from './leaderboard.route';

const router = Router();

router.use('/teams', teamRouter);
// router.use('/login', loginRouter);
// router.use('/matches', matchsRouter);
// router.use('/leaderboard', leaderRoutes);

export default router;
