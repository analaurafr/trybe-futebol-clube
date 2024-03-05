import { ICRUDModelReader } from '../ICRUDModel';
import { User } from './IUser';

export interface IUserModel extends ICRUDModelReader<User> {
  findByUserEmail(email: string): Promise<User | null>;
}
