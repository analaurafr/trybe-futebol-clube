import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  Validations.handle,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch('/:id', Validations.handle, (req: Request, res: Response) => {
  matchController.updateMatch(req, res);
});

router.post('/', Validations.handle, (req: Request, res: Response) =>
  matchController.create(req, res));

export default router;
