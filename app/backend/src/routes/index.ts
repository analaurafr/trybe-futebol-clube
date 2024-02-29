import { Router } from 'express';
import teamsRouter from './team.routes';
import usersRouter from './user.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);

export default router;
