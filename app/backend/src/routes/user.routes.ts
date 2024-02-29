import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import validations from '../middlewares/validations';

const userController = new UserController();
const router = Router();

router.post(
  '/',
  validations.validateLogin,
  (req: Request, res: Response) => userController.userLogin(req, res),
);

router.get(
  '/role',
  validations.validateToken,
  (req: Request, res: Response) => UserController.userRole(req, res),
);

export default router;
