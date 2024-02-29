import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import validations from '../middlewares/validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  validations.validateToken,
  (req: Request, res: Response) => matchController.updateById(req, res),
);

router.patch(
  '/:id',
  validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.post(
  '/',
  validations.validateToken,
  validations.validateMatch,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
