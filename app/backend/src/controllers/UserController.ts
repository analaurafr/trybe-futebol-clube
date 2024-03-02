import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.login(email, password);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public static async getToken(req: Request, res: Response) {
    const { role } = res.locals.auth;
    return res.status(200).json({ role });
  }
}
