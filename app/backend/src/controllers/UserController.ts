import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.findEmail({ email, password });

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json({ token: serviceResponse.data });
  }

  static userRole(_req: Request, res: Response) {
    const { role } = res.locals.token;

    return res.status(200).json({ role });
  }
}
