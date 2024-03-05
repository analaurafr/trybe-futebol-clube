import { Router, Request, Response } from 'express';
import AuthMiddleware from '../middlewares/auth';
import Validations from '../middlewares/validations';
import UserController from '../controllers/UserController';

const userController = new UserController();
const userRouter = Router();

userRouter.post('/', Validations.validateLoginFields, (req: Request, res: Response) => {
  userController.login(req, res);
});
userRouter.get(
  '/role',
  AuthMiddleware.handle,
  (req: Request, res: Response) => UserController.rToken(req, res),
);

export default userRouter;
