import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoutes = Router();
const leaderboardController = new LeaderboardController();

leaderboardRoutes.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getAllHome(req, res),
);
leaderboardRoutes.get(
  '/away',
  (req:Request, res:Response) => leaderboardController.getAllAway(req, res),
);

leaderboardRoutes.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getAll(req, res),
);

export default leaderboardRoutes;
