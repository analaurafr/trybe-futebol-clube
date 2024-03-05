import { Router, Request, Response } from 'express';
import MatchsController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/auth';
import Validations from '../middlewares/validations';

const matchRouter = Router();
const matchsController = new MatchsController();

matchRouter.get(
  '/',
  (req: Request, res: Response) => matchsController.getAllMatchs(req, res),
);

matchRouter.patch(
  '/:id/finish',
  AuthMiddleware.handle,
  (req: Request, res: Response) => matchsController.updateProgress(req, res),
);
matchRouter.patch(
  '/:id',
  AuthMiddleware.handle,
  (req: Request, res: Response) => matchsController.updateScore(req, res),
);
matchRouter.post(
  '/',
  AuthMiddleware.handle,
  Validations.validateTeam,
  (req: Request, res: Response) => matchsController.createMatch(req, res),
);

export default matchRouter;
