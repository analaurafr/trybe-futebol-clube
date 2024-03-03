import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const controller = new LeaderboardController();

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => controller.getAll(req, res),
);

export default leaderboardRouter;
