import { Router } from 'express';
import teamsRouter from './team.routes';
import usersRouter from './user.routes';
import matchesRouter from './match.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);

export default router;
