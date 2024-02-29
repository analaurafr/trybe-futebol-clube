import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { LoginBody, IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Token from '../utils/userToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private userToken = new Token(),
  ) { }

  public async findEmail(body: LoginBody): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findOne(body.email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const verifyPassword = bcrypt.compareSync(body.password, user.password);

    if (!verifyPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { email, role } = user;

    const token = this.userToken.sign({ email, role });

    return { status: 'SUCCESSFUL', data: token };
  }
}
