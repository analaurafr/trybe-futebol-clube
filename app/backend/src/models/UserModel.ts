import { IUser } from '../Interfaces/users/IUser';
import IUserModel from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UsersModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
