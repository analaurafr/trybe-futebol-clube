import { ICRUDModelReader } from '../ICRUDModel';
import { IMatch } from './IMatch';
import { MatchInfos } from './MatchInfo';

export interface IMatchModel extends ICRUDModelReader<IMatch> {
  findMatchsFiltred(query: string): Promise<IMatch[]>;
  patchInprogress(id: number): Promise<void>
  patchInprogress(id: number): Promise<void>;
  updateScore(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void>
  create(matchInfos: MatchInfos): Promise<IMatch>
}
