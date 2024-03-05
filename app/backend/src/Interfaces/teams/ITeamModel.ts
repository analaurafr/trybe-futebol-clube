import { ICRUDModelReader } from '../ICRUDModel';
import { ITeam } from './ITeam';

export interface ITeamModel extends ICRUDModelReader<ITeam> {
  findById(id: number): Promise<ITeam | null>,
}
