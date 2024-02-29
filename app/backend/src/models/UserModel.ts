import SequelizeUserModel from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUserModel;

  async findOne(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return !user ? null : user;
  }
}
