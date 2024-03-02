import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.loginValidation,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Validations.handle,
  (req: Request, res: Response) => UserController.getToken(req, res),
);

export default router;
