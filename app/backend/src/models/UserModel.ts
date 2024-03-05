import { User } from '../Interfaces/users/IUser';
import SequelizeUsers from '../database/models/SequelizeUser';

export default class userModel implements userModel {
  private model = SequelizeUsers;

  async findAll(): Promise<User[]> {
    const users = await this.model.findAll();
    return users;
  }

  async findByUserEmail(email: string): Promise<User | null> {
    const [user] = await this.model.findAll({ where: { email } });
    if (!user) return null;
    return user;
  }
}
