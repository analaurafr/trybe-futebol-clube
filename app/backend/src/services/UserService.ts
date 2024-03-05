import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';

type LoginResp = { token: string };
type Payload = { sub: number, role: string, email: string, iat?: number, exp?: number };

export default class UsersService {
  private userModel: UserModel;

  constructor(userModel: UserModel = new UserModel()) {
    this.userModel = userModel;
  }

  public async login(email: string, password: string): Promise<ServiceResponse<LoginResp>> {
    const user = await this.userModel.findByUserEmail(email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const payload: Payload = { sub: Number(user.id), role: user.role, email: user.email };
    const secret = process.env.JWT_SECRET || '';
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
